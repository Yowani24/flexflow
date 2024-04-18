import React, { useEffect, useState } from "react";
import ProjectMapView from "./ProjectMapView";
import useFetchData from "../../hook/useFetchData";
import OverAllInformation from "./OverAllInformation";
import { Card, Select, Option, Typography } from "@material-tailwind/react";
import Participants from "./Participants";
import { useLang } from "../../hook/LangContext";
import GeneralDashboardView from "./GeneralDashboardView";
import hey_there from "../assets/hey_there.png";
import no_data_icon from "../assets/no_data4.png";
import CreateProjectComponent from "./CreateProjectComponent";

export default function DashboardView() {
  const { data, isLoading } = useFetchData();
  const { translations } = useLang();
  const userString = localStorage.getItem("user");
  const enterprise_referenceId = userString ? JSON.parse(userString) : null;
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    if (!data || isLoading) return;

    const storedProjectName = localStorage.getItem("selectedProject");
    if (storedProjectName) {
      setProjectName(storedProjectName);
    } else {
      const firstProject = data.flatMap((enterprise) => enterprise.projects)[0];
      if (firstProject) {
        setProjectName(firstProject.name);
      }
    }
  }, [data, isLoading]);

  if (isLoading) return <p>Loading data...</p>;

  const handleProjectSelect = (selectedProject) => {
    setProjectName(selectedProject);
    localStorage.setItem("selectedProject", selectedProject);
  };

  const projectData = data.flatMap((item) =>
    item.projects.filter((project) => project.name === projectName)
  );

  const renderProjectOptions = () =>
    data?.flatMap((enterprise) =>
      enterprise.projects.map((project) => (
        <Option key={project.id} value={project.name}>
          {project.name}
        </Option>
      ))
    );

  return (
    <div className="flex flex-col px-5 pb-10 md:px-0 md:pr-10">
      {data.flatMap((enterprise) =>
        enterprise.projects.length === 0 ? (
          <Card className="flex items-start justify-start flex-col flex-wrap p-4">
            <div className="flex items-center">
              <img
                className=" w-20 cursor-pointer object-cover object-center"
                src={hey_there}
                alt="nature image"
              />

              {data.some(
                (enterpriseData) =>
                  enterpriseData.email !== enterprise_referenceId.email
              ) ? (
                <div className="text-gray-500 text-sm flex items-center gap-2">
                  <Typography variant="h6" color="gray">
                    Oi,
                  </Typography>
                  <Typography color="green">
                    {enterprise_referenceId.displayName}!
                  </Typography>
                </div>
              ) : (
                <Typography variant="h6">Oi!</Typography>
              )}
            </div>
            <div className="flex items-center ml-3 flex-wrap w-full gap-2">
              {data.some(
                (enterpriseData) =>
                  enterpriseData.email !== enterprise_referenceId.email
              ) ? (
                ""
              ) : (
                <Typography className="text-gray-500 text-sm">
                  Crie projetos e desfrute do potencial da plataforma para
                  gerenciá-los da forma mais inteligente.
                </Typography>
              )}

              <CreateProjectComponent
                customButtonProps={
                  <Typography color="blue" className="text-xs cursor-pointer">
                    Criar projeto
                  </Typography>
                }
              />
            </div>
          </Card>
        ) : (
          <Card className="w-full p-4 mb-5">
            <div className="relative flex-col md:flex-row items-center justify-center w-full mb-5">
              <div className="absolute left-0 top-0 w-full md:w-60">
                <span className="text-xs">{translations.select_project}</span>
                <Select
                  color="cyan"
                  value={projectName}
                  onChange={handleProjectSelect}
                  className="border-2 border-cyan-200 text-xs"
                >
                  {renderProjectOptions()}
                </Select>
              </div>
              <Typography className="text-3xl mt-20 text-center md:m-0">
                {translations.overall_project_information}
              </Typography>
            </div>
            <OverAllInformation
              projectData={projectData}
              projectName={projectName}
              data={data}
            />
          </Card>
        )
      )}
      {projectData.length ? (
        <>
          <div className="hidden md:flex w-full">
            <ProjectMapView
              projectData={projectData}
              projectName={projectName}
            />
          </div>
          <Participants projectData={projectData} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-[10%]">
          <img
            className=" w-20 cursor-pointer object-cover object-center"
            src={no_data_icon}
            alt="nature image"
          />
          {translations.no_data_to_show}
        </div>
      )}
    </div>
  );
}
