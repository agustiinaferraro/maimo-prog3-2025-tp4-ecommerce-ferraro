'use client'

import Image from "next/image"

const AboutPage = () => {
  return (
    <div 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/background-about.png')" }}
    >
      {/* overlay negro */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* contenido */}
      <div className="relative flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto text-white px-5 md:px-10 py-5">
        
        <div className="flex-1">
          <Image 
            src="/banner.png" 
            alt="The Driver Era" 
            width={600} 
            height={700} 
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

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

export default AboutPage