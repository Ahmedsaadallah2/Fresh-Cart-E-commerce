import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../component/Loading/Loading";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

export default function Categorise() {
  async function getCategory() {
    const option = {
      url: "https://ecommerce.routemisr.com/api/v1/categories",
      method: "GET",
    };

    return await axios.request(option);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>Caregories</title>
        <meta name="description" content="Caregories component" />
      </Helmet>
      <div className="grid grid-cols-12 gap-3">
        {data.data.data.map((pro) => (
          <div
            key={pro._id}
            className="col-span-12 md:col-span-6 lg:col-span-3 border-2 border-gray-300"
          >
            <img src={pro.image} alt="" className="w-full h-96 object-cover" />
            <div className="p-3">
              <h2 className="text-center text-lg">{pro.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
