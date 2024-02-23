import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { IoCloseSharp } from "react-icons/io5";

export function DescriptionModal({ description }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <div
        onClick={handleOpen}
        className="relative w-full bg-red-400 flex items-center justify-center z-50"
      >
        <span className="absolute p-1 px-2 text-gray-100 text-xs cursor-pointer bg-gray-800 hover:bg-gray-700 transition-all rounded-full">
          Abrir a descrição
        </span>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="justify-between">
          <p>Descrição</p>
          <div
            onClick={handleOpen}
            className="bg-gray-200 group transition-all hover:bg-[rgb(191,199,244)] min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
          >
            <IoCloseSharp className="text-gray-600 group-hover:text-white transition-all" />
          </div>
        </DialogHeader>
        <DialogBody className="h-[42rem]">
          <Typography className="font-normal">{description}</Typography>
        </DialogBody>
      </Dialog>
    </>
  );
}
