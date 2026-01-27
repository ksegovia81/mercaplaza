import Link from 'next/link'
import ProductCard, { Product } from '@/components/ui/ProductCard'

const products: Product[] = [
  {
    id: '1',
    title: 'Casa moderna 3 habitaciones',
    price: 'USD 185,000',
    location: 'Asunción, Paraguay',
    category: 'Propiedades',
    badge: 'Destacado',
    color: 'from-violet-400 to-indigo-400',
  },
  {
    id: '2',
    title: 'Toyota Hilux 2023',
    price: 'BRL 245,000',
    location: 'São Paulo, Brasil',
    category: 'Vehículos',
    badge: 'Nuevo',
    color: 'from-orange-400 to-yellow-400',
  },
  {
    id: '3',
    title: 'MacBook Pro M3 14"',
    price: 'ARS 2,850,000',
    location: 'Buenos Aires, Argentina',
    category: 'Electrónica',
    badge: null,
    color: 'from-cyan-400 to-blue-400',
  },
  {
    id: '4',
    title: 'Sofá seccional premium',
    price: 'PYG 8,500,000',
    location: 'Asunción, Paraguay',
    category: 'Hogar',
    badge: '-20%',
    color: 'from-emerald-400 to-green-400',
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold">Productos destacados</h2>
          <Link href="/productos" className="text-indigo-500 font-medium hover:text-indigo-600">
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
