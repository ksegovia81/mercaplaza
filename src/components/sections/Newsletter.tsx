'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 p-10 bg-white rounded-3xl shadow-lg">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold mb-2">¿No quieres perderte nada?</h2>
            <p className="text-gray-600">
              Suscríbete y recibe las mejores ofertas directamente en tu correo
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full sm:w-[300px] py-3 px-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-lg hover:shadow-lg transition-all"
            >
              {submitted ? '¡Suscrito! 🎉' : 'Suscribirme'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
