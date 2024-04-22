import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { IoCloseSharp } from "react-icons/io5";
import {
  Button,
  Input,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import { IoMdCheckmark } from "react-icons/io";
import useFetchData from "../../hook/useFetchData";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLang } from "../../hook/LangContext";
import toast, { Toaster } from "react-hot-toast";

const CreateProjectComponent = ({
  customButtonProps,
  showButtonProps,
  paddingProps,
}) => {
  const { data, handleCreateProject, allClients } = useFetchData();
  const [isVisible, setIsVisible] = useState(false);

  const { translations } = useLang();
  const userString = localStorage.getItem("user");
  const enterprise_referenceId = userString ? JSON.parse(userString) : null;

  const enterpriseId = data?.map((item) => item.id);

  const openDialog = () => {
    setIsVisible(true);
  };

  const onClose = () => {
    setIsVisible(false);
  };

  const Formik = useFormik({
    initialValues: {
      name: "",
      client_name: "",
      user_created: enterprise_referenceId.email,
      enterpriseId: parseInt(enterpriseId?.join("")),
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        handleCreateProject.mutate(values);
        resetForm();
        onClose();
        toast.success("Successfully toasted!");
      } catch (error) {
        console.error(error.message);
      }
    },
  });

  const { opacity, transform } = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0%)" : "translateY(0%)",
    onRest: () => {
      if (!isVisible) {
        setIsVisible(false);
      }
    },
  });

  return (
    <>
      <div className="" onClick={openDialog}>
        {data?.some(
          (enterpriseData) =>
            enterpriseData.email !== enterprise_referenceId.email
        ) ? (
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
            onSubmit={Formik.handleSubmit}
            className={`bg-white p-4 rounded-lg flex flex-col w-[90%] md:w-[400px] h-[250px] z-50 ${
              paddingProps ? "pt-20" : "pt-5"
            } absolute`}
          >
            <div className="flex items-center justify-between mb-5">
              <Typography variant="h5" color="blue-gray">
                {translations.creating_project}
              </Typography>
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
                  {Formik.isSubmitting ? (
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
              <Input
                label={translations.project_name}
                name="name"
                size="lg"
                required
                // onChange={Formik.handleChange}
                onChange={(e) => {
                  if (!/^\s+$/.test(e.target.value)) {
                    Formik.handleChange(e);
                  }
                }}
                value={Formik.values.name}
              />

              <Select
                label={translations.select_client}
                name="client_name"
                onChange={(selectedValue) => {
                  Formik.handleChange({
                    target: {
                      name: "client_name",
                      value: selectedValue,
                    },
                  });
                }}
                value={Formik.values.client_name}
              >
                {allClients.map((item) => (
                  <Option key={item.id} value={item.cnpj}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
          </form>
        </animated.div>
      )}
    </>
  );
};

export default CreateProjectComponent;
