import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [gender, setGender] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* ---------Product Data-------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* -----------Product Images-------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full ">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] ">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* -------Product Info----------*/}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt=" " className="w-3 5" />
            <img src={assets.star_icon} alt=" " className="w-3 5" />
            <img src={assets.star_icon} alt=" " className="w-3 5" />
            <img src={assets.star_icon} alt=" " className="w-3 5" />
            <img src={assets.star_icon} alt=" " className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-200 ${
                    item === size ? "border-orange-500 text-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* -------- Select Gender -------- */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Gender</p>
            <div className="flex gap-10">
              {/* Female option */}
              <div className="flex flex-col items-center gap-2">
                <img
                  src={assets.women_img}
                  onClick={() => setGender("Women")}
                  className={`w-24 h-24 object-cover border-2 cursor-pointer rounded-md ${
                    gender === "Women" ? "border-orange-500" : "border-gray-300"
                  }`}
                  alt="Women's Jacket"
                />
                <span className="text-sm text-gray-600">Women</span>
              </div>

              {/* Male option */}
              <div className="flex flex-col items-center gap-2">
                <img
                  src={assets.man_img}
                  onClick={() => setGender("Men")}
                  className={`w-24 h-24 object-cover border-2 cursor-pointer rounded-md ${
                    gender === "Men" ? "border-orange-500" : "border-gray-300"
                  }`}
                  alt="Men's Jacket"
                />
                <span className="text-sm text-gray-600">Men</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size, gender)}
            className="bg-orange-500 rounded-md text-white px-8 py-3 text-sm active:bg-orange-400"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5 border-gray-300 border-t-2" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Secure Online Payments via Stripe, Major Cards & PayPal</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* -------Description Review Section---------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews(122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Unleash your style with our exclusive collection of handcrafted
            custom denim jackets. Each piece is made to order and designed by
            skilled artist, giving you a wearable canvas that reflects your
            unique personality. Whether you upload your own photo, add custom
            text, or choose from our original artwork, your Marcal jacket will
            be a one-of-a-kind fashion statement.
          </p>
          <p>
            Perfect for streetwear lovers, fashion-forward creatives, or anyone
            looking to stand out—our personalized denim jackets are more than
            clothing—they're art you can wear. Made with premium materials and
            crafted in the USA, every jacket promises comfort, durability, and
            unmatched individuality.
          </p>
        </div>
      </div>

      {/* -------Display related products---------- */}
      <RelatedProducts category={productData.category} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
