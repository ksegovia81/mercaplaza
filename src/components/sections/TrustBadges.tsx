const badges = [
  {
    icon: '🔒',
    title: 'Pago Seguro',
    description: 'Todas las transacciones están protegidas',
  },
  {
    icon: '✅',
    title: 'Productos Verificados',
    description: 'Revisamos cada publicación',
  },
  {
    icon: '💬',
    title: 'Soporte 24/7',
    description: 'Estamos para ayudarte siempre',
  },
  {
    icon: '🌎',
    title: 'Cobertura Regional',
    description: 'Paraguay, Brasil y Argentina',
  },
]

export default function TrustBadges() {
  return (
    <section className="py-20 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge) => (
            <div key={badge.title} className="text-center p-6">
              <span className="text-4xl mb-4 block">{badge.icon}</span>
              <h3 className="font-semibold mb-2">{badge.title}</h3>
              <p className="text-sm text-gray-600">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
