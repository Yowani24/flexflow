import React from "react";
import TaskDetails from "./TaskDetails";
import { WiTime4 } from "react-icons/wi";
import { Avatar, Tooltip } from "@material-tailwind/react";
import { AiOutlineFullscreen } from "react-icons/ai";
import { format } from "date-fns";
import useFetchData from "../../hook/useFetchData";
import { useLang } from "../../hook/LangContext";
import { FaCircleUser } from "react-icons/fa6";

export default function TaskCard({
  data,
  projectId,
  task_status,
  task_name,
  priority,
  responsibles,
  description,
  progress,
  progressStatus,
  subtasks,
  reference_link,
  taskId,
  disabledProps,
  deadline,
  disabledSpecificProps,
}) {
  const { allMembers } = useFetchData();
  const { translations } = useLang();
  return (
    <div
      className={`flex flex-col justify-between w-[100%] md:w-80 h-44 rounded-xl p-3 min-pb-4 bg-white shadow-md hover:shadow-xl transition-all border-l-[5px] ${
        priority === "high"
          ? " border-red-400"
          : priority === "medium"
          ? "border-orange-400"
          : priority === "low"
          ? "border-cyan-400"
          : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <span className="text-[#858484] text-lg normal-case font-medium">
          {/* {task_name.toLowerCase()} */}
          {task_name.length > 65
            ? task_name.substring(0, 50) + "..."
            : task_name.toLowerCase()}
        </span>
        <TaskDetails
          taskId={taskId}
          task_status={task_status}
          data={data}
          projectId={projectId}
          task_name={task_name}
          description={description}
          priority={priority}
          responsibles={responsibles}
          subtasks={subtasks}
          reference_link={reference_link}
          deadline={deadline}
          progress={progress}
          progressStatus={progressStatus}
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
          <span className="text-[#8e8e8e] text-xs font-medium">
            {translations.priority}
          </span>
          <div className="flex items-center mt-1 gap-5">
            <div
              className={`w-fit ${
                priority === "high"
                  ? " bg-red-300"
                  : priority === "medium"
                  ? "bg-orange-400"
                  : priority === "low"
                  ? "bg-cyan-400"
                  : ""
              }  rounded-full px-2 text-[12px] font-medium text-white`}
            >
              {priority === "high"
                ? translations.high
                : priority === "medium"
                ? translations.medium
                : priority === "low"
                ? translations.low
                : ""}
            </div>
            <div className="flex items-center gap-2">
              <WiTime4 className="text-[#8e8e8e]" />
              <span className="text-[#8e8e8e]">
                {deadline ? format(deadline, "MMM dd") : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 min-mt-2">
        <div className="flex items-center -space-x-4">
          {responsibles.slice(0, 3).map((item, index) => (
            <>
              {allMembers
                .filter((member) => member.email.includes(item))
                .map((user) => (
                  <Tooltip
                    key={user.id}
                    content={user.name}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    {user.photo_url ? (
                      <Avatar
                        variant="circular"
                        alt={user.name}
                        size="xs"
                        className="border-2 border-white hover:z-10 focus:z-10 min-w-7 min-h-7"
                        src={user.photo_url}
                      />
                    ) : (
                      <FaCircleUser size={26} />
                    )}
                  </Tooltip>
                ))}
            </>
          ))}
        </div>
        <div className="flex items-center justify-between w-full gap-2 transition-all">
          <div className="w-[80%] rounded-full border-2 border-[#d8dee4] flex items-center overflow-hidden bg-[#e7e8e9]">
            <div
              className={`h-[5px] ${
                task_status ? "bg-green-400" : "bg-gray-500"
              } rounded-full transition-all`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-[#4b4c4c] text-xs font-medium">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
