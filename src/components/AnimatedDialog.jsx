import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import useFetchData from "../../hook/useFetchData";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";

const AnimatedDialog = ({
  children,
  customButtonProps,
  showButtonProps,
  title,
  paddingProps,
  handleDelete,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const openDialog = () => {
    setIsVisible(true);
  };

  const onClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    setIsVisible(isVisible);
  }, [isVisible]);

  const { opacity, transform } = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0%)" : "translateY(0%)",
    onRest: () => {
      if (!isVisible) {
        setIsVisible(false);
      }
    },
  });

  const handleDeleteItem = () => {
    handleDelete();
    onClose();
  };

  return (
    <>
      <div className="" onClick={openDialog}>
        {customButtonProps}
      </div>
      {isVisible && (
        <animated.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            opacity,
            transform,
          }}
          className={"z-50"}
        >
          <div
            className={`bg-white p-4 rounded-lg flex flex-col w-fit h-full z-50 ${
              paddingProps ? "pt-20" : "pt-5"
            } absolute right-0`}
          >
            <div className="flex items-center justify-between mb-5">
              <h6>{title}</h6>
              <div className="flex items-center gap-2 self-end">
                {showButtonProps && (
                  <div
                    onClick={onClose}
                    className="bg-green-400 hover:bg-green-500 group transition-all min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                  >
                    <IoMdCheckmark
                      size={18}
                      className="text-white transition-all"
                    />
                  </div>
                )}
                {/* <div
                  onClick={handleDeleteItem}
                  className="bg-red-200 hover:bg-red-500 group transition-all min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                >
                  <MdDeleteForever
                    size={18}
                    className="text-white transition-all"
                  />
                </div> */}
                <Menu>
                  <MenuHandler>
                    <div className="bg-red-200 hover:bg-red-500 group transition-all min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer">
                      <MdDeleteForever
                        size={18}
                        className="text-white transition-all"
                      />
                    </div>
                  </MenuHandler>
                  <MenuList className="flex flex-col items-center">
                    <Typography className="text-sm">
                      Deseja continuar
                    </Typography>
                    <div className="flex items-center gap-5 mt-5">
                      <MenuItem className="text-xs">Cancelar</MenuItem>
                      <MenuItem
                        className="text-xs"
                        color="red"
                        onClick={handleDeleteItem}
                      >
                        Continuar
                      </MenuItem>
                    </div>
                  </MenuList>
                </Menu>
                <div
                  onClick={onClose}
                  className="bg-gray-200 group transition-all hover:bg-[rgb(122,114,219)] min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                >
                  <IoCloseSharp className="text-gray-600 group-hover:text-white transition-all" />
                </div>
              </div>
            </div>
            {children}
          </div>
        </animated.div>
      )}
    </>
  );
};

export default AnimatedDialog;
