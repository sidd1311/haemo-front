import React from "react";
import "./Services.css";
import bloodstorage from "../../../assets/bloodbank.jpg";
import blooddonation from "../../../assets/blooddonation.jpg";
import provisionrbcs from "../../../assets/provisionrbcs.jpg";
import platelets from "../../../assets/platelets.jpg";

const servicesData = [
  {
    imgSrc: bloodstorage,
    title: "Blood Storage",
    para: "We store the safest blood of all blood groups, available for treatments or emergencies.",
  },
  {
    imgSrc: blooddonation,
    title: "Blood Donation",
    para: "Blood donation is a selfless service that can save lives! Contribute by donating blood to those in need.",
  },
  {
    imgSrc: provisionrbcs,
    title: "Provision of Red Blood Cells",
    para: "Low red blood cell counts can be dangerous. We provide red blood cells for various treatments.",
  },
  {
    imgSrc: platelets,
    title: "Provision of Platelets",
    para: "Platelets are crucial for stopping blood flow during injuries. We provide platelets to maintain healthy blood levels.",
  },
];

const Services = () => {
  return (
    <div>
      <h1 className="services-heading">Services</h1>
      <div className="services-container">
        {servicesData.map((service, index) => (
          <div className="service-item" key={index}>
            <img
              src={service.imgSrc}
              alt={service.title}
              className="service-image"
            />
            <p className="service-title">{service.title}</p>
            <p className="service-para">{service.para}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
