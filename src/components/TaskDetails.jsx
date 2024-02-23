import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { LiaHourglassStartSolid } from "react-icons/lia";
import { MdMotionPhotosPause, MdDeleteForever } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { HiStatusOnline } from "react-icons/hi";
import { FiEdit3 } from "react-icons/fi";
import {
  TbFlag3Filled,
  TbCalendarTime,
  TbProgressCheck,
  TbStatusChange,
} from "react-icons/tb";
import {
  Button,
  Avatar,
  Tooltip,
  Checkbox,
  Card,
  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { DescriptionModal } from "./DescriptionModal";
import AddParticipantConponent from "./AddParticipantConponent";
import { VscReferences } from "react-icons/vsc";
import PriorityComponent from "./PriorityComponent";

const statusUpdateOptions = [
  { id: "1", option: "Start" },
  { id: "2", option: "Pause" },
];

const TaskDetails = ({
  task_name,
  priority,
  responsible,
  description,
  subactivities,
  reference_link,
  buttonProps,
  disabledProps,
  disabledSpecificProps,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (itemId) => {
    if (selectedOption === itemId) {
      setSelectedOption(null);
    } else {
      setSelectedOption(itemId);
    }
  };

  const completedTasks = subactivities.filter((item) => item.done);
  const completedPercentage =
    subactivities.length === 0
      ? 0
      : Math.ceil((completedTasks.length / subactivities.length) * 100);

  return (
    <>
      <div onClick={() => setShowDialog(true)}>{buttonProps}</div>

      {showDialog && (
        <>
          <div className="fixed inset-0 flex items-center justify-center transition-all z-50">
            <div className="fixed inset-0 bg-black opacity-50 transition-all"></div>

            <div className="relative flex flex-col justify-start bg-white p-5 rounded-lg z-10 w-[90%] md:w-[60%] h-[80%] transition-all">
              <div className="flex items-start justify-between w-full transition-all">
                <p className="text-gray-600 font-medium text-xl">{task_name}</p>
                <div
                  onClick={() => setShowDialog(false)}
                  className="bg-gray-200 group transition-all hover:bg-[rgb(191,199,244)] min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                >
                  <IoCloseSharp className="text-gray-600 group-hover:text-white transition-all" />
                </div>
              </div>
              <div className="px-0 md:px-4 transition-all">
                <div className="flex items-center justify-between flex-wrap gap-4 mt-5">
                  <div>
                    {disabledProps ? (
                      <PriorityComponent
                        priority={priority}
                        disabledSpecificProps={disabledSpecificProps}
                      />
                    ) : (
                      <div className="flex items-center gap-1">
                        <TbFlag3Filled size={20} className="text-gray-600" />
                        <span
                          className={`text-white text-sm ${
                            priority === "high"
                              ? " bg-red-400"
                              : priority === "medium"
                              ? "bg-cyan-400"
                              : priority === "low"
                              ? "bg-gray-400"
                              : ""
                          } min-w-fit p1 px-2 pb-[2px] rounded-full`}
                        >
                          {priority}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <TbProgressCheck className="text-gray-600" />
                    <p className="text-gray-600 text-sm">
                      Progress{" "}
                      <span className="text-green-500 font-medium">
                        {completedPercentage}%
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <TbCalendarTime className="text-gray-600" />
                    <Typography className="text-gray-600 text-sm">
                      Data final:{" "}
                      <span className="font-semibold">Fev 29th</span>
                    </Typography>
                    {disabledProps ? (
                      <>
                        {disabledSpecificProps ? (
                          ""
                        ) : (
                          <FiEdit3 className="cursor-pointer" />
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={reference_link} target="_blank">
                      <Button className="text-white bg-gray-400 min-w-fit p-0 flex items-center gap-2 px-2 capitalize pb-[2px] cursor-pointer text-xs rounded-full">
                        <VscReferences color="white" size={16} />
                        Reference
                      </Button>
                    </a>
                    {disabledProps ? (
                      <>
                        {disabledSpecificProps ? (
                          ""
                        ) : (
                          <FiEdit3 className="cursor-pointer" />
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="scrollBarStyles relative text-gray-600 border-b-2 border-gray-200 mt-5"></div>
                <DescriptionModal description={description} />
                <div className="mt-5 flex items-center gap-2">
                  {disabledProps ? (
                    <>
                      {disabledSpecificProps ? (
                        ""
                      ) : (
                        <Menu
                          dismiss={{
                            itemPress: false,
                          }}
                        >
                          <MenuHandler>
                            <Button className="flex items-center gap-2 bg-gray- hover:bg-gray-200 transition-all text-xs text-gray-700 border-gray-300 capitalize p-1">
                              Update Status
                              <TbStatusChange size={16} />
                            </Button>
                          </MenuHandler>
                          <MenuList className="ml-[4%]">
                            {statusUpdateOptions.map((item, index) => (
                              <MenuItem key={index} className="p-0 bg-white">
                                <label
                                  htmlFor={item.id}
                                  className="flex cursor-pointer items-center gap-2 p-2"
                                >
                                  <Checkbox
                                    ripple={false}
                                    id={item.id}
                                    containerProps={{ className: "p-0" }}
                                    checked={selectedOption === item.id} // Set checked based on selectedOption state
                                    onChange={() => handleOptionSelect(item.id)} // Handle checkbox change
                                    className="hover:before:content-none"
                                  />
                                  {item.option}
                                </label>
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Menu>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  <div className="flex items-center w-fit px-2 rounded-md gap-2 bg-gray-100 text-xs text-gray-700 border-gray-300 capitalize p-1">
                    Status
                    <HiStatusOnline size={16} />
                  </div>
                </div>
                <div
                  className={`mt-5 mb-8 ${
                    disabledProps ? "hidden" : "flex flex-col"
                  }`}
                >
                  <span className="text-gray-600">Adicionar subatividade</span>
                  <div className="w-full flex items-center gap-4 mt-2 flex-col md:flex-row flex-wrap">
                    <input
                      type="text"
                      className="w-full md:w-[250px] bg-white h-9 border-2 rounded-md border-[#11BEF4]"
                    />
                    <Button className="w-full md:w-[100px] h-9 px-2 py-0 bg-[#11BEF4] text-xs capitalize transition-all">
                      Adicionar
                    </Button>
                  </div>
                </div>
              </div>
              <Card className="scrollBarStyles w-full mb-14 flex flex-row gap-2 p-2 flex-wrap shadow-none overflow-auto transition-all">
                {subactivities.length === 0 ? (
                  <div
                    className={`text-gray-700 flex flex-col gap-4 ${
                      disabledProps ? "mt-10 text-left" : "mt-0"
                    }`}
                  >
                    <span>Sem subactividades</span>
                    <span className="text-xs bg-[#f0f0f0] rounded-md p-2">
                      Para otimizar a gestão de suas tarefas, divida-as em
                      subtarefas ou subatividades menores e acompanhe o
                      progresso de cada uma ao longo de seu desenvolvimento.
                    </span>
                  </div>
                ) : (
                  <>
                    {subactivities?.map((item, index) => (
                      <div
                        key={index}
                        className={`flex flex-col justify-between bg-[#f0f0f0] ${
                          disabledProps ? "mt-10" : "mt-0"
                        } rounded-lg w-full p-2 md:w-[240px]`}
                      >
                        <div className="relative px-4 py-2 bg-[#E3E3E3] rounded-md text-sm text-left">
                          <div
                            className={`absolute right-[-6px] top-[-7px] shadow-md cursor-pointer text-[#d58395] hover:text-red-600 transition-all w-6 h-6 ${
                              disabledProps ? "hidden" : "flex"
                            } items-center justify-center bg-[#ffffff] rounded-full`}
                          >
                            <MdDeleteForever size={16} />
                          </div>
                          {item.text}
                        </div>
                        <div className="w-full pr-4 pb-2 flex items-center justify-between">
                          <Checkbox
                            icon={<LiaHourglassStartSolid />}
                            label="start"
                            checked={item.started}
                            disabled={disabledProps}
                            color={item.started ? "indigo" : "gray"}
                            style={{ width: "18px", height: "18px" }}
                            labelProps={{
                              style: {
                                fontSize: "12px",
                              },
                            }}
                          />
                          <Checkbox
                            className=""
                            icon={<MdMotionPhotosPause />}
                            label="pause"
                            checked={item.paused}
                            disabled={disabledProps}
                            color={item.paused ? "red" : "gray"}
                            style={{ width: "18px", height: "18px" }}
                            labelProps={{
                              style: {
                                fontSize: "12px",
                              },
                            }}
                          />
                          <Checkbox
                            className=""
                            icon={<IoMdDoneAll />}
                            label="done"
                            checked={item.done}
                            disabled={disabledProps}
                            color={item.done ? "green" : "gray"}
                            style={{ width: "18px", height: "18px" }}
                            labelProps={{
                              style: {
                                fontSize: "12px",
                              },
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </Card>
              <div className="absolute bottom-0 right-0 left-0 px-5 py-4 flex items-center justify-between w-full transition-all">
                <div className="flex items-center gap-4">
                  <div className="flex items-center -space-x-4">
                    {responsible.map((item, index) => (
                      <Tooltip
                        key={index}
                        content={item.name}
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                      >
                        <Avatar
                          variant="circular"
                          alt="user"
                          size="sm"
                          className="border-2 border-white hover:z-10 focus:z-10"
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        />
                      </Tooltip>
                    ))}
                  </div>
                  {disabledProps ? (
                    <>
                      {disabledSpecificProps ? "" : <AddParticipantConponent />}
                    </>
                  ) : (
                    ""
                  )}
                </div>
                {disabledProps ? (
                  <Button
                    variant="text"
                    className="capitalize p-1 px-2 text-red-400 bg-gray-200 rounded-sm"
                  >
                    Excluir atividade
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TaskDetails;
