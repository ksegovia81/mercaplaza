// Tipos para productos
export interface Product {
  id: string
  title: string
  description?: string
  price: number
  currency: 'PYG' | 'BRL' | 'ARS' | 'USD'
  category: Category
  location: string
  country: 'PY' | 'BR' | 'AR'
  images: string[]
  featured: boolean
  badge?: 'featured' | 'new' | 'sale'
  discount?: number
  createdAt: Date
  updatedAt: Date
}

// Categorías disponibles
export type Category =
  | 'propiedades'
  | 'vehiculos'
  | 'electronica'
  | 'hogar'
  | 'moda'
  | 'otros'

// Usuario
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  country: 'PY' | 'BR' | 'AR'
  createdAt: Date
}

// Item del carrito
export interface CartItem {
  product: Product
  quantity: number
}

// Estado del carrito
export interface CartState {
  items: CartItem[]
  total: number
}
