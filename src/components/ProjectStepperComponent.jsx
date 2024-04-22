import React, { useState } from "react";
import { useSpring } from "@react-spring/web";
import { Stepper, Step, Typography } from "@material-tailwind/react";
import { MdRocketLaunch } from "react-icons/md";
import { TbAdjustmentsCode } from "react-icons/tb";
import { GrTestDesktop } from "react-icons/gr";
import { TbProgress } from "react-icons/tb";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { IoIosArrowRoundForward } from "react-icons/io";

export default function ProjectStepperComponent({ projectData }) {
  const projectProgress = projectData.map((item) => {
    if (item.tasks) {
      const relevantTasks = item.tasks.filter(
        (task) => task.responsibles.length > 0
      );
      if (relevantTasks.length > 0) {
        const totalProgress = relevantTasks.reduce(
          (accumulator, currentItem) => accumulator + currentItem.progress,
          0
        );
        const averageProgress = Math.ceil(totalProgress / relevantTasks.length);
        return averageProgress;
      } else {
        return 0;
      }
    } else {
      return null;
    }
  });

  const [activeStep, setActiveStep] = React.useState(
    Math.ceil(projectProgress) < 100
      ? 0
      : Math.ceil(projectProgress) >= 100
      ? 1
      : ""
  );

  return (
    <Stepper activeStep={activeStep}>
      <Step
        className=" text-gray-900 cursor-pointer w-9 h-9"
        activeClassName="!bg-orange-500 text-white"
        completedClassName="!bg-green-500"
      >
        <TbProgress className="w-4 h-4" />
        <div className="absolute -bottom-[3.5rem] w-max text-center">
          <Typography
            variant="h6"
            color={activeStep === 0 ? "orange" : "gray"}
            className="text-sm"
          >
            Development {Math.ceil(projectProgress)}
          </Typography>
          <div className="flex items-center gap-1 mt-1">
            <Typography
              variant="small"
              className="flex items-center gap-1 text-[12px] text-blue-800"
            >
              <HiMiniCalendarDays size={16} className="mb-[4px]" />
              <span>Apr 19</span>
            </Typography>{" "}
            <IoIosArrowRoundForward className="text-blue-800" />
            <Typography
              variant="small"
              className="flex items-center gap-1 text-[12px] text-blue-800"
            >
              <HiMiniCalendarDays size={16} className="mb-[4px]" />
              <span>Apr 30</span>
            </Typography>
          </div>
        </div>
      </Step>
      <Step
        className=" text-gray-900 cursor-pointer w-9 h-9"
        activeClassName="!bg-orange-500 text-white"
        completedClassName="!bg-green-500"
      >
        <GrTestDesktop className="w-4 h-4" />
        <div className="absolute -bottom-[3.5rem] w-max text-center">
          <Typography
            variant="h6"
            color={activeStep === 1 ? "orange" : "gray"}
            className="text-sm"
          >
            Beta
          </Typography>
          <div className="flex items-center gap-1 mt-1">
            <Typography
              variant="small"
              className="flex items-center gap-1 text-[12px] text-blue-800"
            >
              <HiMiniCalendarDays size={16} className="mb-[4px]" />
              <span>Apr 19</span>
            </Typography>{" "}
            <IoIosArrowRoundForward className="text-blue-800" />
            <Typography
              variant="small"
              className="flex items-center gap-1 text-[12px] text-blue-800"
            >
              <HiMiniCalendarDays size={16} className="mb-[4px]" />
              <span>Apr 30</span>
            </Typography>
          </div>
        </div>
      </Step>
      <Step
        className=" text-gray-900 cursor-pointer w-9 h-9"
        activeClassName="!bg-orange-500 text-white"
        completedClassName="!bg-green-500"
      >
        <TbAdjustmentsCode className="w-4 h-4" />
        <div className="absolute -bottom-[3.5rem] w-max text-center">
          <Typography
            variant="h6"
            color={activeStep === 2 ? "orange" : "gray"}
            className="text-sm"
          >
            Final development
          </Typography>
          <div className="flex items-center gap-1 mt-1">
            <Typography
              variant="small"
              className="flex items-center gap-1 text-[12px] text-blue-800"
            >
              <HiMiniCalendarDays size={16} className="mb-[4px]" />
              <span>Apr 19</span>
            </Typography>{" "}
            <IoIosArrowRoundForward className="text-blue-800" />
            <Typography
              variant="small"
              className="flex items-center gap-1 text-[12px] text-blue-800"
            >
              <HiMiniCalendarDays size={16} className="mb-[4px]" />
              <span>Apr 30</span>
            </Typography>
          </div>
        </div>
      </Step>
      <Step
        className=" text-gray-900 cursor-pointer w-9 h-9"
        activeClassName="!bg-orange-500 text-white"
        completedClassName="!bg-green-500"
      >
        <MdRocketLaunch className="w-4 h-4" />
        <div className="absolute -bottom-[3.5rem] w-max text-center">
          <Typography variant="h6" color={activeStep === 3 ? "orange" : "gray"}>
            Launch
          </Typography>
          <div className="flex items-center gap-1 mt-1">
            <Typography
              variant="small"
              className="flex items-center gap-1 text-[12px] text-blue-800"
            >
              <HiMiniCalendarDays size={16} className="mb-[4px]" />
              <span>Apr 19</span>
            </Typography>{" "}
            <IoIosArrowRoundForward className="text-blue-800" />
            <Typography
              variant="small"
              className="flex items-center gap-1 text-[12px] text-blue-800"
            >
              <HiMiniCalendarDays size={16} className="mb-[4px]" />
              <span>Apr 30</span>
            </Typography>
          </div>
        </div>
      </Step>
    </Stepper>
  );
}
