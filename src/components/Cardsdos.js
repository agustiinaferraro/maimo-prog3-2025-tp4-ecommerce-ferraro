'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

const Cardsdos = () => {
  const [recitales, setRecitales] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  //trae las fechas de los conciertos desde el backend
  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const res = await fetch("http://localhost:4000/tours")
        const data = await res.json()
        const concerts = data.concerts || []

        // Procesar datos para solo lo necesario
        const processed = concerts.map(item => ({
          id: item._id,
          image: item.image,
          city: item.city,
          ticketUrl: item.ticketUrl
        }))
        setRecitales(processed)
      } catch (err) {
        console.error(err)
      }
    }

    fetchConcerts()
  }, [])

  //rota imgs cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 2) % recitales.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [recitales.length])

  if (recitales.length === 0) return null

  const firstIndex = currentIndex
  const secondIndex = (currentIndex + 1) % recitales.length

  return (
    <div
      style={{
        marginTop: "120px",
        marginBottom: "120px",
        backgroundImage: "url('/background2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "60px 0",
      }}
    >
      <h2 className="px-10 text-4xl font-bold mb-10 text-center text-white">
        Recitales
      </h2>

      {/* contenedor imgs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: "40px",
          marginBottom: "40px",
        }}
      >
        {[firstIndex, secondIndex].map((i, idx) => {
          const show = recitales[i]
          return (
            <Link
              key={`${show.id}-${idx}`}
              href={show.ticketUrl}
              className="relative w-[350px] h-[500px] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <Image
                loader={({ src }) => `http://localhost:4000${src}`}
                src={show.image}
                alt={show.city}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </Link>
          )
        })}
      </div>

      {/*boton para ir a entradas */}
      <div className="flex justify-center">
        <Link href="/tour">
          <button className="bg-green-500 text-black font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition mt-4 cursor-pointer">
            Comprar Entradas
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Cardsdos
