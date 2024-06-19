import React, { useEffect, useState } from "react";
import ProductCard from "../../component/productCard/ProductCard";
import axios from "axios";
import Loading from "../../component/Loading/Loading";
import SliderProduct from "../../component/SliderProduct/SliderProduct";
import SlideCategory from "../../component/SlideCategory/SlideCategory";
import { useQuery } from "@tanstack/react-query";

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
      <SliderProduct />
      <SlideCategory />
      <div className=" grid grid-cols-12 gap-6">
        {data.data.data.map((product) => (
          <ProductCard productInfo={product} key={product._id} />
        ))}
      </div>
    </>
  );
}
