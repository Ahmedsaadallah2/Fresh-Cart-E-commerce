import { useContext } from "react";
import { Link } from "react-router-dom";
import { productContext } from "../../User.Context/product.context";
import Loading from "../../component/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Cart() {
  const { cartInfo, removeCart, ubdateCount, clearAll } =
    useContext(productContext);
  return (
    <>
      <Helmet>
        <title>Cart Info</title>
        <meta name="description" content="Cart component" />
      </Helmet>



      
      {cartInfo === null ? (
        <Loading />
      ) : (
        <div className="p-10 bg-slate-100">
          <h2 className=" text-3xl">
            <span>Shop Cart</span>
            <i className="fa-solid fa-cart-shopping ml-2"></i>
          </h2>
          {cartInfo.length === 0 ? (
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
            <>
              {cartInfo.data.totalCartPrice ? (
                <h2 className="text-primary text-xl mt-2">
                  Total Cart Price :{cartInfo.data.totalCartPrice} EGP
                </h2>
              ) : (
                ""
              )}
              {cartInfo.data.products.map((product) => (
                <div
                  key={product._id}
                  className=" grid grid-cols-12 gap-4 mt-4"
                >
                  <div className="col-span-12 md:col-span-3 lg:col-span-4 xl:col-span-1">
                    <img
                      src={product.product.imageCover}
                      alt=""
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between items-center col-span-12 md:col-span-9 lg:col-span-8 xl:col-span-11">
                    <div>
                      <h3 className="text-2xl">{product.product.title}</h3>
                      <h4 className=" text-primary text-xl">
                        price:{product.price}
                      </h4>
                      <div className="my-2 text-lg font-semibold">
                        <i className="fa-solid fa-star mr-1 text-yellow-400 text-xl"></i>
                        {product.product.ratingsAverage}
                      </div>
                      <button
                        onClick={() => {
                          removeCart({ id: product.product.id });
                        }}
                        className=" bg-primary py-2 px-4 text-white rounded-lg mt-2"
                      >
                        <i className="fa-solid fa-trash-can mr-2"></i>
                        Remove
                      </button>
                    </div>
                    <div className=" flex items-center gap-3 text-white">
                      <button
                        onClick={() => {
                          ubdateCount({
                            id: product.product.id,
                            count: product.count - 1,
                          });
                        }}
                        className="bg-primary py-3 px-3 rounded-lg"
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span className=" font-semibold text-xl text-primary">
                        {product.count}
                      </span>
                      <button
                        onClick={() => {
                          ubdateCount({
                            id: product.product.id,
                            count: product.count + 1,
                          });
                        }}
                        className="bg-primary py-3 px-3 rounded-lg"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={clearAll}
                className="bg-red-500 py-3 px-4 block ms-auto rounded-lg text-white text-xl"
              >
                Clear Cart
              </button>
            </>
          )}
        </div>
      )}
      <Link
        to="/checkout"
        className="bg-primary py-2 px-3 mb-8 md:mb-0 text-white text-xl mt-5 ms-auto block w-fit rounded-lg"
      >
        NEXT STEP
      </Link>
    </>
  );
}
