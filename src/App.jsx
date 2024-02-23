import { useState } from "react";
import "./App.css";
import KanbanView from "./components/KanbanView";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import { RxDashboard } from "react-icons/rx";
import { FaTasks } from "react-icons/fa";
import { MdManageHistory } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { Tabs, TabsBody, TabPanel } from "@material-tailwind/react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import DashboardView from "./components/DashboardView";
import OverAllUserManagement from "./components/OverAllUserManagement";

const queryClient = new QueryClient();

const data = [
  {
    value: "dashboard",
    icon: <RxDashboard size={20} />,
    component: <DashboardView />,
  },
  {
    value: "tasks",
    icon: <FaTasks size={20} />,
    component: <KanbanView />,
  },
  {
    value: "management",
    icon: <FaUsersGear size={20} />,
    component: <OverAllUserManagement />,
  },
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Tabs value="dashboard" orientation="vertical">
        <div className="flex h-screen w-full">
          <SideBar data={data} />

          <div className="w-[100%] md:w-[90%] h-full md:ml-auto overflow-y-auto scrollBarStyles">
            <Header />
            <TabsBody className="mt-28 w-full">
              {data.map(({ value, component }) => (
                <TabPanel key={value} value={value} className="p-0 relative">
                  {component}
                </TabPanel>
              ))}
            </TabsBody>
          </div>
        </div>
      </Tabs>
    </QueryClientProvider>
  );
}

export default App;
