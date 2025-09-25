'use client'

import { useParams } from "next/navigation"
import ShowDetailPage from "@/components/ShowDetailPage"
import { tourDates } from "@/data/tourDates" // archivo de datos estático
import Link from "next/link"

export default function Page() {
  const { id } = useParams()
  const show = tourDates.find(s => s.id === Number(id))

  if (!show) return <p className="text-white p-10">Concierto no encontrado</p>

  return (
    <div className="relative">
      {/* Botón volver */}
      <div className="absolute top-5 left-5 z-20">
        <Link href="/">
          <span className="text-7xl text-white py-6 hover:text-green-500 active:text-green-600 cursor-pointer">
            ‹
          </span>
        </Link>
      </div>

      {/* Componente del show */}
      <ShowDetailPage show={show} />
    </div>
  )
}
