'use client'

import Image from "next/image"
import { useState, useEffect } from "react"
import { useAppContext } from "@/app/context/AppContext";

const Cardsuno = () => {
  const { fanarts, fetchFanarts, API_URL } = useAppContext(); //traigo del context
  const [startIndex, setStartIndex] = useState(0)

  //trae los fanarts desde la apii
  useEffect(() => {
    fetchFanarts();
  }, [fetchFanarts]);

  //rotacion de imgs cada 3 segundos
  useEffect(() => {
    if (fanarts.length === 0) return
    const interval = setInterval(() => {
      setStartIndex(prev => (prev + 2) % fanarts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [fanarts])

  if (fanarts.length === 0) return null

  const visibleFanarts = [
    fanarts[startIndex],
    fanarts[(startIndex + 1) % fanarts.length]
  ]

return (
  <div className="mt-28 mb-28 bg-[url('/background1.png')] bg-cover bg-center py-16 px-4">
    <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-white">
      Fan Art
    </h2>

    <div className="flex flex-col sm:flex-row justify-center items-center sm:items-end gap-8 sm:gap-10">
      {visibleFanarts.map((fanart, idx) => (
        <div key={fanart._id} className="text-center">
          <div
            className={`w-64 sm:w-80 md:w-[350px] h-80 sm:h-[450px] md:h-[500px] rounded-xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${
              idx % 2 === 0 ? "sm:mb-20" : "sm:mb-10"
            }`}
          >
            <Image
              loader={({ src }) => `${API_URL}${src}`}
              src={fanart.image}
              alt={fanart.artist}
              width={350}
              height={500}
              className="object-cover w-full h-full rounded-xl"
            />
          </div>
          <p className="text-white mt-2 text-base sm:text-lg">{fanart.artist}</p>
        </div>
      ))}
    </div>
  </div>
)
}

export default Cardsuno;