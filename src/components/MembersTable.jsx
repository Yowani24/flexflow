import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Avatar,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useLang } from "../../hook/LangContext";
import CreateMemberComponent from "./CreateMemberComponent";
import useFetchData from "../../hook/useFetchData";
import MemberDetailsModal from "./MemberDetailsModal";
import no_data_Icon from "../assets/no_data2.png";
import AddRoles from "./AddRoles";

export default function MembersTable() {
  const { data, allMembers } = useFetchData();
  const { translations } = useLang();
  const [targetName, setTargetName] = useState("");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <div className="mt-3">
      <Card className={`h-full w-full p-2 shadow-sm gradientBg`}>
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none gradientBg pb-5"
        >
          <div className="flex items-center justify-between mb-4 md:mb-0 gap-8">
            <Typography variant="h6" color="blue-gray">
              {translations.members}
            </Typography>
            <CreateMemberComponent
              customButtonProps={
                <Button
                  className="flex items-center gap-3 rounded-full"
                  size="sm"
                >
                  <UserPlusIcon className="h-4 w-4" />{" "}
                  <span className="normal-case tracking-wide">
                    {translations.add_member}
                  </span>
                </Button>
              }
              currentResponsibles={data?.map((item) => item.responsibles)}
            />
          </div>

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-fit rounded-full flex items-center">
              <MagnifyingGlassIcon className="h-4 w-4 absolute ml-2" />
              <input
                placeholder={translations.find_a_member}
                onChange={(e) => setTargetName(e.target.value)}
                className="rounded-full w-full md:w-72 border-none outline-none pl-7 text-sm h-8 shadow-sm"
              />
            </div>
          </div>
        </CardHeader>
        {allMembers?.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-fit py-4">
            <img
              className="w-16 object-cover object-center"
              src={no_data_Icon}
              alt="nature image"
            />
            <Typography variant="small" color="gray" className="">
              {translations.no_members}
            </Typography>
          </div>
        ) : (
          <CardBody className="relative w-full flex gap-5 md:gap-5 flex-wrap participants_scrollBarStyles overflow-y-scroll overflow-x-hidden h-[400px] px-3">
            {allMembers
              .filter((targetItem) =>
                targetItem.name
                  .toLowerCase()
                  .startsWith(targetName.toLowerCase())
              )
              .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
              .map((responsible) => {
                return (
                  <div className="">
                    <MemberDetailsModal
                      enterpriseId={data?.map((item) => item.id)}
                      memberData={responsible}
                      enterpriseResponsibles={data?.flatMap(
                        (item) => item.responsibles
                      )}
                      buttonProps={
                        <Card
                          className={`w-[140px] min-h-40 max-h-40 bg-white p-2 border-t-2 border-gray-50 ${
                            user.email === responsible.email ||
                            data?.some(
                              (enterprise) =>
                                enterprise?.email === user?.email &&
                                enterprise.responsibles.includes(
                                  responsible?.email
                                )
                            )
                              ? "cursor-pointer"
                              : "cursor-not-allowed"
                          } shadow-lg hover:shadow-2xl`}
                          key={responsible.id}
                        >
                          <div className="flex flex-col items-center gap-8">
                            <Avatar
                              src={responsible.photo_url}
                              alt="avatar"
                              size="lg"
                            />
                            <div className="flex flex-col items-center justify-center gap-1">
                              <Typography variant="h6" className="text-sm">
                                {responsible.name.split(" ")[0] +
                                  " " +
                                  responsible.name.split(" ")[
                                    responsible.name.split(" ").length - 1
                                  ]}
                              </Typography>
                              <Typography
                                variant="small"
                                color="gray"
                                className="font-normal text-xs"
                              >
                                {responsible.role}
                              </Typography>
                            </div>
                          </div>
                        </Card>
                      }
                    />
                  </div>
                );
              })}
          </CardBody>
        )}
      </Card>
      {data?.some((enterpriseData) => enterpriseData.email === user?.email) && (
        <AddRoles />
      )}
    </div>
  );
}
