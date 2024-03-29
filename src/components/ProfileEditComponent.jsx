import { Avatar, Button, Input, Typography } from "@material-tailwind/react";
import React from "react";
import { useLang } from "../../hook/LangContext";
import { FaCircleUser } from "react-icons/fa6";

export default function ProfileEditComponent({
  name,
  email,
  role,
  showButtonProps,
  photoURL,
}) {
  const { translations } = useLang();
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    showButtonProps(inputValue !== name);
  };
  return (
    <div className="w-[300px] flex flex-col items-start">
      <div className="flex items-center justify-center gap-2 mb-5 w-full">
        {photoURL ? (
          <Avatar
            variant="circular"
            alt="tania andrew"
            size="xxl"
            className="cursor-pointer"
            src={photoURL}
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
        defaultValue={name}
        onChange={handleInputChange}
      />
      <Typography className="mb-2 text-start mt-4" variant="small">
        {translations.email}
      </Typography>
      <Input
        label={translations.email}
        type="email"
        size="md"
        value={email}
        disabled
      />
      <Typography className="mb-2 text-start mt-4" variant="small">
        {translations.role}
      </Typography>
      <Input label={translations.role} size="md" value={role} disabled />

      <Typography className="mb-2 text-start mt-4" variant="small">
        {translations.change_password}
      </Typography>
      <div className="bg-gray-100 rounded-md flex flex-col gap-2 w-fit p-5 z-50">
        <div>
          <Typography className="mb-2 text-start mt-4" variant="small">
            {translations.current_password}
          </Typography>
          <Input
            label={translations.current_password}
            type="password"
            size="md"
          />
        </div>
        <div>
          <Typography className="mb-2 text-start mt-4" variant="small">
            {translations.new_password}
          </Typography>
          <Input label={translations.new_password} type="password" size="md" />
        </div>
        <Button
          className="py-2 border-none normal-case tracking-wide"
          color="green"
        >
          {translations.comfirm}
        </Button>
      </div>
    </div>
  );
}
