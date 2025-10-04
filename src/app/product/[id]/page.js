'use client';

import { useEffect, useState } from 'react';
import { useAppContext } from '@/app/context/AppContext';
import ProductDetail from '@/components/ProductDetail';
import Loading from '@/components/Loading';
import { useParams } from 'next/navigation';

export default function Page() {
  const { products, fetchProductById } = useAppContext();
  const params = useParams();           // obtiene params 
  const [id, setId] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (params?.id) setId(params.id);  // accede a id
  }, [params]);

  // carga producto desde contexto o fetch si no está
  useEffect(() => {
    if (!id) return;

    const found = products.find(p => String(p._id) === String(id));
    if (found) setProduct(found);
    else {
      fetchProductById(id).then(p => setProduct(p));
    }
  }, [id, products, fetchProductById]);

  // espera que el producto se cargue antes de mostrar detalle
  if (!product) return <Loading />;

  return <ProductDetail id={product._id} />; // pasar _id
}