'use client'

import { useAppContext } from "@/app/context/AppContext"
import { useState } from "react"
import Image from "next/image"

const ShowDetailPage = ({ show }) => {
  const { toggleCart, cart } = useAppContext()
  const cartItem = cart.find(item => item.id === show.id)

  const [selectedSector, setSelectedSector] = useState(
    show.sectors ? show.sectors[0] : { name: "Campo", priceModifier: 1 }
  )
  const [quantity, setQuantity] = useState(cartItem?.quantity || 1)

  const basePrice = show.price || 50
  const totalPrice = ((basePrice * selectedSector.priceModifier) * quantity).toFixed(2)

  const handleAddToCart = () => {
    toggleCart({
      id: show.id,
      city: show.city,
      venue: show.venue,
      date: show.date,
      image: show.image,
      quantity,
      sector: selectedSector.name,
      price: basePrice * selectedSector.priceModifier
    })
  }

  return (
    <div className="px-5 md:px-20 py-10 text-white flex flex-col gap-6">
      {/*banner */}
      <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden">
        {show.image ? (
          <>
            {/*fondo difuminado*/}
            <div
              className="absolute inset-0 bg-cover bg-center blur-sm"
              style={{ backgroundImage: `url(${show.image.startsWith('/') ? show.image : `/${show.image}`})` }}
            />

            {/* img principal*/}
            <Image
              loader={({ src }) => `http://localhost:4000${src}`}
              src={show.image} 
              alt={show.city || "Imagen del concierto"}
              fill
              style={{ objectFit: "cover" }}
              className="relative w-full h-full rounded-lg"
            />

          </>
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
            Imagen no disponible
          </div>
        )}
      </div>

      {/*info */}
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">{show.city || "Sin ciudad"}</h1>
        <p className="text-gray-300">{show.venue || "Sin venue"}</p>
        <p className="text-gray-300">
          {show.date
            ? new Date(show.date).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "long",
                year: "numeric"
              })
            : "Fecha no disponible"}
        </p>
      </div>

      {/*selector de sector */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold">Sector:</label>
        <select
          value={selectedSector.name}
          onChange={e =>
            setSelectedSector(show.sectors.find(s => s.name === e.target.value))
          }
          className="text-white bg-transparent border border-gray-500 rounded px-2 py-1"
        >
          {show.sectors?.map(sec => (
            <option key={sec._id} value={sec.name}>
              {sec.name}
            </option>
          ))}
        </select>
      </div>

      {/*cantidad y precio */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-black/60 rounded px-2 py-1">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="text-white font-bold"
          >
            -
          </button>
          <span className="text-white font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="text-white font-bold"
          >
            +
          </button>
        </div>
        <p className="text-white font-semibold text-lg">Total: ${totalPrice}</p>
      </div>

      {/* boton agregar al carrito*/}
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-green-500 text-black font-bold py-3 rounded-lg hover:bg-green-600 transition"
      >
        Agregar al carrito
      </button>
    </div>
  )
}

export default ShowDetailPage
