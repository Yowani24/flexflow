import {
  Card,
  Typography,
  CardBody,
  Chip,
  Avatar,
  Button,
} from "@material-tailwind/react";
import TaskDetails from "./TaskDetails";

const TABLE_HEAD = ["Assigned to", "Activity", "Deadline", "Status", ""];

export default function Participants({ projectData }) {
  return (
    <Card className="h-full w-full p-5 pb-4 shadow-sm">
      <Typography className="text-xl font-medium text-gray-700">
        Atividades
      </Typography>
      <CardBody className="relative participants_scrollBarStyles overflow-scroll overflow-x-hidden h-[230px] px-0">
        <div className="overflow-x-auto">
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
                project.tasks.map((task) =>
                  task.responsible.map((responsible, index) => (
                    <tr
                      key={index}
                      className="hover:bg-blue-gray-50 transition-all"
                    >
                      <td className="py-2 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={responsible.photo_url}
                            alt={responsible.name}
                            size="sm"
                          />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {responsible.name}
                          </Typography>
                        </div>
                      </td>

                      <td className="py-2 border-b border-blue-gray-50 md:w-[500px]">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          <span className="hidden md:flex">
                            {task.task_name}
                          </span>
                          <span className="md:hidden">P-5753</span>
                        </Typography>
                      </td>
                      <td className="py-2 border-b border-blue-gray-50">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          May 16th, 2024
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
                            value="In Progress"
                            color="green"
                            className="w-28 text-center rounded-full capitalize"
                          />
                        </Typography>
                      </td>
                      <td className="py-2 border-b border-blue-gray-50 w-36 text-center">
                        <TaskDetails
                          taskId={task.id}
                          task_name={task.task_name}
                          description={task.description}
                          priority={task.priority}
                          responsible={task.responsible}
                          subactivities={task.subactivities}
                          reference_link={task.reference_link}
                          progress={task.progress}
                          buttonProps={
                            <Button
                              variant="filled"
                              className="w-32 text-xs py-2 rounded-full bg-gray-200 shadow-none hover:shadow-none text-gray-700 capitalize"
                            >
                              See Details
                            </Button>
                          }
                          disabledProps={true}
                        />
                      </td>
                    </tr>
                  ))
                )
              )}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
