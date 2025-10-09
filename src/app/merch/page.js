'use client';

import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { useAppContext } from "@/app/context/AppContext";
import Link from "next/link";

const Page = () => {
  const { categories } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // nombre de la sección a mostrar arriba
  const selectedCategoryName =
    selectedCategory === "all"
      ? "Toda la Merch"
      : categories.find(c => c._id === selectedCategory)?.name || "Merch";

  return (
    <div className="mt-20 relative min-h-screen">
      {/*boton de volver*/}
      <div className="fixed top-[90px] left-10 z-10">
        <Link href="/">
          <span className="text-7xl text-white hover:text-green-500 active:text-green-600 cursor-pointer">
            ‹
          </span>
        </Link>
      </div>

      {/*nombre de la sección */}
      <div>
        <h1 className="text-white text-4xl font-bold text-left py-10 px-20">
          {selectedCategoryName}
        </h1>
      </div>

      {/*filtro de categorias*/}
      <div className="flex gap-4 mb-8 flex-wrap px-20">
        <button
          key="all-categories"
          className={`px-6 py-2 rounded-lg font-semibold border border-gray-500 cursor-pointer transition-transform duration-200 transform
                      ${selectedCategory === "all" ? "bg-white text-black" : "bg-black text-white"}
                      hover:scale-105 active:scale-95`}
          onClick={() => setSelectedCategory("all")}
        >
          Todas
        </button>

        {categories.map(cat => (
          <button
            key={cat._id}
            className={`px-6 py-2 rounded-lg font-semibold border border-gray-500 cursor-pointer transition-transform duration-200 transform
                        ${selectedCategory === cat._id ? "bg-white text-black" : "bg-black text-white"}
                        hover:scale-105 active:scale-95`}
            onClick={() => setSelectedCategory(cat._id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/*grilla de productos*/}
      <ProductGrid selectedCategory={selectedCategory} />
    </div>
  );
};

export default Page;
