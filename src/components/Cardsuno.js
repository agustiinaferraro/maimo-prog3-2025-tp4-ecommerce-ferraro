'use client'

import Image from "next/image"
import { useState, useEffect } from "react"

const fanarts = [
  { src: "/flyer1.jpg", author: "@autor1" },
  { src: "/flyer2.jpg", author: "@autor2" },
  { src: "/flyer3.jpg", author: "@autor3" },
  { src: "/flyer4.jpg", author: "@autor4" },
]

const Cardsuno = () => {
  const [startIndex, setStartIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex(prev => (prev + 2) % fanarts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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
          <div key={idx} style={{ textAlign: "center" }}>
            <div
              style={{
                width: "350px",
                height: "500px",
                borderRadius: "15px", // asegura borde completo
                overflow: "hidden",
                boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
                transition: "transform 0.3s, box-shadow 0.3s",
                marginBottom: idx % 2 === 0 ? "80px" : "40px",
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
                src={fanart.src}
                alt={fanart.author}
                width={350}
                height={500}
                style={{ objectFit: "cover", borderRadius: "15px" }} // agregamos aquí también
              />
            </div>
            <p className="text-white mt-2">{fanart.author}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Cardsuno
