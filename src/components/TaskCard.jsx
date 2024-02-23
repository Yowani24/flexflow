import React from "react";
import TaskDetails from "./TaskDetails";
import { WiTime4 } from "react-icons/wi";
import { Avatar, Tooltip } from "@material-tailwind/react";
import { AiOutlineFullscreen } from "react-icons/ai";

export default function TaskCard({
  task_name,
  priority,
  responsible,
  description,
  progress,
  subactivities,
  reference_link,
  taskId,
  disabledProps,
  disabledSpecificProps,
}) {
  const completedTasks = subactivities.filter((item) => item.done);
  const completedPercentage =
    subactivities.length === 0
      ? 0
      : Math.ceil((completedTasks.length / subactivities.length) * 100);
  return (
    <div
      className={`flex flex-col justify-between w-[100%] md:w-80 h-44 rounded-xl p-3 min-pb-4 bg-white shadow-lg hover:shadow-xl transition-all hover:shadow-[#b2b6ed] border-l-[5px] ${
        priority === "high"
          ? " border-red-400"
          : priority === "medium"
          ? "border-cyan-400"
          : priority === "low"
          ? "border-gray-400"
          : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="text-[#858484] text-lg font-medium">{task_name}</span>
        <TaskDetails
          taskId={taskId}
          task_name={task_name}
          description={description}
          priority={priority}
          responsible={responsible}
          subactivities={subactivities}
          reference_link={reference_link}
          progress={progress}
          buttonProps={
            <div className="flex group items-center justify-center min-w-8 min-h-8 bg-gray-200 transition-all hover:bg-[rgb(191,199,244)] cursor-pointer rounded-full">
              <AiOutlineFullscreen
                size={20}
                className="text-gray-400 group-hover:text-white transition-all"
              />
            </div>
          }
          disabledProps={disabledProps}
          disabledSpecificProps={disabledSpecificProps}
        />
      </div>
      <div className="mt-0">
        <div>
          <span className="text-[#8e8e8e] text-xs font-medium">Priority</span>
          <div className="flex items-center mt-1 gap-5">
            <div
              className={`w-fit ${
                priority === "high"
                  ? " bg-red-300"
                  : priority === "medium"
                  ? "bg-cyan-400"
                  : priority === "low"
                  ? "bg-gray-400"
                  : ""
              }  rounded-full px-2 text-[12px] font-medium text-white`}
            >
              {priority}
            </div>
            <div className="flex items-center gap-2">
              <WiTime4 className="text-[#8e8e8e]" />
              <span className="text-[#8e8e8e]">Jan 20</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-2">
        <div className="flex items-center -space-x-4">
          {responsible.map((item, index) => (
            <Tooltip
              key={index}
              content={item.name}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <Avatar
                variant="circular"
                alt="user"
                size="xs"
                className="border-2 border-white hover:z-10 focus:z-10"
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              />
            </Tooltip>
          ))}
        </div>
        <div className="flex items-center justify-between w-full gap-2 transition-all">
          <div className="w-[80%] rounded-full border-2 border-[#d8dee4] flex items-center overflow-hidden bg-[#e7e8e9]">
            <div
              className="h-[5px] bg-green-400 rounded-full transition-all"
              style={{ width: `${completedPercentage}%` }}
            ></div>
          </div>
          <span className="text-[#4b4c4c] text-xs font-medium">
            {completedPercentage}%
          </span>
        </div>
      </div>
    </div>
  );
}
