import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Input,
  Avatar,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import { FiEdit } from "react-icons/fi";
import MemberEditComponent from "./MemberEditComponent";
import AnimatedDialog from "./AnimatedDialog";
import { useLang } from "../../hook/LangContext";
import { FaCircleUser } from "react-icons/fa6";
import CreateMemberComponent from "./CreateMemberComponent";
import useFetchData from "../../hook/useFetchData";
import DetailsModal from "./DetailsModal";

export default function MembersTable() {
  const { data, allMembers } = useFetchData();
  const { translations } = useLang();
  const [targetName, setTargetName] = useState("");
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <Card className={`h-full w-full p-2 shadow-sm bg-white`}>
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none pb-5 bg-transparent"
      >
        <Typography variant="h6" color="blue-gray" className="mb-5">
          {translations.members}
        </Typography>
        <div className="flex flex-col-reverse md:flex-row items-center flex-wrap justify-between mb-4 md:mb-0 gap-8">
          <div className="w-full md:w-72">
            <Input
              label={translations.find_a_member}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={(e) => setTargetName(e.target.value)}
              className="rounded-full"
            />
          </div>

          <CreateMemberComponent
            customButtonProps={
              <Button
                className="flex items-center gap-3 rounded-full"
                size="sm"
              >
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" />{" "}
                <span className="normal-case tracking-wide">
                  {translations.add_member}
                </span>
              </Button>
            }
            currentResponsibles={data.map((item) => item.responsibles)}
          />
        </div>
      </CardHeader>
      <CardBody className="relative w-full flex gap-5 md:gap-5 flex-wrap participants_scrollBarStyles overflow-y-scroll overflow-x-hidden h-[400px] px-3">
        {allMembers
          .filter((targetItem) =>
            targetItem.name.toLowerCase().startsWith(targetName.toLowerCase())
          )
          .map((responsible) => {
            return (
              <DetailsModal
                memberData={responsible}
                buttonProps={
                  <Card
                    className="w-[140px] min-h-40 max-h-40 bg-white p-4 border-t-2 border-gray-50 cursor-pointer shadow-lg hover:shadow-2xl"
                    key={responsible.id}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <Avatar
                        src={responsible.photo_url}
                        alt="avatar"
                        size="lg"
                      />
                      <div className="flex flex-col items-center justify-center gap-1">
                        <Typography variant="h6" className="text-sm">
                          {responsible.name.length > 15
                            ? responsible.name.substring(0, 14) + "..."
                            : responsible.name}
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
            );
          })}
      </CardBody>
    </Card>
  );
}
