'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useAppContext } from "@/app/context/AppContext";

const Cardsdos = () => {
  const { concerts, fetchConcerts, API_URL } = useAppContext(); //traigo datos del context
  const [currentIndex, setCurrentIndex] = useState(0);

  //llamo fetch desde el context
  useEffect(() => {
    fetchConcerts();
  }, [fetchConcerts]);

  //rotacion de imgs cada 4 segundos
  useEffect(() => {
    if (concerts.length === 0) return; 

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 2) % concerts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [concerts]); 

  if (concerts.length === 0) return null;

  const firstIndex = currentIndex;
  const secondIndex = (currentIndex + 1) % concerts.length;

  return (
    <div className="mt-28 mb-28 bg-[url('/background2.png')] bg-cover bg-center py-16 px-4">
      <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-white">
        Recitales
      </h2>

      {/* contenedor imgs */}
      <div className="flex flex-col sm:flex-row justify-center items-center sm:items-end gap-8 sm:gap-10 mb-10">
        {[firstIndex, secondIndex].map((i, idx) => {
          const show = concerts[i];
          if (!show) return null; 

          return (
            <Link
              key={`${show._id || i}-${idx}`} 
              href="/tour"
              className={`relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer w-64 sm:w-80 md:w-[350px] h-80 sm:h-[450px] md:h-[500px] ${
                idx % 2 === 0 ? "sm:mb-20" : "sm:mb-10"
              }`}
            >
              <Image
                loader={({ src }) => `${API_URL}${src}`}
                src={show.image}
                alt={show.city}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </Link>
          );
        })}
      </div>

      {/*btn para ir a entradas */}
      <div className="flex justify-center">
        <Link href="/tour">
          <button className="bg-green-500 text-black font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition mt-4 cursor-pointer">
            Comprar Entradas
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cardsdos;