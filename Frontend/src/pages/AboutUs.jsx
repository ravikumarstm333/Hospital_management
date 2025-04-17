import "./AboutUs.css";
import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";

const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us\nOur Medical Institute"}
        imageUrl={"/photoes/about.png"}
      />
      <Biography imageUrl={"/photoes/about1.png"} />
    </>
  );
};

export default AboutUs;