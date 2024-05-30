import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Text,
  useDisclosure,
  Image,
  Flex,
  VStack,
  CardFooter,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import { CartContext, CartItem } from "../components/cart";
import { ModifierSelector } from "../components/modifierGroup";
import { formatPrice } from "../utils/formatPrice";

const GET_SECTION = gql`
  query GetSection($sectionId: ID!) {
    section(identifier: $sectionId) {
      identifier
      available
      label
      items {
        label
        identifier
        available
        price
        img
        description
        modifierGroups {
          label
          modifiers {
            priceOverride
            displayOrder
            item {
              label
              price
              identifier
            }
          }
        }
      }
    }
  }
`;

type Modifier = {
  priceOverride: number;
  displayOrder: number;
  label: string;
  item: {
    label: string;
    identifier: string;
    price: number;
  };
};

type Item = {
  label: string;
  identifier: string;
  description: string;
  price: number;
  img: string;
  available: boolean;
  modifierGroups: ModifierGroup[];
};
export type ModifierGroup = {
  label: string;
  modifiers: Modifier[];
};

type Section = {
  label: string;
  identifier: string;
  items: Item[];
};

const ItemModal: React.FC<{ item: Item; children: React.ReactNode }> = ({
  item,
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addItems } = useContext(CartContext);
  const [selectedModifiers, setSelectedModifiers] = useState<CartItem[]>([]);

  const { identifier, label, price } = item;
  const cartItem = { identifier, label, price };
  const addModifier = (item: CartItem) => {
    setSelectedModifiers([...selectedModifiers, item]);
  };
  const closeModal = () => {
    setSelectedModifiers([]);
    onClose();
  };

  const addToCart = () => {
    addItems([cartItem, ...selectedModifiers]);
    closeModal();
  };
  return (
    <>
      <Box
        cursor={item.available ? "pointer" : "arrow"}
        onClick={item.available ? onOpen : undefined}
      >
        {children}
      </Box>

      <Modal size="xl" isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{item.label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2 }}
              >
                <Flex>
                  <Image
                    boxSize="250px"
                    objectFit="cover"
                    src={item.img}
                    alt={item.label}
                    mr="5"
                  />
                  <Box>
                    <Text>{item.description}</Text>
                    <VStack alignItems={"flex-start"}>
                      {item.modifierGroups.map((group) => (
                        <Box key={group.label}>
                          <ModifierSelector
                            modifierGroup={group}
                            onSelect={addModifier}
                          />
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                </Flex>
              </motion.div>
            </AnimatePresence>
          </ModalBody>

          <ModalFooter
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>{formatPrice(item.price)}</Box>
            <Button colorScheme="blue" mr={3} onClick={addToCart}>
              Add to cart
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

function ItemCard({ item }: { item: Item }) {
  const { addItems } = useContext(CartContext);
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

export default function Section() {
  const { sectionId } = useParams();
  const { loading, error, data } = useQuery(GET_SECTION, {
    variables: { sectionId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Box
      id="section"
      opacity={data.section.available ? 1 : 0.5}
      pointerEvents={data.section.available ? "auto" : "none"}
    >
      <Text>{data.section.label}</Text>
      <Text>{data.section.available ? "Available" : "Not available"}</Text>
      <SimpleGrid minChildWidth="300px" spacing="40px">
        {data.section.items.map((item: Item) => (
          <ItemCard key={item.identifier} item={item} />
        ))}
      </SimpleGrid>
    </Box>
  );
}

// function Favorite({ contact }) {
//   // yes, this is a `let` for later
//   let favorite = contact.favorite;
//   return (
//     <Form method="post">
//       <button
//         name="favorite"
//         value={favorite ? "false" : "true"}
//         aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
//       >
//         {favorite ? "★" : "☆"}
//       </button>
//     </Form>
//   );
// }
