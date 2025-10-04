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

  //favs
  const toggleFavorite = (product) => {
    setFavorites(prev =>
      prev.some(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };

  //carrito
  const toggleCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
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

  //fetch productos
  const fetchAllProducts = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      const rawProducts = Array.isArray(res.data.products) ? res.data.products : [];

      const data = rawProducts.map(product => ({
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

  // funciones con usecallback

  // obtiene productos de una categoria especofica
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

  //obtoen un producto por id
  const fetchProductById = useCallback(async (productId) => {
    try {
      const res = await axios.get(`${API_URL}/products/${productId}`);
      const product = res.data.product;

      if (!product) return null;

      const formatted = {
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

      return formatted;
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
        categories,
        fetchProductsByCategory,
        fetchProductById,
        fetchAllProducts, 
        fetchCategories
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
