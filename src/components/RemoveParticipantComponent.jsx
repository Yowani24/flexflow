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

export default function RemoveParticipantComponent({
  taskId,
  responsibles,
  task_status,
  closeModal,
  subtasks,
}) {
  const {
    handleUpdateTaskResponsibles,
    handleUpdateTaskStatus,
    allMembers,
    refetch,
  } = useFetchData();

  const handleSuccess = () => {
    if (responsibles.length === 0) {
      closeModal();
    }
    refetch();
  };

  const handleRemoveResponsibles = (user) => {
    handleUpdateTaskResponsibles.mutate({
      id: taskId,
      responsible: [...responsibles.filter((email) => email !== user.email)],
    });

    // handleUpdateTaskStatus.mutate(
    //   {
    //     id: taskId,
    //     status: responsibles.length === 0,
    //     progressStatus:
    //       task_status && responsibles.length < 0 ? "ongoing" : "paused",
    //   },
    //   responsibles.length === 0 ? closeModal() : ""
    // );

    handleUpdateTaskStatus.mutate(
      {
        id: taskId,
        status: responsibles.length === 0 && false,
        progressStatus: !task_status && responsibles.length === 0 && "paused",
      },
      {
        onSuccess: handleSuccess,
      }
    );
  };
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

        {responsibles.map((responsibleEmail) => (
          <div key={responsibleEmail}>
            {" "}
            {allMembers
              .filter((member) => member.email === responsibleEmail)
              .map((user) => {
                if (!user.id) {
                  return null;
                }

                const isDisabled = subtasks?.some((subtask) =>
                  subtask?.user_created?.includes(user.email)
                );

                return (
                  <MenuItem
                    key={user.id}
                    disabled={isDisabled}
                    className="flex bg-white gap-2 hover:bg-red-50 border-none"
                    onClick={() => handleRemoveResponsibles(user)}
                  >
                    <Avatar
                      variant="circular"
                      alt={user.name ?? "User"}
                      size="xs"
                      src={user.photo_url}
                    />
                    <div className="flex flex-col">
                      <span className="text-black">{user.name ?? "N/A"}</span>{" "}
                      <span className="text-[11px] text-gray-500">
                        {user.role ?? "No role"}{" "}
                      </span>
                    </div>
                    <IoIosRemoveCircleOutline color="red" size={20} />{" "}
                  </MenuItem>
                );
              })}
          </div>
        ))}
      </MenuList>
    </Menu>
  );
}
