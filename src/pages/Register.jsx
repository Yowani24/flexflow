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

export default function Register() {
  const { handleCreateEnterprise } = useFetchData();
  const { translations } = useLang();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [loading, setLoading] = useState(false);

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
    } finally {
      setLoading(false);
    }
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
        <form
          onSubmit={handleSubmit}
          className="bg-blue-gray-100 p-4 py-8 rounded-xl flex flex-col gap-5 backdrop-blur-md bg-white/70 shadow-md"
        >
          <Typography className="mb-5">
            {translations.register_your_company}
          </Typography>
          <div className="w-72">
            <Typography className="text-gray-700 mb-2">
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
            <Typography className="text-gray-700 mb-2">
              {translations.email_adress}
            </Typography>
            <Input
              type="email"
              label="Email Address"
              name="email"
              className="bg-white"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-72">
            <Typography className="text-gray-700 mb-2">Cnpj</Typography>
            <Input
              type="text"
              label="cnpj"
              name="cnpj"
              required
              className="bg-white"
              onChange={(e) => setCnpj(e.target.value)}
            />
          </div>
          <div className="w-72">
            <Typography className="text-gray-700 mb-2">
              {translations.create_password}
            </Typography>
            <Input
              type="password"
              label="Password"
              className="bg-white"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            {loading ? translations.loading : translations.make_register}
          </Button>
        </form>
        <Link to="/login" className="flex">
          <Typography className="mt-5">{translations.login}</Typography>
        </Link>
      </div>
    </div>
  );
}
