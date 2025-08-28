'use client'

import Link from "next/link"
import { useAppContext } from "@/app/context/AppContext"

const ProductCard = ({ product }) => {
  const { favorites, toggleFavorite } = useAppContext()
  const isFavorite = favorites.some(fav => fav.id === product.id)

  return (
    <div className="bg-[#111] text-white rounded-lg overflow-hidden shadow hover:shadow-lg transition relative">
      <img 
        src={`https://image.tmdb.org/t/p/original/${product.poster_path}`}
        alt={product.title} 
        className="w-full h-64 object-cover"
      />

      {/* Corazón en la esquina inferior derecha */}
      <button
        className={`absolute bottom-2 right-2 text-3xl ${isFavorite ? "text-red-500" : "text-gray-300"}`}
        onClick={() => toggleFavorite(product)}
      >
        {isFavorite ? "♥" : "♡"}
      </button>

      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
        <p className="text-gray-300 mb-4">{product.description}</p>
        <Link href={`/product/${product.id}`}>
          <button className="px-4 py-2 bg-white text-black font-semibold rounded hover:bg-gray-200 transition">
            Ver disco
          </button>
        </Link>
      </div>
    </div>
  )
}

export default ProductCard