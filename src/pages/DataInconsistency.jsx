import { Card, Typography } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo16.png";
import { HiShieldExclamation } from "react-icons/hi2";

export default function DataInconsistency() {
  return (
    <div className="w-full h-screen bg-[#F5F7FA] flex flex-col items-center pt-40 px-4">
      <div className="mb-10">
        <img
          className="h-11 w-fit object-cover object-center cursor-pointer"
          src={logo}
          alt="nature image"
        />
      </div>
      <Card className=" p-4 px-10">
        <Typography className="text-3xl self-center">
          <HiShieldExclamation className="text-orange-400" />
        </Typography>
        <Typography className="text-center text-lg mt-5">
          Houve uma inconsistência ao carregar os dados.
        </Typography>
        <Typography className="text-center mt-2">
          Tente de novo mais tarde.
        </Typography>
        <Link
          to="/"
          className="bg-[#9599e2] text-white hover:text-white font-medium text-md w-fit self-center mt-10 p-5 py-1 rounded-md shadow-sm hover:shadow-md"
        >
          Entendi
        </Link>
      </Card>
    </div>
  );
}
