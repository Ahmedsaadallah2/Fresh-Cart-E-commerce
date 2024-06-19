import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { userContext } from "../../User.Context/User.context";
import { productContext } from "../../User.Context/product.context";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Checkout(values) {
  const { token } = useContext(userContext);
  const { cartInfo, setCartInfo } = useContext(productContext);
  const [orderType, setOrderType] = useState(null);
  const navegat = useNavigate();
  async function creatCashOrder(values) {
    try {
      const option = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.data._id}`,
        method: "POST",
        headers: {
          token,
        },
        data: {
          values,
        },
      };
      toast.success("Order is Done");
      let { data } = await axios.request(option);
      setCartInfo([]);
      setTimeout(() => {
        if (data.status == "success") {
          navegat("/allorders");
        }
      });
      console.log(data);
    } catch (error) {
      toast.error("You didn't add any order");
    }
  }

  async function creatOnlineOrder(values) {
    try {
      const option = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.data._id}?url=http://localhost:5173`,
        method: "POST",
        headers: {
          token,
        },
        data: {
          values,
        },
      };
      let { data } = await axios.request(option);
      console.log(data);
      setCartInfo([]);
      toast.loading("Wait For Payment");

      setTimeout(() => {
        if (data.status == "success") {
          window.location.href = data.session.url;
        }
      }, 2000);
    } catch (error) {
      toast.error("You didn't add any order");
    }
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    onSubmit: () => {
      if (orderType == "cash") creatCashOrder(values);
      else creatOnlineOrder(values);
    },
  });
  return (
    <>
      <h2 className="p-2 md:p-0 text-3xl mb-5">Shipping Address</h2>
      <form className="p-2 md:p-0" onSubmit={formik.handleSubmit}>
        <input
          type="text"
          className="border-2 border-slate-200 w-full p-2 outline-none mb-4"
          placeholder="Address"
          value={formik.values.shippingAddress.city}
          onChange={formik.handleChange}
          name="shippingAddress.city"
        />
        <input
          type="text"
          className="border-2 border-slate-200 w-full p-2 outline-none mb-4"
          placeholder="Phone"
          value={formik.values.shippingAddress.phone}
          onChange={formik.handleChange}
          name="shippingAddress.phone"
        />
        <textarea
          placeholder="Detalis"
          className="border-2 border-slate-200 w-full p-2 outline-none"
          value={formik.values.shippingAddress.details}
          onChange={formik.handleChange}
          name="shippingAddress.details"
        ></textarea>
        <button
          onClick={() => {
            setOrderType("cash");
          }}
          type="submit"
          className="bg-blue-600 mb-5 md:mb-0 py-2 px-3  text-white text-xl mt-3 rounded-lg mr-3"
        >
          CASH ORDER
        </button>

        <button
          onClick={() => {
            setOrderType("online");
          }}
          type="submit"
          className="bg-primary mb-5 md:mb-0 py-2 px-3  text-white text-xl mt-3 rounded-lg "
        >
          ONLINE ORDER
        </button>
      </form>
    </>
  );
}
