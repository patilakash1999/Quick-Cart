import React, { createContext, useContext, useState, useEffect } from 'react';
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from local storage or initialize as an empty array
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Effect to save the cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...existingProduct, quantity: existingProduct.quantity + quantity } 
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(quantity, 1) } 
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
};

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart,getTotalCount }}>
      {children}
    </CartContext.Provider>
  );
};