'use client';

import ProductCard from "./ProductCard";
import { useAppContext } from "@/app/context/AppContext";

const ProductGrid = ({ horizontal = false }) => {
  const { products, searchTerm } = useAppContext();

  if (!products) return <div className="text-white">Cargando productos...</div>;

  //transforma _id.$oid a _id y filtra solo productos con img
  const filteredProducts = (products || [])
    .map(p => ({
      ...p,
      _id: p._id?.$oid || p._id || p.id, // para que _id exista
    }))
    .filter(p => p && (p.poster_path));

  //si hay busqueda se fultra por titulo
  const displayedProducts = searchTerm
    ? filteredProducts.filter(p =>
        (p.title || '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredProducts;

  return (
    <div className="relative pb-6 px-10">
      {/*fondo difuminado */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl pointer-events-none z-0" />

      <div className="relative z-10 pt-10">
        <h2 className="px-10 text-3xl font-bold mb-10 text-left text-white">Merch</h2>

        <section
          className={`px-10 py-12 gap-8 ${
            horizontal
              ? "flex overflow-x-auto space-x-6 scrollbar-hide"
              : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }`}
        >
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product, index) => (
              <ProductCard key={product._id || index} product={product} />
            ))
          ) : (
            <div className="text-white text-center w-full col-span-full">
              No se encontraron productos
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductGrid;
