'use client'

import { useRef, useEffect } from "react"
import { useAppContext } from "@/app/context/AppContext"
import Link from "next/link"

const CarouselSingles = () => {
  const { products, favorites, toggleFavorite } = useAppContext()
  const singles = products.filter(p => p.poster_path || p.backdrop_path)
  const carouselRef = useRef(null)

  // movimiento continuo
  useEffect(() => {
    if (singles.length === 0 || !carouselRef.current) return

    let scrollAmount = 0
    const container = carouselRef.current
    const speed = 0.5 //velocidad

    const step = () => {
      scrollAmount += speed
      if (scrollAmount >= container.scrollWidth / 2) {
        scrollAmount = 0
      }
      container.style.transform = `translateX(-${scrollAmount}px)`
      requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [singles])

  if (singles.length === 0)
    return <div className="h-[300px] flex items-center justify-center">Cargando...</div>

  const loopSingles = [...singles, ...singles]

  return (
    <div className="relative w-screen overflow-hidden py-5">
      <div ref={carouselRef} className="flex gap-6 transition-none">
        {loopSingles.map((single, index) => {
          const isFav = favorites.some(fav => fav.id === single.id)
          const imageUrl = single.backdrop_path
            ? `https://image.tmdb.org/t/p/original${single.backdrop_path}`
            : `https://image.tmdb.org/t/p/original${single.poster_path}`

          return (
            <Link
              key={`${single.id}-${index}`}
              href={`/product/${single.id}`}
              className="relative min-w-[200px] flex-shrink-0 cursor-pointer overflow-visible rounded-lg block"
            >
              <div className="relative overflow-hidden transition-transform duration-300 hover:scale-105 rounded-lg">
                <img
                  src={imageUrl}
                  alt={single.title || single.name}
                  className="w-full h-[280px] md:h-[320px] object-cover rounded-lg"
                />
                <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-black/70 to-transparent rounded-t-lg pointer-events-none" />

                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent rounded-b-lg p-3">
                  <h3 className="text-white text-base md:text-lg font-semibold line-clamp-2">
                    {single.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault() // evita navegar al click
                  toggleFavorite(single)
                }}
                className={`absolute bottom-3 right-3 cursor-pointer text-3xl transition-transform duration-300 hover:scale-125 hover:text-white active:scale-110 ${
                  isFav ? "text-red-500" : "text-gray-300"
                }`}
              >
                {isFav ? "♥" : "♡"}
              </button>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default CarouselSingles
