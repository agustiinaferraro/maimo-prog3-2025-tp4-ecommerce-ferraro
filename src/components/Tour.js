'use client';

import { useAppContext } from "@/app/context/AppContext"
import Image from "next/image"
import Link from "next/link"
import Loading from "./Loading"

const Tour = ({ horizontal = false }) => {
  const { favorites, toggleFavorite, concerts, API_URL } = useAppContext(); // tomo conciertos del context

  if (!concerts || concerts.length === 0) return <Loading />; //si no hay datos muestro loading

  return (
    <div className="relative pt-20 pb-6 px-12">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl pointer-events-none" />
      <div className="relative z-10">
        <h2 className="px-4 text-3xl font-bold mb-12 text-left">
          Fechas del Tour - The Driver Era
        </h2>

        <div className={`px-4 py-12 gap-8 ${
          horizontal
            ? "flex overflow-x-auto space-x-6 scrollbar-hide"
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        }`}>
          {concerts.map(show => {
            const isFav = favorites.some(fav => fav.id === show.id && fav.type === "tour"); //some se fija si un elemento 
                                                                        //cumple cno la condicion y devuelve true o false

            return (
              <div 
                key={show.id} 
                className="relative rounded-lg overflow-hidden h-96 w-full sm:w-[300px] md:w-80 transition-transform duration-300 hover:scale-105 flex-none shadow-lg border border-neutral-700 m-2"
              >
                {/*img con gradiente */}
                <div className="relative w-full h-full">
                  <Image
                    loader={({ src }) => `${API_URL}${src}`} 
                    src={show.image}
                    alt={show.city}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                </div>

                <div className="absolute bottom-16 left-4 right-4 flex flex-col gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-white">{show.city}</h3>
                  <p className="text-gray-300">{show.venue}</p>
                  <p className="text-gray-200 font-medium">
                    {new Date(show.date).toLocaleDateString("es-AR", { //convierte la fecha a un formato legible ej 11/12/2025
                      day: "2-digit",
                      month: "long",
                      year: "numeric"
                    })}
                  </p>
                </div>

                {/*boton de favs */}
                <button
                  onClick={() => toggleFavorite({
                    id: show.id,
                    type: "tour", // diferencia de merch
                    title: show.city,
                    overview: show.venue,
                    poster_path: show.image ? `http://localhost:4000${show.image}` : "/img/placeholder.png",
                    variants: [
                      {
                        price: 5000, //precio ficticio
                        image: show.image ? `http://localhost:4000${show.image}` : "/img/placeholder.png",
                        color: "default",
                        sizes: []
                      }
                    ]
                  })}
                  className={`absolute top-4 right-4 cursor-pointer text-2xl transition-transform duration-300 hover:scale-125 ${isFav ? "text-red-500" : "text-gray-300"}`}
                >
                  {isFav ? "♥" : "♡"}
                </button>

                {/*boton comprar entradas */}
                <Link
                  href={`/entradas/${show.id}`} 
                  className="absolute bottom-4 left-4 cursor-pointer text-white border border-white px-5 py-2 rounded hover:bg-white hover:text-black transition"
                >
                  Comprar Entradas
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tour;