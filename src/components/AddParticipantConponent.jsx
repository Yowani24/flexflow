import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
  Input,
  Avatar,
} from "@material-tailwind/react";
import { BiUserPlus } from "react-icons/bi";

const participants = [
  { id: "1", name: "Yowani Costa", role: "Front-end developer" },
  { id: "2", name: "Maria Wolo", role: "Designer" },
  { id: "3", name: "Teresa Carlos", role: "DevOps" },
  { id: "4", name: "Adelina Feliciano", role: "Back-end developer" },
  { id: "5", name: "Rita Zolana", role: "FullStack developer" },
  { id: "6", name: "João da Costa", role: "Front-end developer" },
];

export default function AddParticipantConponent() {
  return (
    <Menu
      dismiss={{
        itemPress: false,
      }}
    >
      <MenuHandler>
        <Button className="p-[6px] text-black bg-gray-300 hover:bg-gray-400 transition-all rounded-full">
          <BiUserPlus size={16} color="#262626" />
        </Button>
      </MenuHandler>
      <MenuList className="ml-[2%]">
        <Input
          label="Search"
          containerProps={{
            className: "mb-4",
          }}
        />
        {participants.slice(0, 3).map((item, index) => (
          <MenuItem key={index} className="flex bg-white gap-2">
            <Avatar
              variant="circular"
              alt="tania andrew"
              size="xs"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <div className="flex flex-col">
              <span className="text-black">{item.name}</span>{" "}
              <span className="text-[11px] text-gray-500">{item.role}</span>
            </div>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
