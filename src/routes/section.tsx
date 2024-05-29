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
      label
      items {
        label
        identifier
        description
        modifierGroups {
          label
          modifiers {
            priceOverride
            displayOrder
          }
        }
      }
    }
  }
`;

type Modifier = {
  priceOverride: number;
  displayOrder: number;
};

type Item = {
  label: string;
  identifier: string;
  description: string;
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

const BasicModal: React.FC<{ item: Item; children: React.ReactNode }> = ({
  item,
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box cursor="pointer" onClick={onOpen}>
        {children}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{item.label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{item.description}</Text>
            <ul>
              {item.modifierGroups.map((group) => (
                <li key={group.label}>
                  <ModifierGroup modifierGroup={group} />
                </li>
              ))}
            </ul>
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
            {`Price: ${modifier.priceOverride}, Order: ${modifier.displayOrder}`}
          </option>
        ))}
      </Select>
    </div>
  );
};
export default function Section() {
  const { sectionId } = useParams();
  const { loading, error, data } = useQuery(GET_SECTION, {
    variables: { sectionId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div id="section">
      <Text>{data.section.label}</Text>
      <SimpleGrid minChildWidth="120px" spacing="40px">
        {data.section.items.map((item: Item) => (
          <BasicModal key={item.identifier} item={item}>
            <Card height="180px">
              <CardBody>
                <Heading as="h3" size="md">
                  {item.label}
                </Heading>
                <Text noOfLines={1}>{item.description}</Text>
              </CardBody>
            </Card>
          </BasicModal>
        ))}
      </SimpleGrid>
    </div>
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
