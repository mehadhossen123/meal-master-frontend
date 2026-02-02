

import { createBrowserRouter} from "react-router-dom"; 
import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/Home";
import AddMeal from "../pages/AddMeal";
import Report from "../pages/Report";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import AuthLayout from "../layout/AuthLayout";
import Login from "../auth/Login";
import Register from "../auth/Register";
import NotFound from "../pages/NotFound";
import Expense from "../pages/Expense";
import PrivateRoute from "./PrivateRoute";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/add-meal",
        element: <AddMeal></AddMeal>,
      },
      {
        path: "/report",
        element: (
          <PrivateRoute>
            <Report></Report>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-expense",
        element: (
          <PrivateRoute>
            <Expense></Expense>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

