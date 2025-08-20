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

  const handleFavorite = () => {
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
      
      {/* Botón Back */}
      <div className="absolute top-5 left-5">
        <Link
          href="/"
          className="text-white text-3xl font-bold hover:text-gray-300 transition"
        >
          &lt;
        </Link>
      </div>

      {/* Contenedor central */}
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">
        
        {/* Imagen */}
        <div className="flex justify-center w-full">
          <div className="relative w-full max-w-[500px] h-[300px] md:h-[500px]">
            <Image
              src={`https://image.tmdb.org/t/p/original/${productDetail.poster_path}`}
              fill
              alt={productDetail.title}
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Información */}
        <div className="flex flex-col justify-center gap-6 w-full">
          <h1 className="text-2xl md:text-4xl font-bold">{productDetail.title}</h1>
          <p className="text-base md:text-lg leading-relaxed">{productDetail.overview}</p>

          {/* Corazón de favoritos */}
          <button
            className={`text-3xl transition-colors w-max mt-4 ${
              isFavorite ? 'text-red-500' : 'text-white'
            }`}
            onClick={handleFavorite}
          >
            ♥
          </button>
        </div>
      </div>
    </div>
  );
}