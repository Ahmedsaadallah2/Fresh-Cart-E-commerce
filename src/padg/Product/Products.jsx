import React, { useEffect, useState } from "react";
import ProductCard from "../../component/productCard/ProductCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../component/Loading/Loading";
import { Helmet } from "react-helmet";
export default function Productss() {
  async function getProducts() {
    const option = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    return axios.request(option);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  if (isLoading) return <Loading />;
  return (
    <>
      <Helmet>
        <title>Products</title>
        <meta name="description" content="Products component" />
      </Helmet>
      <div className=" grid grid-cols-12 gap-6">
        {data.data.data.map((product) => (
          <ProductCard productInfo={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
