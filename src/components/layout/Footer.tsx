import Link from 'next/link'

const footerLinks = {
  categorias: ['Propiedades', 'Vehículos', 'Electrónica', 'Hogar', 'Moda'],
  ayuda: ['Cómo comprar', 'Cómo vender', 'Métodos de pago', 'Envíos', 'Contacto'],
  legal: ['Términos y condiciones', 'Política de privacidad', 'Cookies'],
}

const socialIcons = ['📷', '📘', '🎵', '💬']

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl mb-4">
              <span className="text-white text-3xl">◆</span>
              <span className="text-white">MercaPlaza</span>
            </Link>
            <p className="text-gray-400 mb-6">
              El marketplace líder del Cono Sur. Compra y vende con confianza.
            </p>
            <div className="flex gap-3">
              {socialIcons.map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-500 transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wide mb-5">
              Categorías
            </h4>
            <ul className="space-y-3">
              {footerLinks.categorias.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ayuda */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wide mb-5">
              Ayuda
            </h4>
            <ul className="space-y-3">
              {footerLinks.ayuda.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wide mb-5">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link}>
                  <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 gap-4">
          <p className="text-sm text-gray-500">
            © 2025 MercaPlaza. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>Métodos de pago:</span>
            <div className="flex gap-2 text-2xl">💳🏦📱</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
