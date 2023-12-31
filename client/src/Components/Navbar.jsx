import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import iccccLogo from "../Assets/icccc-logo.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  let [open, setOpen] = useState(false);
  return (
    <div className="shadow-md fixed top-0 left-0 z-50 w-full mb-5">
      <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
        <div className="flex items-center justify-center gap-5">
          <img src={iccccLogo} width={"180px"} />
          <div className="flex flex-col items-start justify-center font-bold">
            <p>
              राष्ट्रीय <span className="text-red-600">साइबर अपराध</span>{" "}
              रिपोर्टिंग पोर्टल
            </p>
            <p>
              National <span className="text-red-600">Cyber Crime</span>{" "}
              Reporting Portal
            </p>
          </div>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <CiMenuFries name={open ? "close" : "menu"}></CiMenuFries>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          <li className="md:ml-8 text-md md:my-0 my-7">
            <Link className="text-gray-800 hover:text-gray-400 duration-500">
              Track Complaint
            </Link>
          </li>
          <li className="md:ml-8 text-md md:my-0 my-7">
            <Link className="text-gray-800 hover:text-gray-400 duration-500">
              ABOUT US
            </Link>
          </li>
          <li className="md:ml-8 text-md md:my-0 my-7">
            <Link className="text-gray-800 hover:text-gray-400 duration-500">
              CONTACT US
            </Link>
          </li>
          <Link to={"/login"}>
            <button className="py-3 px-4 ml-10 rounded-xl border-[2px] border-transparent transition-all ease-in hover:rounded-2xl hover:border-yellow-400 hover:bg-transparent hover:scale-90 bg-yellow-400">
              File Complaint
            </button>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
