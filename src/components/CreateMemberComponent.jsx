import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import {
  Avatar,
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { auth, db, imageDb } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import user_photo_url from "../assets/photo_url.png";
import useFetchData from "../../hook/useFetchData";
import { FaCheck } from "react-icons/fa";

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
  const [userCreatedSuccessfully, setUserCreatedSuccessfully] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const enterpriseId = data?.map((item) => item.id);

  const openDialog = () => {
    setIsVisible(true);
  };

  const onClose = () => {
    setIsVisible(false);
    resetValues();
    setUserCreatedSuccessfully(false);
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
    setImageFile(null);
  };

  const handleItemClick = (email) => {
    setEmail(email);
    setResponsibles([...currentResponsibles.flat(), email]);
  };

  const fileInputRef = useRef();
  const handleImageInportButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
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
      const userId = credential?.user.uid;

      const enterpriseData = localStorage.getItem("user");
      if (!enterpriseData) {
        throw new Error("Enterprise reference ID not found in localStorage.");
      }
      const enterpriseReferenceId = JSON.parse(enterpriseData).uid;

      let photoUrl = null;
      if (imageFile) {
        const imageRef = ref(
          imageDb,
          `user_photos_${enterpriseReferenceId}/${userId}`
        );
        await uploadBytes(imageRef, imageFile);
        photoUrl = await getDownloadURL(imageRef);
      }

      const userRef = collection(db, `members_${enterpriseReferenceId}`);

      await addDoc(userRef, {
        enterprise_referenceId: enterpriseReferenceId,
        name,
        email,
        role,
        photo_url: photoUrl ? photoUrl : user_photo_url,
        permission: userPermission,
        user_credential: userId,
      });

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoUrl ? photoUrl : user_photo_url,
      });

      const enterpriseIdParsed = parseInt(enterpriseId.join(""));
      if (isNaN(enterpriseIdParsed)) {
        throw new Error("Invalid enterprise ID.");
      }

      handleUpdateEnterpriseMembers.mutate({
        id: enterpriseIdParsed,
        responsibles,
      });

      setUserCreatedSuccessfully(true);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentResponsibles?.flat().includes(email)) {
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
        {data?.some(
          (enterpriseData) => enterpriseData.email === user?.email
        ) && <>{customButtonProps}</>}
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
            <div className="relative flex items-center justify-end mb-5">
              {!loading && !userCreatedSuccessfully && (
                <h6 className="left-0 absolute">Criando membro</h6>
              )}
              {!loading && (
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
                  {!loading && !userCreatedSuccessfully && (
                    <Button
                      loading={loading}
                      type="submit"
                      className="bg-green-400 hover:bg-green-500 group transition-all border-none min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                    >
                      {loading ? (
                        <span className="text-[10px]">Loading</span>
                      ) : (
                        <IoMdCheckmark
                          size={18}
                          className="text-white transition-all"
                        />
                      )}
                    </Button>
                  )}
                  <div
                    onClick={onClose}
                    className="bg-gray-200 group transition-all hover:bg-[rgb(122,114,219)] min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                  >
                    <IoCloseSharp className="text-gray-600 group-hover:text-white transition-all" />
                  </div>
                </div>
              )}
            </div>
            {loading ? (
              <div className="flex flex-col w-full h-full items-center justify-center">
                <div className="flex flex-col w-full h-full items-center justify-center transition-all">
                  <Button variant="text" loading={loading} />
                  <Typography className="text-sm">Criando membro</Typography>
                </div>
              </div>
            ) : (
              <>
                {userCreatedSuccessfully ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <FaCheck size={24} className="text-green-400" />
                    <Typography className="text-sm">Pronto!</Typography>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 mt-5">
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
                        className={`${
                          isEmailAlreadyExist ? "text-orange-500" : ""
                        }`}
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
                        {data?.flatMap((enterprise) =>
                          enterprise.roles?.flatMap((role) => (
                            <Option key={role.id} value={role.name}>
                              {role.name}
                            </Option>
                          ))
                        )}
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
                      <div className="flex items-center w-full justify-end">
                        {imageFile && (
                          <Avatar
                            src={URL.createObjectURL(imageFile)}
                            alt="avatar"
                            variant="rounded"
                            size="sm"
                            className="mr-4 shadow-sm"
                          />
                        )}
                        <Button
                          className="flex items-center justify-center p-0 bg-white rounded-md"
                          onClick={handleImageInportButtonClick}
                        >
                          <MdOutlineAddPhotoAlternate
                            size={35}
                            className={`cursor-pointer ${
                              imageFile
                                ? "text-[rgb(126,236,126)]"
                                : "text-[rgb(96,125,139)]"
                            } shadow-md hover:shadow-lg transition-all`}
                          />
                        </Button>

                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleImageChange}
                        />
                      </div>
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
                )}
              </>
            )}
          </form>
        </animated.div>
      )}
    </>
  );
};

export default CreateMemberComponent;
