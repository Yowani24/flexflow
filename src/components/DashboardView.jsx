import React, { useEffect, useState } from "react";
import ProjectMapView from "./ProjectMapView";
import { useQuery } from "react-query";
import axios from "axios";
import useFetchData from "../../hook/useFetchData";
import OverAllInformation from "./OverAllInformation";
import {
  Card,
  CardBody,
  Select,
  Option,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import Participants from "./Participants";

export default function DashboardView() {
  const { data, isLoading, refetch } = useFetchData();
  const [projectName, setProjectName] = useState("Phoenix Rising");

  if (isLoading) return <p>Carregando dados...</p>;

  const handleProjectSelect = (selectedProject) => {
    setProjectName(selectedProject);
  };

  const projectData = data.filter(
    (project) => project.project_name === projectName
  );

  return (
    <div className="flex flex-col px-5 pb-10 md:px-0 md:pr-10">
      <Card className="w-[100%] p-4 mb-5">
        <div className="relative  flex-col md:flex-row items-center justify-center w-full">
          <div className="absolute left-0 top-0 w-60">
            <Select
              label="Selecionar projeto"
              value={projectName}
              onChange={handleProjectSelect}
            >
              {data.map((item) => (
                <Option key={item.id} value={item.project_name}>
                  {item.project_name} - <b>P4875</b>
                </Option>
              ))}
            </Select>
          </div>
          <Typography className="text-3xl mt-14 text-center md:m-0">
            Overall Project Information
          </Typography>
        </div>
        <OverAllInformation projectData={projectData} />
      </Card>
      <div className="hidden md:flex w-full">
        <ProjectMapView projectData={projectData} projectName={projectName} />
      </div>
      <Participants projectData={projectData} />
    </div>
  );
}
