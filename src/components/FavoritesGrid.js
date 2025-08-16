const FavoritesGrid = () => {
  const { favorites } = useAppContext()

  if (favorites.length === 0) return <p className="text-white text-center text-2xl">No hay favoritos aún</p>

  return (
    <section className="px-10 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {favorites.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}