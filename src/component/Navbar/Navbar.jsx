import React, { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import imageLogo from "../../images/freshcart-logo.svg";
import { userContext } from "../../User.Context/User.context";
import { productContext } from "../../User.Context/product.context";
export default function Navbar() {
  const { token, logOut } = useContext(userContext);
  const { cartInfo, getCartProduct } = useContext(productContext);

  useEffect(() => {
    getCartProduct();
  }, []);
  return (
    <>
      <nav className=" z-50 bg-slate-100 p-2 fixed left-0 right-0 top-0">
        <div className="container flex gap-9 p-3 items-center">
          <h1>
            <img src={imageLogo} alt="Logo" />
          </h1>

          {token ? (
            <ul className=" md:flex hidden gap-7 items-center text-lg ">
              <NavLink
                className={({ isActive }) => {
                  return ` relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary before:absolute before:-bottom-0 ${
                    isActive ? "font-bold before:w-full" : "before:w-0"
                  }`;
                }}
                to="/home"
              >
                <li>Home</li>
              </NavLink>

              <NavLink
                className={({ isActive }) => {
                  return ` relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary before:absolute before:-bottom-0 ${
                    isActive ? "font-bold before:w-full" : "before:w-0"
                  }`;
                }}
                to="/products"
              >
                <li>Products</li>
              </NavLink>

              <NavLink
                className={({ isActive }) => {
                  return ` relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary before:absolute before:-bottom-0 ${
                    isActive ? "font-bold before:w-full" : "before:w-0"
                  }`;
                }}
                to="/categories"
              >
                <li>Categories</li>
              </NavLink>

              <NavLink
                className={({ isActive }) => {
                  return ` relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary before:absolute before:-bottom-0 ${
                    isActive ? "font-bold before:w-full" : "before:w-0"
                  }`;
                }}
                to="/brands"
              >
                <li>Brands</li>
              </NavLink>

              <NavLink
                className={({ isActive }) => {
                  return ` relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary before:absolute before:-bottom-0 ${
                    isActive ? "font-bold before:w-full" : "before:w-0"
                  }`;
                }}
                to="/allorders"
              >
                <li>Orders</li>
              </NavLink>
            </ul>
          ) : (
            ""
          )}

          {token ? (
            <div className="ms-auto relative md:block hidden">
              <Link to={"/cart"}>
                <i className="fa-solid fa-cart-shopping text-xl"></i>
                <span className=" absolute bg-primary w-4 h-4 flex justify-center items-center rounded-full top-0 text-lg text-white p-[11px] right-0 translate-x-1/2 -translate-y-1/2 ">
                  {cartInfo === null ? (
                    <i className="fa-solid fa-spinner fa-spin"></i>
                  ) : (
                    cartInfo.numOfCartItems || 0
                  )}
                </span>
              </Link>
            </div>
          ) : (
            ""
          )}

          {token ? (
            <ul className="lg:flex gap-4 text-lg hidden">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-youtube"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-tiktok"></i>
            </ul>
          ) : (
            <ul className="lg:flex gap-4 text-lg hidden ms-auto">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-linkedin"></i>
              <i className="fa-brands fa-youtube"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-tiktok"></i>
            </ul>
          )}

          <ul className="flex gap-5 text-lg items-center ms-auto md:ms-0">
            {!token ? (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return ` relative before:h-[2px] before:-mb-1 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary before:absolute before:-bottom-0 ${
                        isActive ? "font-bold before:w-full" : "before:w-0"
                      }`;
                    }}
                    to="/auth/login"
                  >
                    Sign In
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return ` relative before:h-[2px] before:-mb-1 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary before:absolute before:-bottom-0 ${
                        isActive ? "font-bold before:w-full" : "before:w-0"
                      }`;
                    }}
                    to="/auth/regester"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="cursor-pointer">
                <span onClick={logOut}>
                  <i className="fa-solid fa-right-from-bracket text-2xl"></i>
                </span>
              </li>
            )}
          </ul>
          <div className="md:hidden">
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-600 dark:hover:bg-green-700"
              type="button"
            >
              <i className="fa-solid fa-bars"></i>
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li className="text-xl">
                  <NavLink
                    to="/home"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Home
                  </NavLink>
                </li>

                <li className="text-xl">
                  <NavLink
                    to="/products"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Products
                  </NavLink>
                </li>

                <li className="text-xl">
                  <NavLink
                    to="/categories"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Categories
                  </NavLink>
                </li>

                <li className="text-xl">
                  <NavLink
                    to="/brands"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Brands
                  </NavLink>
                </li>

                <li className="text-xl">
                  <NavLink
                    to="/allorders"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Orders
                  </NavLink>
                </li>

                <li className="text-xl">
                  <NavLink
                    to="/cart"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Cart
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
