import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-3xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"ME"} />
      </div>

      {/* Section: Intro + Image */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] rounded-lg"
          src={assets.about_img}
          alt="Alin - Painting By Marcal"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Hey there. I am Alin, the founder and the creative director behind
            ‘Painting By Marcal’. This venture was born out of sheer passion and
            the love of doing what I liked the most—painting. With this
            platform, I aim to expand people’s definition of creativity and make
            them feel confident in whatever they wish to be.
          </p>

          <p>
            Every stroke I paint tells a story—your story, our story, and even
            the stories we didn’t know we were living. Painting By Marcal isn’t
            just about art; it’s about emotion, energy, and individuality.
          </p>

          <b className="text-[#005f78]">Not Just a Jacket</b>
          <p>
            What makes my work truly special is the canvas I choose—denim
            jackets. Denim is timeless, rebellious, and bold—just like those who
            wear it. Each jacket becomes a statement—one that speaks without
            words.
          </p>
        </div>
      </div>

      {/* Section: My Story + My Values side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-600 my-10">
        {/* My Story */}
        <div>
          <div className=" text-3xl  ">
            <Title text1={"My"} text2={"Story"} />
          </div>
          <p className="mb-4">
            I started my career as an interior designer in a prestigious role,
            but something felt missing—a creative void I couldn’t ignore. That
            all changed the day I hand-painted a jacket just for fun and was met
            with overwhelming praise.
          </p>
          <p className="mb-4">
            Four years ago, I moved to the USA and transformed what began as a
            hobby into a full-time passion. My motto, “Take your wardrobe to the
            next level,” captures exactly what I aim to do—create custom,
            one-of-a-kind designs using eco-friendly paints and deep creativity.
          </p>
        </div>

        {/* My Values */}
        <div>
          <div className="text-3xl">
            <Title text1={"My"} text2={"Values"} />
          </div>

          <p className="mb-4">
            With each client, I bring the same energy, dedication, and joy. I
            don’t just want to be another artist—I want to be a force for good,
            a source of inspiration, and a voice for creative individuality.
          </p>
          <p className="mb-4">
            Though based in Florida, I ship worldwide. This platform was born to
            let my art speak louder than words—and if I can make someone smile,
            feel seen, or feel bold through my work, then I’ve done my job.
          </p>
        </div>
      </div>
      <div className="text-3xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE ME"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-[#005f78]">Handcrafted Expression:</b>
          <p>
            Every jacket I create is more than just a fashion piece — it's a
            story painted by hand. From bold designs to subtle textures, each
            brushstroke is tailored to reflect the wearer's personality,
            passion, and purpose.
          </p>
        </div>

        <div className="border px-10 md:px16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-[#005f78]">One-of-a-Kind Wearable Art:</b>
          <p>
            No two jackets are ever the same. I don’t mass-produce art — I craft
            unique pieces that can’t be duplicated. Whether it’s a portrait, a
            powerful phrase, or a surreal motif, your denim becomes a personal
            canvas like no other.
          </p>
        </div>

        <div className="border px-10 md:px16 py-8 sm:py-20 flex flex-col gap-5">
          <b className="text-[#005f78]">Quality Meets Creativity:</b>
          <p>
            All my designs are created using premium, eco-friendly acrylic
            paints that stand the test of time. From sketch to final detail, I
            ensure each jacket delivers both aesthetic impact and long-lasting
            quality, so you can wear your art with pride.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;
