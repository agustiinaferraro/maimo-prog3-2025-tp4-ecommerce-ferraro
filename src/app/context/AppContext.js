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

  //  favs 
  const toggleFavorite = (product) => {
    setFavorites(prev =>
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  // carrito
  const toggleCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const incrementCartItem = (productId) => {
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementCartItem = (productId) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  // fetch productds
  const fetchAllProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      let rawProducts = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.products)
        ? res.data.products
        : res.data._id
        ? [res.data]
        : [];

      const data = rawProducts.map(product => ({
        id: product._id?.$oid || product._id || product.id,
        title: product.title,
        overview: product.overview,
        poster_path: `${API_URL}${product.poster_path}`,
        backdrop_path: `${API_URL}${product.backdrop_path}`,
        variants: product.variants?.map(v => ({
          color: v.color,
          image: `${API_URL}${v.image}`,
          sizes: v.sizes,
          price: v.price
        })) || []
      }));

      setProducts(data);
    } catch (err) {
      console.error("Error fetchAllProducts:", err);
      setProducts([]);
    }
  }, []);

  const fetchProductById = useCallback(async (id) => {
    try {
      const res = await axios.get(`${API_URL}/products/${id}`);
      const product = res.data;
      if (!product) return null;

      return {
        id: product._id?.$oid || product.id,
        title: product.title,
        overview: product.overview,
        poster_path: `${API_URL}${product.poster_path}`,
        backdrop_path: `${API_URL}${product.backdrop_path}`,
        variants: product.variants?.map(v => ({
          color: v.color,
          image: `${API_URL}${v.image}`,
          sizes: v.sizes,
          price: v.price
        })) || []
      };
    } catch (err) {
      console.error("Error fetchProductById:", err);
    }
  }, []);

  const fetchProductsByCategory = useCallback(async (categorySlug) => {
    try {
      const res = await axios.get(`${API_URL}/category/${categorySlug}`);
      let rawProducts = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.products)
        ? res.data.products
        : res.data._id
        ? [res.data]
        : [];

      const data = rawProducts.map(product => ({
        id: product._id?.$oid || product._id || product.id,
        title: product.title,
        overview: product.overview,
        poster_path: `${API_URL}${product.poster_path}`,
        backdrop_path: `${API_URL}${product.backdrop_path}`,
        variants: product.variants?.map(v => ({
          color: v.color,
          image: `${API_URL}${v.image}`,
          sizes: v.sizes,
          price: v.price
        })) || []
      }));

      setProducts(data);
    } catch (err) {
      console.error("Error fetchProductsByCategory:", err);
    }
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

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
        fetchAllProducts,
        fetchProductById,
        fetchProductsByCategory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
