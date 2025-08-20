'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetail({ id }) {
  const [productDetail, setProductDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=eb7e3fd7272143562cec959061b5eb32`;

  useEffect(() => {
    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get (API_URL);
        setProductDetail(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Hubo un error", error);
        setError("Error al cargar el disco");
      }  
    };
  fetchProductDetail();
  }, [id]);
  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className='grid'>
          <div className='col_6  flex justify-center p-10'>
            <div className='relative w-[500px] h-[500px] text-white'>
              <Image
                src={`https://image.tmdb.org/t/p/original/${productDetail.poster_path}`}
                fill={true}
                alt={productDetail.title}
              />
            </div>
          </div>
          <div className='col_6 flex flex-col justify-center p-10'>
            <h1 className='text-2xl font-bold mb-8'>{productDetail.title}</h1>
            <p className='mb-10'>{productDetail.overview}</p>

            <div className='flex gap-5'>
              <Link
                className='bg-white rounded-xl p-2 w-[150px] text-black text-center hover:bg-opacity-50'
                href='/'
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}