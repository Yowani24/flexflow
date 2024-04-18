import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import user_photo_url from "../assets/photo_url.png";
import useFetchData from "../../hook/useFetchData";

const rolesList = [
  "Frontend developer",
  "DevOps developer",
  "Designer",
  "RH",
  "FullStack developer",
  "Backend developer",
];
const permissionsList = ["admin", "operator"];

const CreateMemberComponent = ({
  customButtonProps,
  showButtonProps,
  paddingProps,
  currentResponsibles,
}) => {
  const { data, handleUpdateEnterpriseMembers } = useFetchData();
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [responsibles, setResponsibles] = useState([]);
  const [userPermission, setUserPermission] = useState("operator");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEmailAlreadyExist, setIsEmailAlreadyExist] = useState(false);
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const password = "admin@123";

  const enterpriseId = data.map((item) => item.id);

  const openDialog = () => {
    setIsVisible(true);
  };

  const onClose = () => {
    setIsVisible(false);
  };

  const { opacity, transform } = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0%)" : "translateY(0%)",
    onRest: () => {
      if (!isVisible) {
        setIsVisible(false);
      }
    },
  });

  const resetValues = () => {
    setName("");
    setEmail("");
    setRole("");
  };

  const handleItemClick = (email) => {
    setEmail(email);
    setResponsibles([...currentResponsibles.flat(), email]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const enterprise_referenceId = JSON.parse(
        localStorage.getItem("user")
      ).uid;
      const userRef = collection(db, `members_${enterprise_referenceId}`);

      handleUpdateEnterpriseMembers.mutate({
        id: parseInt(enterpriseId.join("")),
        responsibles: responsibles,
      });

      await addDoc(userRef, {
        enterprise_referenceId,
        name,
        email,
        role,
        photo_url: user_photo_url,
        permission: userPermission,
        // enterpriseCode: "Ainda por setar o valor...",
        user_credential: credential.user.uid,
      });

      await updateProfile(auth.currentUser, { displayName: name });

      console.log("User registration successful!");
      setLoading(false);
      onClose();
      resetValues();
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentResponsibles.flat().includes(email)) {
      setIsEmailAlreadyExist(true);
    } else {
      setIsEmailAlreadyExist(false);
    }
  }, [email, currentResponsibles]);

  const handleResetErrorMessage = () => {
    setErrorMessage("");
  };

  return (
    <>
      <div className="" onClick={openDialog}>
        {data.some((enterpriseData) => enterpriseData.email !== user.email) ? (
          ""
        ) : (
          <>{customButtonProps}</>
        )}
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
          <form
            onSubmit={handleSubmit}
            className={`bg-white p-4 rounded-lg flex flex-col w-[90%] md:w-[400px] h-[400px] z-50 ${
              paddingProps ? "pt-20" : "pt-5"
            } absolute`}
          >
            <div className="flex items-center justify-between mb-5">
              <h6>Criando membro - {isEmailAlreadyExist ? "true" : "false"}</h6>
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
                <Button
                  type="submit"
                  className="bg-green-400 hover:bg-green-500 group transition-all border-none min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                >
                  {loading ? (
                    <span className="text-[10px]">Loading...</span>
                  ) : (
                    <IoMdCheckmark
                      size={18}
                      className="text-white transition-all"
                    />
                  )}
                </Button>
                <div
                  onClick={onClose}
                  className="bg-gray-200 group transition-all hover:bg-[rgb(122,114,219)] min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                >
                  <IoCloseSharp className="text-gray-600 group-hover:text-white transition-all" />
                </div>
              </div>
            </div>
            <div className=" flex flex-col gap-4 mt-5">
              <div className="w-full">
                <Input
                  label="Username"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => {
                    if (!/^\s+$/.test(e.target.value)) {
                      setName(e.target.value);
                    }
                  }}
                />
              </div>
              <div className="w-full">
                <Input
                  label="email"
                  required
                  value={email}
                  onChange={(e) => {
                    if (!/^\s+$/.test(e.target.value)) {
                      handleItemClick(e.target.value);
                    }
                  }}
                  onInput={handleResetErrorMessage}
                  className={`${isEmailAlreadyExist ? "text-orange-500" : ""}`}
                />
                <Typography
                  variant="small"
                  className="text-xs text-red-400 ml-3 mt-1"
                >
                  {isEmailAlreadyExist ? "Email já cadastrado!" : ""}
                </Typography>
              </div>
              <div className="flex flex-col items-start gap-5 w-full">
                <Select
                  label="Role"
                  name="role"
                  value={role}
                  onChange={(val) => setRole(val)}
                >
                  {rolesList.map((item, index) => (
                    <Option key={index} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
                <Select
                  label="User permission"
                  name="userPermission"
                  value={userPermission}
                  onChange={(val) => setUserPermission(val)}
                >
                  {permissionsList.map((item, index) => (
                    <Option key={index} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
                <Typography
                  variant="small"
                  className="text-center text-xs text-red-200 w-full"
                >
                  {errorMessage ===
                  "Firebase: Error (auth/email-already-in-use)."
                    ? "Email já cadastrado!"
                    : errorMessage}
                </Typography>
              </div>
            </div>
          </form>
        </animated.div>
      )}
    </>
  );
};

export default CreateMemberComponent;
