'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Check } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export interface Product {
  id: string
  title: string
  price: string
  location: string
  category: string
  badge?: string | null
  color: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Destacado':
        return 'bg-indigo-500'
      case 'Nuevo':
        return 'bg-emerald-500'
      default:
        return 'bg-red-500'
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    
    const priceMatch = product.price.match(/([A-Z]+)\s*([\d,]+)/)
    const currency = priceMatch ? priceMatch[1] : 'USD'
    const numericPrice = priceMatch ? parseInt(priceMatch[2].replace(/,/g, '')) : 0

    addToCart({
      id: product.id,
      title: product.title,
      price: numericPrice,
      currency: currency,
      location: product.location,
      category: product.category,
      color: product.color,
    })

    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <article className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <Link href={`/producto/${product.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className={`w-full h-full bg-gradient-to-br ${product.color}`} />
          
          {product.badge && (
            <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white ${getBadgeColor(product.badge)}`}>
              {product.badge}
            </span>
          )}
          
          <button
            onClick={(e) => {
              e.preventDefault()
              setLiked(!liked)
            }}
            className={`absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110 ${
              liked ? 'text-red-500' : 'text-gray-400'
            }`}
          >
            <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </Link>
      
      <div className="p-5">
        <span className="text-xs font-medium text-indigo-500 uppercase tracking-wide">
          {product.category}
        </span>
        <Link href={`/producto/${product.id}`}>
          <h3 className="font-semibold mt-1 mb-2 hover:text-indigo-500 transition-colors">{product.title}</h3>
        </Link>
        <p className="text-sm text-gray-500 mb-4">📍 {product.location}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">{product.price}</span>
          <button
            onClick={handleAddToCart}
            className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
              added 
                ? 'bg-emerald-500 text-white' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg'
            }`}
          >
            {added ? (
              <>
                <Check size={14} />
                Agregado
              </>
            ) : (
              <>
                <ShoppingCart size={14} />
                Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}