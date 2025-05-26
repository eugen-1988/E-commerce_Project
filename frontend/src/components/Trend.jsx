import React from "react";
import { assets } from "../assets/assets";

const Trend = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400 rounded-lg overflow-hidden mt-10 h-auto sm:h-72">
      {/* Image on Left */}
      <img
        className="w-full sm:w-1/2 h-64 sm:h-full object-cover"
        src={assets.trend_img}
        alt="Trending Jacket"
      />

      {/* Content on Right */}
      <div className="bg-[#fef2f2] w-full sm:w-1/2 flex items-center justify-center px-4 sm:px-8 lg:px-16">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">Trending Now</p>
          </div>
          <h1 className="prata-regular text-2xl sm:py-3 lg:text-4xl leading-relaxed">
            Streetwear Just Got Personal
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">
              Custom painted denim jackets designed by an independent
              artist—bold, stylish, and one of a kind.
            </p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trend;
