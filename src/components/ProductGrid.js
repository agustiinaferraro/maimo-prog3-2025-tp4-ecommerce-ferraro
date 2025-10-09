'use client';

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/app/context/AppContext";

const ProductGrid = ({ horizontal = false, selectedCategory: externalCategory = null }) => {
  const {
    products,
    searchTerm,
    fetchAllProducts,
    fetchProductsByCategory
  } = useAppContext();

  const [selectedCategory, setSelectedCategory] = useState(externalCategory || "all");

  //actualiza la categoria si viene desde prop (por pag de categoria)
  useEffect(() => {
    if (externalCategory) setSelectedCategory(externalCategory);
  }, [externalCategory]);

  //llama a la funcion correcta según categoria seleccionada
  useEffect(() => {
    if (!selectedCategory || selectedCategory === "all") {
      fetchAllProducts();
    } else {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory, fetchAllProducts, fetchProductsByCategory]);

  if (!products) return <div className="text-white">Cargando productos...</div>;

  //filtra productos por busqueda
  let displayedProducts = searchTerm
    ? products.filter(p => (p.title || "").toLowerCase().includes(searchTerm.toLowerCase()))
    : products;

  //agrupa productos por categoria (solo para mostrar subs si es "all")
  const productsByCategory = {};
  displayedProducts.forEach(product => {
    const catObj = product.categories?.[0] || { name: "Otros" };
    const productCatName = catObj.name || "Otros";
    if (!productsByCategory[productCatName]) productsByCategory[productCatName] = [];
    productsByCategory[productCatName].push(product);
  });

  return (
    <div className="relative pb-6 px-20">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl pointer-events-none z-0" />

      <div className="relative z-10 pt-10">
        {Object.entries(productsByCategory).map(([categoryName, products]) => (
          <div key={`category-${categoryName}`} className="mb-12">
            {selectedCategory === "all" && (
              <h3 className="text-2xl font-semibold mb-6 text-white">{categoryName}</h3>
            )}

            <section className={` py-6 gap-8 ${horizontal ? "flex overflow-x-auto space-x-6 scrollbar-hide" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}`}>
              {products.map(product => (
                <ProductCard key={product.id || product._id} product={product} />
              ))}
            </section>
          </div>
        ))}

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