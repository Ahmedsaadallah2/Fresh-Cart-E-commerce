import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

export default function SlideCategory() {
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
      <section className="mb-5 md:hidden">
        <h2 className="ps-3 md:ps-0 text-2xl mb-2">Shop Popular Categories</h2>
        <swiper-container slides-per-view={2} loop={true}>
          {data.data.data.map((cat) => (
            <swiper-slide key={cat._id}>
              <img
                src={cat.image}
                className="w-full h-72 object-cover"
                alt=""
              />
              <h3 className="text-lg mt-1 ps-3 md:ps-0">{cat.name}</h3>
            </swiper-slide>
          ))}
        </swiper-container>
      </section>

      <section className="mb-5 hidden md:block lg:hidden">
        <h2 className="ps-3 md:ps-0 text-2xl mb-2">Shop Popular Categories</h2>
        <swiper-container slides-per-view={3} loop={true}>
          {data.data.data.map((cat) => (
            <swiper-slide key={cat._id}>
              <img
                src={cat.image}
                className="w-full h-72 object-cover"
                alt=""
              />
              <h3 className="text-lg mt-1 ps-3 md:ps-0">{cat.name}</h3>
            </swiper-slide>
          ))}
        </swiper-container>
      </section>

      <section className="mb-5 hidden lg:block xl:hidden">
        <h2 className="ps-3 md:ps-0 text-2xl mb-2">Shop Popular Categories</h2>
        <swiper-container slides-per-view={4} loop={true}>
          {data.data.data.map((cat) => (
            <swiper-slide key={cat._id}>
              <img
                src={cat.image}
                className="w-full h-72 object-cover"
                alt=""
              />
              <h3 className="text-lg mt-1 ps-3 md:ps-0">{cat.name}</h3>
            </swiper-slide>
          ))}
        </swiper-container>
      </section>

      <section className="mb-5 hidden xl:block">
        <h2 className="ps-3 md:ps-0 text-2xl mb-2">Shop Popular Categories</h2>
        <swiper-container slides-per-view={6} loop={true}>
          {data.data.data.map((cat) => (
            <swiper-slide key={cat._id}>
              <img
                src={cat.image}
                className="w-full h-72 object-cover"
                alt=""
              />
              <h3 className="text-lg mt-1 ps-3 md:ps-0">{cat.name}</h3>
            </swiper-slide>
          ))}
        </swiper-container>
      </section>
    </>
  );
}
