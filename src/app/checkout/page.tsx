'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { ArrowLeft, ShoppingBag, MessageCircle, CreditCard, Building2, Loader2, CheckCircle } from 'lucide-react'

export default function CheckoutPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
    paymentMethod: 'whatsapp',
  })

  // Número de WhatsApp de tu negocio (cambiar por el tuyo)
  const whatsappNumber = '595981976010' // Formato: código país + número sin espacios

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Crear mensaje para WhatsApp
    const productList = items.map(item => 
      `• ${item.title} (x${item.quantity}) - ${item.currency} ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n')

    const message = `
🛒 *NUEVO PEDIDO - MercaPlaza*

👤 *Cliente:* ${form.name}
📱 *Teléfono:* ${form.phone}
📧 *Email:* ${form.email}
📍 *Dirección:* ${form.address}

📦 *Productos:*
${productList}

💰 *Total:* USD ${totalPrice.toLocaleString()}

💳 *Método de pago:* ${form.paymentMethod === 'transfer' ? 'Transferencia bancaria' : 'Coordinar por WhatsApp'}

📝 *Notas:* ${form.notes || 'Sin notas'}
    `.trim()

    // Abrir WhatsApp con el mensaje
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      window.open(whatsappUrl, '_blank')
    }, 1000)
  }

  if (items.length === 0 && !sent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8">Agrega productos antes de hacer checkout</p>
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Ver productos
          </Link>
        </div>
      </div>
    )
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Pedido enviado!</h1>
          <p className="text-gray-600 mb-4">
            Se abrió WhatsApp con los detalles de tu pedido. Envía el mensaje para confirmar tu compra.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Te contactaremos pronto para coordinar el pago y la entrega.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                clearCart()
                setSent(false)
              }}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/carrito"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-500 mb-2"
          >
            <ArrowLeft size={18} />
            Volver al carrito
          </Link>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Datos personales */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Datos de contacto</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="Juan Pérez"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                    placeholder="0981 123 456"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección de entrega *
                  </label>
                  <textarea
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    required
                    placeholder="Calle, número, barrio, ciudad"
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Método de pago */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Método de pago</h2>
              
              <div className="space-y-3">
                <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                  form.paymentMethod === 'whatsapp' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="whatsapp"
                    checked={form.paymentMethod === 'whatsapp'}
                    onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                    className="w-5 h-5 text-indigo-500"
                  />
                  <MessageCircle className="text-emerald-500" size={24} />
                  <div>
                    <p className="font-medium">Coordinar por WhatsApp</p>
                    <p className="text-sm text-gray-500">Te contactamos para acordar el pago</p>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                  form.paymentMethod === 'transfer' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    value="transfer"
                    checked={form.paymentMethod === 'transfer'}
                    onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                    className="w-5 h-5 text-indigo-500"
                  />
                  <Building2 className="text-blue-500" size={24} />
                  <div>
                    <p className="font-medium">Transferencia bancaria</p>
                    <p className="text-sm text-gray-500">Te enviamos los datos de cuenta</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Notas */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold mb-6">Notas adicionales</h2>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Instrucciones especiales, horarios de entrega, etc."
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            {/* Submit - Mobile */}
            <button
              type="submit"
              disabled={loading}
              className="w-full lg:hidden py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <MessageCircle size={20} />
                  Enviar pedido por WhatsApp
                </>
              )}
            </button>
          </form>

          {/* Resumen */}
          <div>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Resumen del pedido</h2>

              {/* Productos */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${item.color} flex-shrink-0`} />
                    <div className="flex-1">
                      <p className="font-medium line-clamp-1">{item.title}</p>
                      <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                      <p className="text-indigo-500 font-medium">
                        {item.currency} {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totales */}
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} productos)</span>
                  <span>USD {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="text-emerald-500">A coordinar</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-indigo-500">USD {totalPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit - Desktop */}
              <button
                type="submit"
                form="checkout-form"
                onClick={handleSubmit}
                disabled={loading || !form.name || !form.phone || !form.email || !form.address}
                className="hidden lg:flex w-full mt-6 py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-70 items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <MessageCircle size={20} />
                    Enviar pedido por WhatsApp
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                🔒 Tus datos están seguros
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}