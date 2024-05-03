// import React, { useEffect, useRef, useState } from "react";
// import {
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
//   Avatar,
//   Typography,
//   Button,
//   Dialog,
//   DialogHeader,
//   DialogBody,
//   DialogFooter,
//   Input,
// } from "@material-tailwind/react";
// import { FaCircleUser } from "react-icons/fa6";
// import { useLang } from "../../hook/LangContext";
// import logo from "../assets/logo16.png";
// import { IoLanguageSharp } from "react-icons/io5";
// import useFetchData from "../../hook/useFetchData";
// import { RxGear } from "react-icons/rx";
// import NotificationMenuComponent from "./NotificationMenuComponent";

// export default function Header() {
//   const { data } = useFetchData();
//   const { language, switchLanguage, translations } = useLang();
//   const userString = localStorage.getItem("user");
//   const user = userString ? JSON.parse(userString) : null;
//   const [open, setOpen] = React.useState(false);
//   const [account_id, setAccount_id] = React.useState("");
//   const [settingMenu, setSettingMenu] = useState(false);
//   const settingsRef = useRef(null);

//   const handleClickOutside = (event) => {
//     if (settingsRef.current && !settingsRef.current.contains(event.target)) {
//       setSettingMenu(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleOpen = () => {
//     setOpen(!open);
//     setSettingMenu(false);
//   };

//   const DeleteAccountDialog = () => {
//     return (
//       <>
//         <Typography
//           onClick={handleOpen}
//           variant="gradient"
//           className="text-xs text-red-300 w-full cursor-pointer hover:bg-gray-200 transition-all p-1 rounded-sm"
//         >
//           Excluir conta
//         </Typography>
//         <Dialog
//           open={open}
//           handler={handleOpen}
//           className="rounded-lg overflow-hidden"
//         >
//           <DialogHeader className="flex flex-col items-start bg-red-50">
//             <Typography className="text-red-600 font-semibold text-[20px]">
//               Excluir essa conta?
//             </Typography>
//             <Typography className="text-red-500 text-[16px] mt-4">
//               Essa ação exclui permanentemente os dados desta conta, incluindo
//               todos os colaboradores aninhados
//             </Typography>
//           </DialogHeader>
//           <DialogBody>
//             <Typography className="text-black">
//               ID da conta:{" "}
//               <span className="uppercase font-semibold text-md">
//                 {data?.map((enterprise) => enterprise.enterprise_uid)}
//               </span>
//             </Typography>
//             <Typography className="text-black mt-4">
//               Insira o ID da conta para confirmar a exclusão dela:
//             </Typography>
//             <div className="w-72 mt-1">
//               <Input
//                 label="Insira o ID da conta aqui..."
//                 onChange={(e) => setAccount_id(e.target.value)}
//               />
//             </div>
//           </DialogBody>
//           <DialogFooter>
//             <Button
//               variant="text"
//               onClick={handleOpen}
//               className="mr-5 bg-gray-50 border-none outline-none"
//             >
//               <span className="text-gray-600">Cancel</span>
//             </Button>
//             <Button
//               disabled
//               className="bg-red-800 border-none outline-none"
//               onClick={handleOpen}
//             >
//               <span>Excluir</span>
//             </Button>
//           </DialogFooter>
//         </Dialog>
//       </>
//     );
//   };
//   const LanguageChangeComponent = () => {
//     return (
//       <Menu>
//         <MenuHandler>
//           <Button
//             variant="text"
//             className="p-[2px] px-[2px] m-0 bg-gray-400 w-12 h-7 flex overflow-hidden"
//           >
//             <div className="bg-gray-600 w-full h-full rounded-l-md text-white flex items-center justify-center">
//               <IoLanguageSharp size={18} />
//             </div>
//             <div className="bg-white w-full h-full rounded-r-md text-gray-600 flex items-center justify-center text-sm lowercase">
//               {language}
//             </div>
//           </Button>
//         </MenuHandler>

//         <MenuList>
//           <MenuItem onClick={() => switchLanguage("pt")} className="bg-white">
//             {translations.language_pt}
//           </MenuItem>
//           <MenuItem onClick={() => switchLanguage("en")} className="bg-white">
//             {translations.language_en}
//           </MenuItem>
//         </MenuList>
//       </Menu>
//     );
//   };

