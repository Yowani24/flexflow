import React, { useEffect, useState } from "react";
import ProjectMapView from "./ProjectMapView";
import useFetchData from "../../hook/useFetchData";
import OverAllInformation from "./OverAllInformation";
import { Card, Select, Option, Typography } from "@material-tailwind/react";
import Participants from "./Participants";
import { useLang } from "../../hook/LangContext";
import GeneralDashboardView from "./GeneralDashboardView";

export default function DashboardView() {
  const { data, isLoading } = useFetchData();
  const { translations } = useLang();

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
    data.flatMap((enterprise) =>
      enterprise.projects.map((project) => (
        <Option key={project.id} value={project.name}>
          {project.name}
        </Option>
      ))
    );

  return (
    <div className="flex flex-col px-5 pb-10 md:px-0 md:pr-10">
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
      {projectName && (
        <>
          <div className="hidden md:flex w-full">
            <ProjectMapView
              projectData={projectData}
              projectName={projectName}
            />
          </div>
          <Participants projectData={projectData} />
        </>
      )}
      {!projectName && <Card>{/* <GeneralDashboardView /> */}</Card>}
    </div>
  );
}
