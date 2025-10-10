'use client';

import { useAppContext } from "@/app/context/AppContext";
import Link from "next/link";
import Loading from "./Loading";
import Image from "next/image";

const CarouselDiscos = () => {
  const { products, favorites, toggleFavorite } = useAppContext();

  // filtra solo productos con fondo categoria discos
  const discos = (products || []).filter(
    p => p?.backdrop_path && p?.categories?.some(cat => cat.slug === "discos")
  );

  if (discos.length === 0) return <Loading />;

  // duplica el array para crear loop infinito
  const loopDiscos = [...discos, ...discos];

  return (
    <div className="relative w-full overflow-hidden py-5">
      <h2 className="px-10 text-3xl font-bold mb-10 relative z-10 text-left">
        Discos
      </h2>
      <div className="flex gap-6 whitespace-nowrap animate-carousel">
        {loopDiscos.map((disco, index) => {
          const isFav = favorites.some(fav => fav.id === disco.id);
          const price = disco.variants && disco.variants.length > 0
            ? `$${disco.variants[0].price}`
            : '$10.00';

          return (
            <Link
              key={`${disco.id}-${index}`}
              href={`/product/${disco.id}`}
              className="relative inline-block min-w-[500px] md:min-w-[600px] cursor-pointer overflow-visible rounded-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="relative">
                <Image
                  loader={({ src }) => src}
                  src={disco.poster_path || disco.backdrop_path}
                  alt={disco.title || 'Producto'}
                  width={500}
                  height={300}
                  className="w-full h-[300px] object-cover rounded-lg"
                />

                <div className="absolute inset-0 rounded-lg pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-black/80 to-transparent rounded-t-lg" />
                  <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/95 to-transparent rounded-b-lg p-3 flex flex-col justify-end">
                    <h3 className="text-white text-lg md:text-xl font-semibold line-clamp-2">
                      {disco.title || 'Sin nombre'}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base font-light">{price}</p>
                  </div>
                </div>

                <button
                  onClick={(e) => { e.preventDefault(); toggleFavorite({ ...disco, type: "product" }) }}
                  className={`absolute bottom-2 right-2 text-3xl transition-transform duration-300 hover:scale-125 ${isFav ? "text-red-500" : "text-gray-300"}`}
                >
                  {isFav ? "♥" : "♡"}
                </button>
              </div>
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes carousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-carousel {
          display: inline-flex;
          animation: carousel 30s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CarouselDiscos;
