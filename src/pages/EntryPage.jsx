import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsBody, TabPanel } from "@material-tailwind/react";
import { FadeLoader } from "react-spinners";
import DashboardView from "../components/DashboardView";
import KanbanView from "../components/KanbanView";
import OverAllUserManagement from "../components/OverAllUserManagement";
import { FaUsersGear } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import useFetchData from "../../hook/useFetchData";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const tabData = [
  {
    id: 1,
    value: "dashboard",
    icon: <RxDashboard size={20} />,
    component: <DashboardView />,
  },
  {
    id: 2,
    value: "tasks",
    icon: <FaTasks size={20} />,
    component: <KanbanView />,
  },
  {
    id: 3,
    value: "management",
    icon: <FaUsersGear size={20} />,
    component: <OverAllUserManagement />,
  },
];

export default function EntryPage() {
  const { isLoading } = useFetchData();
  const reloadCalled = useRef(false);
  const [pageReloaded, setPageReloaded] = useState(
    localStorage.getItem("pageReloaded", false) || null
  );

  // useEffect(() => {
  //   const wasReloaded = localStorage.getItem("reloadCalled");
  //   if (!reloadCalled.current && !wasReloaded && !pageReloaded) {
  //     window.location.reload();
  //     reloadCalled.current = true;
  //     localStorage.setItem("reloadCalled", true);
  //     localStorage.setItem("pageReloaded", true);
  //   }
  // }, []);

  useEffect(() => {
    if (!pageReloaded) {
      window.location.reload();
      localStorage.setItem("pageReloaded", true);
    }
  }, []);

  return (
    <Tabs value="dashboard" orientation="vertical">
      {isLoading ? (
        <div className="backdrop-blur-sm bg-black/30 fixed flex items-center justify-center w-full h-screen z-50">
          <FadeLoader
            color="black"
            // loading={isLoading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        ""
      )}
      <div className="flex h-screen w-full">
        <SideBar data={tabData} />

        <div className="w-[100%] md:w-[90%] h-full md:ml-auto overflow-y-auto scrollBarStyles">
          <Header />
          <TabsBody className="mt-28 w-full z-20">
            {tabData.map(({ value, component }) => (
              <TabPanel key={value} value={value} className="p-0 relative">
                {component}
              </TabPanel>
            ))}
          </TabsBody>
        </div>
      </div>
    </Tabs>
  );
}
