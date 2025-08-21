"use client"

import FavoritesGrid from "@/components/FavoritesGrid"

export default function FavoritesPage() {
  return (
    <div className="px-5 md:px-20 py-10">
      <h1 className="text-3xl text-left px-5 font-bold text-white mb-6">Mis favoritos</h1>
      <FavoritesGrid />
    </div>
  )
}