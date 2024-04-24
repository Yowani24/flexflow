import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/logo16.png";
import { Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useLang } from "../../hook/LangContext";
import showcaseImage4 from "../assets/showcaseImage4.png";
import { FaLinkedin } from "react-icons/fa";

export default function Showcase() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const { translations } = useLang();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const renderLogoutButton = () => {
    if (!user) return null;
    return (
      <Button onClick={handleLogout} className="self-start mt-5 text-[#f1f3fd]">
        {translations.logout}
      </Button>
    );
  };

  return (
    <div className="showcase_bg bg-[#f1f3fd] md:px-36 min-h-screen pt-[5%]">
      <div className="flex items-center justify-center">
        <img
          className="h-16 w-fit object-cover object-center cursor-pointer"
          src={logo}
          alt="nature image"
        />
      </div>
      <p className="text-center mt-5 text-[#212529] transition rounded-md font-medium md:text-2xl">
        {translations.hello} {user?.displayName} 👋
      </p>
      <div className="mt-10 md:mt-20 flex gap-5 items-center justify-center flex-wrap">
        <div className="flex flex-col items-center md:items-start px-5 w-[500px]">
          <Typography className="text-[#212529] font-bold text-6xl md:text-[70px] leading-none text-left md:text-left">
            {translations.innovate_with}
          </Typography>
          <Typography className="flex items-center text-7xl font-bold leading-none justify-center flex-wrap">
            <span className="text-[#556df1]">Se</span>
            <span className="text-[#d6a033]">m</span>
            <span className="text-[#2fbae4]">ba</span>
          </Typography>
          <p className="mt-6 text-[#212529] text-md md:text-xl text-center md:text-left">
            {translations.showcase_message}
          </p>
          <Link to="/entry" className="flex self-center md:self-start mt-5">
            <Button className="self-start text-[#dadef1] text-sm normal-case py-2 tracking-normal">
              {translations.get_started}
            </Button>
          </Link>
        </div>
        <img
          className="h-[400px] rounded-lg object-cover object-center"
          src={showcaseImage4}
          alt="nature image"
        />
      </div>
      <div className="absolute hidden md:flex left-[2%] bottom-[2%] items-end gap-2">
        <Typography
          variant="small"
          className="text-white text-xs flex items-end gap-2"
        >
          <span>Made with 💚 by</span>{" "}
          <a
            className="flex items-center text-white hover:text-white"
            href="https://www.linkedin.com/in/joão-augusto-da-costa-535b30196"
            target="_blank"
          >
            <FaLinkedin size={15} className="mb-[3px] mr-[2px]" />
            João A. da Costa
          </a>
        </Typography>
      </div>
    </div>
  );
}
