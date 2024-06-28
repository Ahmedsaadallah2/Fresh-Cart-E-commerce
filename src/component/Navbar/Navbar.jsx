import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import imageLogo from "../../images/freshcart-logo.svg";
import { userContext } from "../../User.Context/User.context";
import { productContext } from "../../User.Context/product.context";
export default function Navbar() {
  const { token, logOut } = useContext(userContext);
  const { cartInfo, getCartProduct } = useContext(productContext);
  const [isClick, setisClick] = useState(false);
  const click = () => {
    setisClick(!isClick);
  };
  useEffect(() => {
    getCartProduct();
  }, []);
  return (
    <>
      <nav className=" z-50 bg-slate-100 p-2 fixed left-0 right-0 top-0">
        <div className="lg:container justify-between flex gap-9 p-3 items-center">
          <div className="flex justify-between items-center">
            <h1>
              <img src={imageLogo} alt="Logo" />
            </h1>
            {token ? (
              <button
                data-collapse-toggle="navbar-default"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-primary rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-700 border-2 border-gray-500 dark:focus:ring-gray-100"
                aria-controls="navbar-default"
                aria-expanded="false"
                onClick={click}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            ) : (
              ""
            )}
          </div>
          {token ? (
            <ul className="md:flex hidden gap-5 items-center text-md">
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
              <NavLink
                className={({ isActive }) => {
                  return ` relative before:h-[2px] hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary before:absolute before:-bottom-0 ${
                    isActive ? "font-bold before:w-full" : "before:w-0"
                  }`;
                }}
                to="/wishlist"
              >
                <li>Wish List</li>
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
              <li className="cursor-pointer hidden md:inline">
                <span onClick={logOut}>
                  <i className="fa-solid fa-right-from-bracket text-2xl"></i>
                </span>
              </li>
            )}
          </ul>
        </div>

        {token && isClick ? (
          <div className="md:hidden w-full block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-100 dark:border-gray-100">
              <li>
                <NavLink
                  to={"/Home"}
                  className="block py-2 px-3 text-primary rounded hover:bg-primary md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 dark:text-white md:dark:hover:text-primary dark:hover:bg-primary dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/products"}
                  className="block py-2 px-3 text-primary rounded hover:bg-primary md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 dark:text-white md:dark:hover:text-primary dark:hover:bg-primary dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Products
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/categories"}
                  className="block py-2 px-3 text-primary rounded hover:bg-primary md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 dark:text-white md:dark:hover:text-primary dark:hover:bg-primary dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Categories
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/brands"}
                  className="block py-2 px-3 text-primary rounded hover:bg-primary md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 dark:text-white md:dark:hover:text-primary dark:hover:bg-primary dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Brands
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/allorders"}
                  className="block py-2 px-3 text-primary rounded hover:bg-primary md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 dark:text-white md:dark:hover:text-primary dark:hover:bg-primary dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Orders
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/wishlist"}
                  className="block py-2 px-3 text-primary rounded hover:bg-primary md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 dark:text-white md:dark:hover:text-primary dark:hover:bg-primary dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Wish List
                </NavLink>
              </li>

              <li>
                <NavLink
                  to={"/cart"}
                  className="flex justify-between py-2 px-3 text-primary rounded hover:bg-primary md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 dark:text-white md:dark:hover:text-primary dark:hover:bg-primary dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <span>
                    Cart
                    <i className="ml-2 text-primary text-lg fa-solid fa-cart-shopping"></i>
                  </span>
                  {cartInfo.numOfCartItems || 0}
                </NavLink>
              </li>

              <li>
                <NavLink
                  onClick={logOut}
                  to={"/"}
                  className="block py-2 px-3 text-primary rounded hover:bg-primary md:hover:bg-transparent md:border-0 md:hover:text-primary md:p-0 dark:text-white md:dark:hover:text-primary dark:hover:bg-primary dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Sign out
                </NavLink>
              </li>
            </ul>
          </div>
        ) : (
          ""
        )}
      </nav>
      ;
    </>
  );
}
