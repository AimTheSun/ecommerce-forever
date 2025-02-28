import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex item-center justify-between py-5 font-medium">
      <img src={assets.logo} className="w-36" alt="" />

      <ul className="hidden sm:flex gap-5 text-sm text-gray-700 ">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className=/* hidden is to hide the active */ "w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>

        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/contact" className="flex flex-col items-center gap-1 ">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img src={assets.search_icon} className="w-5 cursor-pointer " alt="" />

        <div className="group relative">
          <img
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt=""
          />
          <div className="hidden group-hover:block absolute top-4 right-0 w-36 bg-slate-100 text-gray-500 border shadow-lg">
            <div className="flex flex-col gap-2 py-3 px-5">
              <p className="cursor-pointer hover:text-black"> My Profile </p>
              <p className="cursor-pointer hover:text-black"> My Orders </p>
              <p className="cursor-pointer hover:text-black"> Log out </p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative"></Link>
      </div>
    </div>
  );
};

export default Navbar;
