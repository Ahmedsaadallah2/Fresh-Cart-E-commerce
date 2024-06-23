import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../component/Loading/Loading";
import ReactImageGallery from "react-image-gallery";
import { productContext } from "../../User.Context/product.context";
import { Helmet } from "react-helmet";

export default function ProducDetalis() {
  const [detalis, setDetalis] = useState(null);
  const { addToCart } = useContext(productContext);
  const { id } = useParams();
  async function getProductDetalis() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setDetalis(data.data);
  }
  useEffect(() => {
    getProductDetalis();
  }, []);
  const detalisImage = detalis?.images.map((imageURL) => {
    return {
      original: imageURL,
      thumbnail: imageURL,
    };
  });
  return (
    <>
      {detalis == null ? (
        <Loading />
      ) : (
        <div className=" grid grid-cols-12 gap-6">
          <Helmet>
            <title>{detalis.title}</title>
            <meta name="description" content="product Detalis component" />
          </Helmet>
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <ReactImageGallery
              items={detalisImage}
              showNav={false}
              showFullscreenButton={false}
              showPlayButton={false}
            />
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-9 mb-24 p-3 md:p-0 md:mb-0">
            <h2 className=" text-3xl">{detalis.title}</h2>
            <h3 className=" text-xl text-primary font-semibold">
              {detalis.category.name}
            </h3>
            <p className=" text-slate-400 my-3">{detalis.description}</p>
            <div className=" flex justify-between mt-2">
              <span className=" text-xl">{detalis.price} EGP</span>
              <span className=" text-xl">
                {detalis.ratingsAverage}
                <i className="fa-solid ml-1 fa-star text-yellow-400"></i>
              </span>
            </div>
            <button
              onClick={() => {
                addToCart({ id: detalis.id });
              }}
              className=" py-2 px-7 text-white text-lg bg-primary rounded-md w-full mt-3"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      )}
    </>
  );
}
