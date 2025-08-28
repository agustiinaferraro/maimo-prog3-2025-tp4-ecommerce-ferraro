import ProductDetail from "@/components/ProductDetail";

export default function Page({ params }) {
  const { id } = params;
  return <ProductDetail id={id} />;
}
