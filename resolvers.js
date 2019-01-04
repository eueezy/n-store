import { gql } from "apollo-boost";
import { PRODUCT_FRAGMENT } from "./fragments";

export const defaults = {
  cart: []
};

export const resolvers = {
  Mutation: {
    toggleProduct: (_, variables, { cache, getCacheKey }) => {
      const id = getCacheKey({ __typename: "Product", id: variables.id });
      const fragment = gql`
        ${PRODUCT_FRAGMENT}
      `;
      const product = cache.readFragment({ fragment, id });
      console.log(product);

      const cartQuery = gql`
        {
          cart @client {
            id
          }
        }
      `;
      const { cart } = cache.readQuery({ query: cartQuery });
      let newCart;
      const foundProduct = cart.find(aProduct => aProduct.id === product.id);
      if (foundProduct) {
        newCart = cleanCart;
      } else {
        newCart = [...cart, product];
      }

      cache.writeData({
        data: {
          cart: newCart
        }
      });
      return null;
    }
  }
};
