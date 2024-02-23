import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { FiEdit } from "react-icons/fi";

export default function UserEditComponent({ name, email, role }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <Button
        variant="text"
        className="rounded-full p-2 flex items-center justify-center hover:bg-gray-400 border-none transition-all"
        onClick={handleOpen}
      >
        <FiEdit size={16} color="gray" />
      </Button>
      <Dialog
        size="xs"
        open={open}
        // handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Editing member info
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            ></Typography>
            <Typography className="-mb-2" variant="small">
              Name
            </Typography>
            <Input label="name" size="lg" value={name} />
            <Typography className="-mb-2" variant="small">
              Email
            </Typography>
            <Input label="email" size="lg" value={email} />
            <Typography className="-mb-2" variant="small">
              Role
            </Typography>
            <Input label="role" size="lg" value={role} />
            <div className="flex items-center justify-end">
              <Button
                className="w-20 capitalize bg-light-blue-300 border-none"
                onClick={handleOpen}
              >
                Save
              </Button>
            </div>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
