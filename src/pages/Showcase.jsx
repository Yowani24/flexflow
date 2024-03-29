import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/logo16.png";
import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useLang } from "../../hook/LangContext";
import showcaseImage4 from "../assets/showcaseImage4.png";
import bluedots from "../assets/bluedots.png";

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
    <div className="bg-[#f1f3fd] md:px-36 h-screen pt-[5%]">
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
        <div className="flex flex-col items-center px-5 w-[500px]">
          <p className="text-[#212529] font-bold text-4xl md:text-[70px] leading-none text-left">
            {translations.innovate_with} FlexFlow
          </p>
          <p className="mt-10 text-[#212529] text-xl text-left">
            {translations.showcase_message}
          </p>
          <Link to="/entry" className="flex self-start">
            <Button className="self-start mt-5 text-[#dadef1]">
              {translations.get_started}
            </Button>
          </Link>
          {/* {renderLogoutButton()} */}
        </div>
        {/* <div
          className="h-[500px] w-[400px] rounded-md"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div> */}
        <img
          className="h-[400px] rounded-lg object-cover object-center"
          src={showcaseImage4}
          alt="nature image"
        />
      </div>
    </div>
  );
}
