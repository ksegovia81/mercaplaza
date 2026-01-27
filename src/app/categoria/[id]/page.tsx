import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ui/ProductCard'

export const dynamic = 'force-dynamic'

async function getCategory(id: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching category:', error)
    return null
  }

  return data
}

async function getProductsByCategory(categoryId: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data
}

async function getAllCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return data
}

export default async function CategoriaPage({ params }: { params: { id: string } }) {
  const category = await getCategory(params.id)

  if (!category) {
    notFound()
  }

  const products = await getProductsByCategory(params.id)
  const allCategories = await getAllCategories()

  const getCategoryColor = (catId: string) => {
    const colors: Record<string, string> = {
      propiedades: 'from-violet-400 to-indigo-400',
      vehiculos: 'from-orange-400 to-yellow-400',
      electronica: 'from-cyan-400 to-blue-400',
      hogar: 'from-emerald-400 to-green-400',
      moda: 'from-pink-400 to-rose-400',
      otros: 'from-gray-400 to-slate-400',
    }
    return colors[catId] || colors.otros
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de categoría */}
      <div className={`bg-gradient-to-r ${getCategoryColor(category.id)} text-white`}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link 
            href="/productos" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            Volver a productos
          </Link>
          
          <div className="flex items-center gap-4">
            <span className="text-6xl">{category.icon}</span>
            <div>
              <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
              <p className="text-white/80 text-lg">{category.description}</p>
              <p className="text-white/60 mt-2">{products.length} productos encontrados</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Otras categorías */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-semibold mb-4">Categorías</h2>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/productos" 
                    className="text-gray-600 hover:text-indigo-500 transition-colors"
                  >
                    Todas
                  </Link>
                </li>
                {allCategories.map((cat: any) => (
                  <li key={cat.id}>
                    <Link 
                      href={`/categoria/${cat.id}`}
                      className={`flex items-center gap-2 transition-colors ${
                        cat.id === category.id 
                          ? 'text-indigo-500 font-medium' 
                          : 'text-gray-600 hover:text-indigo-500'
                      }`}
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
              <div className="text-center py-16 bg-white rounded-2xl">
                <span className="text-6xl mb-4 block">{category.icon}</span>
                <h3 className="text-xl font-semibold mb-2">No hay productos en esta categoría</h3>
                <p className="text-gray-500 mb-6">Sé el primero en publicar</p>
                <Link 
                  href="/productos"
                  className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  Ver todos los productos
                </Link>
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
                      category: category.name,
                      badge: product.badge === 'featured' ? 'Destacado' : 
                             product.badge === 'new' ? 'Nuevo' : 
                             product.badge === 'sale' ? `-${product.discount || 20}%` : null,
                      color: getCategoryColor(product.category_id)
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