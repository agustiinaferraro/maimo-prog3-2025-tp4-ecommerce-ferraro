'use client'

import Hero from "./Hero"
import ProductGrid from "./ProductGrid"
import CarouselSingles from "./CarouselSingles"

const HomeContainer = () => {
  return (
    <div className="w-full flex flex-col">
      <Hero />

      <section className="px-5 md:px-20 my-10">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-6">Singles destacados</h1>
        <CarouselSingles />
      </section>

      <section className="px-5 md:px-20 my-10">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">Todos los discos</h2>
        <ProductGrid />
      </section>

    </div>
  )
}

export default HomeContainer
