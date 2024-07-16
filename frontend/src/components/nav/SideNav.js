import React from "react";
import "./SideNav.css";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import { BiNetworkChart } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import { BsCart3 } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { logout } from "../../redux/actions/authActions";

export const SideNav = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="side-nav-wrapper bg-[#242733] h-screen w-[12%] p-10">
      <div className="flex items-center mb-10 gap-2">
        {/* <img className="h-8" src={logo} /> */}
        <div className="flex">  <BiNetworkChart className="fill-white text-2xl"/></div>
      
        <h1 className="text-lg font-semibold text-white ">Creatorship</h1>
      </div>

      <div className="side-nav list-none flex flex-col h-[80vh] justify-between">
        <header>
          <ul className="flex flex-col gap-2 text-white">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </header>
        <footer>
          <ul className="flex flex-col gap-2 text-white">
            {auth?.isAuthenticated === true ? (
              <>
                <li className="flex gap-2 items-center text-gray-200">
                  <div>
                    <FaRegUserCircle className="h-6 w-6" />
                  </div>
                  <p className="font-semibold text-xl">{auth.user?.username}</p>
                </li>

                <li className="py-2">
                  <button
                    className="w-full p-2 rounded-lg bg-gray-600 hover:bg-gray-500"
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>

                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </footer>
      </div>
    </div>
  );
};