import React, { useEffect, useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import useFetchData from "../../hook/useFetchData";
import { useLang } from "../../hook/LangContext";
import registerbg from "../assets/loginbg.jpg";
import { BsCheck } from "react-icons/bs";
import logo from "../assets/logo16.png";

export default function Register() {
  const { handleCreateEnterprise } = useFetchData();
  const { translations } = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailErrorMessage, setEmeilErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(userCredential.user);
      const user = userCredential.user;

      const userRef = collection(db, `enterpriseCode_${user.uid}`);

      await addDoc(userRef, {
        enterpriseCode: cnpj,
      });

      await updateProfile(auth.currentUser, {
        displayName: name,
      })
        .then(() => {
          console.log("Success");
        })
        .catch((error) => {
          console.error(error);
        });

      localStorage.setItem("token", user.getIdToken);
      localStorage.setItem("user", JSON.stringify(user));

      const userData = {
        name: name,
        email: email,
        registrationId: cnpj,
        enterprise_uid: user.uid,
      };

      handleCreateEnterprise.mutate(userData);
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
      setEmeilErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetErrorMessage = () => {
    setErrorMessage("");
  };
  const handleResetEmailErrorMessage = () => {
    setEmeilErrorMessage("");
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

    setCnpj(formattedValue);
  };

  return (
    <div
      className="w-full h-screen"
      style={{
        backgroundImage: `url(${registerbg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col justify-center items-center w-full h-full backdrop-blur-md bg-white/35">
        <div className="mb-10">
          <img
            className="h-11 w-fit object-cover object-center cursor-pointer"
            src={logo}
            alt="nature image"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-blue-gray-100 p-4 py-8 rounded-xl flex flex-col gap-5 backdrop-blur-md bg-white/70 shadow-md"
        >
          <Typography className="mb-5 text-gray-700">
            {translations.register_your_company}
          </Typography>
          <div className="w-72">
            <Typography className="text-gray-700 mb-2 text-md">
              {translations.company_name}
            </Typography>
            <Input
              type="text"
              label="Compny name"
              name="name"
              required
              className="bg-white"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="w-72">
            <Typography className="text-gray-700 mb-2 text-md">
              {translations.email_adress}
            </Typography>
            <Input
              type="email"
              label="Email Address"
              name="email"
              className="bg-white"
              required
              onChange={(e) => setEmail(e.target.value)}
              onInput={handleResetEmailErrorMessage}
            />
            <Typography
              variant="small"
              className="text-center text-xs text-red-200 mt-1"
            >
              {emailErrorMessage === "Firebase: Error (auth/invalid-email)."
                ? "Email inválido!"
                : ""}
            </Typography>
          </div>
          <div className="w-72">
            <Typography className="text-gray-700 mb-2 text-sm">
              CNPJ ou CPF
            </Typography>
            <Input
              type="text"
              label="cnpj ou cpf"
              name="cnpj"
              value={cnpj}
              maxLength={18}
              minLength={11}
              required
              className="bg-white"
              onChange={handleChange}
            />

            {cnpj.length === 0 ? (
              ""
            ) : cnpj.length === 14 ? (
              <Typography
                variant="small"
                className="text-[10px] text-green-700 mt-2 flex"
              >
                CPF <BsCheck size={15} className="text-green-700" />
              </Typography>
            ) : cnpj.length === 18 ? (
              <Typography
                variant="small"
                className="text-[10px] text-green-700 mt-2 flex"
              >
                CNPJ <BsCheck size={15} className="text-green-700" />
              </Typography>
            ) : (
              ""
            )}
          </div>
          <div className="w-72">
            <Typography className="text-gray-700 mb-2 text-md">
              {translations.create_password}
            </Typography>
            <Input
              type="password"
              label="Password"
              className="bg-white"
              required
              onChange={(e) => setPassword(e.target.value)}
              onInput={handleResetErrorMessage}
            />
            <Typography
              variant="small"
              className="text-center text-xs text-red-200 mt-1"
            >
              {errorMessage ===
              "Firebase: Password should be at least 6 characters (auth/weak-password)."
                ? "Sua senha precisa ter no mínimo 6 caracteres"
                : ""}
            </Typography>
          </div>
          <Button type="submit" className="w-full">
            {loading ? translations.loading : translations.make_register}
          </Button>
        </form>
        <Link to="/login" className="flex">
          <Typography className="mt-5 text-gray-900">
            {translations.login}
          </Typography>
        </Link>
      </div>
    </div>
  );
}
