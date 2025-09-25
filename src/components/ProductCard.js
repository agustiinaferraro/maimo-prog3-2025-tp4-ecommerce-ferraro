'use client'

import Link from "next/link"
import { useAppContext } from "@/app/context/AppContext"

const ProductCard = ({ product }) => {
  const { favorites, toggleFavorite, cart, incrementCartItem, decrementCartItem, toggleCart } = useAppContext()
  const isFavorite = favorites.some(fav => fav.id === product.id)
  const cartItem = cart.find(item => item.id === product.id) //verifica si el producto está en el carrito
  const imageUrl = product.poster_path
    ? `https://image.tmdb.org/t/p/original${product.poster_path}`
    : `https://image.tmdb.org/t/p/original${product.backdrop_path}`

  // precio ficticio si no existe
  const price = product.price || `$${(product.id % 20) + 10}.00`

  return (
    <Link //link al detalle de la card
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

        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/95 to-transparent rounded-b-lg p-3 flex flex-col justify-end">
          <div className="mb-8"> {/* subo titulo+precio para que no se pisen con los iconos */}
            <h3 className="text-white text-base md:text-lg font-semibold line-clamp-2">
              {product.title}
            </h3>
            <p className="text-gray-300 text-sm md:text-base font-light">{price}</p>
          </div>
        </div>
      </div>

      {/* botón de carrito / control de cantidad */}
      {!cartItem ? (
        // si no está en carrito, mostrar solo "+"
        <button
          onClick={(e) => { e.preventDefault(); toggleCart(product) }}
          className="absolute bottom-3 left-3 text-white text-3xl cursor-pointer bg-black/60 rounded-full w-10 h-10 flex items-center justify-center transition-transform duration-300 hover:scale-125"
        >+</button>
      ) : (
        // si está en carrito, mostrar "- cantidad +"
        <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 rounded px-2 py-1">
          <button
            onClick={(e) => { e.preventDefault(); decrementCartItem(product.id) }}
            className="text-white font-bold px-2"
          >-</button>
          <span className="text-white font-semibold">{cartItem.quantity}</span>
          <button
            onClick={(e) => { e.preventDefault(); incrementCartItem(product.id) }}
            className="text-white font-bold px-2"
          >+</button>
        </div>
      )}

      {/* favorito */}
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
