import { Link, NavLink, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import Logo from "../component/Logo";
import Swal from "sweetalert2";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import {
  MdOutlineAnalytics,
  MdOutlineSpaceDashboard,
  MdOutlineAddCircleOutline,
  MdOutlineHome,
} from "react-icons/md";
import useRole from "../hook/useRole";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const {userRole} =useRole()

  const defaultUserImg =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  // থিম এবং স্ক্রল হ্যান্ডলিং
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const linkStyles = ({ isActive }) =>
    `font-semibold flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
      isActive
        ? "text-primary bg-primary/10"
        : theme === "dark"
          ? "text-gray-300 hover:text-white hover:bg-slate-800"
          : "text-slate-600 hover:text-primary hover:bg-gray-100"
    }`;

  const links = (
    <>
      <li>
        <NavLink className={linkStyles} to="/">
          <MdOutlineHome size={20} />
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink className={linkStyles} to="/add-expense">
          <MdOutlineAddCircleOutline size={20} />
          <span>Add Expense</span>
        </NavLink>
      </li>
      <li>
        <NavLink className={linkStyles} to="/report">
          <MdOutlineAnalytics size={20} />
          <span>Monthly Insights</span>
        </NavLink>
      </li>
      <li>
        <NavLink className={linkStyles} to="/dashboard">
          <MdOutlineSpaceDashboard size={20} />
          <span>Dashboard</span>
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
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 1500,
        background: theme === "dark" ? "#1e293b" : "#fff",
        color: theme === "dark" ? "#fff" : "#000",
      });
    });
  };

  return (
    <nav
      className={`navbar fixed top-0 left-0 right-0 z-[100] px-4 lg:px-10 transition-all duration-300 border-b ${
        isScrolled
          ? theme === "light"
            ? "bg-white/80 backdrop-blur-md border-gray-100 shadow-sm py-2"
            : "bg-slate-900/80 backdrop-blur-md border-slate-800 shadow-lg py-2"
          : theme === "light"
            ? "bg-white border-transparent py-4"
            : "bg-slate-900 border-transparent py-4"
      }`}
    >
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className={`btn btn-ghost btn-circle ${theme === "dark" ? "text-white" : "text-slate-900"}`}
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
            className={`menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl rounded-2xl w-64 border ${
              theme === "light"
                ? "bg-white border-gray-100"
                : "bg-slate-800 border-slate-700"
            }`}
          >
            {links}
          </ul>
        </div>
        <div className="hidden lg:block transform hover:scale-105 transition-transform">
          <Logo />
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="flex items-center gap-2">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2.5 rounded-xl transition-all border ${
            theme === "light"
              ? "bg-gray-50 border-gray-200 hover:border-primary/30"
              : "bg-slate-800 border-slate-700 hover:border-primary/30"
          }`}
        >
          {theme === "light" ? (
            <IoMoonOutline size={20} className="text-slate-700" />
          ) : (
            <IoSunnyOutline size={20} className="text-yellow-400" />
          )}
        </button>

        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="group flex items-center gap-2 cursor-pointer"
            >
              <div className="hidden md:block text-right">
                <p
                  className={`text-xs font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                >
                  {user?.displayName?.split(" ")[0]}
                </p>
                <p className="text-[10px] text-slate-500 font-medium">{userRole}</p>
              </div>
              <div className="avatar">
                <div className="w-10 rounded-xl ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden transition-all group-hover:ring-offset-4">
                  <img src={user?.photoURL || defaultUserImg} alt="profile" />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-4 z-[1] p-3 shadow-2xl rounded-2xl w-64 border ${
                theme === "light"
                  ? "bg-white border-gray-100"
                  : "bg-slate-800 border-slate-700"
              }`}
            >
              <div className="px-3 py-3 border-b border-slate-100 dark:border-slate-700 mb-2">
                <p
                  className={`font-bold text-sm ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                >
                  {user?.displayName}
                </p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
              <li>
                <Link to="/dashboard" className="py-2.5 rounded-lg">
                  User Dashboard
                </Link>
              </li>
              <li className="mt-2">
                <button
                  onClick={handleLogout}
                  className="bg-red-50 dark:bg-red-500/10 text-red-600 font-bold py-2.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20"
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/auth/login"
            className="btn btn-primary btn-sm h-10 px-6 rounded-xl text-white shadow-lg shadow-primary/20"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
