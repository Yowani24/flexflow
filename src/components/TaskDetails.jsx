import React, { forwardRef, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { LiaHourglassStartSolid } from "react-icons/lia";
import { MdDeleteForever, MdMotionPhotosPause, MdRemove } from "react-icons/md";

import { IoMdDoneAll } from "react-icons/io";
import { HiStatusOnline, HiOutlineStatusOffline } from "react-icons/hi";
import { BiSolidLock } from "react-icons/bi";
import { FiEdit3 } from "react-icons/fi";
import { FaCircleUser } from "react-icons/fa6";
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
import { format } from "date-fns";
import { useSpring, animated } from "@react-spring/web";
import { DescriptionModal } from "./DescriptionModal";
import AddParticipantComponent from "./AddParticipantComponent";
import { VscReferences } from "react-icons/vsc";
import { MdEditCalendar } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import PriorityComponent from "./PriorityComponent";
import useFetchData from "../../hook/useFetchData";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLang } from "../../hook/LangContext";
import RemoveParticipantComponent from "./RemoveParticipantComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CommentPopover from "./CommentPopover";

const TaskDetails = ({
  taskId,
  projectId,
  task_name,
  task_status,
  priority,
  responsibles,
  description,
  subtasks,
  reference_link,
  deadline,
  buttonProps,
  disabledProps,
  disabledSpecificProps,
  closeModalAfterAddUser,
}) => {
  const {
    data,
    allMembers,
    handleDeleteTask,
    handleCreateSubtask,
    handleDeleteSubtask,
    handleUpdateTaskStatus,
    handleUpdateSubtaskStart,
    handleUpdateSubtaskPause,
    handleUpdateSubtaskComplete,
    handleUpdateTaskProgress,
    handleUpdateProjectProgress,
    handleUpdateTaskPriority,
    handleUpdateTaskResponsibles,
    handleUpdateTaskDeadline,
  } = useFetchData();
  const { translations } = useLang();
  const [showDialog, setShowDialog] = useState(false);
  const [completionPercentageState, setCompletionPercentageState] = useState(0);
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const currentUser = userString ? JSON.parse(userString) : null;
  const refetchData = () => {};

  const hasPermissionToEdit = data?.some(
    (enterpriseData) => enterpriseData?.email === user?.email
  );

  const closeModal = () => {
    setShowDialog(false);
  };

  const ExampleCustomInput = forwardRef(({ onClick }, ref) => (
    <div
      onClick={onClick}
      ref={ref}
      className="bg-light-blue-200 hover:bg-light-blue-300 transition-all shadow-sm hover:shadow-md active:bg-light-blue-500 text-white gap-1 text-xs px-2 w-fit h-6 cursor-pointer rounded-full flex items-center justify-center"
    >
      {disabledSpecificProps ? (
        ""
      ) : (
        <MdEditCalendar className="cursor-pointer" />
      )}{" "}
      Edit
    </div>
  ));

  const statusUpdateOptions = [
    { id: "1", option: translations.active, value: true },
    { id: "2", option: translations.inactive, value: false },
  ];

  const handleOptionSelect = (value) => {
    handleUpdateTaskStatus.mutate({
      id: taskId,
      status: value,
      progressStatus: value ? "ongoing" : "paused",
    });
  };

  const handlePriorityUpdate = (value) => {
    handleUpdateTaskPriority.mutate({ id: taskId, priority: value });
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

  const handleDeleteTaskFn = (id) => {
    try {
      handleDeleteTask.mutate(id);
      setShowDialog(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteSubtaskFn = (id) => {
    try {
      handleDeleteSubtask.mutate(id);
      refetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const Formik = useFormik({
    initialValues: {
      title: "",
      user_created: user.email,
      taskId: taskId,
      projectId: projectId,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        handleCreateSubtask.mutate(values);
        resetForm();
      } catch (error) {
        console.error(error.message);
      }
    },
  });

  useEffect(() => {
    if (subtasks && subtasks.length > 0) {
      const completedSubtasksLength = subtasks.filter(
        (subtask) => subtask.completed
      ).length;

      const completedPercentage = Math.ceil(
        (completedSubtasksLength / subtasks.length) * 100
      );

      setCompletionPercentageState((prevState) => {
        if (completedPercentage !== prevState) {
          handleUpdateTaskProgress.mutate({
            id: taskId,
            progress: completedPercentage,
            progressStatus:
              completedPercentage == 100
                ? "completed"
                : completedPercentage < 100 &&
                  responsibles.length > 0 &&
                  task_status === true
                ? "ongoing"
                : "paused",
          });

          const projectProgress =
            data?.map((item) => {
              if (item.id === projectId) {
                const relevantTasks =
                  item?.tasks.filter((task) => task.responsibles.length > 0) ||
                  [];
                const totalProgress = relevantTasks.reduce(
                  (accumulator, currentItem) =>
                    accumulator + currentItem.progress,
                  0
                );
                const totalTasksCount = Math.max(relevantTasks.length, 1);
                return Math.ceil(totalProgress / totalTasksCount);
              } else {
                return null;
              }
            }) || [];

          handleUpdateProjectProgress.mutate({
            id: projectId,
            progress: projectProgress,
          });
        }
        return completedPercentage;
      });
    } else {
      setCompletionPercentageState(0);
    }
  }, [subtasks, taskId, refetchData]);

  const handleCompleteSubtaskSubmit = (id, completed) => {
    refetchData();
    handleUpdateSubtaskComplete.mutate({
      id: id,
      completed: completed,
    });
  };

  const updateTaskDeadline = (date) => {
    handleUpdateTaskDeadline.mutate({
      id: taskId,
      deadline: date.toISOString(),
    });
  };

  return (
    <>
      {disabledProps ? (
        <>
          {data.some(
            (enterpriseData) => enterpriseData.email !== user.email
          ) ? (
            ""
          ) : (
            <div onClick={() => setShowDialog(true)}>{buttonProps}</div>
          )}
        </>
      ) : (
        <>
          {task_status ? (
            <div onClick={() => setShowDialog(true)}>{buttonProps}</div>
          ) : (
            <div className="flex group items-center justify-center min-w-8 min-h-8 bg-gray-200 transition-all hover:bg-[rgb(191,199,244)] cursor-pointer rounded-full">
              <BiSolidLock className="text-gray-400 group-hover:text-white transition-all" />
            </div>
          )}
        </>
      )}

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
            <div className="fixed inset-0 bg-black opacity-50 transition-all"></div>

            <div className="relative flex flex-col justify-start bg-white p-5 rounded-lg z-10 w-[90%] md:w-[70%] h-[80%] transition-all">
              <div className="flex items-start justify-between w-full transition-all">
                <p className="text-gray-600 font-medium text-xl">{task_name}</p>
                <div className="flex items-center gap-2">
                  {disabledProps ? (
                    <>
                      {disabledSpecificProps ? (
                        ""
                      ) : (
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
                              {translations.wish_to_continue}
                            </Typography>
                            <div className="flex items-center gap-5 mt-5">
                              <MenuItem className="text-xs">
                                {translations.cancel}
                              </MenuItem>
                              <MenuItem
                                className="text-xs"
                                color="red"
                                onClick={() => handleDeleteTaskFn(taskId)}
                              >
                                {translations.continue}
                              </MenuItem>
                            </div>
                          </MenuList>
                        </Menu>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  <div
                    onClick={() => setShowDialog(false)}
                    className="bg-gray-200 group transition-all hover:bg-[rgb(122,114,219)] min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                  >
                    <IoCloseSharp className="text-gray-600 group-hover:text-white transition-all" />
                  </div>
                </div>
              </div>
              <div className="px-0 md:px-4 transition-all">
                <div className="flex items-center justify-between flex-wrap gap-4 mt-5">
                  <div>
                    {disabledProps ? (
                      <PriorityComponent
                        priority={priority}
                        disabledSpecificProps={disabledSpecificProps}
                        handlePriorityUpdate={handlePriorityUpdate}
                      />
                    ) : (
                      <div className="flex items-center gap-1">
                        <TbFlag3Filled size={20} className="text-gray-600" />
                        <span
                          className={`text-white text-sm ${
                            priority === "high"
                              ? " bg-red-400"
                              : priority === "medium"
                              ? "bg-orange-400"
                              : priority === "low"
                              ? "bg-cyan-400"
                              : ""
                          } min-w-fit p1 px-2 pb-[2px] rounded-full`}
                        >
                          {priority === "high"
                            ? translations.high
                            : priority === "medium"
                            ? translations.medium
                            : priority === "low"
                            ? translations.low
                            : ""}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <TbProgressCheck className="text-gray-600" />
                    <p className="text-gray-600 text-sm">
                      {translations.progress}{" "}
                      <span className="text-green-500 font-medium">
                        {completionPercentageState}%
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <TbCalendarTime className="text-gray-600" />
                    <Typography className="text-gray-600 text-sm">
                      {translations.deadline}:{" "}
                      <span className="font-semibold">
                        {deadline ? format(deadline, "MMM dd") : ""}
                      </span>
                    </Typography>{" "}
                    {disabledProps ? (
                      <DatePicker
                        onChange={(date) => updateTaskDeadline(date)}
                        customInput={<ExampleCustomInput />}
                      />
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {reference_link?.length ? (
                      <a href={`https://${reference_link}`} target="_blank">
                        <Button className="text-white bg-gray-400 min-w-fit p-0 flex items-center gap-2 px-2 capitalize pb-[2px] cursor-pointer text-xs rounded-full">
                          <VscReferences color="white" size={16} />
                          {translations.reference}
                        </Button>
                      </a>
                    ) : (
                      translations.no_reference
                    )}
                    {disabledProps ? (
                      <>
                        {disabledSpecificProps ? (
                          ""
                        ) : (
                          <CommentPopover
                            trigger={
                              <div className="bg-light-blue-200 hover:bg-light-blue-300 transition-all shadow-sm hover:shadow-md active:bg-light-blue-500 text-white gap-1 text-xs px-2 w-fit h-6 cursor-pointer rounded-full flex items-center justify-center">
                                {disabledSpecificProps ? (
                                  ""
                                ) : (
                                  <FaLink className="cursor-pointer" />
                                )}{" "}
                                Edit
                              </div>
                            }
                            currentLink={reference_link}
                            TaskId={taskId}
                          />
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
                        <>
                          {responsibles.length ? (
                            <Menu
                              dismiss={{
                                itemPress: false,
                              }}
                            >
                              <MenuHandler>
                                <Button className="flex items-center gap-2 bg-gray- hover:bg-gray-200 transition-all text-xs text-gray-700 border-gray-300 capitalize p-1">
                                  {translations.update_status}
                                  <TbStatusChange size={16} />
                                </Button>
                              </MenuHandler>
                              <MenuList className="ml-[4%]">
                                {statusUpdateOptions.map((item, index) => (
                                  <MenuItem
                                    key={index}
                                    className="p-0 bg-white"
                                  >
                                    <label
                                      htmlFor={item.id}
                                      className="flex cursor-pointer items-center gap-2 p-2"
                                    >
                                      <Checkbox
                                        ripple={false}
                                        id={item.id}
                                        containerProps={{ className: "p-0" }}
                                        checked={task_status === item.value}
                                        onChange={() =>
                                          handleOptionSelect(item.value)
                                        }
                                        className="hover:before:content-none"
                                      />
                                      {item.option}
                                    </label>
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </Menu>
                          ) : (
                            <Typography className="text-xs text-orange-700">
                              {
                                translations.assign_responsible_to_activate_the_task
                              }
                            </Typography>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  <div
                    className={`flex items-center w-fit px-2 rounded-md gap-2 ${
                      task_status ? "bg-[#7a72db]" : "bg-[#64636f]"
                    } text-xs text-white border-gray-300 capitalize p-1`}
                  >
                    Status
                    {task_status ? (
                      <HiStatusOnline size={16} color="#ffffff" />
                    ) : (
                      <HiOutlineStatusOffline size={16} />
                    )}
                  </div>
                </div>
                <div
                  className={`mt-5 mb-8 ${
                    disabledProps ||
                    data.some((item) => item.email === user.email)
                      ? "hidden"
                      : "flex flex-col"
                  }`}
                >
                  <span className="text-gray-600">
                    {translations.add_subactivities}
                  </span>
                  <form
                    onSubmit={Formik.handleSubmit}
                    className="w-full flex items-center gap-4 mt-2 flex-col md:flex-row flex-wrap"
                  >
                    <input
                      type="text"
                      placeholder={translations.fragment_your_activity}
                      name="title"
                      className="w-full md:w-[250px] bg-white px-2 h-9 border-2 rounded-md border-[#11BEF4]"
                      onChange={(e) => {
                        if (!/^\s+$/.test(e.target.value)) {
                          Formik.handleChange(e);
                        }
                      }}
                      value={Formik.values.title}
                    />
                    <Button
                      type="submit"
                      disabled={Formik.values.title.length === 0}
                      className="w-full md:w-[100px] h-9 px-2 py-0 bg-[#11BEF4] text-xs capitalize transition-all"
                    >
                      {translations.add}
                    </Button>
                  </form>
                </div>
              </div>
              <Card className="scrollBarStyles w-full mb-14 flex flex-row gap-2 p-2 flex-wrap shadow-none overflow-auto transition-all">
                {subtasks.length === 0 ? (
                  <div
                    className={`text-gray-700 flex flex-col gap-4 ${
                      disabledProps ? "mt-10 text-left" : "mt-0"
                    }`}
                  >
                    <span>{translations.no_subactivities}</span>
                    {!hasPermissionToEdit && (
                      <span className="text-xs bg-[#f0f0f0] rounded-md p-2">
                        {translations.no_subactivity_message}
                      </span>
                    )}
                  </div>
                ) : (
                  <>
                    {subtasks
                      ?.filter(
                        (subtast) =>
                          subtast.user_created === user.email ||
                          data.some((item) => item.email === user.email)
                      )
                      .sort(
                        (a, b) =>
                          new Date(a.created_at) - new Date(b.created_at)
                      )
                      .map((item) => (
                        <div
                          key={item.id}
                          className={`flex flex-col justify-between shadow-${
                            disabledProps || item.user_created !== user.email
                              ? "none"
                              : "md"
                          } bg-[${
                            disabledProps || item.user_created !== user.email
                              ? "#f0f0f0"
                              : "#ffffff"
                          }] h-fit ${
                            disabledProps ? "mt-10" : "mt-0"
                          } rounded-lg w-full p-2 md:w-[250px]`}
                        >
                          <div
                            className={`relative px-4 py-2 bg-[${
                              disabledProps || item.user_created !== user.email
                                ? "#E3E3E3"
                                : "#f0f0f0"
                            }] rounded-md text-sm text-left`}
                          >
                            <div
                              onClick={() => handleDeleteSubtaskFn(item.id)}
                              className={`absolute right-[-6px] top-[-7px] shadow-md cursor-pointer text-red-400 hover:text-red-800 hover:bg-red-50 transition-all w-6 h-6 ${
                                disabledProps ||
                                item.user_created !== user.email
                                  ? "hidden"
                                  : "flex"
                              } items-center justify-center bg-[#ffffff] rounded-full`}
                            >
                              <MdRemove size={16} />
                            </div>
                            {item.title}
                          </div>
                          <div className="w-full pr-4 pb-2 flex items-center justify-between">
                            <Checkbox
                              icon={<LiaHourglassStartSolid />}
                              label={translations.start}
                              checked={item.started}
                              disabled={
                                disabledProps ||
                                item.paused ||
                                item.completed ||
                                item.user_created !== user.email
                              }
                              color={item.started ? "indigo" : "gray"}
                              style={{ width: "18px", height: "18px" }}
                              labelProps={{
                                style: {
                                  fontSize: "12px",
                                },
                              }}
                              onClick={() =>
                                handleUpdateSubtaskStart.mutate({
                                  id: item.id,
                                  started: !item.started,
                                })
                              }
                            />

                            <Checkbox
                              className=""
                              icon={<MdMotionPhotosPause />}
                              label={translations.pause}
                              checked={item.paused}
                              disabled={
                                disabledProps ||
                                !item.started ||
                                item.completed ||
                                item.user_created !== user.email
                              }
                              color={item.paused ? "red" : "gray"}
                              style={{ width: "18px", height: "18px" }}
                              labelProps={{
                                style: {
                                  fontSize: "12px",
                                },
                              }}
                              onClick={() =>
                                handleUpdateSubtaskPause.mutate({
                                  id: item.id,
                                  paused: !item.paused,
                                })
                              }
                            />

                            <Checkbox
                              className=""
                              icon={<IoMdDoneAll />}
                              label={translations.done}
                              checked={item.completed}
                              disabled={
                                disabledProps ||
                                !item.started ||
                                item.paused ||
                                item.user_created !== user.email
                              }
                              color={item.completed ? "green" : "gray"}
                              style={{ width: "18px", height: "18px" }}
                              labelProps={{
                                style: {
                                  fontSize: "12px",
                                },
                              }}
                              onClick={() =>
                                handleCompleteSubtaskSubmit(
                                  item.id,
                                  !item.completed
                                )
                              }
                            />
                          </div>
                          {allMembers
                            .filter((member) =>
                              member.email.includes(item.user_created)
                            )
                            .map((user) => (
                              <div className="flex items-center gap-1 ml-2">
                                <Avatar
                                  src={user.photo_url}
                                  alt="avatar"
                                  size="xs"
                                  className="w-5 h-5"
                                />
                                <Typography className="text-[10px]">
                                  {user.name}
                                </Typography>
                              </div>
                            ))}
                        </div>
                      ))}
                  </>
                )}
              </Card>
              <div className="absolute bottom-0 right-0 left-0 px-5 py-4 flex flex-wrap gap-5 items-start justify-between w-full transition-all">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <div className="flex items-center -space-x-4">
                      {responsibles.slice(0, 3).map((item, index) => (
                        <>
                          {allMembers
                            .filter((member) => member.email.includes(item))
                            .map((user) => (
                              <Tooltip
                                key={user.id}
                                content={
                                  user.email === currentUser.email
                                    ? "Eu"
                                    : user.name
                                }
                                animate={{
                                  mount: { scale: 1, y: 0 },
                                  unmount: { scale: 0, y: 25 },
                                }}
                              >
                                {user.photo_url ? (
                                  <Avatar
                                    variant="circular"
                                    alt={user.name}
                                    size="sm"
                                    className="border-2 min-w-9 border-white hover:z-10 focus:z-10"
                                    src={user.photo_url}
                                  />
                                ) : (
                                  <FaCircleUser size={34} />
                                )}
                              </Tooltip>
                            ))}
                        </>
                      ))}
                    </div>
                    <div className="ml-2">
                      {responsibles.length > 3 ? (
                        <Typography>+ {responsibles.length - 3}</Typography>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  {disabledProps ? (
                    <>
                      {disabledSpecificProps ? (
                        ""
                      ) : (
                        <AddParticipantComponent
                          responsibles={responsibles}
                          allResponsibles={allMembers}
                          taskId={taskId}
                          closeModalAfterAddUser={closeModalAfterAddUser}
                          closeModal={closeModal}
                        />
                      )}
                    </>
                  ) : (
                    ""
                  )}{" "}
                </div>
                {disabledProps ? (
                  <>
                    {data.some(
                      (enterpriseData) => enterpriseData.email !== user.email
                    ) ? (
                      ""
                    ) : (
                      <>
                        {responsibles.length === 0 ? (
                          ""
                        ) : (
                          <RemoveParticipantComponent
                            responsibles={responsibles}
                            allResponsibles={allMembers}
                            task_status={task_status}
                            subtasks={subtasks}
                            taskId={taskId}
                            closeModal={closeModal}
                          />
                        )}
                      </>
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </animated.div>
      )}
    </>
  );
};

export default TaskDetails;
