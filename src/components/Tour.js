'use client'
import Image from "next/image"
import React from "react"

const tourDates = [
  { 
    id: 1, 
    city: "Buenos Aires, Argentina", 
    venue: "Luna Park", 
    date: "2025-10-05", 
    ticketUrl: "#",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Luna_Park_Buenos_Aires.jpg"
  },
  { 
    id: 2, 
    city: "Santiago, Chile", 
    venue: "Movistar Arena", 
    date: "2025-10-07", 
    ticketUrl: "#",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Movistar_Arena_Santiago.jpg"
  },
  { 
    id: 3, 
    city: "São Paulo, Brasil", 
    venue: "Allianz Parque", 
    date: "2025-10-10", 
    ticketUrl: "#",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Allianz_Parque.jpg"
  },
  { 
    id: 4, 
    city: "Ciudad de México, México", 
    venue: "Pepsi Center", 
    date: "2025-10-15", 
    ticketUrl: "#",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Pepsi_Center_WTC.jpg"
  },
  { 
    id: 5, 
    city: "Los Ángeles, USA", 
    venue: "Hollywood Palladium", 
    date: "2025-10-25", 
    ticketUrl: "#",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/16/Hollywood_Palladium.jpg"
  },
  { 
    id: 6, 
    city: "Nueva York, USA", 
    venue: "Madison Square Garden", 
    date: "2025-10-30", 
    ticketUrl: "#",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4d/Madison_Square_Garden_%28MSG%29_-_Full_%282021%29.jpg"
  },
  { 
    id: 7, 
    city: "Londres, Reino Unido", 
    venue: "O2 Academy Brixton", 
    date: "2025-11-05", 
    ticketUrl: "#",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Brixton_Academy.jpg"
  },
  { 
    id: 8, 
    city: "París, Francia", 
    venue: "Le Zénith", 
    date: "2025-11-08", 
    ticketUrl: "#",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Zenith_de_Paris.jpg"
  },
  { 
    id: 9, 
    city: "Berlín, Alemania", 
    venue: "Mercedes-Benz Arena", 
    date: "2025-11-12", 
    ticketUrl: "#",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Mercedes-Benz_Arena_Berlin_2015.jpg"
  },
  { 
    id: 10, 
    city: "Madrid, España", 
    venue: "WiZink Center", 
    date: "2025-11-15", 
    ticketUrl: "#",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f1/WiZink_Center.jpg"
  },
]

const Tour = ({ horizontal = false }) => {
  return (
    <div className="relative pt-20 pb-6 px-10">
      {/* Fondo vidrio redondeado con sombra */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl pointer-events-none" />

      <div className="relative z-10">
        <h2 className=" px-10 text-3xl font-bold mb-10 relative z-10 text-left">
          Fechas del Tour - The Driver Era
        </h2>

        <div
          className={`px-10 py-12 gap-8 ${
            horizontal
              ? "flex overflow-x-auto space-x-6 scrollbar-hide" // estilo horizontal
              : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" // estilo grilla
          }`}
        >
          {tourDates.map(show => (
            <div
              key={show.id}
              className="relative bg-neutral-900/80 border border-neutral-700 shadow-md rounded-lg overflow-hidden flex flex-col h-96 w-full sm:w-[300px] md:w-80 transition-transform duration-300 hover:scale-105 flex-none"
            >
              {/* Imagen arriba */}
              <div className="h-40 w-full relative">
                <Image 
                  src={show.image} 
                  alt={show.city} 
                  className="object-cover w-full h-full"
                />
                {/* Overlay degradado para mejorar contraste */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>

              {/* Contenido debajo de la imagen */}
              <div className="relative z-10 flex flex-col justify-between p-6 text-left flex-1">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{show.city}</h3>
                  <p className="text-gray-400 mb-1">{show.venue}</p>
                  <p className="text-gray-200 font-medium">
                    {new Date(show.date).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric"
                    })}
                  </p>
                </div>
                <a
                  href={show.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 bg-white text-black px-4 py-2 rounded-md font-medium tracking-wide transition hover:bg-gray-200 active:scale-95 text-center"
                >
                  Comprar Entradas
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Tour