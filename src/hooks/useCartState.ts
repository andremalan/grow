import { useState } from "react";
import { CartElement, CartItem } from "../components/cart";

type CartState = Record<string, CartElement>;

export const useCartState = () => {
  const [cart, setCart] = useState<CartState>({});
  const updateCart = function (items: CartItem[]) {
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
  return { cart: Object.values(cart), updateCart };
};
