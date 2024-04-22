import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
  Input,
  Avatar,
} from "@material-tailwind/react";
import { useState } from "react";
import { BiUserPlus } from "react-icons/bi";
import useFetchData from "../../hook/useFetchData";

export default function AddParticipantComponent({
  responsibles,
  allResponsibles,
  taskId,
  closeModalAfterAddUser,
  closeModal,
}) {
  const { handleUpdateTaskResponsibles } = useFetchData();
  const [filteredMember, setFilteredMember] = useState("");
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
      <MenuList className="participants_scrollBarStyles ml-[2%] max-h-52">
        <Input
          label="Search"
          containerProps={{
            className: "mb-4",
          }}
          onChange={(e) => setFilteredMember(e.target.value)}
        />
        {allResponsibles
          .filter((item) => !responsibles.includes(item.email))
          .filter((filterUser) =>
            filterUser.name
              .toLowerCase()
              .startsWith(filteredMember.toLowerCase())
          )
          .map((responsible) => (
            <MenuItem
              key={responsible.id}
              className="flex bg-white gap-2"
              onClick={() =>
                handleUpdateTaskResponsibles.mutate(
                  {
                    id: taskId,
                    responsible: [...responsibles, responsible.email],
                  },
                  closeModalAfterAddUser ? closeModal() : null
                )
              }
            >
              <Avatar
                variant="circular"
                alt={responsible.name}
                size="xs"
                src={responsible.photo_url}
              />
              <div className="flex flex-col">
                <span className="text-black">{responsible.name}</span>{" "}
                <span className="text-[11px] text-gray-500">
                  {responsible.role}
                </span>
              </div>
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
}
