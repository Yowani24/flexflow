import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useSpring, animated } from "@react-spring/web";
import { Typography } from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

import { LuListTodo } from "react-icons/lu";
import BacklogCard from "./BacklogCard";
import ProjectStepperComponent from "./ProjectStepperComponent";

const TaskDetails = ({ buttonProps, projectName, projectData }) => {
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
          <div className="main_div fixed inset-0 flex items-center justify-center transition-all z-50">
            <div className="fixed inset-0 bg-black opacity-50 transition-all"></div>
            <div className="relative flex flex-col justify-between bg-[#F5F7FA] p-5 rounded-lg z-50 w-[90%] md:w-[70%] h-[80%] transition-all">
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
              <div className="w-full min-h-36 rounded-md mt-5 left-0 z-50">
                <div className="w-full px-24 py-4">
                  <ProjectStepperComponent projectData={projectData} />
                </div>
              </div>
              <Typography variant="h6" className="flex items-center gap-1 py-2">
                <LuListTodo size={21} className="text-blue-800 mb-[1px]" />{" "}
                Backlog{" "}
                {`(${projectData?.map(
                  (project) =>
                    project.tasks.filter(
                      (task) => task.responsibles.length === 0
                    ).length
                )})`}
              </Typography>
              <div className="participants_scrollBarStyles relative overflow-y-scroll flex flex-col h-full py-2">
                <div className="flex items-start flex-wrap gap-4">
                  {projectData.map((project) =>
                    project.tasks
                      .filter((task) => task.responsibles.length === 0)
                      .sort(
                        (a, b) =>
                          new Date(a.created_at) - new Date(b.created_at)
                      )
                      .map((item) => <BacklogCard taskData={item} />)
                  )}
                </div>
              </div>
            </div>
          </div>
        </animated.div>
      )}
    </>
  );
};

export default TaskDetails;
