'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Search, ShoppingCart, Menu, X, User, LogOut } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { totalItems } = useCart()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/')
    router.refresh()
  }

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-50">
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
          <span className="text-indigo-500 text-3xl">◆</span>
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            MercaPlaza
          </span>
        </Link>

        {/* Search - Desktop */}
        <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
          <input
            type="text"
            placeholder="Buscar propiedades, vehículos, artículos..."
            className="w-full py-3 px-4 pr-12 bg-gray-50 border-2 border-gray-200 rounded-full text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-indigo-500">
            <Search size={20} />
          </button>
        </div>

        {/* Actions - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/carrito" className="relative p-2 text-gray-600 hover:text-indigo-500">
            <ShoppingCart size={22} />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-semibold w-5 h-5 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          </Link>

          {loading ? (
            <div className="w-24 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
          ) : user ? (
            <div className="flex items-center gap-3">
              {user.email === 'segovia.katherine@gmail.com' && (
                <Link
                  href="/admin"
                  className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium"
                >
                  Admin
                </Link>
              )}
              <Link
                href="/perfil"
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <User size={18} />
                <span className="font-medium text-sm">
                  {user.user_metadata?.name || user.email?.split('@')[0]}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 border-2 border-gray-200 rounded-lg font-medium hover:border-indigo-500 hover:text-indigo-500 transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/registro"
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden p-4 border-t bg-white">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full py-3 px-4 pr-12 bg-gray-50 border-2 border-gray-200 rounded-full text-sm"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>

          {loading ? (
            <div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>
          ) : user ? (
            <div className="flex flex-col gap-2">
              {user.email === 'segovia.katherine@gmail.com' && (
                <Link
                  href="/admin"
                  className="w-full py-3 bg-indigo-100 text-indigo-700 rounded-lg font-medium text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Panel Admin
                </Link>
              )}
              <Link
                href="/perfil"
                className="w-full py-3 bg-gray-100 rounded-lg font-medium text-center flex items-center justify-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={18} />
                {user.user_metadata?.name || user.email?.split('@')[0]}
              </Link>
              <button
                onClick={() => {
                  handleLogout()
                  setIsMenuOpen(false)
                }}
                className="w-full py-3 border-2 border-red-200 text-red-500 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <LogOut size={18} />
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                className="w-full py-3 border-2 border-gray-200 rounded-lg font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/registro"
                className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  )
}