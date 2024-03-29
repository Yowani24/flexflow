import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import loginbg from "../assets/loginbg.jpg";
import { useLang } from "../../hook/LangContext";

export default function Login() {
  const { translations } = useLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      localStorage.setItem("token", await user.getIdToken());
      localStorage.setItem("user", JSON.stringify(user));
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
        backgroundImage: `url(${loginbg})`,
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
            {translations.log_in_with_your_account}
          </Typography>
          <div className="w-72">
            <Typography className="text-gray-700 mb-2">Email</Typography>
            <Input
              type="email"
              label={translations.email_adress}
              className="bg-white border-blue-gray-50"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-72">
            <Typography className="text-gray-700 mb-2">
              {translations.password}
            </Typography>
            <Input
              type="password"
              label={translations.password}
              className="bg-white border-blue-gray-50"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            {loading ? translations.loading : translations.login}
          </Button>
        </form>
        <Link to="/register" className="flex">
          <Typography className="mt-5">{translations.register}</Typography>
        </Link>
      </div>
    </div>
  );
}
