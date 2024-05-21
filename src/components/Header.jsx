import React, { useEffect, useState } from "react";
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

const DeleteAccountDialog = ({ enterpriseId }) => {
  return (
    <div className="">
      <Typography
        onClick={() => document.getElementById("my_modal_1").showModal()}
        className="text-md text-red-300 cursor-pointer"
      >
        Excluir conta
      </Typography>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white">
          <div className="">
            <h3 className="font-bold text-[16px] text-red-400">
              Excluir essa conta
            </h3>
            <Typography className="text-xs mt-1 text-gray-500">
              Essa ação exclui permanentemente os dados desta empresa, incluindo
              todos os colaboradores
            </Typography>
          </div>

          <p className="mt-8 mb-1 text-gray-500">
            Insira o ID da empresa para confirmar a exclusão dela:{" "}
          </p>
          <span className="font-semibold text-gray-600 bg-gray-100 p-1 rounded-sm">
            {enterpriseId}
          </span>
          <div className="w-72">
            <input
              type="text"
              placeholder="enter enterprise code..."
              className="bg-white pl-2 w-full h-10 mt-4 rounded-md border-[1px] border-gray-300 outline-none "
            />
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex items-center gap-5">
              <button className="border-none outline-none text-gray-500 bg-gray-100">
                Cancelar
              </button>
              <button className="border-none outline-none text-red-500 bg-red-50">
                Excluir
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

const SettingsComponent = ({ enterpriseId }) => {
  return (
    <div className="dropdown dropdown-end ">
      <div
        tabIndex={0}
        className="bg-white z-10 rounded-full text-gray-600 w-7 h-7 flex items-center justify-center shadow-md cursor-pointer"
      >
        <RxGear size={22} />
      </div>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] menu px-4 shadow-lg rounded-md w-32 mt-5 bg-white"
      >
        <DeleteAccountDialog enterpriseId={enterpriseId} />
      </div>
    </div>
  );
};

const LanguageChangeComponent = ({
  language,
  switchLanguage,
  translations,
}) => {
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
          <div className="bg-white w-full h-full rounded-r-md text-gray-600 flex items-center justify-center text-xs uppercase">
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

export default function Header() {
  const { data } = useFetchData();
  const { language, switchLanguage, translations } = useLang();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const enterpriseIdCode = data?.[0]?.registrationId;

  const getInitialDarkMode = () => {
    const storedValue = localStorage.getItem("isdark");
    return storedValue === "true";
  };

  const [isdark, setIsdark] = useState(getInitialDarkMode());

  useEffect(() => {
    localStorage.setItem("isdark", isdark.toString());
  }, [isdark]);

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
            <label
              className="swap swap-rotate"
              onChange={() => setIsdark(!isdark)}
            >
              <input
                type="checkbox"
                className="theme-controller"
                value="synthwave"
              />

              <svg
                className="swap-off fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              <svg
                className="swap-on fill-current w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            <LanguageChangeComponent
              language={language}
              switchLanguage={switchLanguage}
              translations={translations}
            />
            <div className="flex items-center gap-2">
              <NotificationMenuComponent />
              {data?.some(
                (enterpriseData) => enterpriseData?.email !== user?.email
              ) ? (
                <>
                  {user?.photoURL ? (
                    <Avatar
                      variant="circular"
                      alt="Avatar"
                      size="sm"
                      src={user?.photoURL}
                      className="border-[2px] w-7 h-7 border-white shadow-md"
                    />
                  ) : (
                    <FaCircleUser size={27} color="lightgray" />
                  )}
                </>
              ) : null}
              <SettingsComponent enterpriseId={enterpriseIdCode} />
            </div>
          </div>
          <Typography className="text-end text-[10px] text-gray-600 my-1">
            {data?.some((item) => item.name === user?.displayName) ? (
              data?.map((item) => item.name).join(", ")
            ) : (
              <span>
                <span className="text-green-400">{user?.displayName}</span> -{" "}
                {data ? data?.map((item) => item.name).join(", ") : ""}
              </span>
            )}
          </Typography>
        </div>
      </div>
      <div className="w-full h-10 hidden z-50" />
    </div>
  );
}
