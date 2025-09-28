'use client'

import { useAppContext } from "@/app/context/AppContext"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const { cart, incrementCartItem, decrementCartItem, removeFromCart } = useAppContext()

  //calculo total (precio x cant)
  const total = cart.reduce((acc, item) => {
    const variantPrice =
      item.price || // soporte para shows
      item.variant?.price ||
      item.variants?.[0]?.price?.$numberInt ||
      item.variants?.[0]?.price ||
      0

    const price = Number(variantPrice)
    return acc + price * (item.quantity || 0)
  }, 0)

  //cantidad total de productos (sumando quantity)
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 0), 0)

  if (cart.length === 0) {
    return (
      <div className="px-5 md:px-20 py-10 text-center text-white relative min-w-[300px]">
        {/*boton volver */}
        <div className="absolute top-5 left-5">
          <Link href="/">
            <span className="text-7xl text-white py-6 hover:text-green-500 active:text-green-600 cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-95">
              ‹
            </span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-6 mt-20">Tu carrito está vacío</h1>
      </div>
    )
  }

  return (
    <div className="px-5 md:px-20 py-10 text-white relative min-w-[300px]">
      {/* boton volver */}
      <div className="absolute top-5 left-5 z-20">
        <Link href="/">
          <span className="text-7xl text-white py-6 hover:text-green-500 active:text-green-600 cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-95">
            ‹
          </span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-10">Mi Carrito</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* productos */}
        <div className="md:col-span-8 flex flex-col gap-6">
          {cart.map((item, index) => {
            const variantPrice =
              item.price ||
              item.variant?.price ||
              item.variants?.[0]?.price?.$numberInt ||
              item.variants?.[0]?.price ||
              0

            const price = Number(variantPrice)
            const imageUrl =
              item.poster_path ||
              item.backdrop_path ||
              item.variant?.image ||
              item.image ||
              "/placeholder.png"

            return (
              <div
                key={`${item.id || item._id}-${index}`}
                className="flex gap-4 items-center bg-neutral-900/80 p-4 rounded-lg"
              >
                {/*img*/}
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    loader={({ src }) =>
                      item.image ? `http://localhost:4000${item.image}` : src
                    }
                    src={imageUrl}
                    alt={item.title || item.city || "Producto"}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/*info*/}
                <div className="flex-1 flex flex-col justify-between h-full">
                  <h2 className="text-lg md:text-xl font-semibold">
                    {item.title || item.city || "Sin nombre"}
                  </h2>
                  <p className="text-gray-300">
                    Precio: ${price}
                  </p>

                  {/* cantidad */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => decrementCartItem(item.id || item._id)}
                      className="bg-gray-700 px-3 py-2 rounded cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-95"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => incrementCartItem(item.id || item._id)}
                      className="bg-gray-700 px-3 py-2 rounded cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-95"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id || item._id)}
                      className="ml-4 text-red-500 cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-95 hover:text-red-600 active:text-red-700"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/*resumen compra*/}
        <div className="md:col-span-4 bg-neutral-900/80 p-6 rounded-lg flex flex-col gap-6 min-w-[250px]">
          <h2 className="text-xl font-bold">Resumen</h2>
          <p className="text-gray-300">Productos: {totalItems}</p>
          <p className="text-gray-200 text-2xl font-semibold">Total: ${total}</p>
          <button className="bg-green-500 text-black font-bold py-3 rounded-lg cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-95 hover:bg-green-600 active:bg-green-700">
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  )
}