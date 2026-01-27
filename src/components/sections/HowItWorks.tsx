const steps = [
  {
    number: '01',
    icon: '🔍',
    title: 'Busca',
    description: 'Explora miles de productos en diferentes categorías',
  },
  {
    number: '02',
    icon: '🛒',
    title: 'Elige',
    description: 'Agrega al carrito los productos que te interesan',
  },
  {
    number: '03',
    icon: '💳',
    title: 'Paga',
    description: 'Pago seguro con MercadoPago, tarjetas o transferencia',
  },
  {
    number: '04',
    icon: '🎉',
    title: 'Recibe',
    description: 'Coordina la entrega o retiro del producto',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-2">¿Cómo funciona?</h2>
          <p className="text-gray-400 text-lg">Comprar nunca fue tan fácil</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center relative">
              <span className="absolute -top-2 right-0 text-6xl font-extrabold text-white/5">
                {step.number}
              </span>
              <span className="text-5xl mb-4 block">{step.icon}</span>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
