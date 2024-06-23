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
      <section className="mb-5">
        <h2 className="ps-3 md:ps-0 text-2xl mb-2">Shop Popular Categories</h2>
        <swiper-container
          loop={true}
          breakpoints={JSON.stringify({
            690: {
              slidesPerView: 2,
              spaceBetween: 3,
            },

            928: {
              slidesPerView: 3,
              spaceBetween: 3,
            },

            1220: {
              slidesPerView: 4,
              spaceBetween: 3,
            },

            1420: {
              slidesPerView: 6,
              spaceBetween: 3,
            },
          })}
        >
          {data.data.data.map((cat) => (
            <swiper-slide key={cat._id}>
              <img
                src={cat.image}
                className="w-full h-72 object-contain md:object-cover"
                alt=""
              />
              <h3 className="text-lg mt-1 ps-3 md:ps-0 text-center">
                {cat.name}
              </h3>
            </swiper-slide>
          ))}
        </swiper-container>
      </section>
    </>
  );
}
