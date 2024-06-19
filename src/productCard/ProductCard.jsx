import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { productContext } from "../../User.Context/product.context";

export default function ProductCard({ productInfo }) {
  const { images, title, price, category, ratingsAverage, id } = productInfo;
  const { addToCart } = useContext(productContext);
  return (
    <>
      <div className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 shadow-md rounded-lg overflow-hidden">
        <div className="relative">
          <img src={images[0]} className="w-full block" />
          <div className="absolute opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-25 left-0 top-0 w-full h-full flex justify-center items-center gap-2">
            <div className="icon cursor-pointer hover:scale-100 hover:rotate-12 transition-transform w-10 h-10 bg-primary rounded-full flex justify-center items-center">
              <i className="text-white text-xl fa-solid fa-heart"></i>
            </div>
            <Link
              onClick={() => {
                addToCart({ id });
              }}
              className="icon cursor-pointer hover:scale-100 hover:rotate-12 transition-transform w-10 h-10 bg-primary rounded-full flex justify-center items-center"
            >
              <i className="text-white text-xl fa-solid fa-cart-shopping"></i>
            </Link>
            <Link
              to={`/product/${id}`}
              className="icon cursor-pointer hover:scale-100 hover:rotate-12 transition-transform w-10 h-10 bg-primary rounded-full flex justify-center items-center"
            >
              <i className="text-white text-xl fa-solid fa-eye"></i>
            </Link>
          </div>
        </div>
        <div className=" p-2">
          <h2 className=" text-primary font-bold text-lg">{category.name}</h2>
          <h3 className=" text-xl mb-1 line-clamp-2">{title}</h3>
          <div className=" flex justify-between items-center">
            <span className="text-2xl">{price} EGP</span>
            <div className=" flex gap-1 items-center">
              <i className="fa-solid fa-star text-yellow-400 text-xl"></i>
              <span className="text-lg">{ratingsAverage}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
