import { gql } from "apollo-boost";

export const INDEX_QUERY = gql`
  {
    categories {
      id
      name
    }
    products(where: { onSale: true }) {
      id
      name
      detail
      price
      photo {
        url
      }
    }
  }
`;
