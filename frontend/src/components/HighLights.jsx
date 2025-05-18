import React from "react";

const highlights = [
  {
    title: " Hand-Painted Art on Jackets",
    text: "Each jacket is transformed into a wearable canvas. Every design is uniquely painted by the artist, making each piece one-of-a-kind — no stencils, no prints, just pure creativity.",
  },
  {
    title: " Custom Orders Just for You",
    text: "Want something personal? Send your idea, and the artist will turn it into a custom jacket that reflects your style, story, or passion — from portraits to abstract art.",
  },
  {
    title: " Shop Originals & Limited Drops",
    text: "Discover ready-to-wear hand-painted jackets available in limited quantities. New collections drop seasonally, and once they’re gone — they’re gone. No restocks. Ever.",
  },
];

const HighLights = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-8 lg:px-16">
      <div className="flex flex-col lg:flex-row gap-10">
        {highlights.map((item, index) => (
          <div key={index} className="flex-1 border-l-4 border-[#005f78] pl-4">
            <div className="flex items-center gap-2 mb-2">
              <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
              <h3 className="text-lg font-bold text-[#005f78]">{item.title}</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighLights;
