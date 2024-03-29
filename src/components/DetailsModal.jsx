import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

import { useSpring, animated } from "@react-spring/web";
import { Avatar, Typography } from "@material-tailwind/react";
import { FaUserTie } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdEngineering } from "react-icons/md";

const DetailsModal = ({ buttonProps, memberData }) => {
  const [showDialog, setShowDialog] = useState(false);

  const { opacity, transform } = useSpring({
    opacity: showDialog ? 1 : 0,
    transform: showDialog ? "translateY(0%)" : "translateY(0%)",
    onRest: () => {
      if (!showDialog) {
        setShowDialog(false);
      }
    },
  });

  return (
    <>
      <div className="rounded-full" onClick={() => setShowDialog(true)}>
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
                  <Typography>Member details</Typography>
                </p>
                <div
                  onClick={() => setShowDialog(false)}
                  className="bg-gray-200 group transition-all hover:bg-[rgb(191,199,244)] min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                >
                  <IoCloseSharp className="text-gray-600 group-hover:text-white transition-all" />
                </div>
              </div>
              <div className="w-full shadow-sm flex flex-col md:flex-row items-center md:items-start gap-5 rounded-md mt-5 p-4">
                <Avatar
                  src="https://docs.material-tailwind.com/img/face-2.jpg"
                  alt="avatar"
                  size="xxl"
                  variant="rounded"
                />
                <div className="flex flex-col md:flex-row items-start md:items-center justify-evenly w-full gap-4 md:gap-0">
                  <div>
                    <span className="flex items-ende gap-1">
                      <FaUserTie size={12} className="" />
                      <p className="text-xs">name</p>
                    </span>
                    <Typography className="text-light-blue-800">
                      {memberData.name}
                    </Typography>
                  </div>

                  <div>
                    <span className="flex items-ende gap-1">
                      <MdEmail size={12} className="mt-[2px]" />
                      <p className="text-xs">email</p>
                    </span>
                    <Typography className="text-light-blue-800">
                      {memberData.email}
                    </Typography>
                  </div>

                  <div>
                    <span className="flex items-ende gap-1">
                      <MdEngineering size={15} className="" />
                      <p className="text-xs ">role</p>
                    </span>
                    <Typography className="text-light-blue-800">
                      {memberData.role}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </animated.div>
      )}
    </>
  );
};

export default DetailsModal;
