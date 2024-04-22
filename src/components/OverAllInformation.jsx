import React from "react";
import { CardBody } from "@material-tailwind/react";
import { TbProgress } from "react-icons/tb";
import { MdOutlineMotionPhotosPaused } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import ProjectDetailsView from "./ProjectDetailsView";
import { BsBuildingsFill } from "react-icons/bs";
import useFetchData from "../../hook/useFetchData";
import { FaUsers } from "react-icons/fa6";
import { useLang } from "../../hook/LangContext";
import CircularProgressComponent from "./CircularProgressComponent";

export default function OverAllInformation({ projectData, projectName }) {
  const { allClients } = useFetchData();
  const { translations } = useLang();

  const inProgressTasks = projectData.map(
    (project) =>
      project.tasks.filter(
        (task) =>
          task.status && task.progress < 100 && task.responsibles.length > 0
      ).length
  );
  const pausedTasks = projectData.map(
    (project) =>
      project.tasks.filter(
        (task) => task.status === false && task.responsibles.length > 0
      ).length
  );
  const completedTasks = projectData.map(
    (project) =>
      project.tasks.filter(
        (task) =>
          task.status && task.progress == 100 && task.responsibles.length > 0
      ).length
  );
  const activitiesStatusData = [
    {
      id: "1",
      value: translations.in_progress,
      icon: <TbProgress color="cyan" size={24} />,
      status: inProgressTasks,
      task_progress: "ongoing",
    },
    {
      id: "2",
      value: translations.paused,
      icon: <MdOutlineMotionPhotosPaused color="brown" size={24} />,
      status: pausedTasks,
      task_progress: "paused",
    },
    {
      id: "3",
      value: translations.completed,
      icon: <IoCheckmarkDoneCircleOutline color="green" size={24} />,
      status: completedTasks,
      task_progress: "completed",
    },
  ];

  return (
    <CardBody className="flex bg-white flex-col items-center justify-between">
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <div className="w-[50%] flex-col gap-2 h-24 flex items-center justify-center">
          <p>{translations.participants}</p>

          <div className="border-2 border-cyan-200 w-fit h-12 rounded-full flex items-center justify-between gap-5 px-4">
            <FaUsers size={20} />
          </div>
        </div>
        <div className="border-y-2 border-cyan-200 md:border-y-0 md:border-x-2 w-full gap-2 py-5 md:py-0 my-5 md:my-0 flex flex-col items-center justify-center">
          <p className="text-lg md:text-xl">
            {projectName ? translations.activities : translations.projects}
          </p>
          <div className="h-auto md:h-12 flex flex-col md:flex-row items-center justify-center gap-4 md:flex-wrap">
            <div className="text-sm md:text-base tracking-wide rounded-md p-2 pt-3">
              <span className="text-4xl md:text-5xl font-semibold">
                {projectData.map(
                  (item) =>
                    item.tasks.filter((task) => task.responsibles.length > 0)
                      .length
                )}
              </span>{" "}
              {projectName ? translations.activities : translations.projects}
            </div>

            {activitiesStatusData.map((item) => (
              <ProjectDetailsView
                key={item.id}
                value={item.value}
                icon={item.icon}
                status={item.status}
                projectData={projectData}
                disabledProps={true}
                task_progress={item.task_progress}
              />
            ))}
          </div>
        </div>
        <div className="w-[50%] flex flex-wrap items-center justify-center gap-6">
          <div className="flex-col gap-0 h-24 mt-4 flex items-center justify-center">
            <p>{translations.progress}</p>
            <CircularProgressComponent
              progressValue={
                projectData.length
                  ? projectData.map((item) => {
                      if (item.tasks) {
                        const relevantTasks = item.tasks.filter(
                          (task) => task.responsibles.length > 0
                        );
                        if (relevantTasks.length > 0) {
                          const totalProgress = relevantTasks.reduce(
                            (accumulator, currentItem) =>
                              accumulator + currentItem.progress,
                            0
                          );
                          const averageProgress = Math.ceil(
                            totalProgress / relevantTasks.length
                          );
                          return averageProgress;
                        } else {
                          return 0;
                        }
                      } else {
                        return null;
                      }
                    })
                  : 0
              }
              progressValueSize={15}
              progressLineSize={5}
              circularLineSize={10}
              progressDiametroSize={70}
            />
          </div>
          <div className="flex-col gap-2 h-24 flex items-center justify-center">
            <div className="flex items-center gap-2">
              <BsBuildingsFill />
              <p>{translations.client}</p>
            </div>
            <div className="border-2 border-cyan-200 w-fit px-10 h-12 rounded-full flex items-center justify-cente gap-2">
              {projectData?.map((item) => (
                <>
                  {item.client_name
                    ? allClients
                        .filter((client) => client.cnpj === item.client_name)
                        .map((currentClient) => (
                          <div
                            key={currentClient.id}
                            className="flex items-center gap-2"
                          >
                            <img
                              className="w-5 object-cover object-center"
                              src={currentClient.logo}
                              alt={currentClient.name}
                            />
                            <span className="text-xl">
                              {currentClient.name}
                            </span>
                          </div>
                        ))
                    : "Não atribuído"}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CardBody>
  );
}
