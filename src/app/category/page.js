'use client';

import { useEffect, useState } from 'react';
import { useAppContext } from '@/app/context/AppContext';
import ProductGrid from '@/components/ProductGrid';
import Loading from '@/components/Loading';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const CategoryPage = () => {
  const { slug } = useParams(); // captura el slug de la url
  const { categories, fetchProductsByCategory, products } = useAppContext();
  const [categoryId, setCategoryId] = useState(null);
  const [loading, setLoading] = useState(true);

  //busco el id de la categoria (segun el slug)
  useEffect(() => {
    if (!categories || categories.length === 0) return;

    const cat = categories.find(c => c.slug === slug);
    if (cat) {
      setCategoryId(cat._id);
    } else {
      setCategoryId(null);
    }
  }, [slug, categories]);

  //traigo los productos de esa categoriaa
  useEffect(() => {
    if (!categoryId) return;

    setLoading(true);
    fetchProductsByCategory(categoryId).finally(() => setLoading(false)); //cuando termina deja de cargar
  }, [categoryId, fetchProductsByCategory]);

  if (loading) return <Loading />;
  if (!categoryId) return (
    <div className="text-white text-center mt-20">
      Categoría no encontrada
    </div>
  );

  return (
    <div className="mt-20 relative min-h-screen">
      {/*boton volver */}
      <div className="fixed top-[90px] left-10 z-10">
        <Link href="/merch">
          <span className="text-7xl text-white hover:text-green-500 active:text-green-600 cursor-pointer">
            ‹
          </span>
        </Link>
      </div>

      <h2 className="px-10 text-3xl font-bold mb-10 text-left text-white">
        {categories.find(c => c._id === categoryId)?.name || 'Categoría'}
      </h2>

      {/*grilla con los productos de la categoria */}
      <ProductGrid selectedCategory={categoryId} />
    </div>
  );
};

export default CategoryPage;