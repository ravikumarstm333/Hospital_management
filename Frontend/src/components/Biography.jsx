import "./Biography.css";
import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div className="container biography">
      {/* Biography Banner */}
      <div className="banner">
        <img src={"/photoes/about1.png"} alt="About Us" />
      </div>

      {/* Introduction Section */}
      <div className="banner">
        <p className="sub-heading" color="red">About Us</p>
        <h2 className="heading">Who We Are</h2>

        <p>
        At PrimeCare Hospital, our mission is to provide exceptional healthcare services to every individual. With the support of advanced technologies and a team of experienced doctors, we strive to deliver high-quality medical care.
        </p>

        <p><strong>We are committed to being here for you in 2025 and beyond.!</strong></p>

        <p>
          Our team understands the needs of every patient and provides them with the best treatment and care.
          Your health is our priority.
        </p>

      </div>
    </div>
  );
};

export default Biography;