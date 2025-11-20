// Cart utilities
export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const setCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToCart = (product, quantity = 1, variant = null) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(
    (item) =>
      item._id === product._id &&
      JSON.stringify(item.variant) === JSON.stringify(variant)
  );

  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity,
      variant,
    });
  }

  setCart(cart);
  return cart;
};

export const removeFromCart = (productId, variant = null) => {
  const cart = getCart();
  const updatedCart = cart.filter(
    (item) =>
      !(
        item._id === productId &&
        JSON.stringify(item.variant) === JSON.stringify(variant)
      )
  );
  setCart(updatedCart);
  return updatedCart;
};

export const updateCartQuantity = (productId, quantity, variant = null) => {
  const cart = getCart();
  const itemIndex = cart.findIndex(
    (item) =>
      item._id === productId &&
      JSON.stringify(item.variant) === JSON.stringify(variant)
  );

  if (itemIndex !== -1) {
    if (quantity <= 0) {
      return removeFromCart(productId, variant);
    }
    cart[itemIndex].quantity = quantity;
    setCart(cart);
  }
  return cart;
};

export const clearCart = () => {
  localStorage.removeItem('cart');
  return [];
};

export const calculateCartTotal = (cart) => {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

export const getCartItemCount = (cart) => {
  return cart.reduce((count, item) => count + item.quantity, 0);
};
