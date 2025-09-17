'use client';

import { createContext, useContext, useState, useEffect } from "react"; 

const AppContext = createContext();  // variable que comparte datos a toda la app

export const AppProvider = ({ children }) => { //children es todo lo que esta dentro del provider
  
  const [searchTerm, setSearchTerm] = useState(""); // estado para el texto de busqueda 

  const [products, setProducts] = useState([]); // lista de productos que vienen de la api

  const [favorites, setFavorites] = useState([]); // lista de productos favoritos

  const [cart, setCart] = useState([]); // lista de productos en el carrito

  // funcion para agregar o quitar favoritos
  const toggleFavorite = (product) => {
    setFavorites((prev) => { //prev es el array de favs
      if (prev.some(p => p.id === product.id)) { // al array le aplico el metodo some para verificar 
                                                // si cada p (c/elemento) cumple con el id de lo que se esta tocando
        return prev.filter(p => p.id !== product.id) // si ya esta, lo saca, filter crea un array con los datos actuales
      } else {
        return [...prev, product] // si no esta, lo agrega con el spread operator
      }
    })
  }

  // funcion para agregar o quitar del carrito
  const toggleCart = (product) => {
    setCart((prev) => { //prev es el array del carrito
      if (prev.some(p => p.id === product.id)) { // verifica si el producto ya esta en el carrito
        return prev.filter(p => p.id !== product.id) // si esta, lo saca
      } else {
        return [...prev, product] // si no esta, lo agrega
      }
    })
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=eb7e3fd7272143562cec959061b5eb32`); // cambiar link cuando tenga la api
        const data = await res.json(); //res es el objeto que devuelve fetch, await espera a que se convierta en un objeto js con .json()
        setProducts(data.results); // guarda los productos en el estado global
      } catch (err) {
        console.error("Error fetching products:", err); // muestra el error en consola
      }
    }

    fetchProducts();
  }, []); //el array vacio significa que se ejecuta el useeffect solo una vez

  return (
    <AppContext.Provider value={{ searchTerm, setSearchTerm, products, favorites, toggleFavorite, cart, toggleCart }}>
      {/*expone estos valores/funciones a todos los componentes hijos */}
      {children}                                        
      {/* renderiza lo que envuelva con el provider */}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);