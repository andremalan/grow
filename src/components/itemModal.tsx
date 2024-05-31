import { useState } from "react";
import { CartItem } from "./cart";
import {
  Box,
  Text,
  Image,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Item } from "../graphql/queries";
import { AnimatePresence, motion } from "framer-motion";
import { ModifierSelector } from "./modifierGroup";
import { formatPrice } from "../utils/formatPrice";
import { useCartContext } from "../hooks/useCartContext";

export default function ItemModal({
  item,
  children,
}: {
  item: Item;
  children: React.ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addItems } = useCartContext();
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
}
