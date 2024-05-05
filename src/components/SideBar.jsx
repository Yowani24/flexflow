import React, { useState } from "react";
import { TbLogout } from "react-icons/tb";
import {
  TabsHeader,
  Tab,
  Popover,
  PopoverHandler,
  Button,
  PopoverContent,
} from "@material-tailwind/react";
import { FaRegUserCircle } from "react-icons/fa";
import AnimatedDialog from "./AnimatedDialog";
import ProfileEditComponent from "./ProfileEditComponent";
import { RiBardLine } from "react-icons/ri";
import { useLang } from "../../hook/LangContext";
import { HiHome } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import useFetchData from "../../hook/useFetchData";
import { useAuthContext } from "../../auth/AuthContext";

export default function SideBar({ data }) {
  const { refetch } = useFetchData();
  const { handleLogout } = useAuthContext();
  const navigate = useNavigate();
  const { translations } = useLang();
  const [showButton, setShowButton] = useState(false);
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  console.log("ddd:", user);

  const handleSignout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="hidden md:w-[10%] h-full fixed top-0 left-0 overflow-y-auto md:flex items-start justify-center z-40">
      <div className="relative flex flex-col items-center py-5 justify-start gap-4 bg-[rgb(21,22,25)] w-[60%] h-[80%] mt-[112px] rounded-lg">
        <Link to={"/"} onClick={() => localStorage.removeItem("reloadCalled")}>
          <div className="hover:bg-gray-900 text-white cursor-pointer bottom-5 w-10 h-10 rounded-lg flex items-center justify-center">
            <HiHome size={20} />
          </div>
        </Link>
        <div className="flex flex-col items-center justify-start gap-4">
          <TabsHeader
            className="bg-transparent"
            indicatorProps={{
              className: "bg-gray-800 shadow-none !text-red-600",
            }}
          >
            <div className="flex flex-col items-center justify-start gap-4">
              {data.map(({ icon, value }) => (
                <Tab
                  onClick={() => refetch()}
                  key={value}
                  value={value}
                  className=" hover:bg-gray-900 text-white cursor-pointer transition-all w-10 h-10 rounded-lg flex items-center justify-center"
                >
                  {icon}
                </Tab>
              ))}
            </div>
          </TabsHeader>
        </div>
        <div className="hover:bg-gray-900 text-white cursor-not-allowed bottom-5 w-10 h-10 rounded-lg flex items-center justify-center">
          <RiBardLine size={20} />
        </div>
        <div className="z-50">
          <AnimatedDialog
            title={translations.editing_profile}
            showButtonProps={showButton}
            customButtonProps={
              <div className="hover:bg-gray-900 text-white cursor-pointer bottom-5 w-10 h-10 rounded-lg flex items-center justify-center">
                <FaRegUserCircle size={20} />
              </div>
            }
            children={
              <ProfileEditComponent
                showButtonProps={setShowButton}
                userData={user}
                // photoURL={user?.photoURL}
                // name={user?.displayName}
                // email={user?.email}
                // role={user?.role}
              />
            }
          />
        </div>

        <Popover placement="right">
          <PopoverHandler>
            <div className="hover:bg-gray-900 text-red-200 cursor-pointer absolute bottom-5 w-10 h-10 rounded-lg flex items-center justify-center">
              <TbLogout size={20} />
            </div>
          </PopoverHandler>
          <PopoverContent className="z-50 p-0 flex flex-col items-center gap-4 border-[5px] border-gray-300">
            <Button
              className="text-sm text-red-300 cursor-pointer capitalize "
              onClick={handleSignout}
            >
              Sair
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
