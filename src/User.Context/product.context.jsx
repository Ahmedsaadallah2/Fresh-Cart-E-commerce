import { createContext, useContext, useState } from "react";
import { userContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";

export const productContext = createContext(null);

export default function ProductProvider({ children }) {
  const { token } = useContext(userContext);
  const [cartInfo, setCartInfo] = useState(null);
  async function getCartProduct() {
    try {
      const option = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "GET",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(option);
      console.log(data);
      setCartInfo(data);
    } catch (error) {
      console.log(error);
      if (error.response.data.message.includes("No cart")) {
        setCartInfo([]);
      }
    }
  }
  async function addToCart({ id }) {
    try {
      const option = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
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
      setCartInfo(data);
      toast.success("Product Added To Cart");
    } catch (error) {
      console.log(error);
    }
  }
  async function removeCart({ id }) {
    try {
      const option = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(option);
      toast.success("Product Removed successfully ");
      console.log(data);
      if (data.numOfCartItems === 0) {
        setCartInfo([]);
      } else {
        setCartInfo(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function ubdateCount({ id, count }) {
    try {
      const option = {
        url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        method: "PUT",
        headers: {
          token,
        },
        data: {
          count,
        },
      };
      const { data } = await axios.request(option);
      setCartInfo(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function clearAll() {
    try {
      const option = {
        url: "https://ecommerce.routemisr.com/api/v1/cart",
        method: "DELETE",
        headers: {
          token,
        },
      };
      const { data } = await axios.request(option);
      console.log(data);
      if (data.message === "success") {
        setCartInfo([]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <productContext.Provider
        value={{
          addToCart,
          getCartProduct,
          cartInfo,
          removeCart,
          ubdateCount,
          clearAll,
          setCartInfo,
        }}
      >
        {children}
      </productContext.Provider>
    </>
  );
}
