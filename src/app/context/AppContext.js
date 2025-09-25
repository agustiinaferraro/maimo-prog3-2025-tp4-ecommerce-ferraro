'use client';

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

//context que va a compartir datos en toda la app
const AppContext = createContext();

const API_URL = "https://api.themoviedb.org/3/trending/movie/day?api_key=eb7e3fd7272143562cec959061b5eb32";

export const AppProvider = ({ children }) => {

  //STATES
  const [searchTerm, setSearchTerm] = useState(""); //texto de busqueda global
  const [products, setProducts] = useState([]);     //lista de productos que vienen de la api
  const [favorites, setFavorites] = useState([]);   // productos favoritos del usuario
  const [cart, setCart] = useState([]);             //productos en el carrito, con cantidad

  //FUNCIONES FAVORITOS
  //agrego o quito un producto de fav
  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      if (prev.some(p => p.id === product.id)) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  //FUNCIONES CARRITO
  //agrego o quito un producto del carrito dependiendo si ya estaba
  const toggleCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        //si ya existe, lo saco
        return prev.filter(item => item.id !== product.id);
      } else {
        //si no existe, lo agrego con quantity
        return [...prev, { ...product, quantity }];
      }
    });
  };

  //incrementa cantidad de un producto
  const incrementCartItem = (productId) => {
    setCart((prev) => prev.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  //decrementa cantidad de un producto
  const decrementCartItem = (productId) => {
    setCart((prev) => prev.map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0)); //elimino si cantidad llega a 0
  };

  //quita un producto del carrito
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter(item => item.id !== productId));
  };

  //FUNCIONES PRODUCTOS 
  // obtengo todos los productos de la api
  const fetchAllProducts = useCallback(async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data.results); // TMDB devuelve results
    } catch (err) {
      console.error("Error al hacer el fetch de todos los productos:", err);
    }
  }, []);

  // obtengo un producto por su id
  const fetchProductById = useCallback(async (id) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data;
    } catch (err) {
      console.error("Error al hacer el fetch de los productos por id:", err);
    }
  }, []);

  // obtengo productos por categoria
  const fetchProductsByCategory = useCallback(async (categorySlug) => {
    try {
      const res = await axios.get(`${API_URL}/category/${categorySlug}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error al hacer el fetch de los productos por categoria:", err);
    }
  }, []);

  //LLAMO FETCH DE TODOS LOS PRODUCTOS AL MONTAR EL CONTEXTO
  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  //provider 
  return (
    <AppContext.Provider value={{
      searchTerm,
      setSearchTerm,
      products,
      favorites,
      toggleFavorite,
      cart,
      toggleCart,          //toggle para agregar/quitar
      addToCart: toggleCart, //para compatibilidad
      removeFromCart,
      incrementCartItem,  
      decrementCartItem,   
      fetchAllProducts,
      fetchProductById,
      fetchProductsByCategory
    }}>
      {children} {/* renderiza todo lo que esté dentro del provider */}
    </AppContext.Provider>
  );
};

//hook para usar el context en cualquier componente
export const useAppContext = () => useContext(AppContext);