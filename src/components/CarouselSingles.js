'use client'

import { useAppContext } from "@/app/context/AppContext"
import Link from "next/link"
import Loading from "./Loading"

const CarouselSingles = () => {
  const { products, favorites, toggleFavorite } = useAppContext()
  const singles = products.filter(p => p.backdrop_path || p.poster_path)

  if (singles.length === 0)
    return <Loading />

  const loopSingles = [...singles, ...singles]

  return (
    <div className="relative w-full overflow-hidden py-5">
      <div className="flex gap-6 whitespace-nowrap animate-carousel">
        {loopSingles.map((single, index) => {
          const isFav = favorites.some(fav => fav.id === single.id)
          const imageUrl = single.backdrop_path
            ? `https://image.tmdb.org/t/p/original${single.backdrop_path}`
            : `https://image.tmdb.org/t/p/original${single.poster_path}`

          return (
            <Link
              key={`${single.id}-${index}`}
              href={`/product/${single.id}`}
              className="relative inline-block min-w-[500px] md:min-w-[600px] cursor-pointer overflow-visible rounded-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="relative">
                <img
                  src={imageUrl}
                  alt={single.title || single.name}
                  className="w-full h-[300px] object-cover rounded-lg"
                />

                {/* Gradiente superior e inferior */}
                <div className="absolute inset-0 rounded-lg pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-black/80 to-transparent rounded-t-lg" />
                  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/95 to-transparent rounded-b-lg p-3 flex items-end">
                    <h3 className="text-white text-lg md:text-xl font-semibold line-clamp-2">
                      {single.title || single.name}
                    </h3>
                  </div>
                </div>

                {/* Corazón */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleFavorite(single)
                  }}
                  className={`absolute bottom-2 right-2 text-3xl transition-all duration-300 hover:scale-125 ${
                    isFav ? "text-red-500" : "text-gray-300"
                  }`}
                >
                  {isFav ? "♥" : "♡"}
                </button>
              </div>
            </Link>
          )
        })}
      </div>

      <style jsx>{`
        @keyframes carousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-carousel {
          display: inline-flex;
          animation: carousel 120s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default CarouselSingles