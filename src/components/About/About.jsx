import React from 'react';
import './About.css';
import Image from '../../assets/about.jpg';


const About = () => {
  return (
    <div className="about-container">
      <div className="about-text">
        <h1>HaemoShare</h1>
        <p>
          <strong>HaemoShare</strong> is a platform dedicated to connecting blood donors with patients in need. Our mission is to make blood donation easy, fast, and accessible, helping save lives through community support and generosity.
        </p>
        <p>
          <strong>Why HaemoShare?</strong><br />
          HaemoShare ensures a reliable and transparent connection between donors and recipients. With a focus on safety, convenience, and trust, we provide a seamless way to donate or request blood, ensuring that help is always available when it’s needed most.
        </p>
      </div>
      <div className="about-image">
        <img src={Image} alt="HaemoShare Blood Donation" />
      </div>
    </div>
  );
};

export default About;
