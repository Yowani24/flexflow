import React from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import logo from "../assets/logo16.png";
import { HiShieldExclamation } from "react-icons/hi2";
import { useAuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RecreateAccount() {
  const { handleLogout } = useAuthContext();
  const navigate = useNavigate();

  const handleSignout = () => {
    handleLogout();
    navigate("/login");
  };
  return (
    <div className="w-full h-screen bg-[#F5F7FA] flex flex-col items-center pt-40 px-4">
      <div className="mb-10">
        <img
          className="h-11 w-fit object-cover object-center cursor-pointer"
          src={logo}
          alt="nature image"
        />
      </div>
      <Card className="md:w-[500px] p-4 px-10">
        <Typography className="text-3xl self-center">
          <HiShieldExclamation className="text-orange-400" />
        </Typography>
        <Typography className="text-center text-lg mt-5">
          Houve uma inconsistência ao cadastrar seus dados.
        </Typography>
        <Typography className="text-center mt-5">
          Recomendamos que{" "}
          <span className="font-semibold">"refaça seu cadastro"</span> se for
          uma empresa. Se não for esse o caso, por favor clique em{" "}
          <span className="font-semibold">"Sair"</span> e entre em contato com
          seu gerente.
        </Typography>
        <div className="self-center flex items-center gap-5">
          <Button
            variant="text"
            className="bg-[#9599e2] hover:bg-[#6268df] normal-case border-none text-white hover:text-white font-medium text-md w-fit self-center mt-10 p-5 py-1 rounded-md shadow-sm hover:shadow-md"
          >
            Refazer cadastro
          </Button>

          <Button
            onClick={handleSignout}
            variant="text"
            className="bg-[#d67e7e] hover:bg-[#af5555] normal-case border-none text-white hover:text-white font-medium text-md w-fit self-center mt-10 p-5 py-1 rounded-md shadow-sm hover:shadow-md"
          >
            Sair
          </Button>
        </div>
      </Card>
    </div>
  );
}
