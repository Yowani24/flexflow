import React from "react";
import { TbLogout } from "react-icons/tb";
import { TabsHeader, Tab } from "@material-tailwind/react";

export default function SideBar({ data }) {
  return (
    <div className="hidden md:w-[10%] h-full fixed top-0 left-0 overflow-y-auto md:flex items-start justify-center">
      <div className="relative flex flex-col items-center py-5 justify-start gap-4 bg-[rgb(21,22,25)] w-[60%] h-[80%] mt-[112px] rounded-lg">
        <div className="flex flex-col items-center justify-start gap-4">
          <TabsHeader
            className="bg-transparent"
            indicatorProps={{
              className: "bg-gray-800 shadow-none !text-red-600",
            }}
          >
            <div className="flex flex-col items-center justify-start gap-4">
              {data.map(({ icon, value }) => (
                <Tab
                  key={value}
                  value={value}
                  className=" hover:bg-gray-900 text-white cursor-pointer transition-all w-10 h-10 rounded-lg flex items-center justify-center"
                >
                  {icon}
                </Tab>
              ))}
            </div>
          </TabsHeader>
        </div>
        <div className="hover:bg-gray-900 text-red-200 cursor-pointer absolute bottom-5 w-10 h-10 rounded-lg flex items-center justify-center">
          <TbLogout size={20} />
        </div>
      </div>
    </div>
  );
}
