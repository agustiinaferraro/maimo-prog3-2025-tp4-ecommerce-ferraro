'use client'

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

const recitales = [
  { src: "/flyer3.jpg" },
  { src: "/flyer4.jpg" },
  { src: "/flyer1.jpg" },
  { src: "/flyer2.jpg" },
]

const Cardsdos = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 2) % recitales.length) // rotan de a 2
    }, 4000) // cada 4 segundos
    return () => clearInterval(interval)
  }, [])

  // calculo los dos flyers que se muestran
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
        <div
          style={{
            width: "350px",
            height: "500px",
            marginBottom: "50px",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-10px)"
            e.currentTarget.style.boxShadow = "0 20px 30px rgba(0,0,0,0.4)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)"
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)"
          }}
        >
          <Image
            src={recitales[firstIndex].src}
            alt="Flyer Recital 1"
            width={350}
            height={500}
            style={{ objectFit: "cover", borderRadius: "15px" }}
          />
        </div>

        <div
          style={{
            width: "350px",
            height: "500px",
            marginBottom: "10px", // un poquito más arriba
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-10px)"
            e.currentTarget.style.boxShadow = "0 20px 30px rgba(0,0,0,0.4)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)"
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.3)"
          }}
        >
          <Image
            src={recitales[secondIndex].src}
            alt="Flyer Recital 2"
            width={350}
            height={500}
            style={{ objectFit: "cover", borderRadius: "15px" }}
          />
        </div>
      </div>

      {/* Botón para ir a entradas */}
      <div className="flex justify-center">
        <Link href="/tour">
          <button className="bg-green-500 text-black font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition">
            Comprar Entradas
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Cardsdos
