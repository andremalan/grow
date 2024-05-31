import { createContext, useState } from "react";
import { CartItem } from "../components/cart";

export type CartElement = { item: CartItem; quantity: number };

type CartState = Record<string, CartElement>;

type CartContextType = {
  items: CartElement[];
  addItems: (items: CartItem[]) => void;
};

export const CartContext = createContext<CartContextType>({
  items: [],
  addItems: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<CartState>({});
  const addItems = function (items: CartItem[]) {
    const newCart = { ...cart };
    for (const item of items) {
      if (newCart[item.identifier]) {
        newCart[item.identifier].quantity += 1;
      } else {
        newCart[item.identifier] = { item, quantity: 1 };
      }
    }

    setCart(newCart);
  };
  return (
    <CartContext.Provider value={{ items: Object.values(cart), addItems }}>
      {children}
    </CartContext.Provider>
  );
}
