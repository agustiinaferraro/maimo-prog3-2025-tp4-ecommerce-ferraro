'use client';

import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/app/context/AppContext";

const ProductCard = ({ product }) => {
  const { favorites, toggleFavorite, cart, incrementCartItem, decrementCartItem, toggleCart } = useAppContext();

  if (!product) return null;

  const isFav = favorites.some(fav => fav.id === product.id || fav._id === product._id);
  const cartItem = cart.find(item => item.id === product.id || item._id === product._id);

  const imageUrl = product.poster_path || product.backdrop_path || '';
  const price = product.variants?.[0]?.price != null
    ? `$${product.variants[0].price.toLocaleString('es-AR')}`
    : "$0";

  return (
    <div className="relative bg-neutral-900/80 border border-neutral-700 shadow-md rounded-lg overflow-hidden flex flex-col h-96 w-full sm:w-[300px] md:w-80 transition-transform duration-300 hover:scale-105 flex-none">
      
      {/*img con link a detalle */}
      <Link href={`/product/${product.id || product._id}`} className="relative w-full h-60 block">
        <Image
          loader={({ src }) => src}
          src={imageUrl}
          alt={product.title || 'Producto'}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-t-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </Link>

      {/*info y botones */}
      <div className="relative z-10 flex flex-col justify-between p-3 flex-1">
        {/* Título también con link */}
        <Link href={`/product/${product.id || product._id}`} className="hover:underline">
          <h3 className="text-lg font-semibold mb-1 line-clamp-2 text-white">{product.title || 'Sin nombre'}</h3>
        </Link>
        <p className="text-gray-300 text-sm mb-2">{price}</p>

        {/*botones carrito y favorito */}
        <div className="flex justify-between items-center">
          {!cartItem ? (
            <button
              onClick={() => toggleCart(product)}
              className="text-white text-3xl cursor-pointer bg-black/60 rounded-full w-10 h-10 flex items-center justify-center transition-transform duration-300 hover:scale-125"
            >+</button>
          ) : (
            <div className="flex items-center gap-2 bg-black/60 rounded px-2 py-1">
              <button onClick={() => decrementCartItem(product.id || product._id)} className="text-white font-bold px-2">-</button>
              <span className="text-white font-semibold">{cartItem.quantity}</span>
              <button onClick={() => incrementCartItem(product.id || product._id)} className="text-white font-bold px-2">+</button>
            </div>
          )}

          <button
            onClick={() => toggleFavorite(product)}
            className={`text-3xl transition-transform duration-300 hover:scale-125 ${isFav ? "text-red-500" : "text-gray-300"}`}
          >
            {isFav ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
