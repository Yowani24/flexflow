import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import useFetchData from "../../hook/useFetchData";
import { useLang } from "../../hook/LangContext";
import CreateProjectComponent from "./CreateProjectComponent";
import { BsBuildingFillAdd } from "react-icons/bs";
import no_data_Icon from "../assets/no_data3.png";
import no_data_found from "../assets/no_data_found.png";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { AiOutlineFullscreen } from "react-icons/ai";

export default function ProjectsTable({ data }) {
  const { handleDeleteProject, allClients } = useFetchData();
  const { translations } = useLang();
  const [targetName, setTargetName] = useState("");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const TABLE_HEAD = [
    translations.name,
    translations.budget,
    translations.client,
    "Status",
    "",
  ];

  const handleDelete = (id) => {
    try {
      handleDeleteProject.mutate(id);
    } catch (error) {
      console.error(error.message);
    }
  };

  const hasPermissionToEdit = data?.some(
    (enterpriseData) => enterpriseData?.email === user?.email
  );

  return (
    <Card
      className={`h-full w-full p-2 shadow-sm mt-3 gradientBg
}`}
    >
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none pb-5 gradientBg"
      >
        <div className="flex items-center justify-between mb-4 md:mb-0 gap-8">
          <Typography variant="h6" color="blue-gray">
            {translations.projects}
          </Typography>
          <CreateProjectComponent
            customButtonProps={
              <Button
                className="flex items-center gap-3 rounded-full"
                size="sm"
              >
                <BsBuildingFillAdd className="h-4 w-4 " />{" "}
                <span className="normal-case tracking-wide">
                  {translations.add_project}
                </span>
              </Button>
            }
          />
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-fit rounded-full flex items-center">
            <MagnifyingGlassIcon className="h-4 w-4 absolute ml-2" />
            <input
              placeholder={translations.find_a_project}
              onChange={(e) => setTargetName(e.target.value)}
              className="rounded-full bg-white w-full md:w-72 border-none outline-none pl-7 text-sm h-8 shadow-sm"
            />
          </div>
        </div>
      </CardHeader>
      {data?.flatMap((proj_data) =>
        proj_data.projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-fit py-4">
            <CreateProjectComponent
              customButtonProps={
                <img
                  className=" w-16 cursor-pointer object-cover object-center"
                  src={no_data_Icon}
                  alt="nature image"
                />
              }
            />

            {data?.some(
              (enterpriseData) => enterpriseData.email !== user.email
            ) ? (
              <div className="text-gray-500 text-sm flex flex-col  items-center gap-2">
                <img
                  className=" w-20 object-cover object-center"
                  src={no_data_found}
                  alt="nature image"
                />
                <Typography variant="h6" color="gray">
                  {translations.no_projects}
                </Typography>
              </div>
            ) : (
              <Typography variant="small" color="gray" className="mt-2">
                Comece a criar seus projetos
              </Typography>
            )}
          </div>
        ) : (
          <CardBody className="relative participants_scrollBarStyles overflow-scroll overflow-x-hidden h-[400px] px-0">
            <div className="overflow-x-auto">
              <table className="relative mt-0 w-full min-w-max table-auto text-left">
                <thead className="w-full flex items-center justify-between z-50 gradientBg rounded-lg">
                  <tr className="headetR w-full flex justify-between items-center">
                    {TABLE_HEAD.map((head, index) => (
                      <th key={index} className="border-none p-4">
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

                <tbody className="w-full flex flex-col items-center justify-center p-2">
                  {data?.flatMap((item) =>
                    item.projects
                      .filter((targetItem) =>
                        targetItem.name
                          .toLowerCase()
                          .startsWith(targetName.toLowerCase())
                      )
                      .map((project) => (
                        <tr
                          key={project.id}
                          className="boxShadow hover:bg-blue-gray-50 transition-all w-full bg-white flex items-center justify-between mt-2 rounded-lg h-12 overflow-hidden"
                        >
                          <td className="py-2 border-none w-[260px] pl-4">
                            <div className="flex items-center gap-3">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {project.name}
                              </Typography>
                            </div>
                          </td>

                          <td className="py-2 border-none w-[120px] pl-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal text-green-500"
                            >
                              45.000,89
                            </Typography>
                          </td>
                          <td className="py-2 border-none w-[180px] pl-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-medium text-start"
                            >
                              {project.client_name
                                ? allClients
                                    .filter(
                                      (client) =>
                                        client.client_registration_id ===
                                        project.client_name
                                    )
                                    .map((currentClient) => currentClient.name)
                                : translations.no_atribuition}
                            </Typography>
                          </td>
                          <td className="py-2 border-none w-fit">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={
                                project.tasks.length === 0
                                  ? "Not initialized"
                                  : project.tasks.every(
                                      (task) => task.responsibles.length === 0
                                    )
                                  ? "On Hold"
                                  : project.tasks
                                      .filter(
                                        (task) => task.responsibles.length > 0
                                      )
                                      .some(
                                        (task) =>
                                          task.responsibles.length > 0 &&
                                          task.progressStatus !== "completed"
                                      )
                                  ? "In Progress"
                                  : project.tasks
                                      .filter(
                                        (task) => task.responsibles.length > 0
                                      )
                                      .every(
                                        (task) =>
                                          task.progressStatus === "completed"
                                      )
                                  ? "Completed"
                                  : ""
                              }
                              color="green"
                              className="w-28 text-center rounded-full capitalize bg-gray-200 text-gray-700"
                            />
                          </td>

                          <td className="py-2 border-none w-[100px] flex justify-end mr-2 text-md">
                            <ProjectDetailsModal
                              buttonProps={
                                hasPermissionToEdit && (
                                  <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center hover:bg-indigo-300 hover:text-white transition-all">
                                    <AiOutlineFullscreen size={20} />
                                  </div>
                                )
                              }
                              projectData={project}
                              handleDelete={() => handleDelete(project.id)}
                            />
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </CardBody>
        )
      )}
    </Card>
  );
}
