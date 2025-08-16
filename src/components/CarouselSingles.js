'use client'

import { useState, useEffect } from "react"
import { useAppContext } from "@/app/context/AppContext"
import Link from "next/link"

const CarouselSingles = () => {
  const { products, favorites, toggleFavorite } = useAppContext() // agreg favs
  const singles = products.filter(p => p.type === "single") // solo los singles
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % singles.length) // cambia al siguiente single
    }, 5000) // 5 segs
    return () => clearInterval(interval)
  }, [singles])

  if (!singles || singles.length === 0) return null

  const currentSingle = singles[currentIndex]
  const isFav = favorites.includes(currentSingle.id) // chequea si esta en favs

  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden my-10">
      <img
        key={currentSingle.id}
        src={currentSingle.image}
        alt={currentSingle.name}
        className="w-full h-full object-cover rounded"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-start px-5 md:px-10">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">{currentSingle.name}</h2>
        <div className="flex gap-2">
          <Link href={`/product/${currentSingle.id}`}>
            <button className="px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition">
              Ver single
            </button>
          </Link>
          <button
            onClick={() => toggleFavorite(currentSingle.id)}
            className={`px-3 py-1 rounded ${isFav ? "bg-red-500" : "bg-gray-500"} text-white`}
          >
            {isFav ? "★" : "☆"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CarouselSingles