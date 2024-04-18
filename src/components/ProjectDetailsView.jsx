import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Chip,
  Button,
  Typography,
} from "@material-tailwind/react";
import { IoCheckmarkDoneCircleOutline, IoCloseSharp } from "react-icons/io5";
import TaskCard from "./TaskCard";
import logo from "../assets/logo3.png";
import { TbProgress } from "react-icons/tb";
import { MdOutlineMotionPhotosPaused } from "react-icons/md";
import { useLang } from "../../hook/LangContext";

export default function ProjectDetailsView({
  projectData,
  value,
  icon,
  status,
  disabledProps,
  task_progress,
}) {
  const { translations } = useLang();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <Typography className="opacity-80 hover:opacity-100 font-bold cursor-pointer">
        <Chip
          variant="ghost"
          size="lg"
          icon={icon}
          value={`${value}: ${status}`}
          color={
            task_progress === "ongoing"
              ? "blue"
              : task_progress === "paused"
              ? "amber"
              : task_progress === "completed"
              ? "green"
              : ""
          }
          onClick={status > 0 ? handleOpen : () => {}}
          className="w-32 h-14 text-center rounded-lg capitalize text-xs"
        />
      </Typography>

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
