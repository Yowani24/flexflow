import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { HiMiniCalendarDays } from "react-icons/hi2";
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { format } from "date-fns";
import TaskDetails from "./TaskDetails";
import { useLang } from "../../hook/LangContext";

export default function BacklogCard({ taskData }) {
  const { translations } = useLang();
  return (
    <Card className="min-w-72 max-w-72 bg-white p-3 pb-2 hover:shadow-lg border-[1px] border-x-blue-800">
      <CardBody className="p-0 border-b-[1px] border-blue-gray-100">
        <div className="flex items-center gap-1 mb-2 text-gray-800">
          <MdOutlineHistoryToggleOff size={19} className="text-blue-800" />
          <Typography
            variant="h6"
            color="blue-gray"
            className="text-sm text-gray-800"
          >
            {taskData.title.length > 60
              ? taskData.title.substring(0, 30) + "..."
              : taskData.title.toLowerCase()}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="p-0 mt-2 flex justify-between items-end">
        <div>
          <Typography
            variant="small"
            className="flex items-center gap-1 text-[11px]"
          >
            <span>Previsão de inicio</span>
          </Typography>
          <Typography
            variant="small"
            className="flex items-center gap-1 text-[12px] text-blue-800"
          >
            <HiMiniCalendarDays size={16} className="mb-[4px]" />
            <span>
              {taskData.deadline ? format(taskData.deadline, "MMM dd") : ""}
            </span>
          </Typography>
        </div>

        <TaskDetails
          taskId={taskData.id}
          task_name={taskData.title}
          task_deadline={taskData.deadline}
          task_status={taskData.status}
          description={taskData.description}
          priority={taskData.priority}
          responsibles={taskData.responsibles}
          subtasks={taskData.sub_tasks}
          reference_link={taskData.reference_link}
          progress={taskData.progress}
          buttonProps={
            <Button
              variant="text"
              className="text-xs flex items-center gap-1 p-1 normal-case border-none text-gray-600 hover:text-gray-900"
            >
              {translations.see_details}{" "}
              <IoArrowForwardCircleOutline size={18} />
            </Button>
          }
          disabledProps={true}
          closeModalAfterAddUser={true}
        />
      </CardFooter>
    </Card>
  );
}
