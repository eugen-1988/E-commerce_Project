import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div className=" flex flex-col sm:flex-row border border-gray-400 rounded-lg overflow-hidden">
      {/* Hero Left Side */}
      <div className="bg-[#fef2f2] w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 ">
        <div className=" text-[#414141] px-4 sm:px-8 lg:px-16">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">
              CUSTOM JACKETS MADE FOR YOU
            </p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Designed by Artist
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">
              Upload your own photo & add text to create your one-of-a-kind
              Marcal jacket
            </p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
          <div className="flex items-center gap-2 mt-10">
            <NavLink
              to="/design-your-own"
              className="px-6 py-2 bg-[#005f78] text-white font-medium rounded-full transition-all duration-300 border border-transparent hover:bg-transparent hover:text-gray-700 hover:border-gray-400"
            >
              Start Designing
            </NavLink>
          </div>
        </div>
      </div>
      {/* Hero Right Side */}
      <img className="w-full sm:w-1/2" src={assets.hero_img} alt="" />
    </div>
  );
};

export default Hero;
