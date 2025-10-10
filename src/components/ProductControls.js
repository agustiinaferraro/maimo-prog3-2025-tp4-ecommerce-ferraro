'use client'

import { useAppContext } from "@/app/context/AppContext"
import React, { useState } from "react"

const ProductControls = ({ product, options = [] }) => {
  const { favorites, toggleFavorite, cart, incrementCartItem, decrementCartItem, toggleCart } = useAppContext()
  const isFavorite = favorites.some(fav => fav.id === product.id)
  const cartItem = cart.find(item => item.id === product.id)
  const quantity = cartItem ? cartItem.quantity : 0

  const [selectedOption, setSelectedOption] = useState(options[0] || "")

  const price = product.price || `$${(product.id % 20) + 10}.00`

  return (
    <div className="flex flex-col gap-2 items-start mt-2">
      {/* titulo y precio */}
      <div>
        <p className="text-white text-sm md:text-base font-light">{price}</p>
      </div>

      {/*selector de opciones, si existen */}
      {options.length > 0 && (
        <select
          value={selectedOption}
          onChange={e => setSelectedOption(e.target.value)}
          className="text-white bg-transparent border border-gray-500 rounded px-2 py-1 text-sm"
        >
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      )}

      {/*controles de carrito */}
      <div className="flex items-center gap-2">
        {quantity > 0 ? (
          <>
            <button onClick={e => { e.preventDefault(); decrementCartItem(product.id) }} className="text-white">-</button>
            <span className="text-white">{quantity}</span>
            <button onClick={e => { e.preventDefault(); incrementCartItem(product.id) }} className="text-white">+</button>
          </>
        ) : (
          <button onClick={e => { e.preventDefault(); toggleCart(product) }} className="text-white">+</button>
        )}

        {/* fav */}
        <button
          onClick={e => { e.preventDefault(); toggleFavorite(product) }}
          className={`text-white text-xl ${isFavorite ? "text-red-500" : ""}`}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>
    </div>
  )
}

export default ProductControls
