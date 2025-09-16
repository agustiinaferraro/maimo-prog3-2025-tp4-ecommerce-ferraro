"use client"

import ProductCard from "./ProductCard"
import { useAppContext } from "@/app/context/AppContext"

const ProductGrid = ({ horizontal = false }) => { // si horizontal es true, se muestra horizontal
  const { products, searchTerm } = useAppContext() //trae productos y busqueda del context

  const filteredProducts = products.filter(product => //filtra los productos segun la busqueda
    product.title.toLowerCase().includes(searchTerm.toLowerCase())// convierte titulo y busqueda a minusc 
                                                                  // y verifica si el titulo tiene lo que se busco
  )
  
  return (
    <div>
      <h2 className=" px-10 text-3xl font-bold mb-10 relative z-10 text-left">
        Merch
      </h2>
      <section
        className={`px-10 py-12 gap-8 ${
          horizontal
            ? "flex overflow-x-auto space-x-6 scrollbar-hide" // estilo horizontal
            : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" // estilo grilla
        }`}
      >
        {filteredProducts.map(product => ( //recorre los productos filtrados y crea una card por c/u
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  )
}

export default ProductGrid