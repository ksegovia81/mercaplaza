import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'

export const dynamic = 'force-dynamic'

async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data
}

async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data
}

export default async function ProductosPage() {
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold mb-2">Todos los productos</h1>
          <p className="text-gray-600">{products.length} productos encontrados</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filtros */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-semibold mb-4">Categorías</h2>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/productos" 
                    className="text-indigo-500 font-medium"
                  >
                    Todas
                  </Link>
                </li>
                {categories.map((cat: any) => (
                  <li key={cat.id}>
                    <Link 
                      href={`/categoria/${cat.id}`}
                      className="text-gray-600 hover:text-indigo-500 transition-colors flex items-center gap-2"
                    >
                      <span>{cat.icon}</span>
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Grid de productos */}
          <main className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No hay productos disponibles</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product: any) => (
         <ProductCard
  key={product.id}
  product={{
    id: product.id,
    title: product.title,
    price: `${product.currency} ${product.price.toLocaleString()}`,
    location: product.location,
    category: product.category_id,
    badge: product.badge === 'featured' ? 'Destacado' : 
           product.badge === 'new' ? 'Nuevo' : 
           product.badge === 'sale' ? `-${product.discount || 20}%` : null,
    color: product.category_id === 'propiedades' ? 'from-violet-400 to-indigo-400' :
           product.category_id === 'vehiculos' ? 'from-orange-400 to-yellow-400' :
           product.category_id === 'electronica' ? 'from-cyan-400 to-blue-400' :
           product.category_id === 'hogar' ? 'from-emerald-400 to-green-400' :
           product.category_id === 'moda' ? 'from-pink-400 to-rose-400' :
           'from-gray-400 to-slate-400',
    image: product.images?.[0] || null
  }}
/>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}