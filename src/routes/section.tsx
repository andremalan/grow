import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardBody,
  Heading,
  Select,
  Text,
  useDisclosure,
  Image,
  Flex,
  VStack,
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
        img
        description
        modifierGroups {
          label
          modifiers {
            priceOverride
            displayOrder
            item {
              label
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
  };
};

type Item = {
  label: string;
  identifier: string;
  description: string;
  img: string;
  available: boolean;
  modifierGroups: ModifierGroup[];
};
type ModifierGroup = {
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
  return (
    <>
      <Box
        cursor={item.available ? "pointer" : "arrow"}
        onClick={item.available ? onOpen : undefined}
      >
        {children}
      </Box>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{item.label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                      <ModifierGroup modifierGroup={group} />
                    </Box>
                  ))}
                </VStack>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const ModifierGroup: React.FC<{ modifierGroup: ModifierGroup }> = ({
  modifierGroup,
}) => {
  return (
    <div>
      <Text>{modifierGroup.label}</Text>
      <Select placeholder="Select modifier">
        {modifierGroup.modifiers.map((modifier, index) => (
          <option value={modifier.displayOrder} key={index}>
            {`${modifier.item.label}: $${(
              Number(modifier.priceOverride) / 100
            ).toFixed(2)}`}
          </option>
        ))}
      </Select>
    </div>
  );
};

function ItemCard({ item }: { item: Item }) {
  return (
    <ItemModal key={item.identifier} item={item}>
      <Card
        opacity={item.available ? 1 : "0.5"}
        pointerEvents={item.available ? "auto" : "none"}
      >
        <CardBody>
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
        </CardBody>
      </Card>
    </ItemModal>
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
