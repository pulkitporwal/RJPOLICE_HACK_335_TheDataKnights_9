import React from "react";
import AajadiAmritMahotasavLogo from "../Assets/Aajadi-amrit-mahotasav.jpg";
import G20Logo from "../Assets/g20.png";
import indianGovernmentLogo from "../Assets/indian-government.png";
import { Link } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import {
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full h-[40vh]  relative bottom-0 left-0 flex items-center justify-center">
      <div>
        <hr className="w-[97vw]" />
        <div className="flex items-center justify-between px-28 py-10">
          <img src={indianGovernmentLogo} className="w-20" />
          <ul className="list-none">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/"}>File Complaint</Link>
            </li>
            <li>
              <Link to={"/"}>Track Complaint</Link>
            </li>
            <li>
              <Link to={"/"}>About Us</Link>
            </li>
            <li>
              <Link to={"/"}>Contact Us</Link>
            </li>
          </ul>
          <div className="flex items-center justify-between flex-col gap-5">
            <div className="flex items-center justify-between gap-2">
              <img src={AajadiAmritMahotasavLogo} className="w-28" />
              <img src={G20Logo} className="w-28" />
            </div>
            <div className="flex items-center justify-between gap-5">
              <FaFacebook size={"25px"} className="hover:text-blue-600"/>
              <FaInstagram size={"25px"} className="hover:text-pink-600"/>
              <FaLinkedin size={"25px"} className="hover:text-blue-900"/>
              <FaTwitter size={"25px"} className="hover:text-blue-500"/>
              <FaWhatsapp size={"25px"} className="hover:text-green-600"/>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
