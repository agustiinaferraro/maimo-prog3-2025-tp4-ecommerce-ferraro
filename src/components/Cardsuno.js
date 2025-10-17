'use client'

import Image from "next/image"
import { useState, useEffect } from "react"
import { useAppContext } from "@/app/context/AppContext";

const Cardsuno = () => {
  const { fanarts, fetchFanarts } = useAppContext(); //traigo del context
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
    <div
      style={{
        marginTop: "120px",
        marginBottom: "120px",
        backgroundImage: "url('/background1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "60px 0",
      }}
    >
      <h2 className="px-10 text-4xl font-bold mb-10 text-center text-white">
        Fan Art
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: "40px",
        }}
      >
        {visibleFanarts.map((fanart, idx) => (
          <div key={fanart._id} style={{ textAlign: "center" }}>
            <div
              style={{
                width: "350px",
                height: "500px",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                transition: "transform 0.3s, box-shadow 0.3s",
                marginBottom: idx % 2 === 0 ? "80px" : "40px",
                cursor: "pointer"
              }}
            >
              <Image
                loader={({ src }) => `http://localhost:4000${src}`}
                src={fanart.image}
                alt={fanart.artist}
                width={350}
                height={500}
                style={{ objectFit: "cover", borderRadius: "15px" }}
              />
            </div>
            <p className="text-white mt-2">{fanart.artist}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cardsuno;