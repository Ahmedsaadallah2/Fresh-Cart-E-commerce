import React, { useEffect, useState } from "react";
import ProductCard from "../../component/productCard/ProductCard";
import axios from "axios";
import Loading from "../../component/Loading/Loading";
import SliderProduct from "../../component/SliderProduct/SliderProduct";
import SlideCategory from "../../component/SlideCategory/SlideCategory";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

export default function Home() {
  async function getProduct() {
    const option = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    return axios.request(option);
  }
  const { data, isLoading, isFetched, isFetching } = useQuery({
    queryKey: ["product"],
    queryFn: getProduct,
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home component" />
      </Helmet>
      <SliderProduct />
      <SlideCategory />
      <div className=" grid grid-cols-12 gap-6 mx-2 md:mx-0">
        {data.data.data.map((product) => (
          <ProductCard productInfo={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
