import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-[max(10%,80px)]" src={assets.logo} alt="" />
      <button
        onClick={() => setToken("")}
        className="px-6 py-2 bg-[#005f78] text-white font-medium rounded-full transition-all duration-300 border border-transparent hover:bg-transparent hover:text-gray-700 hover:border-gray-400"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
