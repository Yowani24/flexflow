import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import useFetchData from "../../hook/useFetchData";

export default function ProjectEditComponent({
  name,
  budget,
  client_name,
  status,
  reference_code,
  showButtonProps,
}) {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    showButtonProps(inputValue !== name);
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
        onChange={handleInputChange}
      />
      <Typography className="mb-2 mt-4 text-start" variant="small">
        Client name
      </Typography>
      <Input
        label="Client name"
        size="md"
        className=""
        defaultValue={client_name}
      />

      <Typography className="mb-2 mt-4 text-start" variant="small">
        Budget
      </Typography>
      <Input label="budget" size="md" value={budget} />
      <Typography className="mb-2 mt-4 text-start" variant="small">
        Status
      </Typography>
      <Input
        label="Status"
        size="md"
        className=""
        defaultValue={status}
        disabled
      />
      <Typography className="mb-2 text-start mt-4" variant="small">
        Reference code
      </Typography>
      <Input label="reference_code" size="md" value={reference_code} disabled />
    </div>
  );
}
