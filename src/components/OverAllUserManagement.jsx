import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserGroupIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/solid";

import useFetchData from "../../hook/useFetchData";
import MembersTable from "./MembersTable";
import ProjectsTable from "./ProjectsTable";
import { useLang } from "../../hook/LangContext";
import ClientsTable from "./ClientsTable";

export default function OverAllUserManagement() {
  const { data, isLoading, allMembers, allClients } = useFetchData();
  const { translations } = useLang();

  if (isLoading) return <p>Carregando dados...</p>;

  const tabsData = [
    {
      label: translations.members,
      value: "members",
      icon: UserGroupIcon,
      component: <MembersTable />,
      quantity: allMembers.length,
    },
    {
      label: translations.projects,
      value: "profile",
      icon: Square3Stack3DIcon,
      component: <ProjectsTable data={data} />,
      quantity: data?.map((item) => item.projects.length),
    },
    {
      label: translations.clients,
      value: "settings",
      icon: BriefcaseIcon,
      component: <ClientsTable data={allClients} />,
      quantity: allClients.length,
    },
  ];

  return (
    <div className="px-2 md:pr-10 mb-16 z-50">
      <Tabs value="members">
        <TabsHeader>
          {tabsData.map(({ label, value, icon, quantity }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2">
                {React.createElement(icon, { className: "w-5 h-5" })}
                {label}{" "}
                <Typography className="text-gray-500" variant="small">
                  {quantity}
                </Typography>
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody className="z-50">
          {tabsData.map(({ value, component }) => (
            <TabPanel key={value} value={value} className="">
              {component}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
