'use client'

import { useState, useEffect, useRef } from "react"
import { useAppContext } from "@/app/context/AppContext"
import Link from "next/link"

const CarouselSingles = () => {
  const { products, favorites, toggleFavorite } = useAppContext()
  const singles = products.filter(p => p.poster_path || p.backdrop_path)
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)

  // Gira automáticamente cada 3 segundos
  useEffect(() => {
    if (singles.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % singles.length) // infinito gracias al %
    }, 3000)
    return () => clearInterval(interval)
  }, [singles])

  // Scroll suave con transform
  useEffect(() => {
    if (!carouselRef.current) return
    const container = carouselRef.current
    const itemWidth = container.firstChild.offsetWidth + 16 // ancho + gap
    container.style.transform = `translateX(-${currentIndex * itemWidth}px)`
  }, [currentIndex])

  if (singles.length === 0)
    return <div className="h-[300px] flex items-center justify-center">Cargando...</div>

  return (
    <div className="relative w-full overflow-hidden py-5">
      <div
        ref={carouselRef}
        className="flex gap-4 transition-transform duration-700"
      >
        {singles.map(single => {
          const isFav = favorites.some(fav => fav.id === single.id)
          const imageUrl = single.poster_path
            ? `https://image.tmdb.org/t/p/original${single.poster_path}`
            : `https://image.tmdb.org/t/p/original${single.backdrop_path}`

          return (
            <div
              key={single.id}
              className="relative min-w-[200px] flex-shrink-0 cursor-pointer"
            >
              <div className="overflow-visible rounded-lg">
                <div className="relative overflow-visible transition-transform duration-300 hover:scale-105 rounded-lg">
                  <img
                    src={imageUrl}
                    alt={single.title || single.name}
                    className="w-full h-[280px] md:h-[320px] object-cover rounded-lg"
                  />

                  {/* Gradiente arriba y abajo */}
                  <div className="absolute inset-0 rounded-lg pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-black/70 to-transparent rounded-t-lg" />
                    <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg" />
                  </div>
                </div>
              </div>

              {/* Botón Ver */}
              <div className="absolute bottom-2 left-2 flex gap-2">
                <Link href={`/product/${single.id}`}>
                  <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200 active:bg-gray-300 transition cursor-pointer text-sm">
                    Ver Disco
                  </button>
                </Link>
              </div>

              {/* Corazón */}
              <button
                onClick={() => toggleFavorite(single)}
                className={`cursor-pointer absolute bottom-2 right-2 text-3xl transition-colors duration-200 hover:text-white active:scale-110 ${isFav ? "text-red-500" : "text-gray-300"}`}
              >
                {isFav ? "♥" : "♡"}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CarouselSingles