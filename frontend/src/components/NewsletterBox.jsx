import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Sign Up & Be the First to See New Hand-Painted Jackets
      </p>
      <p className="text-gray-400 mt-3">
        Get exclusive styling tips, behind-the-scenes looks at the artistic
        process, and early access to limited custom drops — sent straight to
        your inbox.
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="px-8 py-2 bg-[#005f78] text-white font-medium  transition-all duration-300 border border-transparent hover:bg-transparent hover:text-gray-700 hover:border-gray-400"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
