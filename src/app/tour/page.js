'use client'

import Link from "next/link"
import Tour from "@/components/Tour"

const Page = () => {
  return (
    <div className="relative">
      <div className="absolute top-5 left-10 z-10">
        <Link href="/">
          <span className=" fixed top-[90px] text-7xl text-white py-6 hover:text-green-500 active:text-green-600 cursor-pointer">
            ‹
          </span>
        </Link>
      </div>
      <Tour />
    </div>
  )
}

export default Page
