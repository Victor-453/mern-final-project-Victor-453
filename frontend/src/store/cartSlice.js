import { createSlice } from '@reduxjs/toolkit';
import {
  getCart,
  setCart as saveCart,
  addToCart as addToLocalCart,
  removeFromCart as removeFromLocalCart,
  updateCartQuantity as updateLocalCartQuantity,
  clearCart as clearLocalCart,
  calculateCartTotal,
  getCartItemCount,
} from '../utils/cart';

const initialState = {
  items: getCart(),
  total: 0,
  itemCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    ...initialState,
    total: calculateCartTotal(initialState.items),
    itemCount: getCartItemCount(initialState.items),
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity, variant } = action.payload;
      const updatedCart = addToLocalCart(product, quantity, variant);
      state.items = updatedCart;
      state.total = calculateCartTotal(updatedCart);
      state.itemCount = getCartItemCount(updatedCart);
    },
    removeFromCart: (state, action) => {
      const { productId, variant } = action.payload;
      const updatedCart = removeFromLocalCart(productId, variant);
      state.items = updatedCart;
      state.total = calculateCartTotal(updatedCart);
      state.itemCount = getCartItemCount(updatedCart);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity, variant } = action.payload;
      const updatedCart = updateLocalCartQuantity(productId, quantity, variant);
      state.items = updatedCart;
      state.total = calculateCartTotal(updatedCart);
      state.itemCount = getCartItemCount(updatedCart);
    },
    clearCart: (state) => {
      clearLocalCart();
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
    syncCart: (state) => {
      const cart = getCart();
      state.items = cart;
      state.total = calculateCartTotal(cart);
      state.itemCount = getCartItemCount(cart);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  syncCart,
} = cartSlice.actions;
export default cartSlice.reducer;
