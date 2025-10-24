'use client'

import Link from "next/link"
import Image from "next/image"
import { useAppContext } from "@/app/context/AppContext"

const TourFavoriteCard = ({ tour }) => {
  const { favorites, toggleFavorite } = useAppContext()
  const isFav = favorites.some(fav => fav.id === tour.id)

  return (
    <div className="relative rounded-lg overflow-hidden h-96 w-full sm:w-[300px] md:w-80 transition-transform duration-300 hover:scale-105 flex-none shadow-lg border border-neutral-700 m-2">
      
      {/*img */}
      <div className="relative w-full h-full">
        <Image
          loader={({ src }) => src}
          src={tour.poster_path}
          alt={tour.title}
          fill
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
      </div>

      <div className="absolute bottom-16 left-4 right-4 flex flex-col gap-2 mb-2">
        <h3 className="text-xl font-semibold text-white">{tour.title}</h3>
        <p className="text-gray-300">{tour.overview}</p>
        <p className="text-gray-200 font-medium">
          {tour.variants?.[0]?.price ? `$${tour.variants[0].price.toLocaleString('es-AR')}` : "$0"} {/*tour.variante price etc 
                                                                            muestra el precio del primer variante 
                                                                            o `$0` si no existe, con formato argentino 
                                                                            (aunue ya esta desed el back)
                                                                              */}
        </p>
      </div>

      {/*boton favs */}
      <button
        onClick={() => toggleFavorite(tour)}
        className={`absolute top-4 right-4 cursor-pointer text-2xl transition-transform duration-300 hover:scale-125 ${isFav ? "text-red-500" : "text-gray-300"}`}
      >
        {isFav ? "♥" : "♡"}
      </button>

      {/*boton comprar entradas */}
      <Link
        href={`/entradas/${tour.id}`} 
        className="absolute bottom-4 left-4 cursor-pointer text-white border border-white px-5 py-2 rounded hover:bg-white hover:text-black transition"
      >
        Comprar Entradas
      </Link>
    </div>
  )
}

export default TourFavoriteCard
