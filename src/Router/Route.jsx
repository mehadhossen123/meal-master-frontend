

import { createBrowserRouter} from "react-router-dom"; 
import HomeLayout from "../layout/HomeLayout";
import Home from "../pages/Home";
import AddMeal from "../pages/AddMeal";
import Report from "../pages/Report";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element:<Home></Home>,
      },
      {
        path:"/add-meal",
        element:<AddMeal></AddMeal>
      },
      {
        path:"/report",
        element:<Report></Report>
      }
    ],
  },
  {
    path:"/dashboard",
    element:<DashboardLayout></DashboardLayout>,
    children:[
        {
            path:"/dashboard",
            element:<Dashboard></Dashboard>
        }
    ]
  }
]);

