import { Avatar, Button, Input, Typography } from "@material-tailwind/react";
import React from "react";
import { useLang } from "../../hook/LangContext";
import { FaCircleUser } from "react-icons/fa6";
import useFetchData from "../../hook/useFetchData";

export default function ProfileEditComponent({ userData }) {
  const { allMembers } = useFetchData();
  const { translations } = useLang();
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    showButtonProps(inputValue !== userData?.name);
  };

  const userRole = allMembers
    ?.filter((member) => member?.email === userData?.email)
    .map((filteredMember) => filteredMember?.role);

  return (
    <div className="w-[300px] flex flex-col items-start">
      <div className="flex items-center justify-center gap-2 mb-5 w-full">
        {userData?.photoURL ? (
          <Avatar
            variant="circular"
            alt={userData?.displayName}
            size="xxl"
            className="cursor-pointer"
            src={userData?.photoURL}
          />
        ) : (
          <FaCircleUser size={100} color="lightgray" />
        )}
      </div>
      <Typography className="mb-2 text-start" variant="small">
        {translations.name}
      </Typography>
      <Input
        label={translations.name}
        size="md"
        className=""
        value={userData?.displayName}
        onChange={handleInputChange}
      />
      <Typography className="mb-2 text-start mt-4" variant="small">
        {translations.email}
      </Typography>
      <Input
        label={translations.email}
        type="email"
        size="md"
        value={userData?.email}
        disabled
      />
      <Typography className="mb-2 text-start mt-4" variant="small">
        {translations.role}
      </Typography>
      <Input label={translations.role} size="md" value={userRole} disabled />

      <Typography className="mb-2 text-start mt-4" variant="small">
        {translations.change_password}
      </Typography>
      <div className="bg-gray-100 rounded-md flex flex-col gap-2 w-full p-5 z-50">
        <div>
          <Typography className="mb-2 text-start mt-4" variant="small">
            {translations.current_password}
          </Typography>
          <input
            placeholder={translations.current_password}
            type="password"
            className="w-full h-8 border-light-blue-200 outline-light-blue-200 rounded-md text-xs pl-2"
          />
        </div>
        <div>
          <Typography className="mb-2 text-start mt-4" variant="small">
            {translations.new_password}
          </Typography>
          <input
            placeholder={translations.new_password}
            type="password"
            className="w-full h-8 border-light-blue-200 outline-light-blue-200 rounded-md text-xs pl-2"
          />
        </div>
        <Button
          className="py-2 border-none outline-none normal-case tracking-wide"
          color="green"
        >
          {translations.comfirm}
        </Button>
      </div>
    </div>
  );
}
