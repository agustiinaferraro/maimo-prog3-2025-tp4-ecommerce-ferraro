'use client';

import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";
import { useAppContext } from "@/app/context/AppContext";
import Link from "next/link";

const Page = () => {
  const { categories } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState("all");

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

      {/*filtro de categorias*/}
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

      {/*grilla de productos */}
      <ProductGrid selectedCategory={selectedCategory} />
    </div>
  );
};

export default Page;