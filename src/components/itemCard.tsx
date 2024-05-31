import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import ItemModal from "./itemModal";
import { useCartContext } from "../hooks/useCartContext";
import { formatPrice } from "../utils/formatPrice";
import { Item } from "../graphql/queries";

export default function ItemCard({ item }: { item: Item }) {
  const { addItems } = useCartContext();
  const { identifier, label, price } = item;
  const cartItem = { identifier, label, price };
  return (
    <Card
      opacity={item.available ? 1 : "0.5"}
      pointerEvents={item.available ? "auto" : "none"}
    >
      <CardBody>
        <ItemModal key={item.identifier} item={item}>
          <Heading as="h3" size="md">
            {item.label}
          </Heading>
          <Text noOfLines={1}>{item.description}</Text>
          <Image
            width={280}
            h={150}
            objectFit="cover"
            src={item.img}
            alt={item.label}
          />
        </ItemModal>
      </CardBody>
      <CardFooter
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button onClick={() => addItems([cartItem])}>Add to cart</Button>
        <Box>{formatPrice(item.price)}</Box>
      </CardFooter>
    </Card>
  );
}
