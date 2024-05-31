import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { formatPrice } from "../utils/formatPrice";
import { useMutation } from "@apollo/client";
import { CREATE_CHECKOUT_SESSION } from "../graphql/mutations";
import { useCartContext } from "../hooks/useCartContext";
export type CartItem = {
  identifier: string;
  label: string;
  price: number;
};

export function Cart() {
  const [createCheckoutSession, { data, loading, error }] = useMutation(
    CREATE_CHECKOUT_SESSION
  );

  const { items } = useCartContext();
  const lineItems = items.map((item) => ({
    price: item.item.price,
    quantity: item.quantity,
    label: item.item.label,
  }));

  const handleCheckout = async () => {
    const currentUrl = window.location.href;
    const successUrl = `${window.location.origin}/success`;
    const cancelUrl = currentUrl;

    try {
      const { data } = await createCheckoutSession({
        variables: {
          lineItems,
          successUrl,
          cancelUrl,
        },
      });

      if (data?.createCheckoutSession?.url) {
        window.location.href = data.createCheckoutSession.url;
      }
    } catch (err) {
      console.error("Error creating checkout session:", err);
    }
  };
  if (data) return <button disabled>Redirecting...</button>;
  if (loading) return <button disabled>Loading...</button>;
  if (error) return <button disabled>Error</button>;
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
            <Button onClick={handleCheckout}>Checkout</Button>
          </>
        )}
      </VStack>
    </Box>
  );
}
