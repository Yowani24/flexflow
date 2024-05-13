import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Avatar,
  Input,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useLang } from "../../hook/LangContext";
import useFetchData from "../../hook/useFetchData";
import { AiOutlineFullscreen } from "react-icons/ai";
import CreateClientComponent from "./CreateClientComponent";

export default function ClientsTable() {
  const { data, allClients } = useFetchData();
  const { translations } = useLang();
  const [targetName, setTargetName] = useState("");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const hasPermissionToEdit = data?.some(
    (enterpriseData) => enterpriseData?.email === user?.email
  );

  return (
    <Card
      className={`h-full w-full p-2 shadow-sm gradientBg mt-3
        }`}
    >
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none pb-5 bg-transparent"
      >
        <div className="flex items-center justify-between mb-4 md:mb-0 gap-8">
          <Typography variant="h6" color="blue-gray">
            {translations.clients}
          </Typography>

          {data?.some(
            (enterpriseData) => enterpriseData?.email !== user?.email
          ) ? (
            ""
          ) : (
            <CreateClientComponent
              customButtonProps={
                <Button
                  onClick={() =>
                    document.getElementById("create_client_modal").showModal()
                  }
                  className="flex items-center gap-3 rounded-full"
                  size="sm"
                >
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" />{" "}
                  <span className="normal-case tracking-wide">
                    {translations.add_client}
                  </span>
                </Button>
              }
            />
          )}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-fit rounded-full flex items-center">
            <MagnifyingGlassIcon className="h-4 w-4 absolute ml-2" />
            <input
              placeholder={translations.find_a_client}
              onChange={(e) => setTargetName(e.target.value)}
              className="rounded-full bg-white w-full md:w-72 border-none outline-none pl-7 text-sm h-8 shadow-sm"
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="relative w-full participants_scrollBarStyles overflow-scroll overflow-x-hidden h-[400px] px-0">
        <div className="flex flex-wrap items-center gap-4 md:pl-4 justify-center md:justify-start">
          {allClients
            .filter((targetItem) =>
              targetItem.name
                .toLowerCase()
                .startsWith(targetName.toLocaleLowerCase())
            )
            ?.map((client) => (
              <Card className="w-64 h-32 p-3 group transition-all hover:shadow-lg">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="bg-white rounded-md shadow-md">
                      <Avatar
                        src={client?.photo_url}
                        alt={client?.name}
                        size="sm"
                        className="w-9 h-9 p-1"
                        variant="rounded"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal p-0"
                      >
                        {client?.name}
                      </Typography>
                      <span className="text-[10px] p-0">
                        {client?.client_registration_id}
                      </span>
                    </div>
                  </div>
                  {hasPermissionToEdit && (
                    <div className="hidden bg-gray-300 w-8 h-8 rounded-full group-hover:flex items-center justify-center hover:bg-indigo-300 hover:text-white transition-all">
                      <AiOutlineFullscreen size={18} />
                    </div>
                  )}
                </div>
                <Typography className="text-sm mt-3 text-gray-500">
                  {client?.clientDescription?.substring(0, 70)}
                </Typography>
              </Card>
            ))}
        </div>
      </CardBody>
    </Card>
  );
}
