'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useAppContext } from '@/app/context/AppContext';
import Loading from './Loading';

export default function ProductDetail({ id }) {
  const { favorites, toggleFavorite, cart, toggleCart } = useAppContext(); //agarra el fav y funcion para sacar/agregar del context + carrito
  const [productDetail, setProductDetail] = useState({}); //guarda lso datos de los productos que se muestran
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=eb7e3fd7272143562cec959061b5eb32`;

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true); //empieza la carga
      try {
        const response = await axios.get(API_URL);
        setProductDetail(response.data); //guardalos datos de la api en el estado
        setLoading(false);//termina la carga
      } catch (error) {
        console.log('Hubo un error', error);
        setError('Error al cargar el disco');
      }
    };
    fetchProductDetail();
  }, [id]); //si se vuelve a aejecutar cambia el id del producot

  const isFavorite = favorites.some(fav => fav.id === productDetail.id); //verifica si el producto ya esta en fav
  const isInCart = cart.some(item => item.id === productDetail.id); //verifica si el producto ya esta en carrito

  const handleFavorite = (e) => {
    e.preventDefault(); //evita que navegue
    toggleFavorite({ //agrea o quita fav
      id: productDetail.id,
      title: productDetail.title,
      poster_path: productDetail.poster_path
    });
  };

  const handleCart = (e) => {
    e.preventDefault(); //evita que navegue
    toggleCart({ //agrega o quita del carrito
      id: productDetail.id,
      title: productDetail.title,
      poster_path: productDetail.poster_path
    });
  };

  if (loading) return <Loading />
  if (error) return <p className="text-red-500 text-center text-2xl mt-20">{error}</p>;

  return (
    <div className="relative min-h-screen w-full px-5 py-10 flex justify-center">
      
      {/*fondo difuminado horizontal */}
      {productDetail.backdrop_path && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={`https://image.tmdb.org/t/p/original/${productDetail.backdrop_path}`}
            alt={productDetail.title}
            fill
            className="object-cover brightness-50 blur-sm"
          />
        </div>
      )}

      {/*cont central del contenido */}
      <div className="w-[60%] max-w-6xl grid md:grid-cols-2 gap-10 items-center">
        
        {/*img vertical con gradientes */}
        <div className="relative w-full flex justify-center">
          <div className="relative w-full max-w-[400px] h-[500px] md:h-[650px] rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <Image
              src={`https://image.tmdb.org/t/p/original/${productDetail.poster_path}`}
              alt={productDetail.title}
              fill
              className="object-cover rounded-lg"
            />

            {/*gradiente superior*/}
            <div className="absolute top-0 left-0 w-full h-1/4 bg-gradient-to-b from-black/70 to-transparent rounded-t-lg pointer-events-none" />

            {/*gradiente inferior */}
            <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/90 to-transparent rounded-b-lg pointer-events-none" />
          </div>
        </div>

        {/*info */}
        <div className="flex flex-col justify-center gap-6 w-full relative">
          <h1 className="text-3xl md:text-5xl font-bold">{productDetail.title}</h1>
          <p className="text-base md:text-lg leading-relaxed">{productDetail.overview}</p>

          {/* contenedor de botones */}
          <div className="flex items-center gap-4 absolute md:relative bottom-3 right-1">
            
            {/* carrito */}
            <button
              onClick={handleCart}
              className={`text-3xl transition-transform duration-200 hover:scale-110 cursor-pointer ${
                isInCart ? 'text-green-500' : 'text-white hover:text-gray-300'
              }`}
            >
              {/* carrito */}
              <svg xmlns="http://www.w3.org/2000/svg" fill={isInCart ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7H19m-12 0a1 1 0 100 2 1 1 0 000-2zm10 0a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
            </button>

            {/*cora de favis */}
            <button
              onClick={handleFavorite}
              className={`text-3xl transition-transform duration-200 hover:scale-110 cursor-pointer ${
                isFavorite ? 'text-red-500 hover:text-red-600' : 'text-white hover:text-gray-300'
              }`}
            >
              {isFavorite ? '♥' : '♡'}
            </button>
          </div>
        </div>
      </div>

      {/* btn back */}
      <div className="absolute top-5 left-5">
        <Link href="/">
          <span className="text-7xl text-white p-6 hover:text-green-500 active:text-green-600 cursor-pointer">
            ‹
          </span>
        </Link>
      </div>
    </div>
  );
}