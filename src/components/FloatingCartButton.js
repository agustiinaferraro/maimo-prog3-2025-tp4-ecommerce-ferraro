'use client'

import { useAppContext } from '@/app/context/AppContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const FloatingCartButton = () => {
  const { cart } = useAppContext()
  const pathname = usePathname()

  if (cart.length === 0 || pathname === '/cart') return null

  const total = cart.reduce((acc, item) => {
    const price = Number(item.price || item.variant?.price || item.variants?.[0]?.price || 0)
    return acc + price * (item.quantity || 0)
  }, 0)

  return (
    <Link href="/cart">
      <button
        className="fixed bottom-5 right-5 z-[9999] bg-white text-black font-bold px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 hover:bg-gray-300 cursor-pointer transition-transform duration-150 hover:scale-105"
      >
        {/*icono carrito*/}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="black"
          viewBox="0 0 24 24"
          stroke="black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h14l-1.35 6.65a1 1 0 01-.98.85H7.33a1 1 0 01-.98-.85L5 6H3"
          />
        </svg>
        Ver Carrito{' '}
        <span className="italic text-green-700">
          {total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
        </span>
      </button>
    </Link>
  )
}

export default FloatingCartButton