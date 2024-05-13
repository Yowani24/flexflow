import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import {
  Avatar,
  Button,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { db, imageDb } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import user_photo_url from "../assets/photo_url.png";
import useFetchData from "../../hook/useFetchData";
import { FaCheck } from "react-icons/fa";
import { BsCheck } from "react-icons/bs";

const CreateClientComponent = ({
  customButtonProps,
  showButtonProps,
  paddingProps,
  currentClientsList,
}) => {
  const { data } = useFetchData();
  const [isVisible, setIsVisible] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [client_registration_id, setClient_registration_id] = useState("");
  const [clientPhoneNumber, setClientPhoneNumber] = useState("");
  const [clientDescription, setClientDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isClientAlreadyExist, setIsClientAlreadyExist] = useState(false);
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const [clientCreatedSuccessfully, setClientCreatedSuccessfully] =
    useState(false);
  const [imageFile, setImageFile] = useState(null);

  const enterpriseId = data?.map((item) => item.id);

  const openDialog = () => {
    setIsVisible(true);
  };

  const onClose = () => {
    setIsVisible(false);
    resetValues();
    setClientCreatedSuccessfully(false);
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
    setClient_registration_id("");
    setImageFile(null);
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
      const enterpriseData = localStorage.getItem("user");
      if (!enterpriseData) {
        throw new Error("Enterprise reference ID not found in localStorage.");
      }
      const enterpriseReferenceId = JSON.parse(enterpriseData).uid;

      let photoUrl = null;
      if (imageFile) {
        const imageRef = ref(
          imageDb,
          `client_photos_${enterpriseReferenceId}/${client_registration_id}`
        );
        await uploadBytes(imageRef, imageFile);
        photoUrl = await getDownloadURL(imageRef);
      }

      const userRef = collection(db, `clients_${enterpriseReferenceId}`);

      await addDoc(userRef, {
        enterprise_referenceId: enterpriseReferenceId,
        name,
        email,
        client_registration_id,
        clientPhoneNumber,
        clientDescription,
        photo_url: photoUrl ? photoUrl : user_photo_url,
      });

      setClientCreatedSuccessfully(true);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentClientsList?.flat().includes(email)) {
      setIsClientAlreadyExist(true);
    } else {
      setIsClientAlreadyExist(false);
    }
  }, [email, currentClientsList]);

  const handleResetErrorMessage = () => {
    setErrorMessage("");
  };

  const handleChange = (e) => {
    const { value } = e.target;

    let formattedValue = value.replace(/[^\d]/g, "");

    if (formattedValue.length <= 11) {
      formattedValue = formattedValue.replace(
        /^(\d{3})(\d{1,3})?(\d{1,3})?(\d{1,2})?/,
        (match, group1, group2, group3, group4) => {
          let result = group1;
          if (group2) result += `.${group2}`;
          if (group3) result += `.${group3}`;
          if (group4) result += `-${group4}`;
          return result;
        }
      );
    } else {
      formattedValue = formattedValue.replace(
        /^(\d{2})(\d{1,3})?(\d{1,3})?(\d{1,4})?(\d{1,2})?/,
        (match, group1, group2, group3, group4, group5) => {
          let result = group1;
          if (group2) result += `.${group2}`;
          if (group3) result += `.${group3}`;
          if (group4) result += `/${group4}`;
          if (group5) result += `-${group5}`;
          return result;
        }
      );
    }

    setClient_registration_id(formattedValue);
  };

  const handleChangePhoneNumber = (event) => {
    const { value } = event.target;

    let formattedValue = value.replace(/[^\d]/g, "");

    formattedValue = formattedValue.replace(
      /^(\d{2})(\d{4,5})(\d{4})$/,
      (match, group1, group2, group3) => {
        let result = `(${group1}) `;
        if (group2) result += `${group2}-`;
        if (group3) result += `${group3}`;
        return result;
      }
    );

    setClientPhoneNumber(formattedValue);
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
            className={`bg-white p-4 rounded-lg flex flex-col w-[90%] md:w-[400px] h-[540px] z-50 ${
              paddingProps ? "pt-20" : "pt-5"
            } absolute`}
          >
            <div className="relative flex items-center justify-end mb-5">
              {!loading && !clientCreatedSuccessfully && (
                <h6 className="left-0 absolute">Criando cliente</h6>
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
                  {!loading && !clientCreatedSuccessfully && (
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
                  <Typography className="text-sm">Criando cliente</Typography>
                </div>
              </div>
            ) : (
              <>
                {clientCreatedSuccessfully ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <FaCheck size={24} className="text-green-400" />
                    <Typography className="text-sm">Pronto!</Typography>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 mt-5">
                    <div className="w-full">
                      <Input
                        label="Nome do Cliente"
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
                            setEmail(e.target.value);
                          }
                        }}
                        onInput={handleResetErrorMessage}
                        className={`${
                          isClientAlreadyExist ? "text-orange-500" : ""
                        }`}
                      />
                      <Typography
                        variant="small"
                        className="text-xs text-red-400 ml-3 mt-1"
                      >
                        {isClientAlreadyExist ? "Email já cadastrado!" : ""}
                      </Typography>
                    </div>
                    <div className="w-full">
                      <Input
                        type="text"
                        label="cnpj ou cpf"
                        name="cnpj"
                        value={client_registration_id}
                        maxLength={18}
                        minLength={11}
                        required
                        className="bg-white"
                        onChange={handleChange}
                      />
                      {client_registration_id.length === 0 ? (
                        ""
                      ) : client_registration_id.length === 14 ? (
                        <Typography
                          variant="small"
                          className="text-[10px] text-green-700 mt-2 flex"
                        >
                          CPF <BsCheck size={15} className="text-green-700" />
                        </Typography>
                      ) : client_registration_id.length === 18 ? (
                        <Typography
                          variant="small"
                          className="text-[10px] text-green-700 mt-2 flex"
                        >
                          CNPJ <BsCheck size={15} className="text-green-700" />
                        </Typography>
                      ) : (
                        ""
                      )}
                      <Typography
                        variant="small"
                        className="text-xs text-red-400 ml-3 mt-1"
                      >
                        {isClientAlreadyExist ? "Email já cadastrado!" : ""}
                      </Typography>
                    </div>
                    <div className="w-full">
                      <Input
                        label="Phone number"
                        required
                        value={clientPhoneNumber}
                        maxLength={15}
                        onChange={handleChangePhoneNumber}
                        onInput={handleResetErrorMessage}
                      />
                      <Typography
                        variant="small"
                        className="text-xs text-red-400 ml-3 mt-1"
                      >
                        {isClientAlreadyExist ? "Email já cadastrado!" : ""}
                      </Typography>
                    </div>

                    <div className="flex flex-col items-start gap-5 w-full">
                      <Textarea
                        value={clientDescription}
                        onChange={(e) => {
                          if (!/^\s+$/.test(e.target.value)) {
                            setClientDescription(e.target.value);
                          }
                        }}
                        placeholder="Enter description..."
                      />
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

export default CreateClientComponent;
