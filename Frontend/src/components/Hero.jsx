import "./Hero.css";
import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
          <h2>Your Trusted Healthcare Partner...</h2>

          At PrimeCare Hospital, we focus on providing top-notch care with your health in mind. Our team of skilled professionals is here to offer personalized treatment tailored to your needs. Using the latest medical technology and a caring approach, we ensure you get the best care possible. Your health is our priority, and we’re here to support you every step of the way          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
