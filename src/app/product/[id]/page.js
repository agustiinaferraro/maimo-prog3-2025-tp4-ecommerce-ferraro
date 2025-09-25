import ProductDetail from "@/components/ProductDetail";

export default function Page({ params }) { // params trae lo que esta en la URL 
                                          // (por ej /disco/123) para poder usarlo dentro del componente

  const id = params.id; //desestructura id de params (ej de id/123 extrae 123)
  return <ProductDetail id={id} />; //se le pasa el id
}
