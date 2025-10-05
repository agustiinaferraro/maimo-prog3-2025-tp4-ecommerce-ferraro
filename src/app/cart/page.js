'use client';

import { useState } from "react"
import { useAppContext } from "@/app/context/AppContext"
import Image from "next/image"
import Link from "next/link"

export default function CheckoutPage() {
  const { cart, incrementCartItem, decrementCartItem, removeFromCart, clearCart } = useAppContext()
  const [userEmail, setUserEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("") // para mostrar modal de error

  // calculo total
  const total = cart.reduce((acc, item) => {
    const variantPrice =
      item.price || 
      item.variant?.price ||
      item.variants?.[0]?.price?.$numberInt ||
      item.variants?.[0]?.price ||
      0

    const price = Number(variantPrice)
    return acc + price * (item.quantity || 0)
  }, 0)

  // valido email
  const validateEmail = (email) => email.includes("@")

  // manejar checkout
  const handleCheckout = async () => {
    if (!validateEmail(userEmail)) {
      setError("por favor ingresa un email válido")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("http://localhost:4000/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart, userEmail }),
      })

      if (res.ok) {
        setSuccess(true)
      } else {
        setError("error al enviar pedido")
      }
    } catch (err) {
      setError("error al enviar pedido")
    } finally {
      setLoading(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="px-5 md:px-20 py-10 text-center text-white relative min-w-[300px]">
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

      <h1 className="text-3xl font-bold mb-10">Mi carrito</h1>

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
                {/*img */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    loader={({ src }) =>
                      item.image ? `http://localhost:4000${item.image}` : src
                    }
                    src={imageUrl}
                    alt={item.title || item.city || "producto"}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>

                {/* info producto */}
                <div className="flex-1 flex flex-col justify-between h-full">
                  <h2 className="text-lg md:text-xl font-semibold">
                    {item.title || item.city || "sin nombre"}
                  </h2>
                  <p className="text-gray-300">Precio unitario: ${price}</p>
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

        {/* resumen compra */}
        <div className="md:col-span-4 bg-neutral-900/80 p-6 rounded-lg flex flex-col gap-6 min-w-[250px]">
          <h2 className="text-xl font-bold">Resumen de mi pedido</h2>

          {/* input email */}
          <input
            type="email"
            placeholder="tu email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="p-2 rounded text-black w-full bg-white"
            required
          />

          {/* ticket resumen */}
          <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
            {cart.map((item, index) => {
              const variantPrice =
                item.price ||
                item.variant?.price ||
                item.variants?.[0]?.price?.$numberInt ||
                item.variants?.[0]?.price ||
                0
              const price = Number(variantPrice)
              const subtotal = price * (item.quantity || 0)

              return (
                <div
                  key={`${item.id || item._id}-summary-${index}`}
                  className="flex justify-between text-gray-300"
                >
                  <span>{item.title || item.city} ({item.quantity})</span>
                  <span>${subtotal}</span>
                </div>
              )
            })}
          </div>

          {/* total */}
          <p className="text-gray-200 text-2xl font-semibold mt-4">
            Total: <span className="italic text-green-500">${total}</span>
          </p>

          {/* boton finalizar */}
          <button
            onClick={handleCheckout}
            disabled={loading || !validateEmail(userEmail)}
            className="bg-green-500 text-black font-bold py-3 rounded-lg cursor-pointer transition-transform duration-150 hover:scale-105 active:scale-95 hover:bg-green-600 active:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "enviando..." : "finalizar compra"}
          </button>
        </div>
      </div>

      {/* modal exito*/}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white text-black p-6 rounded-lg flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold">¡Compra exitosa!</h2>
            <p>Tu pedido fue enviado correctamente</p>
            <button
              onClick={() => { setSuccess(false); clearCart(); setUserEmail("") }}
              className="bg-green-500 text-black font-bold px-6 py-4 rounded hover:bg-green-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* modal error */}
      {error && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-white text-black p-6 rounded-lg flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold">Error</h2>
            <p>{error}</p>
            <button
              onClick={() => setError("")}
              className="bg-red-500 text-black font-bold px-6 py-4 rounded hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}