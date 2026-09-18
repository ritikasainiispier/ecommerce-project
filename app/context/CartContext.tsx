"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedCart = localStorage.getItem("cart");

      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch {
          localStorage.removeItem("cart");
        }
      }

      setLoaded(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, loaded]);

  function addToCart(item: CartItem) {
    setCart((currentCart) => {
      const existingIndex = currentCart.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.size === item.size
      );

      if (existingIndex !== -1) {
        return currentCart.map((cartItem, index) =>
          index === existingIndex
            ? {
                ...cartItem,
                quantity: cartItem.quantity + item.quantity,
              }
            : cartItem
        );
      }

      return [...currentCart, item];
    });
  }

  function removeFromCart(index: number) {
    setCart((currentCart) =>
      currentCart.filter((_, itemIndex) => itemIndex !== index)
    );
  }

  function updateQuantity(index: number, quantity: number) {
    if (quantity < 1) return;

    setCart((currentCart) =>
      currentCart.map((item, itemIndex) =>
        itemIndex === index ? { ...item, quantity } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}