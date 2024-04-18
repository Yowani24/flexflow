import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
  Button,
} from "@material-tailwind/react";
import { FaCircleUser } from "react-icons/fa6";
import { useLang } from "../../hook/LangContext";
import logo from "../assets/logo16.png";
import { IoLanguageSharp } from "react-icons/io5";
import useFetchData from "../../hook/useFetchData";
import { RxGear } from "react-icons/rx";
import NotificationMenuComponent from "./NotificationMenuComponent";

export default function Header() {
  const { data } = useFetchData();
  const { language, switchLanguage, translations } = useLang();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const LanguageChangeComponent = () => {
    return (
      <Menu>
        <MenuHandler>
          <Button
            variant="text"
            className="p-[2px] px-[2px] m-0 bg-gray-400 w-12 h-7 flex overflow-hidden"
          >
            <div className="bg-gray-600 w-full h-full rounded-l-md text-white flex items-center justify-center">
              <IoLanguageSharp size={18} />
            </div>
            <div className="bg-white w-full h-full rounded-r-md text-gray-600 flex items-center justify-center text-sm lowercase">
              {language}
            </div>
          </Button>
        </MenuHandler>

        <MenuList>
          <MenuItem onClick={() => switchLanguage("pt")} className="bg-white">
            {translations.language_pt}
          </MenuItem>
          <MenuItem onClick={() => switchLanguage("en")} className="bg-white">
            {translations.language_en}
          </MenuItem>
        </MenuList>
      </Menu>
    );
  };

  return (
    <div className="h-30 bg-white fixed top-0 left-0 w-full z-30 flex flex-col items-center justify-between">
      <div className="conaheader h-16 bg-white w-full z-10 flex items-center justify-between px-10">
        <img
          className="h-11 w-fit object-cover object-center cursor-pointer"
          src={logo}
          alt="nature image"
        />
        <div className="mt-4">
          <div className="flex items-center gap-10">
            <LanguageChangeComponent />
            <div className="flex items-center gap-2">
              <NotificationMenuComponent />
              {data?.some(
                (enterpriseData) => enterpriseData.email !== user.email
              ) ? (
                <>
                  {user?.photoURL ? (
                    <Avatar
                      variant="rounded"
                      alt="tania andrew"
                      size="xs"
                      className="cursor-pointer"
                      src={user?.photoURL}
                    />
                  ) : (
                    <FaCircleUser size={27} color="lightgray" />
                  )}
                </>
              ) : (
                ""
              )}

              <div className="bg-white rounded-full text-gray-600 w-7 h-7 flex items-center justify-center shadow-md cursor-pointer">
                <RxGear size={22} />
              </div>
            </div>
          </div>
          <Typography className="text-end text-[10px] text-gray-600 my-1">
            {data && data.some((item) => item.name === user.displayName) ? (
              data.map((item) => item.name)
            ) : (
              <span>
                <span className="text-green-400">{user.displayName}</span> -{" "}
                {data ? data.map((item) => item.name).join(", ") : ""}
              </span>
            )}
          </Typography>
        </div>
      </div>
      <div className="w-full h-10 hidden z-50"></div>
    </div>
  );
}
