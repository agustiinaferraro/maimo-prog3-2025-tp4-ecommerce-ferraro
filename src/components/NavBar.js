'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useAppContext } from "@/app/context/AppContext"

const Navbar = () => {
  //trae del contexto global el texto de busqueda, su funcion y la lista de favoritos
  const { searchTerm, setSearchTerm, favorites } = useAppContext()
  
  //estado para manejar el menu hamburguesa en celulares
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex items-center justify-between flex-wrap text-white px-10 py-6 bg-[#000000]">
      {/*logo a la izquierda */}
      <Link href="/">
        <Image 
          src="/logo.png" 
          alt="logo" 
          width={100} 
          height={50} 
          className="h-[50px] object-cover" 
        />
      </Link>

      {/*menu hamburguesa (solo visible en celu) */}
      <button 
        className="md:hidden text-white ml-auto" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/*menu de navegacion */}
      <nav 
        className={`w-full md:w-auto ${menuOpen ? 'block' : 'hidden'} md:flex md:items-center md:gap-6 md:ml-auto mt-2 md:mt-0`}
      >
        {/*input de busqueda que actualiza el estado global */}
        <input
          type="text"
          value={searchTerm} //estado global de busqueda
          onChange={(e) => setSearchTerm(e.target.value)} //lo actualiza
          placeholder="🔍 Buscar discos..."
          className="w-full md:w-64 p-2 rounded-md border border-gray-300 bg-transparent text-white placeholder-gray-400 mb-2 md:mb-0"
        />

        <ul className="flex flex-col md:flex-row gap-4 md:gap-6 text-gray-300 px-10">
          <li className="hover:text-white transition-colors duration-200">
            <Link href="/favorites">Favorites ({favorites.length})</Link>
          </li>
          <li className="hover:text-white transition-colors duration-200">
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar