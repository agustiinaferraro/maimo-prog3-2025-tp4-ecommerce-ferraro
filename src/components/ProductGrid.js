'use client';

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/app/context/AppContext";

const ProductGrid = ({ horizontal = false }) => {
  const {
    products,
    searchTerm,
    categories,
    fetchAllProducts,
    fetchProductsByCategory
  } = useAppContext();

  const [selectedCategory, setSelectedCategory] = useState("all");

  //llamo a la funcion correspondiente cuando cambia la categoraa seleccionada
  useEffect(() => {
    if (selectedCategory === "all") {
      fetchAllProducts();
    } else {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory, fetchAllProducts, fetchProductsByCategory]);

  if (!products || !categories) return <div className="text-white">Cargando productos...</div>;

  //filtrar productos por busqueda
  let displayedProducts = searchTerm
    ? products.filter(p =>
        (p.title || "").toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  //agrupar productos por categoria (para subs)
  const productsByCategory = {};
  displayedProducts.forEach(product => {
    const catObj = product.categories[0] || { name: "Otros" };
    const productCatName = catObj.name || "Otros";
    if (!productsByCategory[productCatName]) productsByCategory[productCatName] = [];
    productsByCategory[productCatName].push(product);
  });

  return (
    <div className="relative pb-6 px-10">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl pointer-events-none z-0" />

      <div className="relative z-10 pt-10">
        <h2 className="px-10 text-3xl font-bold mb-10 text-left text-white">Merch</h2>

        {/*filtro de categoroas */}
        <div className="flex gap-4 mb-8 px-10 flex-wrap">
          <button
            key="all-categories"
            className={`px-4 py-2 rounded-lg ${selectedCategory === "all" ? "bg-white text-black" : "bg-gray-700 text-white"}`}
            onClick={() => setSelectedCategory("all")}
          >
            Todas
          </button>
          {categories.map(cat => (
            <button
              key={cat._id}
              className={`px-4 py-2 rounded-lg ${selectedCategory === cat._id ? "bg-white text-black" : "bg-gray-700 text-white"}`}
              onClick={() => setSelectedCategory(cat._id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* grilla de productos por categoria (agrregar mas porque queda feo con pocos) */}
        {Object.entries(productsByCategory).map(([categoryName, products]) => (
          <div key={`category-${categoryName}`} className="mb-12">
            {selectedCategory === "all" && (
              <h3 className="text-2xl font-semibold mb-6 text-white">{categoryName}</h3>
            )}

            <section className={`px-10 py-6 gap-8 ${horizontal ? "flex overflow-x-auto space-x-6 scrollbar-hide" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}>
              {products.map((product, index) => (
                <ProductCard key={`${product.id}-${index}`} product={product} />
              ))}
            </section>
          </div>
        ))}

        {/* msjj si no hay productos */}
        {displayedProducts.length === 0 && (
          <div className="text-white text-center w-full col-span-full">
            No se encontraron productos
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
