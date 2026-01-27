import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft, Heart, Share2, MapPin, Shield, Truck, MessageCircle } from 'lucide-react'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

async function getProduct(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data
}

async function getRelatedProducts(categoryId: string, currentId: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .neq('id', currentId)
    .limit(4)

  if (error) {
    console.error('Error fetching related products:', error)
    return []
  }

  return data
}

export default async function ProductoPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category_id, product.id)

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      propiedades: 'from-violet-400 to-indigo-400',
      vehiculos: 'from-orange-400 to-yellow-400',
      electronica: 'from-cyan-400 to-blue-400',
      hogar: 'from-emerald-400 to-green-400',
      moda: 'from-pink-400 to-rose-400',
      otros: 'from-gray-400 to-slate-400',
    }
    return colors[category] || colors.otros
  }

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      propiedades: 'Propiedades',
      vehiculos: 'Vehículos',
      electronica: 'Electrónica',
      hogar: 'Hogar',
      moda: 'Moda',
      otros: 'Otros',
    }
    return names[category] || 'Otros'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-indigo-500">Inicio</Link>
            <span className="text-gray-300">/</span>
            <Link href="/productos" className="text-gray-500 hover:text-indigo-500">Productos</Link>
            <span className="text-gray-300">/</span>
            <Link href={`/categoria/${product.category_id}`} className="text-gray-500 hover:text-indigo-500">
              {getCategoryName(product.category_id)}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back button */}
        <Link 
          href="/productos" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-500 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver a productos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Imagen */}
          <div className="space-y-4">
            <div className={`aspect-square rounded-3xl bg-gradient-to-br ${getCategoryColor(product.category_id)} relative overflow-hidden`}>
              {product.badge && (
                <span className={`absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-semibold text-white ${
                  product.badge === 'featured' ? 'bg-indigo-500' :
                  product.badge === 'new' ? 'bg-emerald-500' : 'bg-red-500'
                }`}>
                  {product.badge === 'featured' ? 'Destacado' :
                   product.badge === 'new' ? 'Nuevo' : `-${product.discount || 20}%`}
                </span>
              )}
            </div>
            
            {/* Thumbnails placeholder */}
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i} 
                  className={`w-20 h-20 rounded-xl bg-gradient-to-br ${getCategoryColor(product.category_id)} opacity-${i === 1 ? '100' : '50'} cursor-pointer hover:opacity-100 transition-opacity`}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                {getCategoryName(product.category_id)}
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold mb-4">{product.title}</h1>

            <div className="flex items-center gap-2 text-gray-500 mb-6">
              <MapPin size={18} />
              <span>{product.location}</span>
            </div>

            <div className="mb-8">
              <span className="text-4xl font-bold text-indigo-500">
                {product.currency} {product.price.toLocaleString()}
              </span>
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description || 'Este producto no tiene descripción disponible.'}
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="flex-1 px-6 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2">
                <MessageCircle size={20} />
                Contactar vendedor
              </button>
              <button className="px-6 py-4 border-2 border-gray-200 rounded-xl font-semibold hover:border-indigo-500 hover:text-indigo-500 transition-colors flex items-center justify-center gap-2">
                <Heart size={20} />
                Guardar
              </button>
              <button className="px-6 py-4 border-2 border-gray-200 rounded-xl font-semibold hover:border-indigo-500 hover:text-indigo-500 transition-colors flex items-center justify-center gap-2">
                <Share2 size={20} />
                Compartir
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-4 p-6 bg-gray-100 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Shield size={20} className="text-emerald-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Compra protegida</p>
                  <p className="text-xs text-gray-500">Garantía MercaPlaza</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Truck size={20} className="text-indigo-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Envío disponible</p>
                  <p className="text-xs text-gray-500">Consultar costos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Productos relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related: any) => (
                <Link 
                  key={related.id} 
                  href={`/producto/${related.id}`}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`aspect-[4/3] bg-gradient-to-br ${getCategoryColor(related.category_id)}`} />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-1">{related.title}</h3>
                    <p className="text-indigo-500 font-bold">
                      {related.currency} {related.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}