import "./Departments.css";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/photoes/Pediatrics1.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "/photoes/Orthopedics.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "/photoes/Cardiology.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "/photoes/Neurology.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "/photoes/Oncology.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "/photoes/Radiology.jpeg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/photoes/Physical Therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "/photoes/Dermatology.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/photoes/ENT.jpg",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="departments-container">
      <h2 className="departments-heading">Our Departments</h2>
      <div className="carousel-wrapper">
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          itemClass="carousel-item"
          containerClass="carousel-container"
        >
          {departmentsArray.map((department, index) => (
            <div key={index} className="department-card">
              <div className="image-container">
                <img 
                  src={department.imageUrl} 
                  alt={department.name} 
                  className="department-image"
                  onError={(e) => {
                    e.target.src = '/photoes/default-department.jpg'; // fallback image
                  }}
                />
              </div>
              <h3 className="department-title">{department.name}</h3>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Departments;