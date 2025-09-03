'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useAppContext } from '@/app/context/AppContext';

export default function ProductDetail({ id }) {
  const { favorites, toggleFavorite } = useAppContext();
  const [productDetail, setProductDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=eb7e3fd7272143562cec959061b5eb32`;

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(API_URL);
        setProductDetail(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Hubo un error', error);
        setError('Error al cargar el disco');
      }
    };
    fetchProductDetail();
  }, [id]);

  const isFavorite = favorites.some(fav => fav.id === productDetail.id);

  const handleFavorite = (e) => {
    e.preventDefault();
    toggleFavorite({
      id: productDetail.id,
      title: productDetail.title,
      poster_path: productDetail.poster_path
    });
  };

  if (loading) return <p className="text-white text-center text-2xl mt-20">Loading...</p>;
  if (error) return <p className="text-red-500 text-center text-2xl mt-20">{error}</p>;

  return (
    <div className="relative min-h-screen w-full px-5 py-10 flex justify-center">
      
      {/* Fondo difuminado horizontal */}
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
        <div className="flex flex-col justify-center gap-6 w-full">
          <h1 className="text-3xl md:text-5xl font-bold">{productDetail.title}</h1>
          <p className="text-base md:text-lg leading-relaxed">{productDetail.overview}</p>

          {/*cora de favis */}
          <button
            onClick={handleFavorite}
            className={`absolute md:relative bottom-3 right-51 text-3xl transition-transform duration-300 hover:scale-125 active:scale-110 cursor-pointer ${
              isFavorite ? 'text-red-500 hover:text-red-600' : 'text-white hover:text-gray-300'
            }`}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>
      </div>

      {/* btn back */}
      <div className="absolute top-5 left-5">
        <Link href="/">
          <span className="text-7xl text-white py-6 hover:text-green-500 active:text-green-600 cursor-pointer">
            ‹
          </span>
        </Link>
      </div>
    </div>
  );
}