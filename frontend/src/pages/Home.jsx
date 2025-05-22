import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/Portrait";
import HighLights from "../components/HighLights";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div>
      <Hero />
      <HighLights />
      <LatestCollection />
      <BestSeller />
      <Testimonials />
      <OurPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
