import { createContext, useContext, useState } from "react";
import axios from "axios";
import { userContext } from "../User.Context/User.context";
import toast from "react-hot-toast";

export const wishListContext = createContext(null);

export default function WishListProvider({ children }) {
  const { token } = useContext(userContext);
  const [wishInfo, setWishInfo] = useState(null);
  let id;
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
      setWishInfo(data);
      toast.success("Added Successfully");
    } catch (error) {
      console.log(error);
    }
  }

  async function getWishList() {
    try {
      const option = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(option);
      console.log(data);
      setWishInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function removeWishList({ id }) {
    try {
      const option = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(option);
      console.log(data);
      getWishList();
      toast.success("Product remove");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <wishListContext.Provider
        value={{
          addWishList,
          getWishList,
          wishInfo,
          removeWishList,
        }}
      >
        {children}
      </wishListContext.Provider>
    </>
  );
}
