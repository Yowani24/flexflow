import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { RiAddFill } from "react-icons/ri";
import { Select, Option } from "@material-tailwind/react";
import { TbFlag3Filled } from "react-icons/tb";
import { useSpring, animated } from "@react-spring/web";
import { GiSoundOn } from "react-icons/gi";
import { RiBardLine } from "react-icons/ri";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import DateComponent from "./DateComponent";
import { IoMdCheckmark } from "react-icons/io";
import useFetchData from "../../hook/useFetchData";
import { useLang } from "../../hook/LangContext";

const prioridade = [
  { id: "1", label: "Alta", value: "high" },
  { id: "2", label: "Mediana", value: "medium" },
  { id: "3", label: "baixa", value: "low" },
];

const CreateActivityModal = ({ projectId }) => {
  const { allMembers, isLoading, handleCreateTask } = useFetchData();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const { translations } = useLang();
  const [showDialog, setShowDialog] = useState(false);
  const [deadlineTime, setDeadlineTime] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("");

  // ==========================================
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [referenceLink, setReferenceLink] = useState("");
  const [priority, setPriority] = useState("");
  const [responsibles, setResponsibles] = useState([]);
  // ==========================================
  const handleMenuItemClick = (value) => {
    setSelectedOption(value);
    setPriority(value);
  };
  const [addList, setAddList] = useState([]);

  const handleItemClick = (value, id, email) => {
    // setMembers(...members, email);
    setAddList([...addList, value]);
    setResponsibles([...responsibles, email]);
  };

  const removeMember = (itemId) => {
    const updatedMemberList = responsibles.filter(
      (item, index) => index !== itemId
    );
    setResponsibles(updatedMemberList);
  };

  const { opacity, transform } = useSpring({
    opacity: showDialog ? 1 : 0,
    transform: showDialog ? "translateY(0%)" : "translateY(0%)",
    onRest: () => {
      if (!showDialog) {
        setShowDialog(false);
      }
    },
  });

  const handleresetForm = () => {
    setTitle("");
    setDescription("");
    setReferenceLink("");
    setPriority("");
    setSelectedOption("");
    setResponsibles([]);
    setAddList([]);
    setShowDialog(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      handleCreateTask.mutate({
        title,
        description,
        reference_link: referenceLink,
        priority: priority || "low",
        responsibles,
        deadline: deadlineTime.toISOString(),
        user_created: user.email,
        projectId: projectId,
      });
      handleresetForm();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleReferenceLinkChange = (event) => {
    setReferenceLink(event.target.value);
  };

  if (isLoading) return <p>Carregando dados...</p>;

  return (
    <>
      <Button
        onClick={() => setShowDialog(true)}
        className="items-center hidden md:flex py-0 text-sm px-2 rounded-full bg-gray-500"
      >
        <RiAddFill size={18} />
        <span className="text-xs capitalize">
          {translations.create_activity}
        </span>
      </Button>

      {showDialog && (
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
        >
          <div className="fixed inset-0 flex items-center justify-center transition-all z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <form
              onSubmit={handleSubmit}
              className="relative flex flex-col justify-between bg-white p-5 rounded-lg z-10 w-[90%] md:w-[45%] h-[80%]"
            >
              <div>
                <div className="flex items-start justify-between w-full">
                  <p className="text-gray-600 font-medium text-xl">
                    {translations.creating_activity}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-green-400 hover:bg-green-500 group transition-all border-none min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                    >
                      <IoMdCheckmark
                        size={18}
                        className="text-white transition-all"
                      />
                    </Button>
                    <div
                      onClick={() => setShowDialog(false)}
                      className="bg-gray-200 group transition-all hover:bg-[rgb(122,114,219)] min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                    >
                      <IoCloseSharp className="text-gray-600 group-hover:text-white transition-all" />
                    </div>
                  </div>
                </div>
                <div className="px-0 md:px-4 border-t-2 border-gray-200 mt-4">
                  <div className="flex flex-col gap-1 mt-5">
                    <span>{translations.name}</span>
                    <Input
                      label={translations.task_name}
                      value={title}
                      onChange={handleTitleChange}
                      required
                    />
                  </div>
                  <div className="flex justify-end mb-4 mt-5 w-full">
                    <Button className="p-1 rounded-full border-none bg-deep-purple-300 normal-case tracking-wide flex items-center gap-2">
                      <RiBardLine size={16} />
                      {translations.transcribe_audio}
                      <GiSoundOn size={18} />
                    </Button>
                  </div>
                  <Textarea
                    variant="static"
                    placeholder={translations.start_describing_task}
                    label={translations.description}
                    color="blue-gray"
                    className="w-ful h-[14rem]"
                    value={description}
                    onChange={handleDescriptionChange}
                  />
                  <div className="flex flex-col gap-1 mt-5">
                    <span>{translations.responsible}</span>

                    <div className="w-full flex">
                      <Select
                        className="w-full"
                        label={translations.assign_to}
                        value={addList.map((item, index) => (
                          <Button
                            key={index}
                            onClick={() => removeMember(index)}
                            className="p-1 px-2 shadow-none rounded-md border-none bg-gray-300 text-gray-700 tracking-wide capitalize mr-2"
                          >
                            {item}{" "}
                          </Button>
                        ))}
                      >
                        {allMembers
                          .filter(
                            (member) => !responsibles.includes(member.email)
                          )
                          .map((item) => (
                            <Option
                              onClick={() =>
                                handleItemClick(item.name, item.id, item.email)
                              }
                              key={item.id}
                            >
                              {item.name}
                            </Option>
                          ))}
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 mt-5">
                    <span>{translations.reference}</span>
                    <Input
                      label={translations.reference_link}
                      value={referenceLink}
                      onChange={handleReferenceLinkChange}
                    />
                  </div>
                  <div className="flex items-center gap-10 mt-5">
                    <div className="flex flex-col gap-1 w-fit border-none">
                      <span>{translations.priority}</span>
                      <Menu>
                        <MenuHandler>
                          <div className="flex items-center gap-2">
                            <TbFlag3Filled
                              size={22}
                              color={
                                selectedOption.toLowerCase() === "urgente"
                                  ? "red"
                                  : selectedOption.toLowerCase() === "alta"
                                  ? "red"
                                  : selectedOption.toLowerCase() === "normal"
                                  ? "orange"
                                  : selectedOption.toLowerCase() === "baixa"
                                  ? "cyan"
                                  : ""
                              }
                            />
                            <Button
                              className={`w-32 h-6 capitalize tracking-wide rounded-full p-1 
                            ${
                              selectedOption.toLowerCase() === "high"
                                ? "bg-red-400"
                                : selectedOption.toLowerCase() === "medium"
                                ? "bg-orange-400"
                                : selectedOption.toLowerCase() === "low"
                                ? "bg-cyan-400"
                                : ""
                            }
                            `}
                            >
                              {selectedOption.length > 0
                                ? selectedOption
                                : translations.select_priority}
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
                                  item.value.toLowerCase() === "high"
                                    ? "red"
                                    : item.value.toLowerCase() === "medium"
                                    ? "orange"
                                    : item.value.toLowerCase() === "low"
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

                    <div className="flex flex-col gap-1">
                      <span>{translations.deadline}</span>
                      <DateComponent setDeadlineTime={setDeadlineTime} />
                    </div>
                  </div>{" "}
                </div>
              </div>
            </form>
          </div>
        </animated.div>
      )}
    </>
  );
};

export default CreateActivityModal;
