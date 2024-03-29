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
  { id: "1", label: "Alta", value: "high" },
  { id: "2", label: "Mediana", value: "medium" },
  { id: "3", label: "Baixa", value: "low" },
];

export default function PriorityComponent({
  priority,
  disabledSpecificProps,
  handlePriorityUpdate,
}) {
  const handleMenuItemClick = (value) => {
    handlePriorityUpdate(value);
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
                  : priority.toLowerCase() === "medium"
                  ? "orange"
                  : priority.toLowerCase() === "low"
                  ? "cyan"
                  : ""
              }
            />
            <Button
              className={`w-32 h-6 capitalize tracking-wide rounded-full p-1 flex items-center justify-between px-4 
          ${
            priority.toLowerCase() === "high"
              ? "bg-red-400"
              : priority.toLowerCase() === "medium"
              ? "bg-orange-400"
              : priority.toLowerCase() === "low"
              ? "bg-cyan-400"
              : ""
          }
          `}
            >
              {priority}
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
                  item.label.toLowerCase() === "alta"
                    ? "red"
                    : item.label.toLowerCase() === "mediana"
                    ? "orange"
                    : item.label.toLowerCase() === "baixa"
                    ? "cyan"
                    : ""
                }
              />
              {item.label}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
}
