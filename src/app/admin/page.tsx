'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Edit, Trash2, Package, ArrowLeft, Loader2 } from 'lucide-react'

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    checkUser()
    fetchProducts()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    setUser(user)
  }

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setProducts(data)
    }
    setLoading(false)
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return
    
    setDeleting(id)
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (!error) {
      setProducts(products.filter(p => p.id !== id))
    }
    setDeleting(null)
  }

  const getCategoryName = (id: string) => {
    const names: Record<string, string> = {
      propiedades: 'Propiedades',
      vehiculos: 'Vehículos',
      electronica: 'Electrónica',
      hogar: 'Hogar',
      moda: 'Moda',
      otros: 'Otros',
    }
    return names[id] || id
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-500 mb-2"
            >
              <ArrowLeft size={18} />
              Volver al inicio
            </Link>
            <h1 className="text-3xl font-bold">Panel de Administración</h1>
            <p className="text-gray-600">Gestiona tus productos</p>
          </div>
          <Link
            href="/admin/nuevo"
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            Nuevo Producto
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Package className="text-indigo-500" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{products.length}</p>
                <p className="text-gray-600 text-sm">Total productos</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Package className="text-emerald-500" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{products.filter(p => p.featured).length}</p>
                <p className="text-gray-600 text-sm">Destacados</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Package className="text-orange-500" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{products.filter(p => p.badge === 'new').length}</p>
                <p className="text-gray-600 text-sm">Nuevos</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold">Todos los productos</h2>
          </div>
          
          {products.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-500">No hay productos aún</p>
              <Link
                href="/admin/nuevo"
                className="inline-block mt-4 text-indigo-500 font-medium hover:underline"
              >
                Crear el primero
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Producto</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Categoría</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Precio</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">País</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Estado</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-400 flex-shrink-0" />
                          <div>
                            <p className="font-medium">{product.title}</p>
                            <p className="text-sm text-gray-500">{product.location}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        {getCategoryName(product.category_id)}
                      </td>
                      <td className="py-4 px-6 font-medium">
                        {product.currency} {product.price?.toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-lg">
                          {product.country === 'PY' ? '🇵🇾' : product.country === 'BR' ? '🇧🇷' : '🇦🇷'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {product.badge && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            product.badge === 'featured' ? 'bg-indigo-100 text-indigo-700' :
                            product.badge === 'new' ? 'bg-emerald-100 text-emerald-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {product.badge === 'featured' ? 'Destacado' :
                             product.badge === 'new' ? 'Nuevo' : 'Oferta'}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/editar/${product.id}`}
                            className="p-2 text-gray-500 hover:text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            disabled={deleting === product.id}
                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          >
                            {deleting === product.id ? (
                              <Loader2 size={18} className="animate-spin" />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}