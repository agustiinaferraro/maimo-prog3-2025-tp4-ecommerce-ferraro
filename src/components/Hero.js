'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { useAppContext } from "@/app/context/AppContext";

const Hero = () => {
  const { products } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const IMAGE_BASE = "https://image.tmdb.org/t/p/original/";

  const handleClick = () => {
    if (products && products.length > 0) {
      router.push(`/product/${products[currentIndex].id}`);
    }
  };

  useEffect(() => {
    if (!products || products.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [products]);

  if (!products || products.length === 0)
    return (
      <div className="h-[500px] md:h-[700px] bg-gray-800 flex items-center justify-center text-white">
        Cargando...
      </div>
    );

  const currentProduct = products[currentIndex];

  if (!currentProduct?.backdrop_path && !currentProduct?.poster_path)
    return (
      <div className="h-[500px] md:h-[700px] bg-gray-800 flex items-center justify-center text-white">
        Cargando imagen...
      </div>
    );

  return (
    <section
      style={{
        backgroundImage: `url(${IMAGE_BASE}${currentProduct.backdrop_path || currentProduct.poster_path})`,
      }}
      className="w-full h-[500px] md:h-[700px] bg-cover bg-no-repeat bg-center cursor-pointer relative"
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-start px-10 md:px-20 z-10 text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          {currentProduct.title || currentProduct.name}
        </h1>
        <p className="max-w-[500px]">{currentProduct.overview}</p>
      </div>
    </section>
  );
};

export default Hero;