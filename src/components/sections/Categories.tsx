import Link from 'next/link'

const categories = [
  { id: 'propiedades', name: 'Propiedades', description: 'Casas, departamentos, terrenos', icon: '🏠', count: 2450 },
  { id: 'vehiculos', name: 'Vehículos', description: 'Autos, motos, camiones', icon: '🚗', count: 1832 },
  { id: 'electronica', name: 'Electrónica', description: 'Celulares, computadoras, TV', icon: '📱', count: 3127 },
  { id: 'hogar', name: 'Hogar', description: 'Muebles, decoración, jardín', icon: '🛋️', count: 1654 },
  { id: 'moda', name: 'Moda', description: 'Ropa, calzado, accesorios', icon: '👕', count: 4521 },
  { id: 'otros', name: 'Otros', description: 'Deportes, mascotas, más', icon: '📦', count: 2891 },
]

export default function Categories() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-2">Explora por categoría</h2>
          <p className="text-gray-600 text-lg">Encuentra exactamente lo que buscas</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categoria/${cat.id}`}
              className="group p-8 bg-white rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <span className="text-5xl mb-4 block">{cat.icon}</span>
              <h3 className="text-xl font-semibold mb-2">{cat.name}</h3>
              <p className="text-gray-600 mb-4">{cat.description}</p>
              <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                {cat.count} anuncios
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