//   const SettingsComponent = () => {
//     return (
//       <div className="relative flex flex-col transition-all" ref={settingsRef}>
//         <div
//           className="bg-white z-10 rounded-full text-gray-600 w-7 h-7 flex items-center justify-center shadow-md cursor-pointer"
//           onClick={() => setSettingMenu(true)}
//         >
//           <RxGear size={22} />
//         </div>
//         <div
//           className={`absolute ${
//             settingMenu ? "flex" : "hidden"
//           } items-end shadow-md bg-gray-50 mt-8 w-24 h-12 right-0 rounded-[3px] p-1`}
//         >
//           {/* <Typography className="text-xs text-red-300 cursor-pointer">
//             Excluir conta
//           </Typography> */}
//           <DeleteAccountDialog />
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="h-30 bg-white fixed top-0 left-0 w-full z-30 flex flex-col items-center justify-between">
//       <div className="conaheader h-16 bg-white w-full z-10 flex items-center justify-between px-10">
//         <img
//           className="h-11 w-fit object-cover object-center cursor-pointer"
//           src={logo}
//           alt="nature image"
//         />
//         <div className="mt-4">
//           <div className="flex items-center gap-10">
//             <LanguageChangeComponent />
//             <div className="flex items-center gap-2">
//               <NotificationMenuComponent />
//               {data?.some(
//                 (enterpriseData) => enterpriseData.email !== user.email
//               ) ? (
//                 <>
//                   {user?.photoURL ? (
//                     <Avatar
//                       variant="circular"
//                       alt="tania andrew"
//                       size="xs"
//                       src={user?.photoURL}
//                     />
//                   ) : (
//                     <FaCircleUser size={27} color="lightgray" />
//                   )}
//                 </>
//               ) : (
//                 ""
//               )}

//               {/* <div className="bg-white rounded-full text-gray-600 w-7 h-7 flex items-center justify-center shadow-md cursor-pointer">
//                 <RxGear size={22} />
//               </div> */}
//               <SettingsComponent />
//             </div>
//           </div>
//           <Typography className="text-end text-[10px] text-gray-600 my-1">
//             {data && data.some((item) => item.name === user.displayName) ? (
//               data.map((item) => item.name)
//             ) : (
//               <span>
//                 <span className="text-green-400">{user.displayName}</span> -{" "}
//                 {data ? data.map((item) => item.name).join(", ") : ""}
//               </span>
//             )}
//           </Typography>
//         </div>
//       </div>
//       <div className="w-full h-10 hidden z-50"></div>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { FaCircleUser } from "react-icons/fa6";
import { useLang } from "../../hook/LangContext";
import logo from "../assets/logo16.png";
import { IoLanguageSharp } from "react-icons/io5";
import useFetchData from "../../hook/useFetchData";
import { RxGear } from "react-icons/rx";
import NotificationMenuComponent from "./NotificationMenuComponent";
import ThemeToggle from "../../themes/ThemeToggle";

