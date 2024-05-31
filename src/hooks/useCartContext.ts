import { useContext } from "react";
import { CartContext } from "../contexts/cartContextProvider";

export const useCartContext = () => {
  return useContext(CartContext);
};
