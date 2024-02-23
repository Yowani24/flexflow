import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { TbFlag3Filled } from "react-icons/tb";
import { FiEdit3 } from "react-icons/fi";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

const prioridade = [
  { id: "1", value: "Urgente" },
  { id: "2", value: "Alta" },
  { id: "3", value: "Normal" },
  { id: "4", value: "Baixa" },
];

export default function PriorityComponent({ priority, disabledSpecificProps }) {
  const [selectedOption, setSelectedOption] = useState("Selec. prioridade");

  const handleMenuItemClick = (value) => {
    setSelectedOption(value);
  };

  return (
    <div>
      <Menu>
        <MenuHandler>
          <div className="flex items-center gap-2">
            <TbFlag3Filled
              size={22}
              color={
                priority.toLowerCase() === "high"
                  ? "red"
                  : priority.toLowerCase() === "alta"
                  ? "orange"
                  : priority.toLowerCase() === "medium"
                  ? "cyan"
                  : priority.toLowerCase() === "low"
                  ? "gray"
                  : ""
              }
            />
            <Button
              className={`w-32 h-6 capitalize tracking-wide rounded-full p-1 flex items-center justify-between px-4 
          ${
            priority.toLowerCase() === "high"
              ? "bg-red-400"
              : priority.toLowerCase() === "alta"
              ? "bg-orange-400"
              : priority.toLowerCase() === "medium"
              ? "bg-cyan-400"
              : priority.toLowerCase() === "low"
              ? "bg-gray-400"
              : ""
          }
          `}
            >
              {priority}{" "}
              {disabledSpecificProps ? (
                ""
              ) : (
                <FiEdit3 className="cursor-pointer" />
              )}
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
  );
}
