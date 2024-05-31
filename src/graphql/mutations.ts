// src/graphql/mutations.js
import { gql } from "@apollo/client";

export const CREATE_CHECKOUT_SESSION = gql`
  mutation CreateCheckoutSession(
    $lineItems: [LineItemInput!]!
    $successUrl: String!
    $cancelUrl: String!
  ) {
    createCheckoutSession(
      input: {
        lineItems: $lineItems
        successUrl: $successUrl
        cancelUrl: $cancelUrl
      }
    ) {
      sessionId
      url
    }
  }
`;

export type LineItemInputType = {
  price: string;
  quantity: number;
  label: string;
};
