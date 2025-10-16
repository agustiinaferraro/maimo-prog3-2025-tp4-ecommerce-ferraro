'use client'

import { useParams } from "next/navigation"
import ShowDetailPage from "@/components/ShowDetailPage"
import { useState, useEffect } from "react"
import Link from "next/link"
import Loading from "@/components/Loading"

export default function Page() {
  const params = useParams()  //sevuelve un objeto con los params
  const { id } = params        //accede al id

  const [show, setShow] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const res = await fetch(`http://localhost:4000/tours/${id}`)
        if (!res.ok) throw new Error("No se pudo cargar el show") //muesrra error y para el codigo
        const data = await res.json()
        const concert = data.concert
        
        //precciiooo
        concert.price = concert.price

        setShow(concert)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchShow()
  }, [id])

  if (loading) return <Loading />
  if (error) return <p className="text-white p-10">{error}</p>
  if (!show) return <p className="text-white p-10">Concierto no encontrado</p>

  return (
    <div className="relative">
      {/* boton volver */}
      <div className="absolute top-5 left-5 z-20">
        <Link href="/tour">
          <span className="text-7xl text-white py-6 hover:text-green-500 cursor-pointer">‹</span>
        </Link>
      </div>

      <ShowDetailPage show={show} />
    </div>
  )
}
