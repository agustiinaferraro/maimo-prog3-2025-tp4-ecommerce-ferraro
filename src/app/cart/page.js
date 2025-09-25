'use client'

import { useAppContext } from "@/app/context/AppContext"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { cart, incrementCartItem, decrementCartItem, removeFromCart } = useAppContext()

  //calculo total
  const total = cart.reduce((acc, item) => {
    const price = item.price !== undefined ? item.price : (item.id % 20) + 10
    return acc + price * item.quantity
  }, 0)

  if (cart.length === 0) {
    return (
      <div className="px-5 md:px-20 py-10 text-center text-white relative">
        {/* Botón volver */}
        <div className="absolute top-5 left-5">
          <Link href="/">
            <span className="text-7xl text-white py-6 hover:text-green-500 active:text-green-600 cursor-pointer">
              ‹
            </span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6 mt-20">Tu carrito está vacío</h1>
      </div>
    )
  }

  return (
    <div className="px-5 md:px-20 py-10 text-white relative">
      {/*boton volver */}
      <div className="absolute top-5 left-5 z-20">
        <Link href="/">
          <span className="text-7xl text-white py-6 hover:text-green-500 active:text-green-600 cursor-pointer">
            ‹
          </span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-10">Mi Carrito</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* productos */}
        <div className="md:col-span-8 flex flex-col gap-6">
          {cart.map(item => {
            const price = item.price !== undefined ? item.price : (item.id % 20) + 10
            return (
              <div key={item.id} className="flex gap-4 items-center bg-neutral-900/80 p-4 rounded-lg">
                {/* imagen */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden">
                  <Image 
                    src={item.poster_path ? `https://image.tmdb.org/t/p/original${item.poster_path}` : ""}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* info */}
                <div className="flex-1 flex flex-col justify-between h-full">
                  <h2 className="text-lg md:text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-300">Precio: ${price}</p>

                  {/* cantidad */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => decrementCartItem(item.id)}
                      className="bg-gray-700 px-2 py-1 rounded"
                    >-</button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => incrementCartItem(item.id)}
                      className="bg-gray-700 px-2 py-1 rounded"
                    >+</button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:text-red-600"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* resumen */}
        <div className="md:col-span-4 bg-neutral-900/80 p-6 rounded-lg flex flex-col gap-6">
          <h2 className="text-xl font-bold">Resumen</h2>
          <p className="text-gray-300">Productos: {cart.length}</p>
          <p className="text-gray-200 text-2xl font-semibold">Total: ${total}</p>
          <button className="bg-green-500 text-black font-bold py-3 rounded-lg hover:bg-green-600 transition">
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  )
}
