'use client'

import Image from "next/image"
import Link from "next/link"
import { useAppContext } from "@/app/context/AppContext"
import ProductGrid from "@/components/ProductGrid"
import About from "@/components/About"

const AboutPage = () => {
  const { searchTerm } = useAppContext();

  if (searchTerm) {
    return <ProductGrid />
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-5 md:px-10 py-5">
      <div className="absolute top-5 left-10">
        <Link href="/">
          <span className="fixed top-[90px] text-7xl text-white py-6 hover:text-green-500 active:text-green-600 cursor-pointer">
            ‹
          </span>
        </Link>
      </div>
        <About />
    </div>
  )
}

export default AboutPage
