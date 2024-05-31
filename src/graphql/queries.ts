import { gql } from "@apollo/client";

export const GET_SECTION = gql`
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

export const GET_MENUS = gql`
  query GetMenus {
    menus {
      identifier
      label
      state
      sections {
        label
        identifier
      }
    }
  }
`;

// Ideally we auto-generate the types here based on the schema and the queries.

export type Modifier = {
  priceOverride: number;
  displayOrder: number;
  label: string;
  item: {
    label: string;
    identifier: string;
    price: number;
  };
};

export type Item = {
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

export type Section = {
  label: string;
  identifier: string;
  items: Item[];
};

export type Menu = {
  identifier: string;
  name: string;
  label: string;
  photo: string;
  sections: Section[];
};

export type MenuSection = {
  label: string;
  identifier: string;
};
