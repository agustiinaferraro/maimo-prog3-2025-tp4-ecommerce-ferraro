import ProductGrid from "@/components/ProductGrid"
import Link from "next/link"

const Page = () => {
  return (
    <div className="mt-20 relative">
      {/* Botón de volver con espacio desde el nav */}
      <div className="fixed top-[90px] left-10 z-10"> {/* ajusta top según convenga */}
        <Link href="/">
          <span className="text-7xl text-white hover:text-green-500 active:text-green-600 cursor-pointer">
            ‹
          </span>
        </Link>
      </div>

      <ProductGrid />
    </div>
  )
}

export default Page
