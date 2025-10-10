'use client';

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AppContext = createContext();
const API_URL = "http://localhost:4000";

export const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);

  // favs
  const toggleFavorite = (product) => {
    setFavorites(prev =>
      prev.some(p => p.id === product.id)//some verifica si algun elemento cumple con la condicion
        ? prev.filter(p => p.id !== product.id)//filter crea un array con los elementos que cumplan esa condicion
        : [...prev, product]//actualozo
    );
  };


//state para conteo total por producto
const [cardSet, setCardSet] = useState([]); 

//agregar al cardSet
const addToCardSet = (product, quantity = 1) => {
  setCardSet(prev => {
    // find busca si ya existe el producto (solo por id)
    const existing = prev.find(item => item.id === product.id);
    if (existing) {
      //si existe suma la cantidad
      return prev.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    }
    //si no existe agrega el producto
    return [...prev, { ...product, quantity }];
  });
};

  // carrito
const toggleCart = (product, quantity = 1) => {
  setCart(prev => {
    //busca item idntico (id + color + size + logo)
    const existing = prev.find(
      item =>
        item.id === product.id &&
        item.color === product.color &&
        item.size === product.size &&
        item.logo === product.logo
    );

    if (existing) {
      //si existe suma cantidad
      return prev.map(item =>
        item.id === product.id &&
        item.color === product.color &&
        item.size === product.size &&
        item.logo === product.logo
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    }
    //si no existe agrega nuevo item
    return [...prev, { ...product, quantity }];
  });
};

const incrementCartItem = (product) => {
  setCart(prev => //prev es el carrito 
    prev.map(item => //item es cada producto del carrito
      item.id === product.id && //product es el que se esta intentando agregar
      item.color === product.color &&
      item.size === product.size &&
      item.logo === product.logo
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decrementCartItem = (product) => {
  setCart(prev =>
    prev
      .map(item =>
        item.id === product.id &&
        item.color === product.color &&
        item.size === product.size &&
        item.logo === product.logo
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
  );
};

const removeFromCart = (product) => {
  setCart(prev =>
    prev.filter(
      item =>
        !(
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size &&
          item.logo === product.logo
        )
    )
  );
};


  // vacia carrito
  const clearCart = () => setCart([]);

  //fetch productos
  const fetchAllProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      const rawProducts = Array.isArray(res.data.products) ? res.data.products : []; //veirifico si es o no un array lo que recibo

      const data = rawProducts.map(product => ({ //obtengo y transformi el valor de los productos
        id: product._id,
        title: product.title,
        overview: product.overview,
        poster_path: product.poster_path ? `${API_URL}${product.poster_path}` : "/img/placeholder.png",
        backdrop_path: product.backdrop_path ? `${API_URL}${product.backdrop_path}` : "/img/placeholder.png",
        categories: (product.categories || []).map(c => ({
          _id: c._id,
          name: c.name,
          slug: c.slug
        })),
        variants: (product.variants || []).map(v => ({
          color: v.color,
          image: v.image ? `${API_URL}${v.image}` : "/img/placeholder.png",
          sizes: v.sizes,
          price: v.price
        }))
      }));

      setProducts(data);
    } catch (err) {
      console.error("Error fetchAllProducts:", err);
      setProducts([]);
    }
  }, []);

  // fetch categorias
  const fetchCategories = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/categories`);
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error("Error fetchCategories:", err);
      setCategories([]);
    }
  }, []);

  //productos por categoria
  const fetchProductsByCategory = useCallback(async (categoryId) => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      const rawProducts = Array.isArray(res.data.products) ? res.data.products : [];

      const filtered = rawProducts
        .filter(p => p.categories.some(c => c._id === categoryId))
        .map(product => ({
          id: product._id,
          title: product.title,
          overview: product.overview,
          poster_path: product.poster_path ? `${API_URL}${product.poster_path}` : "/img/placeholder.png",
          backdrop_path: product.backdrop_path ? `${API_URL}${product.backdrop_path}` : "/img/placeholder.png",
          categories: (product.categories || []).map(c => ({
            _id: c._id,
            name: c.name,
            slug: c.slug
          })),
          variants: (product.variants || []).map(v => ({
            color: v.color,
            image: v.image ? `${API_URL}${v.image}` : "/img/placeholder.png",
            sizes: v.sizes,
            price: v.price
          }))
        }));

      setProducts(filtered);
    } catch (err) {
      console.error("Error fetchProductsByCategory:", err);
      setProducts([]);
    }
  }, []);

  //producto por id
  const fetchProductById = useCallback(async (productId) => {
    try {
      const res = await axios.get(`${API_URL}/products/${productId}`);
      const product = res.data.product;

      if (!product) return null;

      return {
        id: product._id,
        title: product.title,
        overview: product.overview,
        poster_path: product.poster_path ? `${API_URL}${product.poster_path}` : "/img/placeholder.png",
        backdrop_path: product.backdrop_path ? `${API_URL}${product.backdrop_path}` : "/img/placeholder.png",
        categories: (product.categories || []).map(c => ({
          _id: c._id,
          name: c.name,
          slug: c.slug
        })),
        variants: (product.variants || []).map(v => ({
          color: v.color,
          image: v.image ? `${API_URL}${v.image}` : "/img/placeholder.png",
          sizes: v.sizes,
          price: v.price
        }))
      };
    } catch (err) {
      console.error("Error fetchProductById:", err);
      return null;
    }
  }, []);

  useEffect(() => {
    fetchAllProducts();
    fetchCategories();
  }, [fetchAllProducts, fetchCategories]);

  return (
    <AppContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        products,
        favorites,
        toggleFavorite,
        cart,
        toggleCart,
        removeFromCart,
        incrementCartItem,
        decrementCartItem,
        clearCart, //vacia carrito
        categories,
        fetchProductsByCategory,
        fetchProductById,
        fetchAllProducts, 
        fetchCategories,
        cardSet,       
        addToCardSet 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);