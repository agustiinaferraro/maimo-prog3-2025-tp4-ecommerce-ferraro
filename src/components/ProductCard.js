'use client';

import { useAppContext } from "@/app/context/AppContext";
import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ product }) => {
  const { favorites, toggleFavorite, cart, toggleCart, incrementCartItem, decrementCartItem } = useAppContext();

  const isFav = favorites.some(fav => fav.id === product.id);
  const cartItem = cart.find(item => item.id === product.id);

  // precio de la primera variante si existe
  const price = product.variants && product.variants.length > 0
    ? `$${product.variants[0].price}`
    : '$10.00';

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-200 transform
                    hover:scale-105 active:scale-95
                    bg-black/20 backdrop-blur-lg border border-white/20">
      
      {/*img y link*/}
      <Link href={`/product/${product.id}`}>
        <Image
          loader={({ src }) => src}
          src={product.poster_path || "/img/placeholder.png"}
          alt={product.title || "Producto"}
          width={300}
          height={300}
          className="w-full h-64 object-cover"
        />
      </Link>

      {/*info y botones*/}
      <div className="p-4 flex flex-col justify-between h-[180px]">
        <div>
          <h3 className="text-white font-semibold text-lg line-clamp-2">{product.title}</h3>
          <p className="text-gray-200 text-sm mt-1">{price}</p>
        </div>

        <div className="flex justify-between items-center mt-3">
          {/*boton carrito*/}
          {!cartItem ? (
            <button
              onClick={() => toggleCart(product)}
              className="text-white text-2xl w-12 h-12 flex items-center justify-center rounded-full bg-black/60 hover:bg-black transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer"
            >
              +
            </button>
          ) : (
            <div className="flex items-center gap-1 bg-white/20 rounded px-2 py-1">
              <button
                onClick={() => decrementCartItem(product.id)}
                className="text-white font-bold px-1"
              >-</button>
              <span className="text-white font-semibold">{cartItem.quantity}</span>
              <button
                onClick={() => incrementCartItem(product.id)}
                className="text-white font-bold px-1"
              >+</button>
            </div>
          )}

          {/*boton fav*/}
          <button
            onClick={() => toggleFavorite(product)}
            className={`text-2xl transition-transform duration-300 hover:scale-125 cursor-pointer ${isFav ? "text-red-500" : "text-gray-300"}`}
          >
            {isFav ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
