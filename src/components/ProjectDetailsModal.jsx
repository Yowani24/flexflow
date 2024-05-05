import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useSpring, animated } from "@react-spring/web";
import {
  Avatar,
  Typography,
  Checkbox,
  Card,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { FaUserTie } from "react-icons/fa6";
import { MdDeleteForever, MdEmail, MdMotionPhotosPause } from "react-icons/md";
import { MdEngineering } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { GoTasklist } from "react-icons/go";
import { SiOnlyoffice } from "react-icons/si";
import useFetchData from "../../hook/useFetchData";
import { LiaHourglassStartSolid } from "react-icons/lia";
import { IoMdDoneAll } from "react-icons/io";
import { CiNoWaitingSign } from "react-icons/ci";
import { doc, deleteDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { deleteUser, getAuth } from "firebase/auth";
import { FcFolder } from "react-icons/fc";
import modelingIcon from "../assets/web_layout.png";
import { useLang } from "../../hook/LangContext";

const ProjectDetailsModal = ({
  enterpriseId,
  buttonProps,
  projectData,
  enterpriseResponsibles,
}) => {
  const { data, allClients } = useFetchData();
  const { translations } = useLang();
  const [showDialog, setShowDialog] = useState(false);
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const { opacity, transform } = useSpring({
    opacity: showDialog ? 1 : 0,
    transform: showDialog ? "translateY(0%)" : "translateY(0%)",
    onRest: () => {
      if (!showDialog) {
        setShowDialog(false);
      }
    },
  });

  const deleteMember = async (e) => {};

  const clientLogo = projectData?.client_name
    ? allClients
        .filter((client) => client.cnpj === projectData?.client_name)
        .map((currentClient) => currentClient.logo)
    : "";

  return (
    <>
      <div
        className="rounded-full"
        // onClick={() =>
        //   memberData?.email === user?.email ||
        //   data?.some(
        //     (enterprise) =>
        //       enterprise?.email === user?.email &&
        //       enterprise?.responsibles?.includes(memberData?.email)
        //   )
        //     ? setShowDialog(true)
        //     : {}
        // }
        onClick={() => setShowDialog(true)}
      >
        {buttonProps}
      </div>

      {showDialog && (
        <animated.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            opacity,
            transform,
          }}
        >
          <div className="fixed inset-0 flex items-center justify-center transition-all z-50">
            <div className="fixed inset-0 bg-black opacity-50 transition-all"></div>
            <div className="relative flex flex-col justify-start bg-white p-5 rounded-lg z-50 w-[90%] md:w-[60%] h-[80%] transition-all">
              <div className="flex items-start justify-between w-full transition-all">
                <p className="text-gray-600 font-medium text-xl">
                  <Typography>Project Overview</Typography>
                </p>
                <div className="flex items-center gap-2">
                  {data.map(
                    (enterprise) =>
                      enterprise?.email === user?.email && (
                        <Menu key={enterprise?.id}>
                          <MenuHandler>
                            <div className="bg-red-200 hover:bg-red-500 group transition-all min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer">
                              <MdDeleteForever
                                size={18}
                                className="text-white transition-all"
                              />
                            </div>
                          </MenuHandler>
                          <MenuList className="flex flex-col items-center">
                            <Typography className="text-sm">
                              Deseja continuar
                            </Typography>
                            <div className="flex items-center gap-5 mt-5">
                              <MenuItem className="text-xs">Cancelar</MenuItem>
                              <MenuItem
                                className="text-xs"
                                color="red"
                                onClick={deleteMember}
                              >
                                Continuar
                              </MenuItem>
                            </div>
                          </MenuList>
                        </Menu>
                      )
                  )}

                  <div
                    onClick={() => setShowDialog(false)}
                    className="bg-gray-200 group transition-all hover:bg-[rgb(191,199,244)] min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                  >
                    <IoCloseSharp className="text-gray-600 group-hover:text-white transition-all" />
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4 border-b-[1px] border-b-gray-100 pt-2 pb-4">
                <img
                  src={clientLogo}
                  alt=""
                  className="w-12 h-12 rounded-lg bg-gray-50 shadow-md p-2"
                />
                <div className="flex flex-col justify-between h-12">
                  <Typography className="font-semibold">
                    {projectData?.name}
                  </Typography>
                  <div className="flex items-center gap-4">
                    <Typography className="text-sm">
                      Cliente:{" "}
                      <span className="font-semibold">
                        {projectData?.client_name
                          ? allClients
                              .filter(
                                (client) =>
                                  client.cnpj === projectData?.client_name
                              )
                              .map((currentClient) => currentClient.name)
                          : translations.no_atribuition}
                      </span>
                    </Typography>
                    <Typography className="text-sm">
                      Status:{" "}
                      <span className="text-xs bg-[#1fb8402f] text-green-700 p-[1px] px-2 rounded-[4px]">
                        {projectData?.tasks.length === 0
                          ? "Not initialized"
                          : projectData?.tasks.every(
                              (task) => task.responsibles.length === 0
                            )
                          ? "On Hold"
                          : projectData?.tasks
                              .filter((task) => task.responsibles.length > 0)
                              .some(
                                (task) =>
                                  task.responsibles.length > 0 &&
                                  task.progressStatus !== "completed"
                              )
                          ? "In Progress"
                          : projectData?.tasks
                              .filter((task) => task.responsibles.length > 0)
                              .every(
                                (task) => task.progressStatus === "completed"
                              )
                          ? "Completed"
                          : ""}
                      </span>
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-4 ">
                <div className="flex items-center gap-10">
                  <Typography className="flex items-center gap-2 text-sm bg-gray-100 px-[6px] shadow-sm rounded-sm w-fit">
                    <FcFolder className="text-xl" />
                    Arquivos
                  </Typography>
                  <Typography className="flex items-center cursor-pointer gap-2 text-sm bg-gray-100 px-[6px] shadow-sm hover:shadow-md active:bg-gray-300 transition-all rounded-sm w-fit">
                    <img
                      src={modelingIcon}
                      alt="prototype-icon"
                      className="w-[15px]"
                    />
                    Prototype
                  </Typography>
                </div>
                <div className="pl-8 mt-2">
                  <Typography className="text-xs text-gray-500">
                    No review Flies
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </animated.div>
      )}
    </>
  );
};

export default ProjectDetailsModal;
