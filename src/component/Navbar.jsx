
import { Link, NavLink } from "react-router";
import Logo from "./Logo";



const Navbar = () => {
   
  
  const defaultUserImg =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
          to={"/add-meal"}
        >
          Add meal
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
          to={"/add-expense"}
        >
          Add Expense
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
          to={"/report"}
        >
          Report
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : ""
          }
          to={"/dashboard"}
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-white fixed z-10 shadow-sm px-4 lg:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Logo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">{links}</ul>
      </div>

      <div className="navbar-end gap-4">
        {/* প্রোফাইল ড্রপডাউন অংশ */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full border border-primary">
              <img alt="Profile" src={defaultUserImg} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-gray-100"
          >
            <li>
              <a className="justify-between">
                Item-1 <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Item-2</a>
            </li>
            <li>
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            <hr className="my-1" />
            <li>
              <Link to="/auth/login" className="text-red-500 font-semibold">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
