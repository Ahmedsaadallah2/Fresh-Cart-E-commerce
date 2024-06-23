import { createContext, useContext } from "react";
import { userContext } from "./User.context";
import axios from "axios";

export const wishListContext = createContext(null);

export default function WishListProvider({ children }) {
  const { token } = useContext(userContext);

  async function addWishList({ id }) {
    try {
      const option = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId: id,
        },
      };

      let { data } = await axios.request(option);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <wishListContext.Provider value={{ addWishList }}>
        {children}
      </wishListContext.Provider>
    </>
  );
}
