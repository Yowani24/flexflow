import React from "react";
import { CardBody } from "@material-tailwind/react";
import { TbProgress } from "react-icons/tb";
import { MdOutlineMotionPhotosPaused } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import ProjectDetailsView from "./ProjectDetailsView";

export default function OverAllInformation({ projectData }) {
  const responsiblesLength = projectData.reduce(
    (accumulator, item) =>
      accumulator +
      item.tasks.reduce((acc, task) => acc + task.responsible.length, 0),
    0
  );

  const inProgressSubTasks = projectData.reduce((accumulator, item) => {
    accumulator += item.tasks.filter(
      (task) =>
        task.subactivities.filter(
          (subactivity) =>
            subactivity.started && !subactivity.paused && !subactivity.done
        ).length > 0
    ).length;
    return accumulator;
  }, 0);

  const PausedSubTasks = projectData.reduce((accumulator, item) => {
    accumulator += item.tasks.filter(
      (task) =>
        task.subactivities.filter(
          (subactivity) => subactivity.started && subactivity.paused
        ).length > 0
    ).length;
    return accumulator;
  }, 0);

  const CompletedSubTasks = projectData.reduce((accumulator, item) => {
    accumulator += item.tasks.filter(
      (task) =>
        task.subactivities.filter(
          (subactivity) => subactivity.started && subactivity.done
        ).length > 0
    ).length;
    return accumulator;
  }, 0);

  const progress = Math.ceil(
    ((projectData.reduce((accumulator, item) => {
      accumulator += item.tasks.reduce(
        (acc, currentItem) => acc + currentItem.progress,
        0
      );
      return accumulator;
    }, 0) /
      Math.max(
        projectData.reduce((acc, item) => acc + item.tasks.length, 0),
        1
      )) *
      100) /
      100
  );

  const activitiesStatusData = [
    {
      id: "1",
      value: "In Progress",
      icon: <TbProgress color="cyan" size={18} />,
      status: inProgressSubTasks,
    },
    {
      id: "2",
      value: "Paused",
      icon: <MdOutlineMotionPhotosPaused color="brown" size={18} />,
      status: PausedSubTasks,
    },
    {
      id: "3",
      value: "Completed",
      icon: <IoCheckmarkDoneCircleOutline color="green" size={18} />,
      status: CompletedSubTasks,
    },
  ];

  return (
    <CardBody className="flex bg-white flex-col items-center justify-between">
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <div className="w-[50%] flex-col gap-2 h-24 flex items-center justify-center">
          <p>Participantes</p>

          <div className="border-2 w-[150px] h-12 rounded-full flex items-center justify-between px-4">
            <div className="flex items-center -space-x-4 text-3xl font-medium">
              {responsiblesLength}
            </div>

            <span className="text-sm font-light">Developers</span>
          </div>
        </div>
        <div className="border-y-2 md:border-y-0 md:border-x-2 w-full gap-2 py-5 md:py-0 my-5 md:my-0 flex flex-col items-center justify-center">
          <p className="text-lg md:text-xl">Atividades</p>
          <div className="h-auto md:h-12 flex flex-col md:flex-row items-center justify-center gap-4 md:flex-wrap">
            <div className="text-sm md:text-base tracking-wide rounded-md p-2 pt-3">
              <span className="text-4xl md:text-5xl font-semibold">
                {projectData.reduce(
                  (accumulator, item) => accumulator + item.tasks.length,
                  0
                )}
              </span>{" "}
              atividades
            </div>

            {activitiesStatusData.map((item) => (
              <ProjectDetailsView
                key={item.id}
                value={item.value}
                icon={item.icon}
                status={item.status}
                projectData={projectData}
                disabledProps={true}
                progressStatus={"low"}
              />
            ))}
          </div>
        </div>

        <div className="w-[50%] flex-col gap-2 h-24 flex items-center justify-center">
          <p>Progresso</p>
          <div className="border-2 w-fit px-10 h-12 rounded-full flex items-center justify-center">
            <span className="text-2xl">{progress ? progress : 0}%</span>
          </div>
        </div>
      </div>
    </CardBody>
  );
}
