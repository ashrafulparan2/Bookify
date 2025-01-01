import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminLogin from "../components/AdminLogin";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import OrderPage from "../pages/books/OrderPage";
import PrivateRoute from "./PrivateRoute";
import SingleBook from "../Pages/books/SingleBook";
// import OrderPage from "../pages/books/OrderPage";
import { AllBooksPage } from "../Pages/books/AllBooksPage";
import AdminRoute from "./AdminRoute";
import ResetPassword from "../components/ResetPassword";
import PasswordReset from "../components/PasswordReset";
import Wishlist from "../Pages/books/Wishlist";

import AddBook from "../pages/dashboard/addBook/AddBook";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import UpdateBook from "../Pages/dashboard/EditBook/UpdateBook";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import UserDashboard from "../pages/dashboard/users/UserDashboard";
import Home from "../pages/home/Home";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/orders",
            element: <PrivateRoute><OrderPage/></PrivateRoute>
        },
        {
            path: "/about",
            element: <div>About</div>
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
          path: "/reset-password", 
          element:<PasswordReset/>
        },
        {
          path: "/confirm-password", 
          element: <ResetPassword/>
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
          path: "/checkout",
          element: <PrivateRoute><CheckoutPage/></PrivateRoute>
        },
        {
          path: "/books/:id",
          element: <SingleBook/>
        },
        {  path: "/allbooks",
          element: <AllBooksPage/>
        },
        {
          path: "/user-dashboard",
          element: <PrivateRoute><UserDashboard/></PrivateRoute>
        },
        {  path: "/wishlist",
          element: <Wishlist/>
        }
        
      ]
    },
    {
      path: "/admin",
      element: <AdminLogin/>
    },
    {
      path: "/dashboard",
      element: <AdminRoute>
        <DashboardLayout/>
      </AdminRoute>,
      children:[
        {
          path: "",
          element: <AdminRoute><Dashboard/></AdminRoute>
        },
        {
          path: "add-new-book",
          element: <AdminRoute>
            <AddBook/>
          </AdminRoute>
        },
        {
          path: "edit-book/:id",
          element: <AdminRoute>
            <UpdateBook/>
          </AdminRoute>
        },
        {
          path: "manage-books",
          element: <AdminRoute>
            <ManageBooks/>
          </AdminRoute>
        }
      ]
    }
  ]);

  export default router;