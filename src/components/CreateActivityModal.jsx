import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import { TbFlag3Filled } from "react-icons/tb";
import { useSpring, animated } from "@react-spring/web";
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
import AudioTranscription from "./AudioTranscription";
import { useSnackbar } from "notistack";

const prioridade = [
  { id: "1", label: "Alta", value: "high" },
  { id: "2", label: "Mediana", value: "medium" },
  { id: "3", label: "baixa", value: "low" },
];

const CreateActivityModal = ({ projectId }) => {
  const { allMembers, isLoading, handleCreateTask, refetch } = useFetchData();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const { translations } = useLang();
  const [showDialog, setShowDialog] = useState(false);
  const [deadlineTime, setDeadlineTime] = useState(new Date());
  const [selectedOption, setSelectedOption] = useState("");
  const { enqueueSnackbar } = useSnackbar();

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

  // const handleShowNotification = () => {
  //   enqueueSnackbar("This is a snackbar message!", {
  //     variant: "success",
  //     autoHideDuration: 2000,
  //     anchorOrigin: {
  //       vertical: "top",
  //       horizontal: "center",
  //     },
  //   });
  // };

  const handleItemClick = (value, id, email) => {
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
      refetch();
      enqueueSnackbar("Atividade criada com sucesso!", {
        variant: "success",
        autoHideDuration: 2000,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
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
        variant="outlined"
        className="hidden md:flex items-center shadow-sm rounded-md min-h-[22px] border-gray-300 outline-none outline-0 hover:border-gray-600 transition-all text-gray-600 hover:text-gray-900 text-xs normal-case tracking-wider font-medium p-0 px-2 w-filt"
        size="sm"
      >
        + {translations.create_activity}
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
          <div className="fixed inset-0 flex items-center justify-center transition-all z-50 w-full">
            <div className="fixed inset-0 bg-black opacity-50 w-full"></div>
            <form
              onSubmit={handleSubmit}
              className="relative flex flex-col bg-white p-5 rounded-lg z-10 w-[90%] md:w-[60%] h-[80%]"
            >
              <div className="flex items-start justify-between border-b-2 pb-4 border-gray-20 w-full">
                <p className="text-gray-600 font-medium text-xl">
                  {translations.creating_activity}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    type="submit"
                    disabled={isLoading || title.length === 0}
                    className="bg-green-400 hover:bg-green-500 group transition-all border-none min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                  >
                    <IoMdCheckmark
                      size={18}
                      className="text-white transition-all"
                    />
                    {/* <Toaster /> */}
                  </Button>

                  <div
                    onClick={() => setShowDialog(false)}
                    className="bg-gray-200 group transition-all hover:bg-[rgb(122,114,219)] min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                  >
                    <IoCloseSharp className="text-gray-600 group-hover:text-white transition-all" />
                  </div>
                </div>
              </div>
              <div className=" participants_scrollBarStyles relative overflow-y-scroll w-full pt-5">
                <div className="px-0 md:px-4">
                  <div className="flex flex-col gap-1">
                    <span>{translations.name}</span>
                    <Input
                      label={translations.task_name}
                      value={title}
                      onChange={(e) => {
                        if (!/^\s+$/.test(e.target.value)) {
                          handleTitleChange(e);
                        }
                      }}
                      required
                    />
                  </div>
                  <div className="flex justify-end mb-4 w-full">
                    <AudioTranscription setDescription={setDescription} />
                  </div>
                  <Textarea
                    variant="static"
                    placeholder={translations.start_describing_task}
                    label={translations.description}
                    color="blue-gray"
                    className="w-ful h-[14rem]"
                    value={description}
                    onChange={(e) => {
                      if (!/^\s+$/.test(e.target.value)) {
                        handleDescriptionChange(e);
                      }
                    }}
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
                      onChange={(e) => {
                        if (!/^\s+$/.test(e.target.value)) {
                          handleReferenceLinkChange(e);
                        }
                      }}
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
                  </div>
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
