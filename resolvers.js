import { gql } from "apollo-boost";
import { PRODUCT_FRAGMENT } from "./fragments";

export const defaults = {
  cart: []
};

export const resolvers = {
  Mutation: {
    toggleProduct: (_, variables, { cache, getCacheKey }) => {
      // product 가져오기
      const id = getCacheKey({ __typename: "Product", id: variables.id });
      const fragment = gql`
        ${PRODUCT_FRAGMENT}
      `;
      const product = cache.readFragment({ fragment, id });

      // cart 가져오기
      const cartQuery = gql`
        {
          cart @client {
            id
          }
        }
      `;
      const { cart } = cache.readQuery({ query: cartQuery });

      // cart 확인
      let newCart;
      let onCart;
      const foundProduct = cart.find(aProduct => aProduct.id === product.id);
      // find -> cart[] 에 있는 모든 item을 받음 -> 현재 아이템을 argument로 받음 -> aProduct
      if (foundProduct) {
        const cleanCart = cart.filter(aProduct => aProduct.id !== product.id);
        // filter -> cart[] 에 있는 모든 item을 받음 -> 조건에 맞는 새로운 array를 return
        newCart = cleanCart; // 해당 id의 product만 삭제
        onCart = false;
      } else {
        newCart = [...cart, product];
        onCart = true;
      }
      // find -> 조건에 만족하는 item을 return / filter -> 조건에 만족하는 item이 담긴 array를 return

      // product -> cart []
      cache.writeData({
        data: {
          cart: newCart // [...cart, product]
        }
      });

      // fragment 수정 (onCart)
      cache.writeFragment({
        id: `Product:${product.id}`,
        fragment: PRODUCT_FRAGMENT,
        data: {
          __typename: "Product",
          ...product,
          onCart
        }
      });
      return null;
    }
  },
  // API state 수정 작업 -> productQueries에 onCart 추가
  Product: {
    onCart: () => false
  }
};
