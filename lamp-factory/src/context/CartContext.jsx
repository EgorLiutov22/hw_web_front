import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setDiscount(0);
  };

  const applyPromoCode = (code) => {
    const promoCodes = {
      'SALE10': 0.10,
      'SALE20': 0.20
    };
    if (promoCodes[code]) {
      setPromoCode(code);
      setDiscount(promoCodes[code]);
      return true;
    }
    return false;
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getDiscountAmount = () => {
    return getCartTotal() * discount;
  };

  const getFinalTotal = () => {
    return getCartTotal() - getDiscountAmount();
  };

  const getFreeDeliveryThreshold = () => 1000;

  const getDeliveryCost = () => {
    const total = getCartTotal();
    return total >= getFreeDeliveryThreshold() ? 0 : 200;
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      promoCode,
      discount,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyPromoCode,
      getCartTotal,
      getDiscountAmount,
      getFinalTotal,
      getFreeDeliveryThreshold,
      getDeliveryCost,
      getCartItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
