import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { PiDotsNineBold } from "react-icons/pi";
import useFetchData from "../../hook/useFetchData";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaUserTie } from "react-icons/fa";

export default function AddRoles() {
  const { data, handleCreateRole, handleDeleteRole } = useFetchData();

  const speech = new SpeechSynthesisUtterance();
  speech.text = "Olá!, Seja bem-vindo ao Samba workflow";
  speech.lang = "en-US";

  const handleSpeech = () => {
    window.speechSynthesis.speak(speech);
  };

  const Formik = useFormik({
    initialValues: {
      name: "",
      enterprise_id: data?.map((enterprise) => enterprise.id)[0],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        handleCreateRole.mutate(values);
        resetForm();
      } catch (error) {
        console.error(error.message);
      }
    },
  });

  const handleDeleteRoleFn = (id) => {
    try {
      handleDeleteRole.mutate(id);
    } catch (error) {
      console.error(error.message);
    }
  };

  const RoleList = ({ roles }) => {
    return (
      <div>
        {roles?.length === 0 ? (
          <Typography className="text-orange-400 text-xs">No roles</Typography>
        ) : (
          <>
            {roles
              ?.filter((role_name) =>
                role_name?.name
                  .toLowerCase()
                  .startsWith(Formik.values.name.toLowerCase())
              )
              .sort()
              .map((role) => (
                <div key={role?.id} className="flex items-center gap-1">
                  <div className="flex items-center gap-1 transition-all group hover:text-orange-500 mb-2 h-5 py-3">
                    <PiDotsNineBold size={18} />
                    <div className="cursor-default text-sm">{role?.name}</div>
                    <Button
                      onClick={() => handleDeleteRoleFn(role?.id)}
                      variant="text"
                      className="p-0 ml-2 hidden group-hover:flex hover:text-red-300 outline-none border-none"
                    >
                      <IoRemoveCircleOutline
                        size={20}
                        className="marker:cursor-pointer"
                      />
                    </Button>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    );
  };

  const alreadyExists = data?.flatMap((enterprise) =>
    enterprise.roles.map((item) => item?.name.toLowerCase())
  );
  return (
    <div className="mt-10">
      {/* <button onClick={handleSpeech}>Speak</button> */}
      <div className="flex items-start gap-1 mb-2">
        <FaUserTie size={18} />
        <Typography className="font-semibold">Add role</Typography>
      </div>

      <form
        onSubmit={Formik.handleSubmit}
        className="flex items-center gap-4 w-72"
      >
        <input
          type="text"
          name="name"
          placeholder="add role..."
          className="w-full md:w-[250px] bg-white px-2 h-8 border-[1px] rounded-md border-[#11BEF4]"
          onChange={(e) => {
            if (!/^\s+$/.test(e.target.value)) {
              Formik.handleChange(e);
            }
          }}
          value={Formik.values.name}
        />
        <Button
          type="submit"
          disabled={
            Formik.values.name.length === 0 ||
            JSON.stringify(alreadyExists).includes(
              Formik.values.name.toLowerCase().trimEnd()
            )
          }
          variant="outlined"
          className="text-lg p-0 min-w-8 min-h-8 border-[#11BEF4] font-normal"
        >
          +
        </Button>
      </form>

      <div className="mt-4">
        {data?.map((enterprise) => (
          <div key={enterprise.id}>
            <RoleList roles={enterprise?.roles} />
          </div>
        ))}
      </div>
    </div>
  );
}
