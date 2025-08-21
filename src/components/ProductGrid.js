"use client"

import ProductCard from "./ProductCard"
import { useAppContext } from "@/app/context/AppContext"

const ProductsGrid = () => {
  const { products, searchTerm } = useAppContext() //trae productos y busqueda del context

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  

  return (
    <section className="px-10 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}

export default ProductsGrid
