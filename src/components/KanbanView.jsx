import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { RiAddFill } from "react-icons/ri";
import { CgMenuGridO } from "react-icons/cg";
import { Breadcrumbs, Button } from "@material-tailwind/react";
import useFetchData from "../../hook/useFetchData";
import CreateActivityModal from "./CreateActivityModal";
import { SiOnlyoffice } from "react-icons/si";
import { useLang } from "../../hook/LangContext";

export default function KanbanView() {
  const { data, isLoading, refetch, allClients } = useFetchData();
  const { translations } = useLang();
  const [priority, setPriority] = useState("over_view");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  if (isLoading) return <p>Carregando dados...</p>;

  const user_role = "manager";

  return (
    <div className="relative">
      {data.map((enterprise) =>
        enterprise.projects.map((item) => (
          <div
            className="flex flex-col px-5 md:px-0 md:pr-5 w-full"
            key={item.id}
          >
            <div className="flex items-center justify-between pr-2 bg-white w-full rounded-lg overflow-hidden">
              <Breadcrumbs className="bg-white">
                <SiOnlyoffice />
                <span className="text-gray-700">
                  <span>{item.name}</span>
                </span>
                <span className="text-gray-700">
                  <span>
                    {allClients
                      .filter((client) => client.cnpj === item.client_name)
                      .map((currentClient) => currentClient.name)}
                  </span>
                </span>
                <span className="text-gray-700 opacity-60">
                  <b>{item.tasks?.length}</b> {translations.activities}
                </span>
                <span className="text-gray-700 font-medium">
                  {translations.progress}:{" "}
                  <span className="text-green-500">
                    {Math.ceil(
                      Object.values(
                        item?.tasks.filter(
                          (task) => task.responsibles.length > 0
                        ) || {}
                      ).reduce(
                        (accumulator, currentItem) =>
                          accumulator + currentItem.progress,
                        0
                      ) /
                        Math.max(
                          item?.tasks.filter(
                            (task) => task.responsibles.length > 0
                          )?.length || 1,
                          1
                        )
                    )}
                    %
                  </span>
                </span>
              </Breadcrumbs>
              <div className="flex items-center gap-5">
                {data.some(
                  (enterpriseData) => enterpriseData.email !== user.email
                ) ? (
                  ""
                ) : (
                  <CreateActivityModal data={data} projectId={item.id} />
                )}

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
                  {data.map((enterpriseData) =>
                    enterpriseData.responsibles.includes(user.email) ? (
                      <>
                        {item.tasks
                          .filter((item) =>
                            item.responsibles.includes(user.email)
                          )
                          .map((task, index) => (
                            <TaskCard
                              key={task.id}
                              data={data}
                              projectId={item.id}
                              taskId={task.id}
                              task_status={task.status}
                              task_name={task.title}
                              description={task.description}
                              priority={task.priority}
                              responsibles={task.responsibles}
                              progress={task.progress}
                              progressStatus={task.progressStatus}
                              subtasks={task.sub_tasks}
                              deadline={task.deadline}
                              reference_link={task.reference_link}
                              refetch={refetch}
                            />
                          ))}
                      </>
                    ) : (
                      <>
                        {item.tasks.map((task, index) => (
                          <TaskCard
                            key={task.id}
                            data={data}
                            projectId={item.id}
                            taskId={task.id}
                            task_status={task.status}
                            task_name={task.title}
                            description={task.description}
                            priority={task.priority}
                            responsibles={task.responsibles}
                            progress={task.progress}
                            progressStatus={task.progressStatus}
                            subtasks={task.sub_tasks}
                            deadline={task.deadline}
                            reference_link={task.reference_link}
                            refetch={refetch}
                          />
                        ))}
                      </>
                    )
                  )}
                </>
              ) : (
                <>
                  {item.tasks
                    .filter(
                      (filtered_task) =>
                        filtered_task.priority === priority &&
                        responsibles.includes(user.email)
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
        ))
      )}
    </div>
  );
}
