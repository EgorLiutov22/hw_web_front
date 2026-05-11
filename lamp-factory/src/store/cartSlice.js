import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    promoCode: '',
    discount: 0
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== productId);
      } else {
        const item = state.items.find(item => item.id === productId);
        if (item) item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.promoCode = '';
      state.discount = 0;
    },
    applyPromoCode: (state, action) => {
      const promoCodes = { 'SALE10': 0.10, 'SALE20': 0.20 };
      if (promoCodes[action.payload]) {
        state.promoCode = action.payload;
        state.discount = promoCodes[action.payload];
      }
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, applyPromoCode } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartPromoCode = (state) => state.cart.promoCode;
export const selectCartDiscount = (state) => state.cart.discount;
export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectDiscountAmount = (state) => selectCartTotal(state) * state.cart.discount;
export const selectFinalTotal = (state) => selectCartTotal(state) - selectDiscountAmount(state);
export const selectDeliveryCost = (state) => {
  const total = selectCartTotal(state);
  return total >= 1000 ? 0 : 200;
};
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;