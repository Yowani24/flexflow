import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useSpring, animated } from "@react-spring/web";
import {
  Avatar,
  Typography,
  Checkbox,
  Card,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { FaUserTie } from "react-icons/fa6";
import { MdDeleteForever, MdEmail, MdMotionPhotosPause } from "react-icons/md";
import { BsExclamation } from "react-icons/bs";
import { MdEngineering } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { SiOnlyoffice } from "react-icons/si";
import useFetchData from "../../hook/useFetchData";
import { LiaHourglassStartSolid } from "react-icons/lia";
import { IoMdDoneAll } from "react-icons/io";
import { CiNoWaitingSign } from "react-icons/ci";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { format } from "date-fns";
import { useLang } from "../../hook/LangContext";

const MemberDetailsModal = ({
  enterpriseId,
  buttonProps,
  memberData,
  enterpriseResponsibles,
}) => {
  const { data, handleUpdateEnterpriseMembers } = useFetchData();
  const { translations } = useLang();
  const [showDialog, setShowDialog] = useState(false);
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const DeadlineCounter = ({ deadline }) => {
    const [deadlineMessage, setDeadlineMessage] = useState("");

    useEffect(() => {
      const calculateTimeRemaining = () => {
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const timeDifference = deadlineDate - now;

        const oneDay = 24 * 60 * 60 * 1000;
        const daysRemaining = Math.ceil(timeDifference / oneDay);

        if (daysRemaining < 0) {
          setDeadlineMessage(`${translations.deadline_is_over}`);
        } else if (daysRemaining === 0) {
          setDeadlineMessage(`${translations.today_is_the_deadline}`);
        } else if (daysRemaining === 1) {
          setDeadlineMessage(`${translations.deadline_is_getting_over}`);
        } else {
          setDeadlineMessage(
            `${daysRemaining} ${translations.days_remaining_until_the_deadline}`
          );
        }
      };

      calculateTimeRemaining();
      const interval = setInterval(calculateTimeRemaining, 60000);

      return () => clearInterval(interval);
    }, [deadline]);

    return (
      <div
        className={`${
          (deadlineMessage === "It's over" ||
            deadlineMessage === "prazo esgotado") &&
          "text-red-500 bg-red-50 rounded-md px-2"
        }`}
      >
        <div
          className={`${
            (deadlineMessage === "Today is the deadline" ||
              deadlineMessage === "Hoje é o prazo" ||
              deadlineMessage === "Tomorrow is the deadline" ||
              deadlineMessage === "O prazo é até amanhã") &&
            "bg-orange-50 text-orange-500 rounded-md px-2 flex items-center"
          }`}
        >
          {deadlineMessage}
          {(deadlineMessage === "Today is the deadline" ||
            deadlineMessage === "Hoje é o prazo") && (
            <BsExclamation size={20} className="text-orange-500" />
          )}
        </div>
      </div>
    );
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

  let totalSubTasks = 0;
  let completedSubTasks = 0;
  data?.flatMap((enterprise) =>
    enterprise.projects
      .flatMap((project) =>
        project.tasks.filter((task) =>
          task.responsibles.includes(memberData.email)
        )
      )
      .forEach((taskData) => {
        taskData.sub_tasks.forEach((subtask) => {
          if (subtask.user_created === memberData.email) {
            totalSubTasks++;
            if (subtask.completed) {
              completedSubTasks++;
            }
          }
        });
      })
  );

  const percentageCompleted =
    totalSubTasks > 0 ? (completedSubTasks / totalSubTasks) * 100 : 0;

  const deleteUserAccount = () => {
    getAuth()
      .deleteUser("tOwwCqGFi5dAwXtgJnxhcU1gi9y1")
      .then(() => {
        console.log("Successfully deleted user");
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
      });
  };

  const deleteMember = async (e) => {
    e.preventDefault();
    try {
      const enterprise_credential = JSON.parse(localStorage.getItem("user"));
      if (!enterprise_credential || !enterprise_credential.uid) {
        throw new Error(
          "enterprise_credential information not found in local storage."
        );
      }
      const userRef = doc(
        db,
        `members_${enterprise_credential.uid}`,
        memberData.id
      );
      await deleteDoc(userRef);
      console.log("User collection deleted!");
      handleUpdateEnterpriseMembers.mutate({
        id: parseInt(enterpriseId.join("")),
        responsibles: [
          ...enterpriseResponsibles.filter(
            (email) => email !== memberData.email
          ),
        ],
      });

      console.log("Successfully deleted user");
      setShowDialog(false);
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return (
    <>
      <div
        className="rounded-full"
        onClick={() =>
          memberData.email === user?.email ||
          data?.some(
            (enterprise) =>
              enterprise.email === user?.email &&
              enterprise.responsibles.includes(memberData?.email)
          )
            ? setShowDialog(true)
            : {}
        }
      >
        {buttonProps}
      </div>

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
            <div className="relative flex flex-col justify-start bg-white p-5 rounded-lg z-50 w-[90%] md:w-[60%] h-[80%] transition-all">
              <div className="flex items-start justify-between w-full transition-all">
                <p className="text-gray-600 font-medium text-xl">
                  <Typography>{translations.member_details}</Typography>
                </p>
                <div className="flex items-center gap-2">
                  {data?.map(
                    (enterprise) =>
                      enterprise?.email === user?.email && (
                        <Menu key={enterprise?.id}>
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
                              {translations.do_you_wish_to_continue}
                            </Typography>
                            <div className="flex items-center gap-5 mt-5">
                              <MenuItem className="text-xs">
                                {translations.cancel}
                              </MenuItem>
                              <MenuItem
                                className="text-xs"
                                color="red"
                                onClick={deleteMember}
                              >
                                {translations.continue}
                              </MenuItem>
                            </div>
                          </MenuList>
                        </Menu>
                      )
                  )}

                  <div
                    onClick={() => setShowDialog(false)}
                    className="bg-gray-200 group transition-all hover:bg-[rgb(191,199,244)] min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                  >
                    <IoCloseSharp className="text-gray-600 group-hover:text-white transition-all" />
                  </div>
                </div>
              </div>
              <div className="w-full shadow-sm flex flex-col md:flex-row items-center md:items-start gap-5 rounded-md mt-5 p-4">
                <Avatar
                  src={memberData?.photo_url}
                  alt="avatar"
                  size="xxl"
                  variant="rounded"
                />
                <div className="w-full h-full px-10 flex flex-col justify-between gap-5 md:gap-0">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">
                    <div>
                      <span className="flex items-ende gap-1">
                        <FaUserTie size={12} className="" />
                        <p className="text-xs">{translations.name}</p>
                      </span>
                      <Typography className="text-light-blue-800">
                        {memberData.name}
                      </Typography>
                    </div>

                    <div>
                      <span className="flex items-ende gap-1">
                        <MdEmail size={12} className="mt-[2px]" />
                        <p className="text-xs">{translations.email}</p>
                      </span>
                      <Typography className="text-light-blue-800">
                        {memberData.email}
                      </Typography>
                    </div>

                    <div>
                      <span className="flex items-ende gap-1">
                        <MdEngineering size={15} className="" />
                        <p className="text-xs ">{translations.role}</p>
                      </span>
                      <Typography className="text-light-blue-800">
                        {memberData.role}
                      </Typography>
                    </div>
                  </div>
                  <div className="flex items-end justify-between flex-wrap md:flex-nowrap w-full gap-5 md:gap-0">
                    <div className="w-full md:w-fit">
                      <Typography>
                        {translations.total_subtasks_completed}
                      </Typography>
                      <div className="flex items-center gap-1">
                        <div className="w-full md:w-80 bg-gray-300 shadow-sm h-[6px] rounded-full">
                          <div
                            className={`bg-green-400 h-full rounded-full`}
                            style={{
                              width: `${Math.ceil(percentageCompleted)}%`,
                            }}
                          ></div>
                        </div>
                        <Typography
                          variant="small"
                          className="text-xs text-light-blue-800"
                        >
                          <span className="flex items-center">
                            {Math.ceil(percentageCompleted)} %
                          </span>
                        </Typography>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <SiOnlyoffice className="text-yellow-800" />{" "}
                      <Typography
                        variant="small"
                        className="text-light-blue-800"
                      >
                        {translations.projects}:{" "}
                        {data?.flatMap(
                          (enterprise) =>
                            enterprise.projects.filter((project) =>
                              project.tasks.some((task) =>
                                task.responsibles.includes(memberData?.email)
                              )
                            ).length
                        )}
                      </Typography>
                    </div>
                    <div className="flex items-center gap-2">
                      <GoTasklist className="text-green-600" size={22} />{" "}
                      <Typography
                        variant="small"
                        className="text-light-blue-800"
                      >
                        {translations.tasks}:{" "}
                        {data?.flatMap(
                          (enterprise) =>
                            enterprise.projects
                              .flatMap((project) =>
                                project.tasks.filter((task) =>
                                  task.responsibles.includes(memberData.email)
                                )
                              )
                              .filter((filteredTask) =>
                                filteredTask.responsibles.includes(
                                  memberData.email
                                )
                              ).length
                        )}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="participants_scrollBarStyles overflow-y-scroll px-4">
                {data?.flatMap((enterprise) =>
                  enterprise.projects
                    .filter((project) =>
                      project.tasks.some((task) =>
                        task.responsibles.includes(memberData.email)
                      )
                    )
                    .map((item) => (
                      <div className="mt-10" key={item.id}>
                        <div className="flex items-center gap-2 backdrop-blur-sm bg-[#7dd3fc]/30 rounded-md px-2 shadow-sm">
                          {/* <span>P:</span> */}
                          <Typography
                            variant="h6"
                            className="text-sm py-1 flex items-start gap-2"
                          >
                            <SiOnlyoffice className="mt-[2px] text-yellow-800" />
                            {item.name}
                          </Typography>
                        </div>
                        {item.tasks
                          .filter((filteredtask) =>
                            filteredtask.responsibles.includes(memberData.email)
                          )
                          .map((taskData) => (
                            <div className="pl-14 mt-8 mb-10" key={taskData.id}>
                              <div className="flex items-center">
                                <Typography
                                  variant="paragraph"
                                  className="flex items-center gap-2 px-2 normal-case text-sm font-semibold rounded-md bg-gray-200"
                                >
                                  <GoTasklist
                                    size={20}
                                    className="text-green-600"
                                  />
                                  {taskData?.title}
                                </Typography>
                                <span className="font-medium flex items-center gap-2 text-xs ml-5 text-gray-500">
                                  <DeadlineCounter
                                    deadline={taskData?.deadline}
                                  />
                                  <b>{format(taskData?.deadline, "MMM dd")}</b>
                                </span>
                              </div>

                              <div className="flex flex-wrap items-start gap-4 mt-2">
                                {taskData.sub_tasks.filter(
                                  (subtask) =>
                                    subtask.user_created === memberData.email
                                ).length === 0 ? (
                                  <span className="text-xs text-gray-500">
                                    {translations.no_subtasks}
                                  </span>
                                ) : (
                                  taskData.sub_tasks
                                    .filter(
                                      (subtask) =>
                                        subtask.user_created ===
                                        memberData.email
                                    )
                                    .sort(
                                      (a, b) =>
                                        new Date(a.created_at) -
                                        new Date(b.created_at)
                                    )
                                    .map((subtask) => (
                                      <Card
                                        htmlFor="item-1"
                                        className="flex flex-row items-start justify-between max-w-56 gap-2 p-2"
                                      >
                                        <Typography className="text-xs">
                                          {subtask.title}
                                        </Typography>
                                        <Checkbox
                                          ripple={false}
                                          disabled
                                          icon={
                                            subtask.started &&
                                            !subtask.paused &&
                                            !subtask.completed ? (
                                              <LiaHourglassStartSolid />
                                            ) : subtask.started &&
                                              subtask.paused &&
                                              !subtask.completed ? (
                                              <MdMotionPhotosPause />
                                            ) : subtask.started &&
                                              !subtask.paused &&
                                              subtask.completed ? (
                                              <IoMdDoneAll />
                                            ) : (
                                              <CiNoWaitingSign />
                                            )
                                          }
                                          color={
                                            subtask.started &&
                                            !subtask.paused &&
                                            !subtask.completed
                                              ? "blue"
                                              : subtask.started &&
                                                subtask.paused &&
                                                !subtask.completed
                                              ? "red"
                                              : subtask.started &&
                                                !subtask.paused &&
                                                subtask.completed
                                              ? "green"
                                              : "gray"
                                          }
                                          checked={
                                            subtask.started &&
                                            !subtask.paused &&
                                            !subtask.completed
                                              ? subtask.started
                                              : subtask.started &&
                                                subtask.paused &&
                                                !subtask.completed
                                              ? subtask.paused
                                              : subtask.started &&
                                                !subtask.paused &&
                                                subtask.completed
                                              ? subtask.completed
                                              : ""
                                          }
                                          id="item-1"
                                          containerProps={{
                                            className: "p-0",
                                          }}
                                          className=""
                                        />
                                      </Card>
                                    ))
                                )}
                              </div>
                            </div>
                          ))}
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </animated.div>
      )}
    </>
  );
};

export default MemberDetailsModal;
