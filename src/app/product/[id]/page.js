'use client';

import { useEffect, useState } from 'react';
import { useAppContext } from '@/app/context/AppContext';
import ProductDetail from '@/components/ProductDetail';
import Loading from '@/components/Loading';
import { useParams } from 'next/navigation';

export default function Page() {
  const { products } = useAppContext();
  const params = useParams();           // obtiene params 
  const [id, setId] = useState(null);

  useEffect(() => {
    if (params?.id) setId(params.id);  //accede a id
  }, [params]);

  // espera que los productos se carguen antes de mostrar detalle
  if (!id || !products || products.length === 0) return <Loading />;

  return <ProductDetail id={id} />;
}
