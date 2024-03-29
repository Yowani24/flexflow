import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import useFetchData from "../../hook/useFetchData";
import { CgUserRemove } from "react-icons/cg";
import { IoIosRemoveCircleOutline } from "react-icons/io";

export default function RemoveParticipantComponent({ responsibles, taskId }) {
  const { handleUpdateTaskResponsibles, allMembers } = useFetchData();
  return (
    <Menu
      dismiss={{
        itemPress: false,
      }}
    >
      <MenuHandler>
        <Button className="p-[6px] text-black bg-red-200 hover:bg-red-300 transition-all rounded-full">
          <CgUserRemove size={16} color="#262626" />
        </Button>
      </MenuHandler>
      <MenuList className="participants_scrollBarStyles ml-[2%] max-h-52">
        {/* <Input
          label="Search"
          containerProps={{
            className: "mb-4",
          }}
          onChange={(e) => setFilteredMember(e.target.value)}
        /> */}

        {responsibles.map((responsible) => (
          <div key={responsible}>
            {allMembers
              .filter((member) => member.email === responsible)
              .map((user) => (
                <MenuItem
                  key={user.id}
                  className="flex bg-white gap-2 hover:bg-red-50 border-none"
                  onClick={() =>
                    handleUpdateTaskResponsibles.mutate({
                      id: taskId,
                      responsible: [
                        ...responsibles.filter((email) => email !== user.email),
                      ],
                      status: responsibles.length == 0 ? false : true,
                    })
                  }
                >
                  <Avatar
                    variant="circular"
                    alt={user.name}
                    size="xs"
                    src={user.photo_url}
                  />
                  <div className="flex flex-col">
                    <span className="text-black">{user.name}</span>{" "}
                    <span className="text-[11px] text-gray-500">
                      {user.role}
                    </span>
                  </div>
                  <IoIosRemoveCircleOutline color="red" size={20} />
                </MenuItem>
              ))}
          </div>
        ))}
      </MenuList>
    </Menu>
  );
}
