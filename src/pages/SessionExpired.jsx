import { Card, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import { FcExpired } from "react-icons/fc";
import logo from "../assets/logo16.png";
import loginbg from "../assets/loginbg.jpg";

export default function SessionExpired() {
  return (
    <div
      className="w-full h-screen"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full h-screen flex flex-col items-center pt-40 backdrop-blur-md bg-white/35">
        <div className="mb-10">
          <img
            className="h-11 w-fit object-cover object-center cursor-pointer"
            src={logo}
            alt="nature image"
          />
        </div>
        <Typography className="text-white text-center mt-5 text-5xl font-semibold">
          Your session has expired <br /> due to inactivity
        </Typography>
        <Link
          to="/login"
          className="bg-[#9599e2] text-white hover:text-white font-medium text-md w-fit self-center mt-10 p-5 py-1 rounded-md shadow-sm hover:shadow-md"
        >
          Faça login
        </Link>
      </div>
    </div>
  );
}
