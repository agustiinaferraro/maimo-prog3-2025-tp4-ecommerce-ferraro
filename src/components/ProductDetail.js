'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppContext } from '@/app/context/AppContext';
import Loading from './Loading';
import ProductGrid from './ProductGrid';

export default function ProductDetail({ id }) {
  const { 
    products, 
    favorites, 
    toggleFavorite, 
    cart, 
    toggleCart, 
    incrementCartItem, 
    decrementCartItem,
    addToCardSet, 
    searchTerm
  } = useAppContext();

  

  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');

  

  //carga producto y variantes
  useEffect(() => {
    if (!products || products.length === 0) return;

    const product = products.find(p => String(p.id) === String(id)); //find busca el producto con el id que coincida en el array de products y los convierte a string
    if (product) {
      setProductDetail(product);
      setSelectedVariant(product.variants?.[0] || null);
      setSelectedSize(product.variants?.[0]?.sizes?.[0] || '');
    }
    setLoading(false);
  }, [id, products]);

  if (loading) return <Loading />;
  if (!productDetail) return <p className="text-red-500 text-center text-2xl mt-20">Producto no encontrado</p>;

  const isFavorite = favorites.some(fav => fav.id === productDetail.id);

  //busca el item exacto en carrito (por variante)
  const cartItem = cart.find(
    item =>
      item.id === productDetail.id &&
      item.color === selectedVariant?.color &&
      item.size === selectedSize &&
      item.logo === selectedVariant?.logo
  );

  if (searchTerm) {
    return <ProductGrid horizontal />
  }

  return (
    <div className="relative min-h-screen w-full px-5 py-10 flex justify-center">
      {productDetail.backdrop_path && (
        <div className="absolute inset-0 -z-10 bg-white">
          <Image
            src={productDetail.backdrop_path}
            alt={`Fondo de ${productDetail.title || 'Sin título'}`}
            fill
            className="object-cover brightness-50 blur-sm"
          />
        </div>
      )}

      <div className="w-[60%] max-w-6xl grid md:grid-cols-2 gap-3 items-center">
        {/*img*/}
        <div className="relative w-full flex justify-center">
          <div className="relative w-full max-w-[400px] h-[200px] md:h-[450px] bg-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <Image
              src={selectedVariant?.image || productDetail.poster_path}
              alt={`Imagen de ${productDetail.title || 'Sin título'}`}
              fill
              className="object-cover rounded-lg"
            />
            <div className="absolute top-0 left-0 w-full h-1/4  rounded-t-lg pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-1/4  rounded-b-lg pointer-events-none" />
          </div>
        </div>

        {/*info */}
        <div className="flex flex-col justify-center gap-6 w-full relative">
          <h1 className="text-3xl md:text-5xl font-bold">{productDetail.title || 'Sin título'}</h1>

          <p className="text-base md:text-lg leading-relaxed text-white">{productDetail.overview || 'Descripción no disponible'}</p>

          {productDetail.categories?.length > 0 && (
            <p className="text-white italic">Categoría: {productDetail.categories.map(c => c.name).join(", ")}</p>
          )}

          <p className="text-xl font-semibold text-green-400">Precio: ${selectedVariant?.price || productDetail.variants?.[0]?.price || 0}</p>

          {/*personalizacion */}
          {productDetail.variants?.length > 0 && (
            <div className="flex gap-4 mt-4 flex-wrap">
              <div>
                <label className="text-white font-semibold mr-2">Talle:</label>
                {selectedVariant?.sizes?.length > 0 ? (
                  <select
                    value={selectedSize}
                    onChange={e => setSelectedSize(e.target.value)}
                    className="rounded px-2 py-1 bg-white text-black cursor-pointer"
                  >
                    {selectedVariant.sizes.map((size, i) => (
                      <option key={`${productDetail.id}-size-${i}`} value={size}>{size}</option>
                    ))}
                  </select>
                ) : (
                  <span className="text-gray-400 italic">No disponible</span>
                )}
              </div>
              <div>
                <label className="text-white font-semibold mr-2">Color:</label>
                <select
                  value={selectedVariant?.color}
                  onChange={e => {
                    const variant = productDetail.variants.find(v => v.color === e.target.value); //find busca el primer elemento 
                                                                                //del array que cumpla la condicin y lo devuelve

                    setSelectedVariant(variant);
                    setSelectedSize(variant?.sizes?.[0] || '');
                  }}
                  className="rounded px-2 py-1 bg-white text-black cursor-pointer"
                >
                  {productDetail.variants.map((v, i) => (
                    <option key={`${productDetail.id}-variant-${i}`} value={v.color}>{v.color}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-white font-semibold mr-2">Logo:</label>
                {selectedVariant?.logo ? (
                  <span className="text-white">{selectedVariant.logo}</span>
                ) : (
                  <span className="text-gray-400 italic">No disponible</span>
                )}
              </div>
            </div>
          )}

          {/*botones carrito y favs */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            {!cartItem ? (
              <button
                onClick={e => {
                  e.preventDefault();
                  toggleCart({
                    id: productDetail.id,
                    title: productDetail.title,
                    poster_path: productDetail.poster_path,
                    size: selectedSize,
                    color: selectedVariant?.color,
                    logo: selectedVariant?.logo,
                    price: selectedVariant?.price || 0,
                    quantity: 1
                  });
                }}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer"
              >
                +
              </button>
            ) : (
              <>
                <button
                  onClick={e => { e.preventDefault(); decrementCartItem(cartItem); }}
                  className="bg-red-500 text-white px-4 py-2 rounded transform transition-transform duration-300 hover:scale-125 cursor-pointer"
                >-</button>
                <span className="text-white font-semibold">{cartItem.quantity}</span>
                <button
                  onClick={e => { e.preventDefault(); incrementCartItem(cartItem); }}
                  className="bg-green-500 text-white px-4 py-2 rounded transform transition-transform duration-300 hover:scale-125 cursor-pointer"
                >+</button>
              </>
            )}

            <button
              onClick={e => {
                e.preventDefault();
                toggleFavorite({
                  id: productDetail.id,
                  title: productDetail.title,
                  poster_path: productDetail.poster_path,
                  size: selectedSize,
                  color: selectedVariant?.color,
                  logo: selectedVariant?.logo,
                  price: selectedVariant?.price || 0
                });
                addToCardSet({
                  id: productDetail.id,
                  title: productDetail.title,
                  poster_path: productDetail.poster_path,
                  price: selectedVariant?.price || 0
                });
              }}
              className={`ml-4 text-2xl transition-transform duration-300 hover:scale-125 cursor-pointer ${isFavorite ? 'text-red-500' : 'text-white'}`}
            >
              {isFavorite ? '♥' : '♡'}
            </button>
          </div>
        </div>
      </div>

      <div className="absolute top-5 left-5">
        <Link href="/">
          <span className="text-7xl text-white p-6 hover:text-green-500 cursor-pointer">‹</span>
        </Link>
      </div>
    </div>
  );
}
