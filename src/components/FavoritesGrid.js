'use client'

import ProductCard from "./ProductCard"
import { useAppContext } from "@/app/context/AppContext"

const FavoritesGrid = () => {
  const { favorites } = useAppContext()

  if (!favorites || favorites.length === 0) {
    return <p className="text-3xl text-center px-5 font-bold text-white mb-6 py-35">Todavía no hay favoritos</p>
  }

  return (
    <section className="px-5 md:px-20 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {favorites.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}

export default FavoritesGrid
