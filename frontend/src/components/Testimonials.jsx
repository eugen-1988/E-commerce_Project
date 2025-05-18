import React from "react";

const testimonials = [
  {
    name: "Pam",
    message:
      "Love it! Quality jacket and the work was done very well. We received it without any issues and before we ever expected. The shop owner was very nice.",
  },
  {
    name: "Brie",
    message:
      "FULL 10/10 I am so happy with how it turned out!!! I am in love with it!!! Such amazing work and the owner was so nice and good to work with. It’s even better than I imagined!!!!",
  },
  {
    name: "Natalie",
    message:
      "Amazing customer service and quick turnaround! Couldn't be happier!",
  },
  {
    name: "Tee",
    message:
      "I was finally able to give my sister her Christmas gift and she lovessssssss it. It fits perfect. Thank you.",
  },
  {
    name: "Beth",
    message:
      "Truly enjoyed working with a talented artist to create my daughter's new favorite piece. Thank you! I highly recommend and hope to work with you again.",
  },
  {
    name: "Colleen",
    message:
      "Such a cute jacket.....Very helpful!! Will definitely be ordering another with a different cute saying!! You were Awesome! Ty!!",
  },
];

const Testimonials = () => {
  return (
    <div className="bg-white py-20 px-4 sm:px-8 lg:px-16 text-[#414141]">
      {/* Titlu centrat + linia în dreapta */}
      <div className="flex justify-center items-center mb-6">
        <h2 className="prata-regular text-3xl lg:text-5xl leading-relaxed text-center relative">
          What People Are Saying
          <span className="inline-block w-8 md:w-11 h-[2px] bg-[#414141] ml-3 align-middle"></span>
        </h2>
      </div>

      {/* Carduri Testimonials – neschimbate */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 bg-[#fdfdfd]"
          >
            <p className="text-sm text-gray-700 leading-relaxed mb-4">
              “{testimonial.message}”
            </p>
            <p className="font-semibold text-[#005f78] text-sm">
              — {testimonial.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
