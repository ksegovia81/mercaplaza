import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl mx-auto text-center lg:text-left lg:mx-0">
          <span className="inline-block px-4 py-2 bg-indigo-100 border border-indigo-200 rounded-full text-sm font-medium text-indigo-700 mb-6">
            🚀 El marketplace del Cono Sur
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Compra y vende{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              todo
            </span>{' '}
            en un solo lugar
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
            Propiedades, vehículos, electrónica y más. Conectamos a compradores y vendedores en Paraguay, Brasil y Argentina.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
            <Link
              href="/productos"
              className="px-6 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center justify-center gap-2"
            >
              Explorar productos
              <ArrowRight size={20} />
            </Link>
            <Link
              href="#como-funciona"
              className="px-6 py-4 text-gray-600 hover:text-indigo-500 hover:bg-gray-100 rounded-lg font-medium transition-colors text-center"
            >
              Ver cómo funciona
            </Link>
          </div>

          <div className="flex gap-10 justify-center lg:justify-start">
            <div>
              <span className="block text-3xl font-bold text-indigo-500">10K+</span>
              <span className="text-sm text-gray-500">Productos</span>
            </div>
            <div>
              <span className="block text-3xl font-bold text-indigo-500">3</span>
              <span className="text-sm text-gray-500">Países</span>
            </div>
            <div>
              <span className="block text-3xl font-bold text-indigo-500">24/7</span>
              <span className="text-sm text-gray-500">Soporte</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
