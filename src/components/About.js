'use client'

import Image from "next/image"
import Link from "next/link"
import { useAppContext } from "@/app/context/AppContext"
import ProductGrid from "@/components/ProductGrid"

const About = () => {
  const { searchTerm } = useAppContext();

  if (searchTerm) { // cuando busca muestra el productgrid
    return <ProductGrid />
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-5 md:px-10 py-5">

      {/*fondo difuminado*/}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/40 via-black/80 to-black/90">
        <Image
          src="/background-about.png"
          alt="Background About"
          fill
          className="object-cover brightness-50 blur-sm"
        />
      </div>

      {/*contenedor principal */}
      <div className="relative flex flex-col md:flex-row items-center gap-10 w-full max-w-[900px] mx-auto text-white">

        {/*banner */}
        <div className="flex-1 w-full max-w-[350px]">
          <Image 
            src="/banner.png"
            alt="The Driver Era"
            width={350}
            height={350}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/*info */}
        <div className="flex-1">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">The Driver Era</h1>
          <p className="text-lg md:text-xl leading-relaxed">
            <span className="font-bold">The Driver Era</span> es un proyecto musical estadounidense formado por <span className="font-bold">Ross y Rocky Lynch</span>. Su estilo combina <span className="font-bold">pop, rock y funk</span>, creando un sonido moderno y dinámico.
          </p>
          <p className="text-lg md:text-xl leading-relaxed mt-4">
            La banda es reconocida por sus <span className="font-bold">videoclips innovadores</span> y la fuerte conexión con sus fans a través de redes sociales. Cada lanzamiento busca transmitir <span className="font-bold">energía y autenticidad</span> en su música.
          </p>
        </div>

      </div>
    </div>
  )
}

export default About
