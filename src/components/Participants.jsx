import {
  Card,
  Typography,
  CardBody,
  Chip,
  Avatar,
  Button,
  Tooltip,
} from "@material-tailwind/react";
import TaskDetails from "./TaskDetails";
import { format } from "date-fns";
import useFetchData from "../../hook/useFetchData";
import { useLang } from "../../hook/LangContext";
import { FaCircleUser } from "react-icons/fa6";

export default function Participants({ projectData }) {
  const { allMembers } = useFetchData();
  const { translations } = useLang();

  const TABLE_HEAD = [
    translations.assigned_to,
    translations.activity,
    translations.deadline,
    "Status",
    "",
  ];

  return (
    <Card className="h-full w-full p-5 pb-4 shadow-sm">
      <Typography className="text-xl font-medium text-gray-700">
        {translations.activities}
      </Typography>
      <CardBody className="relative participants_scrollBarStyles overflow-scroll overflow-x-hidden max-h-[230px] px-0">
        <div className="overflow-x-auto">
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
        </div>
      </CardBody>
    </Card>
  );
}
