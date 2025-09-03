'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { useAppContext } from "@/app/context/AppContext";
import Loading from "./Loading";

const Hero = () => {
  const { products } = useAppContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
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
      setFade(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
        setFade(true);
      }, 500);
    }, 10000);

    return () => clearInterval(interval);
  }, [products]);

  if (!products || products.length === 0)
    return (
      <div className="h-[400px] md:h-[500px] bg-gray-800 flex items-center justify-center text-white">
        <Loading />
      </div>
    );

  const currentProduct = products[currentIndex];

  if (!currentProduct?.backdrop_path && !currentProduct?.poster_path)
    return (
      <Loading />
    );

  return (
    <section
      className="w-full h-[400px] md:h-[500px] bg-cover bg-center relative cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      <div
        key={currentProduct.id}
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${fade ? "opacity-100" : "opacity-0"}`}
        style={{ 
          backgroundImage: `url(${IMAGE_BASE}${currentProduct.backdrop_path || currentProduct.poster_path})`, 
          filter: "brightness(70%)" // imagen oscura
        }}
      ></div>

      {/*gradientes arriba y abajo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/90"></div>

      {/*contenido */}
      <div className="absolute inset-0 flex flex-col justify-center items-start px-5 md:px-20 z-10 text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{currentProduct.title || currentProduct.name}</h1>
        <p className="max-w-[500px]">{currentProduct.overview}</p>
      </div>
    </section>
  );
};

export default Hero;