import {
  Card,
  Typography,
  CardBody,
  Chip,
  Avatar,
  Button,
  Tooltip,
  CardHeader,
} from "@material-tailwind/react";
import TaskDetails from "./TaskDetails";
import { format } from "date-fns";
import useFetchData from "../../hook/useFetchData";
import { useLang } from "../../hook/LangContext";
import { FaCircleUser } from "react-icons/fa6";
import CircularProgressComponent from "./CircularProgressComponent";
import { TbProgress } from "react-icons/tb";
import { MdOutlineMotionPhotosPaused } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { LuCalendarClock } from "react-icons/lu";

export default function Participants({ projectData }) {
  const { data, allMembers } = useFetchData();
  const { translations } = useLang();

  return (
    <Card className="h-full w-full p-5 pb-4 shadow-sm">
      <Typography className="text-xl font-medium text-gray-700 border-b-[1px]">
        {translations.activities}
      </Typography>
      <CardBody className="relative flex gap-5 flex-wrap participants_scrollBarStyles overflow-scroll overflow-x-hidden max-h-[500px] px-0 items-start">
        {/* <div className="overflow-x-auto">
          {projectData.map((item) => item.tasks.length) != 0 ? (
            <table className="relative mt-0 w-full min-w-max table-auto text-left">
              <thead className="">
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={index}
                      className="border-b border-blue-gray-100 bg-white p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {projectData.map((project) =>
                  project.tasks.map((task) => (
                    <tr
                      key={task.id}
                      className="hover:bg-blue-gray-50 transition-all"
                    >
                      <td className="py-2 border-b border-blue-gray-50">
                        {task.responsibles.length <= 0 ? (
                          translations.no_assignment
                        ) : (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center -space-x-4">
                              {task?.responsibles
                                .slice(0, 3)
                                .map((responsible) => (
                                  <>
                                    {allMembers
                                      .filter((member) =>
                                        member.email.includes(responsible)
                                      )
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
                                              size="sm"
                                              className="border-2 border-white hover:z-10 focus:z-10"
                                              src={user.photo_url}
                                            />
                                          ) : (
                                            <FaCircleUser size={34} />
                                          )}
                                        </Tooltip>
                                      ))}
                                  </>
                                ))}
                            </div>
                            {task.responsibles.length > 3 ? (
                              <Typography>
                                + {task.responsibles.length - 3}
                              </Typography>
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </td>

                      <td className="py-2 border-b border-blue-gray-50 md:w-[500px]">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <span className="hidden md:flex capitalize">
                            {task.title.toLowerCase()}
                          </span>
                          <span className="md:hidden">P-5753</span>
                        </Typography>
                      </td>
                      <td className="py-2 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal ml-5"
                        >
                          {task.deadline ? format(task.deadline, "MMM dd") : ""}
                        </Typography>
                      </td>
                      <td className="py-2 border-b border-blue-gray-50 w-36">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={
                              task.progressStatus === "ongoing"
                                ? translations.ongoing
                                : task.progressStatus === "paused"
                                ? translations.paused
                                : task.progressStatus === "completed"
                                ? translations.completed
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
                      </td>
                      <td className="py-2 border-b border-blue-gray-50 w-36 text-center text-red-500">
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
                              className="w-32 text-xs py-1 rounded-full bg-gray-200 shadow-none hover:shadow-none text-gray-700 capitalize"
                            >
                              {translations.see_details}
                            </Button>
                          }
                          disabledProps={true}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            translations.no_data_to_show
          )}
        </div> */}

        {projectData.map((project) =>
          project.tasks.map((task) => (
            <Card className="rounded-md overflow-hidden p-2 items-center w-[300px] max-w-[300px] gap-4">
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
                  <Typography variant="h6" className="text-gray-800">
                    {task.title}
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
                        className="w-32 text-xs py-1 rounded-full bg-gray-200 shadow-none hover:shadow-none text-gray-700 capitalize"
                      >
                        {translations.see_details}
                      </Button>
                    }
                    disabledProps={true}
                  />
                </div>
              </div>
              <Typography className="self-start">
                {translations.assigned_to}
              </Typography>
              <div className="flex flex-col gap-2">
                {task.responsibles.map((responsible, index) => (
                  <div key={index}>
                    {allMembers
                      .filter((member) => member.email.includes(responsible))
                      .map((user, subIndex) => (
                        <div
                          key={subIndex}
                          className="flex flex-row items-center border-[1px] border-gray-100 max-w-[270px] rounded-md"
                        >
                          <div className="flex items-start gap-2">
                            <div className="border-[1px] border-gray-100 bg-white w-fit p-1 rounded-md">
                              <Avatar
                                variant="rounded"
                                alt="joao"
                                size="md"
                                className="hover:z-10 focus:z-10"
                                src={user.photo_url}
                                // src={
                                //   "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                // }
                              />
                            </div>
                            <div>
                              <Typography className="text-sm" variant="h6">
                                {user.name}
                              </Typography>
                              <Typography className="text-xs" variant="small">
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
