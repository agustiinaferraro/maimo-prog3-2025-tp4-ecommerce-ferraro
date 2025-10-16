'use client'

import FavoritesGrid from "@/components/FavoritesGrid"
import ProductGrid from "@/components/ProductGrid"
import { useAppContext } from "@/app/context/AppContext"
import Link from "next/link"

export default function FavoritesPage() {
  const { favorites, searchTerm } = useAppContext()

  // si hay busquesa muestra la grilla
  if (searchTerm) {
    return <ProductGrid />
  }

  return (
    <div className="px-5 md:px-20 py-10 relative">
      {/* boton de volver*/}
      <div className="fixed top-[90px] left-5 z-50">
        <Link href="/">
          <span className="text-7xl text-white hover:text-green-500 active:text-green-600 cursor-pointer">
            ‹
          </span>
        </Link>
      </div>

      {/*titulo solo si hay favs */}
      {favorites.length > 0 && (
        <h1 className="text-3xl text-left font-bold text-white mb-6">Mis favoritos</h1>
      )}

      {/*grilla de favs */}
      <FavoritesGrid />
    </div>
  )
}
