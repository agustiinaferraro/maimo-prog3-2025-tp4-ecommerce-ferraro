'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import { useAppContext } from "@/app/context/AppContext";
import Loading from "./Loading";

const Hero = () => {
  const { products } = useAppContext(); //agarra los productos del context
  const [currentIndex, setCurrentIndex] = useState(0); //indice actual del hero
  const [fade, setFade] = useState(true);// controla la opacidad para efecto fade
                                        // true = visible, false = desvanecido
  const router = useRouter(); //hook para navegar a otra pagina
  const IMAGE_BASE = "https://image.tmdb.org/t/p/original/";

  const handleClick = () => {
    if (products && products.length > 0) {
      router.push(`/product/${products[currentIndex].id}`); //si hace click lleva a la pag del producto
    }
  };

  // efecto para cambiar el prod c/10 segs
  useEffect(() => {
    if (!products || products.length === 0) return; //si no hay productos no devuelve naad
    const interval = setInterval(() => {
      setFade(false);//empieza fade out, el producti actual empieza a desaparecer

      setTimeout(() => {
        //dps de 0.5s (duracion de la transicion)
        setCurrentIndex((prev) => (prev + 1) % products.length);//cambia al sig prodcuto
        setFade(true);// fade in, el nuevo produc aparece suavemente
      }, 500);//duracion del fade
    }, 10000); //hace todo el proceso cada 10 segs

    return () => clearInterval(interval); // si estoy en otra pagina, se para el intervalo para no consumir recursos

  }, [products]);

  if (!products || products.length === 0)
    return (
      <div className="h-[400px] md:h-[500px] bg-gray-800 flex items-center justify-center text-white">
        <Loading /> {/*si no hay productos muestra el loading */}
      </div>
    );

  const currentProduct = products[currentIndex]; //posicion actual = indice dle product

  if (!currentProduct?.backdrop_path && !currentProduct?.poster_path)
    return (
      <Loading />//si no hayproducto muestra loading
    );

  return (
    <section
      className="w-full h-[400px] md:h-[500px] bg-cover bg-center relative cursor-pointer overflow-hidden"
      onClick={handleClick} //cuando hace click navega a la opagina del producto
    >
      <div
        key={currentProduct.id}
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${fade ? "opacity-100" : "opacity-0"}`}
        style={{ 
          backgroundImage: `url(${IMAGE_BASE}${currentProduct.backdrop_path || currentProduct.poster_path})`, 
          filter: "brightness(70%)" // img oscura
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