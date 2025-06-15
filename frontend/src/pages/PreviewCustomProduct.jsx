import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const PreviewCustomProduct = ({
  productData = {
    _id: uuidv4(),
    name: "Preview Custom Jacket",
    image: [
      "https://via.placeholder.com/600x800.png?text=Front+View",
      "https://via.placeholder.com/600x800.png?text=Back+View",
    ],
    price: 99.99,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "Static preview for layout only.",
  },
  currency = "$",
  canvasImage,
}) => {
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [textDesignQty, setTextDesignQty] = useState(1);
  const [image, setImage] = useState(productData.image?.[0]);
  const [size, setSize] = useState(null);
  const [gender, setGender] = useState(null);

  const { addToCart } = useContext(ShopContext);

  const styleMap = {
    Portrait: 289,
    "Portrait Two or More Person": 289,
    Animation: 220,
    "Pop Art": 289,
    "Logo and Text Design": 110,
    "Text Design": 69,
  };

  const toggleCategory = (e) => {
    const { value, checked } = e.target;

    if (value === "Text Design" && checked) {
      setTextDesignQty(1);
    }

    setSelectedStyles((prev) =>
      checked
        ? [...prev, { name: value, price: styleMap[value] }]
        : prev.filter((item) => item.name !== value)
    );
  };

  const subtotal = selectedStyles.reduce((sum, item) => {
    if (item.name === "Text Design") {
      return sum + item.price * textDesignQty;
    }
    return sum + item.price;
  }, 0);

  const defaultSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const sizes =
    Array.isArray(productData.sizes) && productData.sizes.length === 6
      ? productData.sizes
      : defaultSizes;

  const uploadToCloudinary = async (base64Image) => {
    const data = new FormData();
    data.append("file", base64Image);
    data.append("upload_preset", "custom_preview");
    data.append("cloud_name", "dfxbirzsj");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dfxbirzsj/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const json = await res.json();
    return json.secure_url;
  };

  const handleAddToCart = async () => {
    if (selectedStyles.length === 0) {
      toast.error("Please select at least one style option.");
      return;
    }
    if (!size) {
      toast.error("Please select a size.");
      return;
    }
    if (!gender) {
      toast.error("Please select a gender.");
      return;
    }

    try {
      const uploadedImage = canvasImage
        ? await uploadToCloudinary(canvasImage)
        : image;

      addToCart(productData._id, size, gender, {
        name: productData.name,
        image: uploadedImage,
        price: subtotal + 49,
      });

      toast.success("Custom product added to cart!");
    } catch (error) {
      toast.error("Failed to upload image. Try again.");
      console.error(error);
    }
  };

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Section Title */}
      <div className="flex justify-center items-center text-center my-4">
        <Title text1="CHOOSE" text2="YOUR STYLE OPTION" />
      </div>

      {/* Style Options */}
      <div className="w-full overflow-x-auto bg-white border-y-2 border-gray-300 py-6">
        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6 px-6 max-h-[500px]">
          {[
            { src: assets.portrait, label: "Portrait", price: 289 },
            {
              src: assets.portrait_2pers,
              label: "Portrait Two or More Person",
              price: 289,
            },
            { src: assets.animation, label: "Animation", price: 220 },
            { src: assets.pop_art, label: "Pop Art", price: 289 },
            {
              src: assets.logo_text,
              label: "Logo and Text Design",
              price: 110,
            },
            { src: assets.text, label: "Text Design", price: 69 },
          ].map((item, idx) => (
            <div
              key={idx}
              className="w-[390px] h-[350px] flex flex-col items-center border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-300 bg-white"
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-[70%] object-cover rounded-t-lg"
              />
              <div className="flex flex-col items-center justify-center p-2 h-[30%]">
                <h3 className="text-base font-medium text-gray-800 text-center">
                  {item.label}
                </h3>
                <p className="text-[#007c99] font-bold">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Image Selection */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                key={index}
                onClick={() => setImage(item)}
                src={item}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt="preview"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="main-preview" />
          </div>
        </div>

        {/* Style, Size, Gender, Cart Section */}
        <div className="flex-1">
          {/* Style Options */}
          <div className="flex flex-col gap-4 my-8">
            <Title text1="Select" text2="Your Style" />
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              {[
                { label: "Portrait", price: 289 },
                { label: "Portrait Two or More Person", price: 289 },
                { label: "Animation", price: 220 },
                { label: "Pop Art", price: 289 },
                { label: "Logo and Text Design", price: 110 },
                { label: "Text Design", price: 69, hasQuantity: true },
              ].map((option, idx) => {
                const isSelected = selectedStyles.some(
                  (s) => s.name === option.label
                );

                return (
                  <div key={idx} className="flex flex-col">
                    <label className="flex items-center gap-3 border border-gray-200 rounded-md px-4 py-2 hover:shadow-sm">
                      <input
                        type="checkbox"
                        className="w-5 h-5 accent-orange-500"
                        value={option.label}
                        onChange={toggleCategory}
                        checked={isSelected}
                      />
                      <span className="flex-1">{option.label}</span>
                      <span className="font-bold text-[#007c99]">
                        ${option.price}
                      </span>
                    </label>

                    {option.hasQuantity && isSelected && (
                      <div className="mt-2 ml-6 text-xs text-gray-600 flex flex-col gap-2">
                        <p>
                          Add the quantity if more than one text is included.
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            className="border px-2 py-1 rounded hover:bg-gray-200"
                            onClick={() =>
                              setTextDesignQty((prev) => Math.max(1, prev - 1))
                            }
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="w-12 text-center border rounded"
                            value={textDesignQty}
                            onChange={(e) =>
                              setTextDesignQty(
                                Math.max(1, parseInt(e.target.value) || 1)
                              )
                            }
                          />
                          <button
                            className="border px-2 py-1 rounded hover:bg-gray-200"
                            onClick={() => setTextDesignQty((prev) => prev + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Price Summary */}
            <div className="w-full flex justify-end">
              <div className="w-full max-w-md px-4 py-3 border rounded-md text-sm flex flex-col gap-2">
                <div className="flex justify-between">
                  <p>Subtotal (Selected Styles)</p>
                  <p className="font-semibold text-gray-900">${subtotal}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                  <p>Denim Jacket (Uncustomized)</p>
                  <p className="font-semibold text-gray-900">$49</p>
                </div>
                <hr />
                <div className="flex justify-between text-base font-semibold">
                  <b>Total</b>
                  <b className="text-gray-900">${subtotal + 49}</b>
                </div>
              </div>
            </div>
          </div>

          {/* Size Selection */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-200 ${
                    item === size ? "border-orange-500 text-orange-500" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Gender Selection */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Gender</p>
            <div className="flex gap-10">
              {["Women", "Men"].map((g) => (
                <div
                  key={g}
                  className="flex flex-col items-center gap-2 cursor-pointer"
                  onClick={() => setGender(g)}
                >
                  <img
                    src={g === "Women" ? assets.women_img : assets.man_img}
                    className={`w-24 h-24 object-cover border-2 rounded-md ${
                      gender === g ? "border-orange-500" : "border-gray-300"
                    }`}
                    alt={`${g}'s Jacket`}
                  />
                  <span className="text-sm text-gray-600">{g}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="bg-orange-500 rounded-md text-white px-8 py-3 text-sm active:bg-orange-400"
          >
            ADD TO CART
          </button>

          {/* Footer Info */}
          <hr className="mt-8 sm:w-4/5 border-gray-300 border-t-2" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Secure Online Payments via Stripe, Major Cards & PayPal</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description */}
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
    </div>
  );
};

export default PreviewCustomProduct;
