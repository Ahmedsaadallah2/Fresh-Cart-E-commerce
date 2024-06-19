import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./component/Layout/Layout";
import Home from "./padg/Home/Home";
import Regester from "./padg/Regester/Regester";
import Login from "./padg/Login/Login";
import NotFound from "./padg/NotFound/NotFound";
import Products from "./padg/Product/Products";
import Brands from "./padg/Brands/Brands";
import Categorise from "./padg/Categories/Categorise";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import UserProvider from "./User.Context/User.context";
import ProducDetalis from "./padg/ProductDetalis/ProducDetalis";
import Cart from "./padg/Cart/Cart";
import ProductProvider from "./User.Context/product.context";
import Checkout from "./padg/Checkout/Checkout";
import Orders from "./padg/Orders/Orders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "*", element: <NotFound /> },
        { path: "products", element: <Products /> },
        { path: "/product/:id", element: <ProducDetalis /> },
        { path: "/cart", element: <Cart /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/allorders", element: <Orders /> },
        { path: "brands", element: <Brands /> },
        { path: "categories", element: <Categorise /> },
      ],
    },
    {
      path: "/auth",
      element: <Layout />,
      children: [
        { path: "regester", element: <Regester /> },
        { path: "login", element: <Login /> },
      ],
    },
  ]);

  const newClint = new QueryClient();
  return (
    <>
      <QueryClientProvider client={newClint}>
        <UserProvider>
          <ProductProvider>
            <RouterProvider router={router}></RouterProvider>
            <Toaster />
          </ProductProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;