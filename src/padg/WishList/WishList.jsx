import React, { Fragment, useContext, useEffect } from "react";
import { wishListContext } from "../../context/wish.context";
import Loading from "../../component/Loading/Loading";
import { productContext } from "../../User.Context/product.context";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function WishList() {
  const { wishInfo, removeWishList, getWishList } = useContext(wishListContext);
  const { addToCart } = useContext(productContext);
  useEffect(() => {
    getWishList();
  }, []);
  return (
    <>
      <Helmet>
        <title>Wish List</title>
        <meta name="description" content="wish list page" />
      </Helmet>
      {wishInfo == null ? (
        <Loading />
      ) : (
        <>
          <div className="mb-5 flex justify-between items-center flex-col md:flex-row">
            <h2 className=" text-3xl mb-2 md:mb-0">
              <span>Wish List</span>
              <i className="fa-solid fa-heart ml-2 text-red-600"></i>
            </h2>
            <Link
              to={"/home"}
              className="bg-primary text-white py-2 px-4 text-lg rounded-lg"
            >
              ADD WISH LIST
            </Link>
          </div>
          {wishInfo.length === 0 ? (
            <div className=" flex justify-center items-center py-20 flex-col">
              <h3 className="text-lg text-slate-500">
                there are not items yet.
              </h3>
              <Link
                to={"/home"}
                className="bg-primary p-3 rounded-lg text-white cursor-pointer my-2"
              >
                ADD YOUR FRIST PRODUCT TO CART
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-3 mx-2 md:mx-0">
              {wishInfo?.data.map((wishs) => (
                <div
                  className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-2 mb-3 md:mb-0 rounded-lg overflow-hidden shadow-2xl"
                  key={wishs._id}
                >
                  <img
                    src={wishs.imageCover}
                    alt=""
                    className="w-full h-72 object-contain"
                  />
                  <div className="px-2 py-3">
                    <h3 className="text-2xl text-primary line-clamp-1">
                      {wishs.title}
                    </h3>
                    <div className="flex my-3 justify-between items-center">
                      <span className="text-xl font-bold">{wishs.price}</span>
                      <span className="text-xl">{wishs.brand?.name}</span>
                    </div>
                    <h4 className="my-2 text-xl">
                      <i className="fa-solid fa-star after:mr-1 text-yellow-400"></i>
                      {wishs.ratingsAverage}
                    </h4>
                    <button
                      onClick={() => {
                        addToCart({ id: wishs.id });
                      }}
                      className="bg-primary py-2 text-white mt-1 w-full rounded-xl text-xl"
                    >
                      ADD TO CART
                    </button>
                    <button
                      onClick={() => {
                        removeWishList({ id: wishs.id });
                      }}
                      className="bg-red-600 py-2 text-white mt-3 w-full rounded-xl text-xl"
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
