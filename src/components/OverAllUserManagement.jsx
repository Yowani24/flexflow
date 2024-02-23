import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip,
  Avatar,
  Input,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { FiEdit } from "react-icons/fi";

import useFetchData from "../../hook/useFetchData";
import UserEditComponent from "./UserEditComponent";

const TABLE_HEAD = ["Name", "Email", "Role", "Projects", ""];

export default function OverAllUserManagement() {
  const { data, isLoading, refetch } = useFetchData();

  if (isLoading) return <p>Carregando dados...</p>;

  return (
    <div className="px-5 md:pr-10 mb-16">
      <Card className="mb-5 w-full h-44">
        <CardBody></CardBody>
        <CardFooter className="pt-0"></CardFooter>
      </Card>

      <Card className="h-full w-full p-2 pb-4 shadow-sm">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none pb-5"
        >
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Members
              </Typography>
              {/* <Typography color="gray" className="mt-1 font-normal">
                See information about all members
              </Typography> */}
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button className="flex items-center gap-3" size="sm">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="relative participants_scrollBarStyles overflow-scroll overflow-x-hidden h-[400px] px-0">
          <div className="overflow-x-auto">
            <table className="relative mt-0 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={index}
                      className="border-b border-blue-gray-100 bg-white p-4"
                    >
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
              <tbody className="">
                {data.flatMap((item) =>
                  item.tasks.flatMap((task) =>
                    task.responsible.map((responsible) => (
                      <tr
                        key={responsible.id}
                        className="hover:bg-blue-gray-50 transition-all"
                      >
                        <td className="py-2 border-b border-blue-gray-50 w-fit pl-4">
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={responsible.photo_url}
                              alt={responsible.name}
                              size="sm"
                            />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {responsible.name}
                            </Typography>
                          </div>
                        </td>

                        <td className="py-2 border-b border-blue-gray-50 md:w-[500px]">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            <span className="">{responsible.email}</span>
                          </Typography>
                        </td>
                        <td className="py-2 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {responsible.role}
                          </Typography>
                        </td>
                        <td className="py-2 border-b border-blue-gray-50 w-fit">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {data
                              .filter((project) =>
                                project.tasks.some((task) =>
                                  task.responsible.some(
                                    (responsible_item) =>
                                      responsible_item.name === responsible.name
                                  )
                                )
                              )
                              .map((project) => (
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal m-1"
                                >
                                  <Chip
                                    variant="ghost"
                                    size="sm"
                                    value={project.project_name}
                                    color="green"
                                    className="w-28 text-center rounded-full capitalize bg-gray-200 text-gray-700"
                                  />
                                </Typography>
                              ))}
                          </Typography>
                        </td>
                        <td className="py-2 border-b border-blue-gray-50 w-fit text-center text-md">
                          <UserEditComponent
                            name={responsible.name}
                            email={responsible.email}
                            role={responsible.role}
                          />
                        </td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
