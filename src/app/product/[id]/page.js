'use client';

import { useEffect, useState } from 'react';
import { useAppContext } from '@/app/context/AppContext';
import ProductDetail from '@/components/ProductDetail';
import Loading from '@/components/Loading';
import { useParams } from 'next/navigation';

export default function Page() {
  const { products, fetchProductById } = useAppContext();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;

    const id = params.id;
    setLoading(true);

    // prumero busca en productos del contexto
    const found = products.find(p => String(p.id) === String(id));

    if (found) {
      setProduct(found);
      setLoading(false);
    } else {
      // Si no esta hace fetch desde la apu
      fetchProductById(id).then(p => {
        if (p) setProduct(p);
        setLoading(false);
      });
    }
  }, [params, products, fetchProductById]);

  if (loading) return <Loading />;

  if (!product) return (
    <div className="text-white text-center mt-20 text-xl">
      Producto no encontrado
    </div>
  );

  return <ProductDetail id={product.id} />;
}
