'use client';

import ProductCard from "./ProductCard";
import { useAppContext } from "@/app/context/AppContext";
import Image from "next/image";
import Link from "next/link";

const FavoritesGrid = () => {
  const { favorites, toggleFavorite } = useAppContext();

  if (!favorites || favorites.length === 0) {
    return (
      <p className="text-3xl text-center px-5 font-bold text-white mb-6 py-35">
        Todavía no hay favoritos
      </p>
    );
  }

  return (
    <section className="px-5 md:px-20 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {favorites.map(fav => {
        if (fav.type === "tour") {
          const isFav = favorites.some(f => f.id === fav.id);
          return (
            <div
              key={fav.id}
              className="relative rounded-lg overflow-hidden h-96 w-full sm:w-[300px] md:w-80 transition-transform duration-300 hover:scale-105 flex-none shadow-lg border border-neutral-700 m-2"
            >
              <div className="relative w-full h-full">
                <Image
                  loader={({ src }) => src}
                  src={fav.poster_path}
                  alt={fav.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              </div>

              <div className="absolute bottom-16 left-4 right-4 flex flex-col gap-2 mb-2">
                <h3 className="text-xl font-semibold text-white">{fav.title}</h3>
                <p className="text-gray-300">{fav.overview}</p>
                <p className="text-gray-200 font-medium">
                  {fav.variants?.[0]?.price != null
                    ? `$${fav.variants[0].price.toLocaleString('es-AR')}`
                    : "$0"}
                </p>
              </div>

              <button
                onClick={() => toggleFavorite(fav)}
                className={`absolute top-4 right-4 cursor-pointer text-2xl transition-transform duration-300 hover:scale-125 ${isFav ? "text-red-500" : "text-gray-300"}`}
              >
                {isFav ? "♥" : "♡"}
              </button>

              <Link
                href={`/entradas/${fav.id}`}
                className="absolute bottom-4 left-4 cursor-pointer text-white border border-white px-5 py-2 rounded hover:bg-white hover:text-black transition"
              >
                Comprar Entradas
              </Link>
            </div>
          );
        } else {
          //card para merch
          return <ProductCard key={fav.id || fav._id} product={fav} />;
        }
      })}
    </section>
  );
};

export default FavoritesGrid;
