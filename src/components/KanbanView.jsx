import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { RiAddFill } from "react-icons/ri";
import { CgMenuGridO } from "react-icons/cg";
import { Breadcrumbs, Button } from "@material-tailwind/react";
import useFetchData from "../../hook/useFetchData";
import CreateActivityModal from "./CreateActivityModal";
import { SiOnlyoffice } from "react-icons/si";

export default function KanbanView() {
  const { data, isLoading, refetch } = useFetchData();
  const [priority, setPriority] = useState("over_view");

  if (isLoading) return <p>Carregando dados...</p>;

  const user_role = "manager";

  return (
    <div className="relative">
      {data.map((item) => (
        <div className="flex flex-col pr-5 w-full" key={item.id}>
          <div className="flex  items-center justify-between pr-2 bg-white w-full rounded-lg overflow-hidden">
            <Breadcrumbs className="bg-white">
              <SiOnlyoffice />
              <span className="text-gray-700">
                <span>{item.project_name}</span>
              </span>
              <span className="text-gray-700 opacity-60">
                <b>{item.tasks?.length}</b> atividades
              </span>
              <span className="text-gray-700">
                status:{" "}
                <b className="text-green-500">
                  {Math.ceil(
                    Object.values(item?.tasks || {}).reduce(
                      (accumulator, currentItem) =>
                        accumulator + currentItem.progress,
                      0
                    ) / Math.max(item?.tasks?.length || 1, 1)
                  )}
                  %
                </b>
              </span>
            </Breadcrumbs>
            <div className="flex items-center gap-5">
              {user_role === "manager" ? <CreateActivityModal /> : ""}

              <div className="flex group items-center justify-center min-w-7 min-h-7 group bg-gray-200 transition-all hover:bg-[rgb(191,199,244)] cursor-pointer rounded-full">
                <CgMenuGridO
                  size={20}
                  className="text-[#707070] group-hover:text-white transition-all"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 md:gap-4 pt-8 pb-10 md:pl-0">
            {priority === "over_view" ? (
              <>
                {item.tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    taskId={task.id}
                    task_name={task.task_name}
                    description={task.description}
                    priority={task.priority}
                    responsible={task.responsible}
                    progress={task.progress}
                    subactivities={task.subactivities}
                    reference_link={task.reference_link}
                    refetch={refetch}
                  />
                ))}
              </>
            ) : (
              <>
                {item.tasks
                  .filter(
                    (filtered_task) => filtered_task.priority === priority
                  )
                  .map((task) => (
                    <TaskCard
                      key={task.id}
                      taskId={task.id}
                      task_name={task.task_name}
                      description={task.description}
                      priority={task.priority}
                      responsible={task.responsible}
                      progress={task.progress}
                      subactivities={task.subactivities}
                      reference_link={task.reference_link}
                      refetch={refetch}
                    />
                  ))}
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
