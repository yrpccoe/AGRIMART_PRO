import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as cart from './cart';
import { Product } from '@/data/products';

// Helper to create a sample product
function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: overrides.id ?? 999,
    name: overrides.name ?? 'Test Product',
    category: overrides.category ?? 'Test',
    price: overrides.price ?? 100,
    brand: overrides.brand ?? 'TestBrand',
    description: overrides.description ?? 'desc',
    image: overrides.image ?? 'img',
  } as Product;
}

// Simple in-memory localStorage mock
class LocalStorageMock {
  store: Record<string, string> = {};
  clear() { this.store = {}; }
  getItem(key: string) { return this.store[key] ?? null; }
  setItem(key: string, value: string) { this.store[key] = String(value); }
  removeItem(key: string) { delete this.store[key]; }
}

describe('cart utilities', () => {
  const storage = new LocalStorageMock();

  beforeEach(() => {
    storage.clear();
    // replace global localStorage with our mock
  // @ts-expect-error - provide a mocked localStorage for tests
  global.localStorage = storage;
    vi.resetModules();
  });

  it('starts empty', () => {
    expect(cart.getCart()).toEqual([]);
    expect(cart.getCartCount()).toBe(0);
    expect(cart.getCartTotal()).toBe(0);
  });

  it('adds item to cart', () => {
    const p = makeProduct({ id: 1, price: 50 });
    const res = cart.addToCart(p, 2);
    expect(res).toHaveLength(1);
    expect(res[0].quantity).toBe(2);
    expect(cart.getCartCount()).toBe(2);
    expect(cart.getCartTotal()).toBe(100);
  });

  it('increments quantity if same product added again', () => {
    const p = makeProduct({ id: 2, price: 30 });
    cart.addToCart(p, 1);
    const res = cart.addToCart(p, 3);
    expect(res).toHaveLength(1);
    expect(res[0].quantity).toBe(4);
    expect(cart.getCartCount()).toBe(4);
    expect(cart.getCartTotal()).toBe(120);
  });

  it('removes item by id', () => {
    const p1 = makeProduct({ id: 3, price: 20 });
    const p2 = makeProduct({ id: 4, price: 40 });
    cart.addToCart(p1, 1);
    cart.addToCart(p2, 2);
    const after = cart.removeFromCart(3);
    expect(after.find(i => i.id === 3)).toBeUndefined();
    expect(after).toHaveLength(1);
    expect(cart.getCartTotal()).toBe(80);
  });

  it('updates quantity and removes when quantity <= 0', () => {
    const p = makeProduct({ id: 5, price: 10 });
    cart.addToCart(p, 5);
    const updated = cart.updateQuantity(5, 2);
    expect(updated.find(i => i.id === 5)?.quantity).toBe(2);
    expect(cart.getCartTotal()).toBe(20);

    const afterRemove = cart.updateQuantity(5, 0);
    expect(afterRemove.find(i => i.id === 5)).toBeUndefined();
  });

  it('clears the cart', () => {
    const p = makeProduct({ id: 6, price: 11 });
    cart.addToCart(p, 1);
    cart.clearCart();
    expect(cart.getCart()).toEqual([]);
    expect(storage.getItem('agrimart_cart')).toBeNull();
  });

  it('persists and reloads cart from localStorage', () => {
    const p = makeProduct({ id: 7, price: 7 });
    cart.addToCart(p, 3);

    // simulate module reload by re-importing (modules use getCart which reads storage)
    // It should read from our mocked storage
    const reloaded = cart.getCart();
    expect(reloaded).toHaveLength(1);
    expect(reloaded[0].quantity).toBe(3);
  });
});
