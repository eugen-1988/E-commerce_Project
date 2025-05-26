import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const portraitImages = [
  assets.p_1,
  assets.p_2,
  assets.p_3,
  assets.p_4,
  assets.p_5,
  assets.p_6,
  assets.p_7,
  assets.p_8,
  assets.p_9,
  assets.p_10,
];

const Portrait = () => {
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"CUSTOM"} text2={"PORTRAITS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Original Art, Custom Crafted on Every Jacket – Made to Reflect You.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
        {portraitImages.map((src, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-500/50"
          >
            <img
              src={src}
              alt={`Custom Portrait ${index + 1}`}
              className="w-full h-auto object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden bg-gradient-to-l from-[#e0f7fa] to-white py-4 px-6 rounded-xl shadow-md mt-12 mb-6 max-w-3xl mx-auto">
        <div className="animate-slide-in text-center text-base sm:text-lg font-semibold text-gray-800 tracking-wide">
          Portrait (one person) – $239 &nbsp; | &nbsp; Portrait (two or more
          persons) – $289
        </div>

        {/* Highlight effect as a sliding overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-[#cceef5] to-transparent opacity-40 animate-highlight-slide pointer-events-none" />
      </div>
      <div className="flex justify-center gap-2 mt-10">
        <NavLink
          to="/design-your-own"
          className="px-6 py-2 bg-[#005f78] text-white font-medium rounded-full transition-all duration-300 border border-transparent hover:bg-transparent hover:text-gray-700 hover:border-gray-400"
        >
          Design Your Own
        </NavLink>
      </div>
    </div>
  );
};

export default Portrait;
