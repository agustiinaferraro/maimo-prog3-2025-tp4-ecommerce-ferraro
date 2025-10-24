'use client';

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AppContext = createContext();
const API_URL = process.env.NEXT_PUBLIC_API_URL

export const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [categories, setCategories] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [fanarts, setFanarts] = useState([]);  

  const checkout = async ({ cart, userEmail, userName, companyName }) => {
    const res = await fetch(`${API_URL}/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart, userEmail, userName, companyName }),
    });
    if (!res.ok) throw new Error("Error al enviar pedido");
    return await res.json();
  };

const fetchFanarts = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/fanart`);
      if (!res.ok) throw new Error("Error al traer los fanarts");
      const data = await res.json();
      setFanarts(data.fanarts || []);
    } catch (err) {
      console.error("Error fetchFanarts:", err);
      setFanarts([]);
    }
}, []);

const fetchConcerts = useCallback(async () => {
  try {
    const res = await fetch(`${API_URL}/tours`);
    const data = await res.json();
    const processed = (data.concerts || []).map(item => ({
      ...item, //copia todas las propiedades 
      id: item._id,
      date: new Date(item.date).getTime(), //para Hero
    }));
    setConcerts(processed);
  } catch (err) {
    console.error(err);
    setConcerts([]);
  }
}, []);


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

//agregar al cardSet o aumenta la cntidad si ya estaba
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
    //crea un nuevo array pero no saca ningun producto del carrito, agrega los nuevos
    return [...prev, { ...product, quantity }];
  });
};

  // carrito
//agrega el producto al carrito o aumenta su cantidad si ya existe
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

//suma 1 a la cantidad del producto si ya esta en el carrito
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


//resta 1 a la cantidad del producto y lo borra si queda en 0
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


//saca del carrito el producto que coincide con id color talle y logo
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

  //productos por ca tegoria
  const fetchProductsByCategory = useCallback(async (categoryId) => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      const rawProducts = Array.isArray(res.data.products) ? res.data.products : []; //array is array verifica si es o no un array

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
        API_URL,   
        checkout,
        fanarts,
        fetchFanarts,
        concerts,
        fetchConcerts,
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