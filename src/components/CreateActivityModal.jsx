import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { RiAddFill } from "react-icons/ri";
import { Select, Option } from "@material-tailwind/react";
import { TbFlag3Filled } from "react-icons/tb";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import DateComponent from "./DateComponent";

const userList = [
  { id: "1", name: "João" },
  { id: "2", name: "Yowani" },
  { id: "3", name: "Teresinha" },
  { id: "4", name: "Zolana" },
];

const prioridade = [
  { id: "1", value: "Urgente" },
  { id: "2", value: "Alta" },
  { id: "3", value: "Normal" },
  { id: "4", value: "Baixa" },
];

const CreateActivityModal = ({}) => {
  const [showDialog, setShowDialog] = useState(false);

  const [selectedOption, setSelectedOption] = useState("Selec. prioridade");

  const handleMenuItemClick = (value) => {
    setSelectedOption(value);
  };

  const [addList, setAddList] = useState([]);

  const handleItemClick = (value, id) => {
    setAddList([...addList, value]);
    userList.filter((user) => user.id !== id);
  };

  return (
    <>
      <Button
        onClick={() => setShowDialog(true)}
        className="items-center hidden md:flex py-0 text-sm px-2 rounded-full bg-gray-500"
      >
        <RiAddFill size={18} />
        <span className="text-xs capitalize">Create activity</span>
      </Button>

      {showDialog && (
        <>
          <div className="fixed inset-0 flex items-center justify-center transition-all z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>

            <div className="relative flex flex-col justify-between bg-white p-5 rounded-lg z-10 w-[90%] md:w-[42%] h-[80%]">
              <div>
                <div className="flex items-start justify-between w-full">
                  <p className="text-gray-600 font-medium text-xl">
                    Criando atividade
                  </p>
                  <div
                    onClick={() => setShowDialog(false)}
                    className="bg-gray-200 group transition-all hover:bg-[rgb(191,199,244)] min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                  >
                    <IoCloseSharp className="text-gray-600 group-hover:text-white transition-all" />
                  </div>
                </div>
                <div className="px-0 pt-5 md:px-4 border-t-2 border-gray-200 mt-4">
                  <Textarea
                    label="Descição"
                    color="blue-gray"
                    className="w-ful h-52"
                  />
                  <div className="flex flex-col gap-1 mt-5">
                    <span>Responsável</span>

                    <div className="w-full flex">
                      <Select
                        className="w-full"
                        label="Atribuir a"
                        value={addList.map((item) => (
                          <Button className="p-1 px-2 shadow-none border-none bg-gray-300 text-gray-700 tracking-wide capitalize mr-2">
                            {item}{" "}
                            <span className="p-1 rounded-full ml-1 transition-all hover:bg-gray-400 text-[10px]">
                              x
                            </span>
                          </Button>
                        ))}
                      >
                        {userList.map((item, index) => (
                          <Option
                            onClick={() => handleItemClick(item.name, item.id)}
                            key={index}
                          >
                            {item.name}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 mt-5">
                    <span>Referência</span>
                    <Input label="Link da referência" />
                  </div>
                  <div className="flex flex-col gap-1 mt-5 w-fit border-none">
                    <span>Prioridade</span>
                    <Menu>
                      <MenuHandler>
                        <div className="flex items-center gap-2">
                          <TbFlag3Filled
                            size={22}
                            color={
                              selectedOption.toLowerCase() === "urgente"
                                ? "red"
                                : selectedOption.toLowerCase() === "alta"
                                ? "orange"
                                : selectedOption.toLowerCase() === "normal"
                                ? "cyan"
                                : selectedOption.toLowerCase() === "baixa"
                                ? "gray"
                                : ""
                            }
                          />
                          <Button
                            className={`w-32 h-6 capitalize tracking-wide rounded-full p-1 
                            ${
                              selectedOption.toLowerCase() === "urgente"
                                ? "bg-red-400"
                                : selectedOption.toLowerCase() === "alta"
                                ? "bg-orange-400"
                                : selectedOption.toLowerCase() === "normal"
                                ? "bg-cyan-400"
                                : selectedOption.toLowerCase() === "baixa"
                                ? "bg-gray-400"
                                : ""
                            }
                            `}
                          >
                            {selectedOption}
                          </Button>
                        </div>
                      </MenuHandler>
                      <MenuList>
                        {prioridade.map((item, index) => (
                          <MenuItem
                            key={index}
                            className="flex items-center gap-1 bg-white"
                            onClick={() => handleMenuItemClick(item.value)}
                          >
                            <TbFlag3Filled
                              color={
                                item.value.toLowerCase() === "urgente"
                                  ? "red"
                                  : item.value.toLowerCase() === "alta"
                                  ? "orange"
                                  : item.value.toLowerCase() === "normal"
                                  ? "cyan"
                                  : item.value.toLowerCase() === "baixa"
                                  ? "gray"
                                  : ""
                              }
                            />
                            {item.value}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </div>
                  <DateComponent />
                </div>
              </div>
              <div className="flex justify-end w-full">
                <Button className="w-fit h-9 px-2 py-0 bg-[#11BEF4] text-xs capitalize transition-all">
                  Criar atividade
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateActivityModal;
