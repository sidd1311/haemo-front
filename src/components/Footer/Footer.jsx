import React from "react";
import "./Footer.css";
import logo from "../../assets/logo6.jpg";
import { FaFacebook } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="container-fluid gx-0">
        <div className="row gx-0">
          <div className="col-md-3">
            <div className="footer_col1">
              <img src={logo} alt="BloodBridge Logo" />
              <p>Saving lives, one Donation at a time.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="footer_col2">
              <h3>Quick Links</h3>
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <a href="#about">About Us</a>
                </li>
                <li>
                  <a href="#donate">Donate</a>
                </li>
                <li>
                  <a href="#contact">Contact</a>
                </li>
                <li>
                  <a href="#admin">Admin</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-3">
            <div className="footer_col3">
              <h3>Contact Us</h3>
              <ul>
                <li>123 HemoShare Ave, Faridabad, INDIA</li>
                <li>Phone: (123) 456-7890</li>
                <li>Email: info@haemoshare.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row gx-0">
        <div className="col-md-11">
          <div className="red-line"></div>

          <div className="footer_bottom">
            <p className="copyright">© 2024 HaemoShare. All rights reserved.</p>
            <div className="footer_icons">
              <FaFacebook />
              <FaTwitterSquare />
              <FaInstagramSquare />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
