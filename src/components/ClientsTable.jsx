import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Chip,
  Avatar,
  Input,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { FiEdit } from "react-icons/fi";
import MemberEditComponent from "./MemberEditComponent";
import AnimatedDialog from "./AnimatedDialog";
import { useLang } from "../../hook/LangContext";
import useFetchData from "../../hook/useFetchData";

export default function ClientsTable() {
  const { data, allClients } = useFetchData();
  const { translations } = useLang();
  const [showButton, setShowButton] = useState(false);
  const [targetName, setTargetName] = useState("");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const TABLE_HEAD = [translations.name, translations.cnpj, ""];

  return (
    <Card
      className={`h-full w-full p-2 shadow-sm bg-white mt-3
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

          {data.some(
            (enterpriseData) => enterpriseData.email !== user.email
          ) ? (
            ""
          ) : (
            <Button className="flex items-center gap-3 rounded-full" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" />{" "}
              <span className="normal-case tracking-wide">
                {translations.add_client}
              </span>
            </Button>
          )}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label={translations.find_a_client}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={(e) => setTargetName(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="relative w-full participants_scrollBarStyles overflow-scroll overflow-x-hidden max-h-[400px] px-0">
        <div className="relative overflow-x-auto w-full">
          <table className="relative mt-0 w-full table-auto text-left">
            <thead className="w-full flex items-center justify-between z-50 bg-white rounded-lg">
              <tr className="ClientsHeadetR w-full flex justify-between items-center">
                {TABLE_HEAD.map((head, index) => (
                  <th key={index} className="border-none">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="w-full flex flex-col items-center justify-center p-2">
              {allClients
                .filter((targetItem) =>
                  targetItem.name
                    .toLowerCase()
                    .startsWith(targetName.toLocaleLowerCase())
                )
                .map((client) => (
                  <tr
                    key={client.id}
                    className="boxShadow hover:bg-blue-gray-50 transition-all w-full bg-white flex items-center justify-between mt-2 rounded-lg overflow-hidden"
                  >
                    <td className="py-2 border-none w-[230px] pl-4">
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={client.logo}
                          alt={client.name}
                          size="sm"
                          className="min-w-9 min-h-9"
                        />
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {client.name}
                        </Typography>
                      </div>
                    </td>

                    <td className="py-2 border-none w-[220px]">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        <span className="">{client.cnpj}</span>
                      </Typography>
                    </td>

                    <td className="py-2 border-none w-[100px] flex justify-end mr-2 text-md">
                      {data.some(
                        (enterpriseData) => enterpriseData.email !== user.email
                      ) ? (
                        ""
                      ) : (
                        <AnimatedDialog
                          title={"Editing client"}
                          paddingProps={true}
                          showButtonProps={showButton}
                          customButtonProps={
                            <Button
                              variant="text"
                              className="rounded-full p-2 flex items-center justify-center hover:bg-gray-400 border-none transition-all"
                            >
                              <FiEdit size={16} color="gray" />
                            </Button>
                          }
                          // children={
                          //   <MemberEditComponent
                          //     showButtonProps={setShowButton}
                          //     name={client.name}
                          //     cnpj={client.cnpj}
                          //   />
                          // }
                        />
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
