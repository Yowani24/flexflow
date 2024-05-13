import {
  Card,
  Typography,
  CardBody,
  Chip,
  Avatar,
  Button,
} from "@material-tailwind/react";
import TaskDetails from "./TaskDetails";
import { format } from "date-fns";
import useFetchData from "../../hook/useFetchData";
import { useLang } from "../../hook/LangContext";
import CircularProgressComponent from "./CircularProgressComponent";
import { TbProgress } from "react-icons/tb";
import { MdOutlineMotionPhotosPaused } from "react-icons/md";
import {
  IoArrowForwardCircleOutline,
  IoCheckmarkDoneCircleOutline,
} from "react-icons/io5";
import { LuCalendarClock } from "react-icons/lu";

export default function Participants({ projectData }) {
  const { data, allMembers } = useFetchData();
  const { translations } = useLang();
  const userString = localStorage.getItem("user");
  const user = userString && JSON.parse(userString);

  return (
    <Card className="h-full w-full p-5 pb-4 shadow-sm">
      <Typography className="text-xl font-medium text-gray-700 border-b-[1px]">
        {translations.activities}
      </Typography>
      <CardBody className="relative flex gap-5 flex-wrap participants_scrollBarStyles overflow-scroll overflow-x-hidden max-h-[500px] px-0 items-start">
        {projectData?.map((project) =>
          project.tasks
            .filter((task) => {
              const taskResponsibles = task?.responsibles.includes(user?.email);
              const enterpriseEmailMatch = data?.some((enterprise) =>
                enterprise.email.includes(user?.email)
              );
              return (
                task?.responsibles?.length !== 0 &&
                (taskResponsibles || enterpriseEmailMatch)
              );
            })
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
            .map((task) => (
              <Card className="rounded-xl overflow-hidden hover:shadow-lg p-2 items-center w-[300px] max-w-[300px] gap-4">
                <div className="self-start flex flex-col w-full">
                  <div className="flex items-center gap-2 self-start">
                    <Typography className="text-sm">
                      {translations.priority}
                    </Typography>
                    <Typography
                      variant="small"
                      className={`text-white text-xs pt-[2px] ${
                        task.priority === "high"
                          ? " bg-red-400"
                          : task.priority === "medium"
                          ? "bg-orange-400"
                          : task.priority === "low"
                          ? "bg-cyan-400"
                          : ""
                      } min-w-fit p1 px-2 pb-[2px] rounded-full`}
                    >
                      {task.priority === "high"
                        ? translations.high
                        : task.priority === "medium"
                        ? translations.medium
                        : task.priority === "low"
                        ? translations.low
                        : ""}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal ml-5 flex items-center text-xs gap-1"
                    >
                      <LuCalendarClock />
                      {task.deadline ? format(task.deadline, "MMM dd") : ""}
                    </Typography>
                  </div>

                  <div className="bg-white rounded-t-md p-1 md:max-w-[270px] self-start">
                    <Typography
                      variant="h6"
                      className="text-gray-800 normal-case first-letter:uppercase"
                    >
                      {task.title.length > 29
                        ? task.title.substring(0, 29) + "..."
                        : task.title.toLowerCase()}
                    </Typography>
                  </div>
                  <div className="w-full mt-4 flex items-center justify-between flex-wrap">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      <Chip
                        variant="ghost"
                        size="sm"
                        icon={
                          task.progressStatus === "ongoing" ? (
                            <TbProgress size={16} />
                          ) : task.progressStatus === "paused" ? (
                            <MdOutlineMotionPhotosPaused size={16} />
                          ) : task.progressStatus === "completed" ? (
                            <IoCheckmarkDoneCircleOutline size={16} />
                          ) : (
                            ""
                          )
                        }
                        value={
                          task.progressStatus === "ongoing"
                            ? translations.ongoing
                            : task.progressStatus === "paused"
                            ? translations.paused
                            : task.progressStatus === "completed"
                            ? translations.completed
                            : task.status &&
                              task.progressStatus === "ongoing" &&
                              task?.sub_tasks.length === 0
                            ? "Not initialized"
                            : ""
                        }
                        color={
                          task.progressStatus === "ongoing"
                            ? "blue"
                            : task.progressStatus === "paused"
                            ? "amber"
                            : task.progressStatus === "completed"
                            ? "green"
                            : ""
                        }
                        className="w-28 text-center rounded-full capitalize"
                      />
                    </Typography>
                    <TaskDetails
                      taskId={task.id}
                      task_status={task.status}
                      task_name={task.title}
                      description={task.description}
                      priority={task.priority}
                      responsibles={task?.responsibles}
                      subtasks={task?.sub_tasks}
                      reference_link={task.reference_link}
                      progress={task.progress}
                      deadline={task.deadline}
                      buttonProps={
                        <Button
                          variant="filled"
                          className="flex items-center gap-1 w-fit px-3 text-xs py-1 rounded-full bg-gray-200 shadow-none hover:shadow-none text-gray-700 capitalize"
                        >
                          {translations.see_details}
                          <IoArrowForwardCircleOutline size={16} />
                        </Button>
                      }
                      disabledProps={true}
                    />
                  </div>
                </div>
                <Typography className="self-start">
                  {translations.assigned_to}{" "}
                  {data?.some(
                    (enterprise) => !enterprise.email.includes(user?.email)
                  ) &&
                    task?.responsibles?.length > 1 && (
                      <span className="text-xs">
                        {`(Eu + ${task?.responsibles?.length - 1})`}
                      </span>
                    )}
                </Typography>
                <div className="flex flex-col gap-2 w-full">
                  {task.responsibles
                    .filter(
                      (responsible) =>
                        responsible.includes(user?.email) ||
                        data?.some((enterprise) =>
                          enterprise.email.includes(user?.email)
                        )
                    )
                    .sort(
                      (a, b) => new Date(a.created_at) - new Date(b.created_at)
                    )
                    .map((responsible, index) => (
                      <div key={index} className="w-full">
                        {allMembers
                          .filter((member) =>
                            member.email.includes(responsible)
                          )
                          .map((user, subIndex) => (
                            <div
                              key={subIndex}
                              className="flex flex-row items-center border-[1px] border-gray-100 w-full justify-between rounded-md"
                            >
                              <div className="flex items-start gap-2">
                                <div className="border-[1px] ml-2 border-gray-100 bg-white w-fit p-1 rounded-md">
                                  <Avatar
                                    variant="rounded"
                                    alt={user?.name}
                                    size="sm"
                                    className="hover:z-10 focus:z-10"
                                    src={user?.photo_url}
                                  />
                                </div>
                                <div>
                                  <Typography className="text-xs" variant="h6">
                                    {user.name}
                                  </Typography>
                                  <Typography
                                    className="text-xs"
                                    variant="small"
                                  >
                                    {user.role}
                                  </Typography>
                                  <Typography
                                    className="text-[10px]"
                                    variant="small"
                                  >
                                    Responsible for 34% of the task
                                  </Typography>
                                </div>
                              </div>
                              <CircularProgressComponent
                                progressValue={10}
                                progressValueSize={12}
                                progressLineSize={3}
                                circularLineSize={6}
                                progressDiametroSize={60}
                                forUserData={true}
                                projectData={projectData}
                                data={data}
                                userEmail={user.email}
                                taskData={task}
                              />
                            </div>
                          ))}
                      </div>
                    ))}
                </div>
              </Card>
            ))
        )}
      </CardBody>
    </Card>
  );
}
