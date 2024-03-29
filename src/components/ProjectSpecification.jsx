import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

import { useSpring, animated } from "@react-spring/web";

const TaskDetails = ({ buttonProps, projectName }) => {
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
                  {projectName}
                </p>
                <div
                  onClick={() => setShowDialog(false)}
                  className="bg-gray-200 group transition-all hover:bg-[rgb(191,199,244)] min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                >
                  <IoCloseSharp className="text-gray-600 group-hover:text-white transition-all" />
                </div>
              </div>
              <div className="bg-gray-100 w-full h-44 rounded-md mt-5"></div>
            </div>
          </div>
        </animated.div>
      )}
    </>
  );
};

export default TaskDetails;
