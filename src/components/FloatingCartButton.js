'use client'

import { useAppContext } from '@/app/context/AppContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const FloatingCartButton = () => {
  const { cart } = useAppContext()
  const pathname = usePathname() // obtiene la ruta actual

  // no lo muestra si el carrito esta vacío o estoy en /cart
  if (cart.length === 0 || pathname === '/cart') return null

  return (
    <Link href="/cart">
      <button className="fixed bottom-5 right-5 bg-white text-black font-bold px-4 py-2 rounded-lg shadow-lg hover:bg-gray-200">
        Ver Carrito ({cart.reduce((acc, item) => acc + item.quantity, 0)})
      </button>
    </Link>
  )
}

export default FloatingCartButton
