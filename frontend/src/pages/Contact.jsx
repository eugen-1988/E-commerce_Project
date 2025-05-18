import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"ME"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px] rounded-lg "
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-700">My Studio</p>
          <p className="text-gray-500 ">
            Grand Rapids blvd. Naples <br /> Florida 34120, USA
          </p>
          <p className="text-gray-500">
            Tel: (786) 3153225 -Alin <br /> marcalshop@gmail.com
          </p>
          <p className="text-gray-500">
            Working hours <br /> Monday-Sunday 9:00-19:00
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Contact;
