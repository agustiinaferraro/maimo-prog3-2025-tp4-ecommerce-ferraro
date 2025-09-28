'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppContext } from '@/app/context/AppContext';
import Loading from './Loading';

export default function ProductDetail({ id }) {
  const { products, favorites, toggleFavorite, cart, toggleCart, incrementCartItem, decrementCartItem } = useAppContext();
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  //carga producto desde el contexto
  useEffect(() => {
    if (!products || products.length === 0) return;

    const product = products.find(p => String(p.id) === String(id));
    if (product) setProductDetail(product);
    setLoading(false);
  }, [id, products]);

  // simulacion de variantes si no hay variantes en el back
  const simulatedVariants = productDetail?.variants?.length
    ? productDetail.variants.map(v => ({ color: v.color, sizes: v.sizes, image: v.image, logo: v.color }))
    : [
        { color: 'Rojo', sizes: ['S', 'M', 'L'], logo: 'Logo A', image: '' },
        { color: 'Azul', sizes: ['M', 'L', 'XL'], logo: 'Logo B', image: '' },
        { color: 'Verde', sizes: ['S', 'M'], logo: 'Logo C', image: '' },
      ];

  const [selectedVariant, setSelectedVariant] = useState(simulatedVariants[0]);
  const [selectedSize, setSelectedSize] = useState(simulatedVariants[0].sizes[0]);

  if (loading) return <Loading />;
  if (!productDetail) return <p className="text-red-500 text-center text-2xl mt-20">Producto no encontrado</p>;

  const isFavorite = favorites.some(fav => fav.id === productDetail.id);
  const cartItem = cart.find(item => item.id === productDetail.id);

  return (
    <div className="relative min-h-screen w-full px-5 py-10 flex justify-center">
      {/* fondo */}
      {productDetail.backdrop_path && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={productDetail.backdrop_path}
            alt={`Fondo de ${productDetail.title || 'Sin título'}`}
            fill
            className="object-cover brightness-50 blur-sm"
          />
        </div>
      )}

      <div className="w-[60%] max-w-6xl grid md:grid-cols-2 gap-10 items-center">
        {/*img */}
        <div className="relative w-full flex justify-center">
          <div className="relative w-full max-w-[400px] h-[500px] md:h-[650px] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <Image
              src={selectedVariant.image || productDetail.poster_path}
              alt={`Imagen de ${productDetail.title || 'Sin título'}`}
              fill
              className="object-cover rounded-lg"
            />
            <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-black/70 to-transparent rounded-t-lg pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/90 to-transparent rounded-b-lg pointer-events-none" />
          </div>
        </div>

        {/*info */}
        <div className="flex flex-col justify-center gap-6 w-full relative">
          <h1 className="text-3xl md:text-5xl font-bold">{productDetail.title || 'Sin título'}</h1>
          <p className="text-base md:text-lg leading-relaxed">{productDetail.overview || 'Descripción no disponible'}</p>

          {/*personalizacion */}
          <div className="flex gap-4 mt-4">
            <div>
              <label className="text-white font-semibold mr-2">Talle:</label>
              <select
                value={selectedSize}
                onChange={e => setSelectedSize(e.target.value)}
                className="rounded px-2 py-1"
              >
                {selectedVariant.sizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white font-semibold mr-2">Color:</label>
              <select
                value={selectedVariant.color}
                onChange={e => {
                  const variant = simulatedVariants.find(v => v.color === e.target.value);
                  setSelectedVariant(variant);
                  setSelectedSize(variant.sizes[0]);
                }}
                className="rounded px-2 py-1"
              >
                {simulatedVariants.map(v => (
                  <option key={v.color} value={v.color}>{v.color}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-white font-semibold mr-2">Logo:</label>
              <span className="text-white">{selectedVariant.logo}</span>
            </div>
          </div>

          {/*boton + / - */}
          <div className="flex items-center gap-2 mt-4">
            {!cartItem ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleCart({
                    id: productDetail.id,
                    title: productDetail.title,
                    poster_path: productDetail.poster_path,
                    size: selectedSize,
                    color: selectedVariant.color
                  });
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                +
              </button>
            ) : (
              <>
                <button
                  onClick={(e) => { e.preventDefault(); decrementCartItem(productDetail.id); }}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >-</button>
                <span className="text-white font-semibold">{cartItem.quantity}</span>
                <button
                  onClick={(e) => { e.preventDefault(); incrementCartItem(productDetail.id); }}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >+</button>
              </>
            )}

            {/* fav*/}
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite({
                  id: productDetail.id,
                  title: productDetail.title,
                  poster_path: productDetail.poster_path
                });
              }}
              className={`ml-4 text-2xl ${isFavorite ? 'text-red-500' : 'text-white'}`}
            >
              {isFavorite ? '♥' : '♡'}
            </button>
          </div>
        </div>
      </div>

      {/*boton volver */}
      <div className="absolute top-5 left-5">
        <Link href="/">
          <span className="text-7xl text-white p-6 hover:text-green-500 cursor-pointer">‹</span>
        </Link>
      </div>
    </div>
  );
}
