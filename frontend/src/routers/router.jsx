import {createBrowserRouter,} from "react-router-dom";
import App from "../App";

import Home from "../pages/home/Home";

import Login from "../components/Login";
import Register from "../components/Register";
import CheckoutPage from "../Pages/books/CheckoutPage";
import CartPage from "../Pages/books/CartPage";
import PrivateRoute from "./PrivateRoute";
import SingleBook from "../Pages/books/SingleBook";
import OrderPage from "../pages/books/OrderPage";


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
  ]);
  export default router;