import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo5.png";
import "./Navbar.css";

const Navbar = () => {
  const [scroll, setScroll] = useState(false);

  const handleScroll = () => {
    const offsets = window.scrollY;
    setScroll(offsets > 200);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg nav_sec1 ${
        scroll ? "sticky_nav1" : ""
      }`}
    >
      <div className="container-fluid gx-0">
        <NavLink to="/" className="logo-link">
          <img src={logo} className="logo" alt="Logo" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-lg-0 nav_ul">
            <li className="nav-li">
              <NavLink to="/" key="home">
                Home
              </NavLink>
            </li>
            <li className="nav-li">
              <NavLink to="/Donors" key="contact">
                Donors
              </NavLink>
            </li>
            <li className="nav-li">
              <NavLink to="/about" key="about">
                About
              </NavLink>
            </li>
            <li className="nav-li">
              <NavLink to="/contact" key="contact">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
