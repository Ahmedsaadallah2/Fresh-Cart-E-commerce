import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../User.Context/User.context";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Loading from "../../component/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Orders() {
  const { token } = useContext(userContext);
  const { id } = jwtDecode(token);
  const [order, setOrder] = useState(null);
  console.log(id);

  async function getUserOrder() {
    const option = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: "GET",
    };
    const { data } = await axios.request(option);
    console.log(data);
    setOrder(data);
  }
  useEffect(() => {
    getUserOrder();
  }, []);
  return (
    <>
      <Helmet>
        <title>Your Orders</title>
        <meta name="description" content="Orders component" />
      </Helmet>
      {!order ? (
        <Loading />
      ) : (
        order.map((orders) => (
          <div
            key={orders._id}
            className="order border-2 border-gray-200 p-5 rounded-md mt-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-400 text-xl">Order ID</h3>
                <span className="text-xl font-bold">#{orders.id}</span>
              </div>
              <div className="flex justify-center items-center gap-3">
                {orders.isDelivered ? (
                  <h4 className="bg-lime-500 font-cairo py-2 px-5 rounded-2xl text-lg text-white">
                    تم التوصيل
                  </h4>
                ) : (
                  <h4 className="bg-blue-500 font-cairo py-2 px-5 rounded-2xl text-lg text-white">
                    قيد التوصيل
                  </h4>
                )}

                {orders.isPaid ? (
                  <h4 className="bg-lime-500 font-cairo py-2 px-5 rounded-2xl text-lg text-white">
                    تم مدفوع
                  </h4>
                ) : (
                  <h4 className="bg-red-500 font-cairo py-2 px-5 rounded-2xl text-lg text-white">
                    غير مدفوع
                  </h4>
                )}
              </div>
            </div>

            <div className=" grid grid-cols-12 mt-4 gap-3">
              {orders.cartItems.map((product) => (
                <div
                  key={product._id}
                  className="col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2 p-2 border border-gray-300"
                >
                  <img
                    src={product.product.imageCover}
                    alt=""
                    className="w-full"
                  />
                  <div className="mt-3">
                    <h3 className="text-lg line-clamp-2 font-bold">
                      {product.product.title}
                    </h3>
                    <span className="text-xl text-primary">
                      {product.price} L.E
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
}
