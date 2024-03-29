import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Chip,
  Button,
} from "@material-tailwind/react";
import { IoCloseSharp } from "react-icons/io5";
import TaskCard from "./TaskCard";
import logo from "../assets/logo3.png";

export default function ProjectDetailsView({
  projectData,
  value,
  icon,
  status,
  disabledProps,
  task_progress,
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <div
        className={`text-sm w-28 tracking-wide ${
          task_progress === "ongoing"
            ? "bg-[#E1F5FE]"
            : task_progress === "paused"
            ? "bg-[#FFF3E0]"
            : task_progress === "completed"
            ? "bg-[#E8F5E9]"
            : ""
        } hover:bg-blue-gray-100 transition-all rounded-md p-2 gap-1 flex flex-col items-center justify-center cursor-pointer`}
        onClick={status > 0 ? handleOpen : () => {}}
      >
        {icon}
        <p>
          <span className="font-semibold">{status}</span> {value}
        </p>
      </div>

      <Dialog
        size="xxl"
        open={open}
        onClose={handleOpen}
        className="fixed w-full inset-0 z-50 overflow-auto flex"
      >
        <DialogHeader className="justify-between px-10 border-b-2">
          <img
            className="h-8 w-fit object-cover object-center cursor-pointer"
            src={logo}
            alt="nature image"
          />
          <p className="text-gray-600 font-medium text-xl">
            {projectData.map((item) => item.name)}
          </p>
          <div
            onClick={handleOpen}
            className="bg-gray-200 group transition-all hover:bg-[rgb(191,199,244)] min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
          >
            <IoCloseSharp className="text-gray-600 group-hover:text-white transition-all" />
          </div>
        </DialogHeader>
        <DialogBody>
          <div className="flex items-center gap-4 px-10 mt-5">
            {projectData.map((item) =>
              item.tasks
                .filter(
                  (filter_task) =>
                    filter_task.progressStatus === task_progress &&
                    filter_task.responsibles.length > 0
                )
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    taskId={task.id}
                    task_status={task.status}
                    task_name={task.title}
                    description={task.description}
                    priority={task.priority}
                    responsibles={task.responsibles}
                    progress={task.progress}
                    subtasks={task.sub_tasks}
                    reference_link={task.reference_link}
                    disabledProps={disabledProps}
                    disabledSpecificProps="true"
                  />
                ))
            )}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
