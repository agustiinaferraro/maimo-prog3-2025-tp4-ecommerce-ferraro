'use client'

import { useAppContext } from "@/app/context/AppContext"
import { useState, useEffect } from "react"
import Image from "next/image"

const ShowDetailPage = ({ show }) => {
  const { toggleCart, cart } = useAppContext()

  //nombre de sector por defecto
  const defaultSectorName = show.sectors?.[0]?.name || "Campo"

  const [selectedSector, setSelectedSector] = useState(
    show.sectors ? show.sectors[0] : { name: "Campo", priceModifier: 1 }
  )

  //cant por sector
  const [sectorQuantities, setSectorQuantities] = useState({})

  const basePrice = show.basePrice
  const currentQuantity = sectorQuantities[selectedSector.name] || 0
  const totalPrice = ((basePrice * selectedSector.priceModifier) * currentQuantity).toFixed(2) //redondeo a dos decimales

  //agregar al carritooo
  const handleAddToCart = () => {
    toggleCart({
      id: show.id,
      city: show.city,
      venue: show.venue,
      date: show.date,
      image: show.image,
      quantity: 1,
      sector: selectedSector.name,
      price: basePrice * selectedSector.priceModifier
    }, 1)
    setSectorQuantities(prev => ({
      ...prev,
      [selectedSector.name]: 1
    }))
  }

  // incremento
  const handleIncrement = () => {
    toggleCart({
      id: show.id,
      city: show.city,
      venue: show.venue,
      date: show.date,
      image: show.image,
      quantity: 1,
      sector: selectedSector.name,
      price: basePrice * selectedSector.priceModifier
    }, 1)
    setSectorQuantities(prev => ({
      ...prev,
      [selectedSector.name]: (prev[selectedSector.name] || 0) + 1
    }))
  }

  //decrementao
  const handleDecrement = () => {
    if (currentQuantity > 1) {
      toggleCart({
        id: show.id,
        city: show.city,
        venue: show.venue,
        date: show.date,
        image: show.image,
        quantity: 1,
        sector: selectedSector.name,
        price: basePrice * selectedSector.priceModifier
      }, -1)
      setSectorQuantities(prev => ({
        ...prev,
        [selectedSector.name]: prev[selectedSector.name] - 1
      }))
    } else if (currentQuantity === 1) {
      toggleCart({
        id: show.id,
        city: show.city,
        venue: show.venue,
        date: show.date,
        image: show.image,
        quantity: 1,
        sector: selectedSector.name,
        price: basePrice * selectedSector.priceModifier
      }, -1)
      setSectorQuantities(prev => {
        const copy = { ...prev }
        delete copy[selectedSector.name]
        return copy
      })
    }
  }

  return (
    <div className="px-5 md:px-20 py-10 text-white flex flex-col gap-6">
      {/* banner*/}
      <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden">
        {show.image ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center blur-sm"
              style={{ backgroundImage: `url(${show.image.startsWith('/') ? show.image : `/${show.image}`})` }}
            />
            <Image
              loader={({ src }) => `http://localhost:4000${src}`}
              src={show.image} 
              alt={show.city}
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

      {/* info*/}
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

      {/* selector de sector*/}
      <div className="flex flex-col gap-2">
        <label className="text-white font-semibold">Sector:</label>
        <select
          value={selectedSector.name}
          onChange={e =>
            setSelectedSector(show.sectors.find(s => s.name === e.target.value))
          }
          className="text-amber-50 w-30 bg-black cursor-pointer hover:text-white border border-gray-500 rounded px-2 py-2"
        >
          {show.sectors?.map(sec => (
            <option key={sec._id || sec.name} value={sec.name}>
              {sec.name}
            </option>
          ))}
        </select>
      </div>

      {/*total*/}
      <p className="text-white font-semibold text-lg mt-2">Precio del sector: ${(basePrice * selectedSector.priceModifier).toFixed(2)}</p>

      {/*cant y boton */}
      {currentQuantity > 0 ? (
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleDecrement}
            className="bg-red-600 text-black font-bold text-lg px-5 py-2 rounded cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
          >
            -
          </button>
          <span className="text-white font-semibold text-2xl m-3">{currentQuantity}</span>
          <button
            onClick={handleIncrement}
            className="bg-green-500 text-black font-bold text-lg px-5 py-2 rounded cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="mt-2 w-15 bg-green-500 text-black font-bold px-3 py-2 rounded cursor-pointer 
             transform transition-transform duration-200 
             hover:scale-105 active:scale-95"
        >
          +
        </button>
      )}
    </div>
  )
}

export default ShowDetailPage
