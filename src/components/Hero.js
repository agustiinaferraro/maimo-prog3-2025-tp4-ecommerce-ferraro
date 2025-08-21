'use client'

import { useState, useEffect } from "react"
import { useAppContext } from "@/app/context/AppContext"
import Link from "next/link"
import Image from "next/image"

const HeroRotator = () => {
  const { products } = useAppContext() // aca traigo los productos desde el context
  const [currentIndex, setCurrentIndex] = useState(0) // guarda cual disco se muestra

  // cambia de disco auto cada 10 segss
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length) // siguiente disco, vuelve al inicio si es el ultimo
    }, 10000)
    return () => clearInterval(interval) // limpia el intervalo al desmontar
  }, [products])

  if (!products || products.length === 0) return null // si no hay productos, no renderiza

  const currentProduct = products[currentIndex] // disco actual

  return (
    <div className="relative w-full h-[500px] md:h-[700px] overflow-hidden">
      <Image
        key={currentProduct.id} //recarga el video al cambiar de disco
        src={`https://image.tmdb.org/t/p/original/${currentProduct.poster_path}`}
        width={500}
        height={750}
        alt={currentProduct.title}
        autoPlay
        loop
        muted
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start px-10 md:px-20">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          {currentProduct.name}
        </h1>
        <p className="text-white mb-6">{currentProduct.description}</p>
        <Link href={`/product/${currentProduct.id}`}>
          <button className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition">
            Ver disco
          </button>
        </Link>
      </div>
    </div>
  )
}

export default HeroRotator