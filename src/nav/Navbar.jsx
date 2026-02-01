import { Link, NavLink, useNavigate } from "react-router";

import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import Logo from "../component/Logo";
import Swal from "sweetalert2";
import Loading from "../component/Loading";


const Navbar = () => {
  const { user, logOut,loading } = useContext(AuthContext);
   const navigate = useNavigate();
  if(loading){
    return <Loading></Loading>
  }
 


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

  const handleLogout = () => {
    logOut().then(() => {
        navigate("/")
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
    <div className="navbar bg-white fixed z-10 shadow-sm px-4 lg:px-10">
      <div className="navbar-start">
        <Logo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">{links}</ul>
      </div>

      <div className="navbar-end gap-4">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border border-primary">
                <img alt="Profile" src={user?.photoURL || defaultUserImg} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border border-gray-100"
            >
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
              <hr className="my-1" />
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500 font-semibold"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/auth/login" className="btn btn-primary btn-sm">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
