import React, { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useLang } from "../../hook/LangContext";
import useFetchData from "../../hook/useFetchData";

export default function CommentPopover({ trigger, currentLink, TaskId }) {
  const { handleUpdateTaskReferenceLink } = useFetchData();
  const { translations } = useLang();
  const [isVisible, setIsVisible] = useState(false);
  const [reference_link, setReference_link] = useState("");

  const togglePopover = () => {
    setIsVisible(!isVisible);
  };

  const updateReferenceLink = () => {
    handleUpdateTaskReferenceLink.mutate({
      id: TaskId,
      reference_link: reference_link,
    });
  };

  return (
    <div className="relative inline-block">
      <div className="trigger cursor-pointer" onClick={togglePopover}>
        {trigger}
      </div>
      {isVisible && (
        <div className="absolute flex flex-col gap-2 bg-white right-0 shadow-md rounded p-4 mt-2 z-10">
          <Typography className="text-xs">
            Current url:
            {currentLink.length ? currentLink : translations.no_reference}
          </Typography>
          <div className="flex items-center gap-4">
            <Input
              size="md"
              type="url"
              placeholder="Enter new reference url"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setReference_link(e.target.value)}
            />
            <div
              onClick={updateReferenceLink}
              className="bg-light-blue-200 hover:bg-light-blue-300 transition-all shadow-sm hover:shadow-md active:bg-light-blue-500 text-white gap-1 text-xs px-5 w-fit h-10 cursor-pointer rounded-md flex items-center justify-center"
            >
              Update
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
