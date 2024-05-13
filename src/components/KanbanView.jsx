import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { CgMenuGridO } from "react-icons/cg";
import { Breadcrumbs, Button, Typography } from "@material-tailwind/react";
import useFetchData from "../../hook/useFetchData";
import CreateActivityModal from "./CreateActivityModal";
import { SiOnlyoffice } from "react-icons/si";
import { ImFilter } from "react-icons/im";
import { useLang } from "../../hook/LangContext";
import CreateProjectComponent from "./CreateProjectComponent";
import ProjectSpecification from "./ProjectSpecification";
import no_data_icon from "../assets/no_data3.png";
import no_data_icon2 from "../assets/no_data5.png";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Checkbox,
} from "@material-tailwind/react";

export default function KanbanView() {
  const { data, isLoading, refetch, allClients } = useFetchData();
  const { translations } = useLang();
  const [filtered_project, setFiltered_project] = useState(null);
  const [priority, setPriority] = useState("over_view");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  if (isLoading) return <p>Carregando dados...</p>;

  const handleCheckboxChange = ({ project }) => {
    if (filtered_project === project.name) {
      setFiltered_project(null);
    } else {
      setFiltered_project(project.name);
    }
  };

  const FilterMenuComponent = () => {
    return (
      <Menu
        dismiss={{
          itemPress: false,
        }}
      >
        <MenuHandler>
          <Button
            variant="outlined"
            size="sm"
            className="rounded-md shadow-sm min-w-6 min-h-6 border-gray-300 hover:border-gray-600 transition-all text-gray-600 hover:text-gray-900 text-xs normal-case flex items-center gap-2 tracking-wider font-medium p-0 px-2 w-filt"
          >
            <ImFilter size={12} />
          </Button>
        </MenuHandler>
        <MenuList>
          {data.map((item) =>
            item.projects.map((project) => (
              <MenuItem className="p-0">
                <label
                  htmlFor={project.id}
                  className="flex cursor-pointer items-center gap-2 p-2"
                >
                  <Checkbox
                    ripple={false}
                    id={project.id}
                    containerProps={{ className: "p-0" }}
                    className="hover:before:content-none"
                    checked={project.name === filtered_project}
                    onChange={() => handleCheckboxChange(project)}
                  />
                  {project.name}
                </label>
              </MenuItem>
            ))
          )}
        </MenuList>
      </Menu>
    );
  };
  const user_data = data?.map((enterprise) =>
    enterprise.projects
      .filter(
        (project) =>
          !filtered_project || project.name === filtered_project.trim()
      )
      .filter(
        (project) =>
          project.tasks?.some((task) =>
            task.responsibles.includes(user?.email)
          ) || project.user_created === user?.email
      )
  );

  return (
    <div className="relative">
      {data?.map((enterptise_data) =>
        enterptise_data.projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-fit py-2 px-10 md:pr-[10%] pt-[10%]">
            <Typography className="text-center">
              {translations.create_projects_and_track_them_here}
            </Typography>
            {data?.some(
              (enterpriseData) => enterpriseData?.email !== user?.email
            ) ? (
              "Nemhuma atividade atribuída à você no momento."
            ) : (
              <Typography className="mb-4">
                {translations.start_creating_your_projects}
              </Typography>
            )}

            <CreateProjectComponent
              customButtonProps={
                <img
                  className="w-16 cursor-pointer object-cover object-center"
                  src={no_data_icon}
                  alt="nature image"
                />
              }
            />
          </div>
        ) : (
          <>
            {data?.map((enterprise) =>
              enterprise?.email === user?.email ? (
                ""
              ) : (
                <>
                  {user_data.map((item) =>
                    item.length === 0 ? (
                      <div className="flex flex-col items-center p-[10%]">
                        <img
                          className="w-28 cursor-pointer object-cover object-center"
                          src={no_data_icon2}
                          alt="nature image"
                        />
                        <Typography className="text-center">
                          Nenhuma atividade atribuída à você no momento.
                        </Typography>
                      </div>
                    ) : (
                      ""
                    )
                  )}
                </>
              )
            )}
            {data?.map((enterprise) =>
              enterprise.projects
                .filter(
                  (project) =>
                    !filtered_project ||
                    project.name === filtered_project.trim()
                )
                .filter(
                  (project) =>
                    project.tasks?.some((task) =>
                      task.responsibles.includes(user?.email)
                    ) || project.user_created === user?.email
                )
                .map((item) => (
                  <div
                    className="relative flex flex-col px-5 md:px-0 md:pr-5 w-full"
                    key={item.id}
                  >
                    <div className="fixed top-16 py-1 w-full bg-white left-0 flex items-center gap-4 justify-center px-10">
                      <div>
                        <FilterMenuComponent />
                      </div>
                      <CreateProjectComponent
                        customButtonProps={
                          <Button
                            variant="outlined"
                            className="rounded-md min-h-[22px] shadow-sm border-gray-300 hover:border-gray-600 transition-all text-gray-600 hover:text-gray-900 text-xs normal-case tracking-wider font-medium p-0 px-2 w-filt"
                            size="sm"
                          >
                            + {translations.add_project}
                          </Button>
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between pr-2 bg-white w-full rounded-lg overflow-hidden">
                      <Breadcrumbs className="bg-white">
                        <SiOnlyoffice className="text-indigo-400" />
                        <span className="text-gray-700">
                          <span>{item.name}</span>
                        </span>
                        <span className="text-gray-700">
                          <span>
                            {allClients
                              .filter(
                                (client) =>
                                  client?.client_registration_id ===
                                  item.client_name
                              )
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
                        {data?.some(
                          (enterpriseData) =>
                            enterpriseData?.email !== user?.email
                        ) ? (
                          ""
                        ) : (
                          <CreateActivityModal
                            data={data}
                            projectId={item.id}
                          />
                        )}

                        <ProjectSpecification
                          projectName={item.name}
                          projectData={data?.flatMap((project_enterprise) =>
                            project_enterprise.projects.filter(
                              (proj) => proj.name === item.name
                            )
                          )}
                          buttonProps={
                            <div className="flex group items-center justify-center min-w-7 min-h-7 group bg-gray-200 transition-all hover:bg-[rgb(191,199,244)] cursor-pointer rounded-full">
                              <CgMenuGridO
                                size={20}
                                className="text-[#707070] group-hover:text-white transition-all"
                              />
                            </div>
                          }
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-5 md:gap-4 pt-8 pb-10 md:pl-0">
                      {priority === "over_view" ? (
                        <>
                          {data?.map((enterpriseData) =>
                            enterpriseData.responsibles.includes(
                              user?.email
                            ) ? (
                              <>
                                {item.tasks
                                  .filter((item) =>
                                    item.responsibles.includes(user?.email)
                                  )
                                  .sort(
                                    (a, b) =>
                                      new Date(a.created_at) -
                                      new Date(b.created_at)
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
                                {item.tasks
                                  ?.filter(
                                    (tasks) => tasks.responsibles.length > 0
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
                            )
                          )}
                        </>
                      ) : (
                        <>
                          {item.tasks
                            .filter(
                              (filtered_task) =>
                                filtered_task.priority === priority &&
                                responsibles.includes(user?.email)
                            )
                            .sort(
                              (a, b) =>
                                new Date(a.created_at) - new Date(b.created_at)
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
          </>
        )
      )}
    </div>
  );
}
