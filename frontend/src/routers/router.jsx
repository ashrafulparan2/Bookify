import { createBrowserRouter, } from "react-router-dom";
import App from "../App";

import Home from "../pages/home/Home";

import AdminLogin from "../components/AdminLogin";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../Pages/books/CartPage";
import CheckoutPage from "../Pages/books/CheckoutPage";
import OrderPage from "../pages/books/OrderPage";
import SingleBook from "../Pages/books/SingleBook";
import AddBook from "../Pages/dashboard/addBook/AddBook";
import UpdateBook from "../Pages/dashboard/EditBook/UpdateBook";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/orders",
            element: <PrivateRoute><OrderPage/></PrivateRoute>,
        },
        {
            path: "/about",
            element: <div>About</div>,
        },
        {
            path: "/login",
            element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/checkout",
          element: <PrivateRoute> <CheckoutPage/> </PrivateRoute> 
        },
        {
          path: "/cart",
          element: <CartPage/>
        },
        {
          path: "/books/:id",
          element: <SingleBook/>
        }
      ]
    },
    {
      path: "/admin",
      element: <AdminLogin/>,
    },
    {
      path: "/dashboard",
      element: <AdminRoute> <div>Admin Dashboard </div> </AdminRoute> ,
      children: [
        {
          path: "",
          element: <AdminRoute> <div>Dashboard Home</div> </AdminRoute>,

        },
        {
          path: "add-new-book",
          element: <AdminRoute> <AddBook/> </AdminRoute>,

        },
        {
          path: "edit-book/:id",
          element: <AdminRoute> <UpdateBook/> </AdminRoute>,

        },
        {
          path: "manage-book",
          element: <AdminRoute> <div>Manage Book </div> </AdminRoute>,

        }

      ]
    }
  ]);
  export default router;