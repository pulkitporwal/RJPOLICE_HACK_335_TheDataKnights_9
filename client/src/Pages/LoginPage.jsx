import React from "react";
import iccccLogo from "../Assets/icccc-logo.jpg";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col items-center justify-center border-[0.5px] py-10 px-20">
        <Link to={"/"}>
          <img src={iccccLogo} className="w-[150px] mb-6" />
        </Link>
        <h2 className="text-xl uppercase text-red-500 font-bold mb-4">
          Login!{" "}
        </h2>
        <div>
          <div className="mb-5">
            <p>Email:</p>
            <input
              type="email"
              className="border-[0.5px] rounded-md w-[300px] px-3 py-1"
            />
          </div>
          <div>
            <p>Password:</p>
            <input
              type="password"
              className="border-[0.5px] rounded-md w-[300px] px-3 py-1"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="py-1 px-2 mt-3 rounded-xl border-[2px] border-transparent transition-all ease-in hover:rounded-2xl hover:border-yellow-400 hover:bg-transparent hover:scale-90 bg-yellow-400">
              Login
            </button>
            <div className=" mt-3 text-[12px] text-blue-500">
              <Link>
                <p>Forgot Password?</p>
              </Link>
              <Link>
                <p>Don't Have Account!</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
