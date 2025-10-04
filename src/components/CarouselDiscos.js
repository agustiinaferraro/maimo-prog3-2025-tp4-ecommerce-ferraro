'use client';

import { useAppContext } from "@/app/context/AppContext"
import Link from "next/link"
import Loading from "./Loading"
import Image from "next/image"

const CarouselDiscos = () => {
  const { products, favorites, toggleFavorite, cart, incrementCartItem, decrementCartItem, toggleCart } = useAppContext()

  //filtra solo los productos que tengan al menos una img válida
  const discos = (products || []).filter(p => p && p.backdrop_path)

  if (discos.length === 0) return <Loading />

  // duplica el array para crear un loop infinito
  const loopDiscos = [...discos, ...discos]

  return (
    <div className="relative w-full overflow-hidden py-5">
      <h2 className="px-10 text-3xl font-bold mb-10 relative z-10 text-left">
        Discos
      </h2>
      <div className="flex gap-6 whitespace-nowrap animate-carousel">
        {loopDiscos.map((disco, index) => {
          // chequea por id para que funcione con todos los duplicados
          const isFav = favorites.some(fav => fav.id === disco.id)
          const cartItem = cart.find(item => item.id === disco.id)

          //usa el price de la primera variante si existe
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
                  src={disco.backdrop_path}
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

                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                  {!cartItem ? (
                    <button
                      onClick={(e) => { e.preventDefault(); toggleCart({ ...disco, type: "product" }) }}
                      className="text-white text-2xl cursor-pointer bg-black/60 rounded-full w-8 h-8 flex items-center justify-center transition-transform duration-300 hover:scale-125"
                    >+</button>
                  ) : (
                    <div className="flex items-center gap-1 bg-black/60 rounded px-2 py-1">
                      <button
                        onClick={(e) => { e.preventDefault(); decrementCartItem(disco.id) }}
                        className="text-white font-bold px-1"
                      >-</button>
                      <span className="text-white font-semibold">{cartItem.quantity}</span>
                      <button
                        onClick={(e) => { e.preventDefault(); incrementCartItem(disco.id) }}
                        className="text-white font-bold px-1"
                      >+</button>
                    </div>
                  )}

                  <button
                    onClick={(e) => { e.preventDefault(); toggleFavorite({ ...disco, type: "product" }) }}
                    className={`text-3xl transition-transform duration-300 hover:scale-125 ${isFav ? "text-red-500" : "text-gray-300"}`}
                  >
                    {isFav ? "♥" : "♡"}
                  </button>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      <style jsx>{`
        @keyframes carousel {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-carousel {
          display: inline-flex;
          animation: carousel 120s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default CarouselDiscos
