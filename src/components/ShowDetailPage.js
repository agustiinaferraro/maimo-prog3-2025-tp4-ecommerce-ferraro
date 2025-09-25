'use client'

import { useAppContext } from "@/app/context/AppContext"
import { useState } from "react"
import Image from "next/image"

const sectors = [
  { name: "Campo", priceModifier: 1 },
  { name: "Platea", priceModifier: 1.2 },
  { name: "VIP", priceModifier: 1.5 }
]

const ShowDetailPage = ({ show }) => {
  const { toggleCart, cart } = useAppContext()
  const cartItem = cart.find(item => item.id === show.id)
  const [selectedSector, setSelectedSector] = useState(sectors[0])
  const [quantity, setQuantity] = useState(cartItem?.quantity || 1)

  const basePrice = show.price || 50
  const totalPrice = ((basePrice * selectedSector.priceModifier) * quantity).toFixed(2)

  const handleAddToCart = () => {
    toggleCart({ 
      ...show, 
      quantity, 
      sector: selectedSector.name,
      price: basePrice * selectedSector.priceModifier
    })
  }

  return (
    <div className="px-5 md:px-20 py-10 text-white flex flex-col gap-6">
      {/* Banner */}
      <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden">
        <Image src={show.image || ""} alt={show.city} fill className="object-cover" />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">{show.city}</h1>
        <p className="text-gray-300">{show.venue}</p>
        <p className="text-gray-300">{new Date(show.date).toLocaleDateString("es-AR", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        })}</p>
      </div>

      {/* Selector de sector */}
      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold">Sector:</label>
        <select 
          value={selectedSector.name} 
          onChange={e => setSelectedSector(sectors.find(s => s.name === e.target.value))}
          className="text-white bg-transparent border border-gray-500 rounded px-2 py-1"
        >
          {sectors.map(sec => <option key={sec.name} value={sec.name}>{sec.name}</option>)}
        </select>
      </div>

      {/* Cantidad y precio */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-black/60 rounded px-2 py-1">
          <button onClick={() => setQuantity(q => Math.max(1, q-1))} className="text-white font-bold">-</button>
          <span className="text-white font-semibold">{quantity}</span>
          <button onClick={() => setQuantity(q => q+1)} className="text-white font-bold">+</button>
        </div>
        <p className="text-white font-semibold text-lg">Total: ${totalPrice}</p>
      </div>

      {/* Botón agregar al carrito */}
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
