'use client'

import FavoritesGrid from "@/components/FavoritesGrid"
import ProductGrid from "@/components/ProductGrid"
import { useAppContext } from "@/app/context/AppContext"

export default function FavoritesPage() {
  const { favorites, searchTerm } = useAppContext()

  //si hay busqueda muestra solo la grilla
  if (searchTerm) {
    return <ProductGrid />
  }

  //si no hay favoritos muestra grid vacio
  if (favorites.length === 0) return <FavoritesGrid />

  return (
    <div className="px-5 md:px-20 py-10">
      <h1 className="text-3xl text-left font-bold text-white mb-6">Mis favoritos</h1>
      <FavoritesGrid />
    </div>
  )
}