import React from "react";
import { Card, CardBody } from "@material-tailwind/react";

import useFetchData from "../../hook/useFetchData";
import MembersTable from "./MembersTable";
import ProjectsTable from "./ProjectsTable";
import { BsBuildingsFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa6";
import { VscProject } from "react-icons/vsc";
import { useLang } from "../../hook/LangContext";
import ClientsTable from "./ClientsTable";

export default function OverAllUserManagement() {
  const { data, isLoading, allMembers, allClients } = useFetchData();
  const { translations } = useLang();

  if (isLoading) return <p>Carregando dados...</p>;

  return (
    <div className="px-5 md:pr-10 mb-16 z-50">
      <Card className="mb-5 w-full h-fit">
        <CardBody className="h-full">
          <div className="flex items-center justify-between md:px-40 gap-5 flex-wrap h-fit w-full">
            <div className="flex-col gap-2 flex items-center justify-center">
              <p>{translations.members}</p>

              <div className="border-2 w-fit h-12 rounded-full flex items-center justify-between gap-5 px-4">
                <div className="flex items-center -space-x-4 text-3xl font-medium">
                  {allMembers.length}
                </div>
                <FaUsers size={20} />
              </div>
            </div>

            <div className="flex-col gap-2 flex items-center justify-center">
              <p>{translations.projects}</p>

              <div className="border-2 w-fit h-12 rounded-full flex items-center justify-between gap-5 px-4">
                <div className="flex items-center -space-x-4 text-3xl font-medium">
                  {data.map((item) => item.projects.length)}
                </div>
                <VscProject size={20} />
              </div>
            </div>
            <div className="flex-col gap-2 flex items-center justify-center">
              <p>{translations.clients}</p>

              <div className="border-2 w-fit h-12 rounded-full flex items-center justify-between gap-5 px-4">
                <div className="flex items-center -space-x-4 text-3xl font-medium">
                  {allClients.length}
                </div>
                <BsBuildingsFill size={20} />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <MembersTable />
      <ProjectsTable data={data} />

      <ClientsTable data={allClients} />
    </div>
  );
}
