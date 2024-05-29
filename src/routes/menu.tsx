import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Button, Select, Text, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const GET_MENU = gql`
  query GetMenu($menuId: ID!) {
    menu(identifier: $menuId) {
      identifier
      label
      state
      sections {
        label
        identifier
        items {
          label
          identifier
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
  }
`;

type Modifier = {
  priceOverride: number;
  displayOrder: number;
};

type ModifierGroup = {
  label: string;
  modifiers: Modifier[];
};

type Item = {
  label: string;
  identifier: string;
  modifierGroups: ModifierGroup[];
};

type Section = {
  label: string;
  identifier: string;
  items: Item[];
};

type Menu = {
  identifier: string;
  label: string;
  state: string;
  sections: Section[];
};

const BasicModal: React.FC<{ item: Item }> = ({ item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{item.label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{item.label}</Text>
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
export default function Menu() {
  const { menuId } = useParams();
  const { loading, error, data } = useQuery(GET_MENU, {
    variables: { menuId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div id="menu">
      <Text>{data.menu.label}</Text>
      <Text>Sections</Text>
      <ul>
        {data.menu.sections.map((section: Section) => (
          <li key={section.identifier}>
            <h2>{section.label}</h2>
            <ul>
              {section.items.map((item: Item) => (
                <li key={item.identifier}>
                  <h3>{item.label}</h3>
                  <BasicModal item={item} />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
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
