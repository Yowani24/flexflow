import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { BsBuildingFillAdd } from "react-icons/bs";
import { IoMdCheckmark } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import useFetchData from "../../hook/useFetchData";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLang } from "../../hook/LangContext";
import toast, { Toaster } from "react-hot-toast";

export default function CreateProject() {
  const { data, handleCreateProject, allClients } = useFetchData();
  const { translations } = useLang();
  const [open, setOpen] = useState(false);
  const userString = localStorage.getItem("user");
  const enterprise_referenceId = userString ? JSON.parse(userString) : null;

  const notify = () => toast.success("Successfully toasted!");

  //   <ToastBar
  //   toast={t}
  //   style={{}} // Overwrite styles
  //   position="top-center" // Used to adapt the animation
  // />

  const enterpriseId = data.map((item) => item.id);

  const handleOpen = () => setOpen((cur) => !cur);

  const Formik = useFormik({
    initialValues: {
      name: "",
      client_name: "",
      user_created: enterprise_referenceId.email,
      enterpriseId: parseInt(enterpriseId.join("")),
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        handleCreateProject.mutate(values);
        resetForm();
        handleOpen();
        notify();
      } catch (error) {
        console.error(error.message);
      }
    },
  });

  return (
    <>
      {data.some(
        (enterpriseData) =>
          enterpriseData.email !== enterprise_referenceId.email
      ) ? (
        ""
      ) : (
        <Button
          onClick={handleOpen}
          className="flex items-center gap-3 rounded-full"
          size="sm"
        >
          <BsBuildingFillAdd className="h-4 w-4 " />{" "}
          <span className="normal-case tracking-wide">
            {translations.add_project}
          </span>
        </Button>
      )}

      <Dialog size="xs" open={open} className="bg-transparent shadow-none">
        <Card className="mx-auto w-full max-w-[30rem]">
          <form className="flex flex-col gap-5" onSubmit={Formik.handleSubmit}>
            <CardBody className="flex flex-col gap-4 pb-10">
              <div className="flex items-center justify-between mb-5">
                <Typography variant="h5" color="blue-gray">
                  {translations.creating_project}
                </Typography>
                <div>
                  <button onClick={notify}>Make me a toast</button>
                  <Toaster />
                </div>

                <div className="flex items-center gap-2 self-end">
                  <Button
                    type="submit"
                    disabled={Formik.isSubmitting}
                    className="bg-green-400 hover:bg-green-500 group transition-all border-none min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                  >
                    <IoMdCheckmark
                      size={18}
                      className="text-white transition-all"
                    />
                  </Button>

                  <div
                    onClick={handleOpen}
                    className="bg-gray-200 group transition-all hover:bg-[rgb(122,114,219)] min-w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                  >
                    <IoCloseSharp className="text-gray-600 group-hover:text-white transition-all" />
                  </div>
                </div>
              </div>

              <Input
                label={translations.project_name}
                name="name"
                size="lg"
                required
                onChange={Formik.handleChange}
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
            </CardBody>
          </form>
        </Card>
      </Dialog>
    </>
  );
}
