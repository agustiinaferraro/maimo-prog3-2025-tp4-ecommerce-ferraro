'use client'

import Hero from "./Hero"
import ProductGrid from "./ProductGrid"
import About from "./About"
import CarouselDiscos from "./CarouselDiscos"
import Tour from "./Tour"
import Cardsuno from "./Cardsuno"
import Cardsdos from "./Cardsdos"
import { useAppContext } from "@/app/context/AppContext"

const HomeContainer = () => {
  const { searchTerm } = useAppContext()

  //si hay busqueda muestra solo la grilla
  if (searchTerm) {
    return <ProductGrid horizontal />
  }

  return (
    <div className="w-full flex flex-col">

      <section>
        <Hero />
      </section>     

      <section>
        <Cardsuno />  
      </section> 

      <section className="px-5 md:px-20 my-10">
        <CarouselDiscos />
      </section>

      <section>
        <About />
      </section>

      <section className="px-5 md:px-20 my-10 overflow-x-auto">
        <Tour horizontal />
      </section>

      <section>
        <Cardsdos />
      </section>

      <section className="px-5 md:px-20 my-10">
        <ProductGrid flatHome /> {/*esto tambien hace que este en horizontal */}
      </section>

    </div>
  )
}

export default HomeContainer