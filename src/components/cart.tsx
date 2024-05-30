import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { createContext } from "react";
import { formatPrice } from "../utils/formatPrice";
export type CartItem = {
  identifier: string;
  label: string;
  price: number;
};
type CartContextType = {
  items: CartItem[];
  addItems: (items: CartItem[]) => void;
};
export const CartContext = createContext<CartContextType>({
  items: [],
  addItems: () => {},
});

export function Cart({ items }: { items: CartItem[] }) {
  return (
    <Box>
      <h1>Cart</h1>
      <VStack>
        {items &&
          items.map((item) => (
            <HStack key={item.identifier}>
              <Box>{item.label}</Box>
              <Box>{formatPrice(item.price)}</Box>
            </HStack>
          ))}
        {items.length !== 0 && <Button>Checkout</Button>}
      </VStack>
    </Box>
  );
}
