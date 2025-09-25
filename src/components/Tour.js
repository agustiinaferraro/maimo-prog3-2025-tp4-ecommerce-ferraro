'use client'

import { useAppContext } from "@/app/context/AppContext"
import Image from "next/image"
import Link from "next/link"
import Loading from "./Loading"
import { tourDates } from "@/data/tourDates" // archivo de datos estático, reemplazable por backend

const Tour = ({ horizontal = false }) => {
  const { favorites, toggleFavorite } = useAppContext()

  if (!tourDates.length) return <Loading />

  return (
    <div className="relative pt-20 pb-6 px-10">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl pointer-events-none" />
      <div className="relative z-10">
        <h2 className="px-10 text-3xl font-bold mb-10 text-left">
          Fechas del Tour - The Driver Era
        </h2>

        <div className={`px-10 py-12 gap-8 ${
          horizontal
            ? "flex overflow-x-auto space-x-6 scrollbar-hide"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}>
          {tourDates.map(show => {
            const isFav = favorites.some(fav => fav.id === show.id)

            return (
              <div key={show.id} className="relative bg-neutral-900/80 border border-neutral-700 shadow-md rounded-lg overflow-hidden flex flex-col h-96 w-full sm:w-[300px] md:w-80 transition-transform duration-300 hover:scale-105 flex-none">
                <div className="h-40 w-full relative">
                  <Image src={show.image} alt={show.city} fill style={{ objectFit: "cover" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col justify-between p-4 flex-1">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{show.city}</h3>
                    <p className="text-gray-400 mb-1">{show.venue}</p>
                    <p className="text-gray-200 font-medium mb-2">
                      {new Date(show.date).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                      })}
                    </p>
                    <p className="text-gray-300 font-light mb-2">Precio base: ${show.price}</p>
                  </div>

                  {/* Botones en columna */}
                  <div className="mt-2 flex flex-col items-start gap-2">
                    <button
                      onClick={() => toggleFavorite(show)}
                      className={`text-2xl transition-transform duration-300 hover:scale-125 ${isFav ? "text-red-500" : "text-gray-300"}`}
                    >
                      {isFav ? "♥" : "♡"}
                    </button>

                    <Link
                      href={`/entradas/${show.id}`}
                      className="text-white border border-white px-3 py-1 rounded text-center hover:bg-white hover:text-black transition w-full"
                    >
                      Comprar Entradas
                    </Link>
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Tour
