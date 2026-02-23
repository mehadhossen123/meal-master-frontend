import { Link, NavLink, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import Logo from "../component/Logo";
import Swal from "sweetalert2";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  const defaultUserImg =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  // থিম ইমপ্লিমেন্টেশন
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            `font-medium ${isActive ? "text-primary font-bold underline" : theme === "dark" ? "text-gray-300" : "text-slate-700"}`
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `font-medium ${isActive ? "text-primary font-bold underline" : theme === "dark" ? "text-gray-300" : "text-slate-700"}`
          }
          to="/add-expense"
        >
          Add Expense
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `font-medium ${isActive ? "text-primary font-bold underline" : theme === "dark" ? "text-gray-300" : "text-slate-700"}`
          }
          to="/report"
        >
          Report
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            `font-medium ${isActive ? "text-primary font-bold underline" : theme === "dark" ? "text-gray-300" : "text-slate-700"}`
          }
          to="/dashboard"
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    logOut().then(() => {
      navigate("/");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Logout successful",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  return (
    <nav
      className={`navbar fixed top-0 left-0 right-0 border-b-0 z-[100] shadow-md px-4 lg:px-10 transition-colors duration-300 border-b 
      ${theme === "light" ? "bg-white" : "bg-slate-900"}`}
    >
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className={`btn btn-ghost ${theme === "dark" ? "text-white hover:bg-slate-800" : "text-slate-900 hover:bg-gray-100"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
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
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl rounded-box w-52 border 
            ${theme === "light" ? "bg-white border-gray-100 text-slate-800" : "bg-slate-800 border-slate-700 text-white"}`}
          >
            {links}
          </ul>
        </div>
        <div className="hidden lg:block">
          <Logo />
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 italic">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-3">
        {/* Toggle Icon */}
        <div
          onClick={toggleTheme}
          className={`cursor-pointer p-2.5 rounded-full transition-all border 
          ${theme === "light" ? "bg-gray-100 border-gray-200 hover:bg-gray-200" : "bg-slate-800 border-slate-700 hover:bg-slate-700"}`}
        >
          {theme === "light" ? (
            <IoMoonOutline size={22} className="text-slate-700" />
          ) : (
            <IoSunnyOutline size={22} className="text-yellow-400" />
          )}
        </div>

        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border-2 border-primary p-0.5"
            >
              <div className="w-full rounded-full">
                <img alt="Profile" src={user?.photoURL || defaultUserImg} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl rounded-box w-56 border 
              ${theme === "light" ? "bg-white border-gray-100 text-slate-800" : "bg-slate-800 border-slate-700 text-white"}`}
            >
              <div
                className={`px-4 py-3 border-b mb-1 ${theme === "light" ? "border-gray-100" : "border-slate-700"}`}
              >
                <p className="font-bold text-sm truncate">
                  {user?.displayName || "User"}
                </p>
                <p
                  className={`text-xs truncate ${theme === "light" ? "text-slate-500" : "text-slate-400"}`}
                >
                  {user?.email}
                </p>
              </div>
              <li>
                <Link to="/dashboard" className="py-2">
                  Dashboard
                </Link>
              </li>
              <hr
                className={`my-1 opacity-50 ${theme === "light" ? "border-gray-100" : "border-slate-700"}`}
              />
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 py-2"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/auth/login"
            className="btn btn-primary btn-sm px-6 rounded-full text-white"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
