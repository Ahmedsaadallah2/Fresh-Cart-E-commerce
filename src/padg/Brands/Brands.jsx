import axios from "axios";
import Loading from "../../component/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
export default function Brands() {
  async function getBrand() {
    const option = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    };
    return await axios.request(option);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrand,
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Helmet>
        <title>Brands</title>
        <meta name="description" content="Brands component" />
      </Helmet>
      <div className="grid grid-cols-12 gap-4">
        {data.data.data.map((brands) => (
          <div
            key={brands._id}
            className=" col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-2 border-2 border-gray-300 rounded-md"
          >
            <img src={brands.image} alt="" className="w-full" />
            <div className=" p-3 flex justify-center items-center border-t-2">
              <h2 className="text-primary text-xl font-bold">{brands.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
