import ProductGrid from "@/components/ProductGrid"
import Link from "next/link"

const Page = () => {
  return (
    <div className="mt-20 relative">
      {/*boton de volver */}
      <div className="fixed top-[90px] left-10 z-10"> 
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
