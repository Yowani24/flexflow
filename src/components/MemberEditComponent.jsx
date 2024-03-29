import { Button, Input, Typography } from "@material-tailwind/react";
import React from "react";

export default function MemberEditComponent({
  name,
  email,
  role,
  showButtonProps,
}) {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    showButtonProps(inputValue !== email);
  };
  return (
    <div className="w-[300px] flex flex-col items-start">
      <Typography className="mb-2 text-start" variant="small">
        Name
      </Typography>
      <Input
        label="name"
        size="md"
        className=""
        defaultValue={name}
        disabled
        onChange={handleInputChange}
      />
      <Typography className="mb-2 text-start mt-4" variant="small">
        Email
      </Typography>
      <Input
        label="email"
        size="md"
        defaultValue={email}
        onChange={handleInputChange}
      />
      <Typography className="mb-2 text-start mt-4" variant="small">
        Role
      </Typography>
      <Input label="role" size="md" value={role} />
    </div>
  );
}
