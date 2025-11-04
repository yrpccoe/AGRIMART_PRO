import { Product } from "@/data/products";

export interface CartItem extends Product {
  quantity: number;
}

const CART_STORAGE_KEY = "agrimart_cart";

export function getCart(): CartItem[] {
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

export function addToCart(product: Product, quantity: number = 1): CartItem[] {
  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === product.id);

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveCart(cart);
  return cart;
}

export function removeFromCart(productId: number): CartItem[] {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  return cart;
}

export function updateQuantity(productId: number, quantity: number): CartItem[] {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === productId);

  if (itemIndex >= 0) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    cart[itemIndex].quantity = quantity;
    saveCart(cart);
  }

  return cart;
}

export function clearCart(): void {
  localStorage.removeItem(CART_STORAGE_KEY);
}

export function getCartTotal(): number {
  return getCart().reduce((total, item) => total + (item.price * item.quantity), 0);
}

export function getCartCount(): number {
  return getCart().reduce((count, item) => count + item.quantity, 0);
}
