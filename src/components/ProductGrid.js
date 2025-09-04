"use client"

import ProductCard from "./ProductCard"
import { useAppContext } from "@/app/context/AppContext"

const ProductsGrid = () => {
  const { products, searchTerm } = useAppContext() //trae productos y busqueda del context

  const filteredProducts = products.filter(product => //filtra los productos segun la busqueda
    product.title.toLowerCase().includes(searchTerm.toLowerCase())// convierte titulo y busqueda a minusc 
                                                                  // y verifica si el titulo tiene lo que se busco
    
  )
  
  return (
    <section className="px-10 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {filteredProducts.map(product => ( //recorre los productos filtrados y crea una card por c/u
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}

export default ProductsGrid
