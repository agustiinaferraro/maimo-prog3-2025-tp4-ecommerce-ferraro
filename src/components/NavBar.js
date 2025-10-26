'use client'

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useAppContext } from "@/app/context/AppContext"

const Navbar = () => {
  const { searchTerm, setSearchTerm, favorites, cart } = useAppContext()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/*nav fijo arriba*/}
      <div className="fixed top-0 left-0 w-full z-20 bg-black">
        <div className="flex items-center justify-between flex-wrap text-white px-10 h-[72px] relative">
          
          {/*logo*/}
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="logo" 
              width={100} 
              height={50} 
              className="h-[50px] object-cover" 
            />
          </Link>

          {/*menu hamburguesa celu */}
          <button 
            className="md:hidden text-white ml-auto" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* menu de navegacion */}
          <nav 
            className={`w-full md:w-auto ${menuOpen ? 'block absolute top-[72px] left-0 z-10' : 'hidden'} md:flex md:items-center md:gap-6 md:ml-auto md:mt-0 
                        bg-black rounded-b-xl p-4 md:p-0 shadow-lg`}

          >
            {/*input de buscar*/}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 Buscar discos..."
              className="w-full mr-15 md:w-64 p-2 rounded-md border border-gray-700 bg-gray-900 text-white placeholder-gray-400 mb-3 md:mb-0"
            />

            <ul className="flex flex-col md:flex-row gap-2 md:gap-6 text-gray-300 px-2 md:px-0">
              {/*favs */}
              <li className="hover:text-white transition-colors duration-200 flex items-center gap-2 py-2 border-b border-gray-700 md:border-none min-w-[118px]">
                <Link href="/favorites" className="flex items-center gap-2 w-full">
                  Favorites
                  <span 
                    className={`w-6 h-6 flex items-center justify-center rounded-full bg-green-500 text-black font-bold text-sm transition-opacity duration-500 ${favorites.length > 0 ? 'opacity-100' : 'opacity-0'}`}
                  >
                    {favorites.length > 0 ? favorites.length : '0'} {/*chequea si hay o no algo en favs */}
                  </span>
                </Link>
              </li>

              {/*carro*/}
              <li className="hover:text-white transition-colors duration-200 flex items-center gap-2 py-2 md:py-0 min-w-[118px]">
                <Link href="/cart" className="flex items-center gap-2 w-full">
                  Mi Carrito
                  <span 
                    className={`w-6 h-6 flex items-center justify-center rounded-full bg-green-500 text-black font-bold text-sm transition-opacity duration-500 ${cart.length > 0 ? 'opacity-100' : 'opacity-0'}`}
                  >
                    {cart.length > 0 ? cart.length : '0'} {/*chequea si hay o no algo agregado al carrito */}
                  </span>
                </Link>
              </li>

              {/*about */}
              <li className="hover:text-white transition-colors duration-200 flex items-center py-2 border-b border-gray-700 md:border-none min-w-[100px]">
                <Link href="/about" className="w-full">
                  About
                </Link>
              </li>

              {/*tour*/}
              <li className="hover:text-white transition-colors duration-200 flex items-center py-2 md:py-0 min-w-[100px]">
                <Link href="/tour" className="w-full">
                  Tour
                </Link>
              </li>

              {/*merch*/}
              <li className="hover:text-white transition-colors duration-200 flex items-center py-2 md:py-0 min-w-[100px]">
                <Link href="/merch" className="w-full">
                  Merch
                </Link>
              </li>

            </ul>
          </nav>
        </div>
      </div>

      <div className="pt-[72px]"></div>
    </>
  )
}

export default Navbar