const DeleteAccountDialog = ({
  open,
  onClose,
  accountId,
  setAccountId,
  enterpriseIdCode,
  data,
}) => {
  return (
    <Dialog
      open={open}
      handler={onClose}
      className="rounded-lg overflow-hidden"
    >
      <DialogHeader className="flex flex-col items-start bg-red-50">
        <Typography className="text-red-600 font-semibold text-[20px]">
          Excluir essa conta?
        </Typography>
        <Typography className="text-red-500 text-[16px] mt-4">
          Essa ação exclui permanentemente os dados desta conta, incluindo todos
          os colaboradores aninhados.
        </Typography>
      </DialogHeader>
      <DialogBody>
        <Typography className="text-black">
          ID da conta:
          <span className="uppercase font-semibold text-md">
            {data?.[0]?.enterprise_uid}
          </span>
        </Typography>
        <Typography className="text-black mt-4">
          Insira o ID da conta para confirmar a exclusão dela:
        </Typography>
        <div className="w-72 mt-1">
          <Input
            label="Insira o ID da conta aqui..."
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
          />
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          onClick={onClose}
          className="mr-5 bg-gray-50 border-none outline-none"
        >
          <span className="text-gray-600">Cancel</span>
        </Button>
        <Button
          // disabled={
          //   accountId?.toLowerCase() !== enterpriseIdCode?.toLowerCase()
          // }
          className="bg-red-800 border-none outline-none"
          onClick={onClose}
        >
          <span>Excluir</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

const LanguageChangeComponent = ({
  language,
  switchLanguage,
  translations,
}) => {
  return (
    <Menu>
      <MenuHandler>
        <Button
          variant="text"
          className="p-[2px] px-[2px] m-0 bg-gray-400 w-12 h-7 flex overflow-hidden"
        >
          <div className="bg-gray-600 w-full h-full rounded-l-md text-white flex items-center justify-center">
            <IoLanguageSharp size={18} />
          </div>
          <div className="bg-white w-full h-full rounded-r-md text-gray-600 flex items-center justify-center text-sm lowercase">
            {language}
          </div>
        </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem onClick={() => switchLanguage("pt")} className="bg-white">
          {translations.language_pt}
        </MenuItem>
        <MenuItem onClick={() => switchLanguage("en")} className="bg-white">
          {translations.language_en}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const SettingsComponent = ({ onOpenDialog, settingsRef }) => {
  const [settingMenu, setSettingMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [settingsRef]);

  return (
    <div className="relative flex flex-col transition-all" ref={settingsRef}>
      <div
        className="bg-white z-10 rounded-full text-gray-600 w-7 h-7 flex items-center justify-center shadow-md cursor-pointer"
        onClick={() => setSettingMenu(!settingMenu)}
      >
        <RxGear size={22} />
      </div>
      <div
        className={`absolute ${
          settingMenu ? "flex" : "hidden"
        } items-end shadow-md bg-gray-50 mt-8 w-24 h-12 right-0 rounded-[3px] p-1`}
      >
        <Typography
          className="text-xs text-red-300 cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all p-1 rounded-sm w-full text-center"
          onClick={onOpenDialog}
        >
          Excluir conta
        </Typography>
      </div>
    </div>
  );
};

export default function Header() {
  const { data, isDarkTheme, setIsDarkTheme } = useFetchData();
  const { language, switchLanguage, translations } = useLang();
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const enterpriseIdCode = data?.[0]?.enterprise_uid;
  // console.log("pass:", user);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [accountId, setAccountId] = useState("");
  const settingsRef = useRef(null);

  const handleDialogToggle = () => {
    setDialogOpen(!dialogOpen);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem("isDarkTheme", newTheme.toString());
  };

  return (
    <div className="h-30 bg-white fixed top-0 left-0 w-full z-30 flex flex-col items-center justify-between">
      <div className="conaheader h-16 bg-white w-full z-10 flex items-center justify-between px-10">
        <img
          className="h-11 w-fit object-cover object-center cursor-pointer"
          src={logo}
          alt="nature image"
        />
        <div className="mt-4">
          <div className="flex items-center gap-10">
            {/* <ThemeToggle toggleTheme={toggleTheme} /> */}
            <LanguageChangeComponent
              language={language}
              switchLanguage={switchLanguage}
              translations={translations}
            />
            <div className="flex items-center gap-2">
              <NotificationMenuComponent />
              {data?.some(
                (enterpriseData) => enterpriseData.email !== user.email
              ) ? (
                <>
                  {user?.photoURL ? (
                    <Avatar
                      variant="circular"
                      alt="Avatar"
                      size="xs"
                      src={user?.photoURL}
                    />
                  ) : (
                    <FaCircleUser size={27} color="lightgray" />
                  )}
                </>
              ) : null}
              <SettingsComponent
                onOpenDialog={handleDialogToggle}
                settingsRef={settingsRef}
              />
            </div>
          </div>
          <Typography className="text-end text-[10px] text-gray-600 my-1">
            {data?.some((item) => item.name === user.displayName) ? (
              data.map((item) => item.name).join(", ")
            ) : (
              <span>
                <span className="text-green-400">{user.displayName}</span> -{" "}
                {data ? data.map((item) => item.name).join(", ") : ""}
              </span>
            )}
          </Typography>
        </div>
      </div>
      <div className="w-full h-10 hidden z-50" />
      <DeleteAccountDialog
        open={dialogOpen}
        onClose={handleDialogToggle}
        accountId={accountId}
        setAccountId={setAccountId}
        data={data}
        enterpriseIdCode={enterpriseIdCode}
      />
    </div>
  );
}
