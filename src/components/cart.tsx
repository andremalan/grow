import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { createContext } from "react";
import { formatPrice } from "../utils/formatPrice";
export type CartItem = {
  identifier: string;
  label: string;
  price: number;
};
type CartContextType = {
  items: { item: CartItem; quantity: number }[];
  addItems: (items: CartItem[]) => void;
};
export const CartContext = createContext<CartContextType>({
  items: [],
  addItems: () => {},
});

export type CartElement = { item: CartItem; quantity: number };

export function Cart({ items }: { items: CartElement[] }) {
  return (
    <Box>
      <h1>Cart</h1>
      <VStack>
        {items &&
          items.map((item) => (
            <HStack key={item.item.identifier}>
              <Box>{item.item.label}</Box>
              <Box>{formatPrice(item.item.price)}</Box>
              <Box>{item.quantity}</Box>
            </HStack>
          ))}
        {items.length !== 0 && (
          <>
            <Box>
              Total:{" "}
              {formatPrice(
                items.reduce(
                  (acc, item) => acc + item.item.price * item.quantity,
                  0
                )
              )}
            </Box>
            <Button>Checkout</Button>
          </>
        )}
      </VStack>
    </Box>
  );
}
