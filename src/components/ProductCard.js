'use client'

import Link from "next/link"
import { useAppContext } from "@/app/context/AppContext"

const ProductCard = ({ product }) => {
  const { favorites, toggleFavorite, cart, toggleCart } = useAppContext()
  const isFavorite = favorites.some(fav => fav.id === product.id)
  const isInCart = cart.some(item => item.id === product.id)
  const imageUrl = product.poster_path
    ? `https://image.tmdb.org/t/p/original${product.poster_path}`
    : `https://image.tmdb.org/t/p/original${product.backdrop_path}`

  return (
    <Link //link al deralle de la card
      href={`/product/${product.id}`}
      className="relative flex-shrink-0 cursor-pointer overflow-hidden rounded-lg block transition-transform duration-300 hover:scale-105"
    >
      <div className="relative overflow-hidden rounded-lg">
        {/*img vertical */}
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-[400px] object-cover rounded-lg"
        />

        <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-black/50 to-transparent rounded-t-lg pointer-events-none" />

        <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black/95 to-transparent rounded-b-lg p-3 flex items-end">
          <h3 className="text-white text-base md:text-lg font-semibold line-clamp-2">
            {/*product.title*/}
          </h3>
        </div>
      </div>

<button
  onClick={(e) => {
    e.preventDefault() //evita que navegue
    toggleCart(product) // agrega o saca del carrito
  }}
  className={`absolute bottom-3 left-3 cursor-pointer text-3xl transition-transform duration-300 hover:scale-125 active:scale-110 ${
    isInCart ? "text-green-500" : "text-gray-300"
  }`}
>
  {/* carrito */}
  <svg xmlns="http://www.w3.org/2000/svg" fill={isInCart ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7H19m-12 0a1 1 0 100 2 1 1 0 000-2zm10 0a1 1 0 100 2 1 1 0 000-2z" />
  </svg>
</button>


      <button
        onClick={(e) => {
          e.preventDefault() //evita que navegue
          toggleFavorite(product) //pone o saca de fav
        }}
        className={`absolute bottom-3 right-3 cursor-pointer text-3xl transition-transform duration-300 hover:scale-125 hover:text-white active:scale-110 ${
          isFavorite ? "text-red-500" : "text-gray-300"
        }`}
      >
        {isFavorite ? "♥" : "♡"}
      </button>
    </Link>
  )
}

export default ProductCard