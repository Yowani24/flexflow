import React, { useState, useEffect, createContext, useContext } from "react";
import "firebase/auth";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import useFetchData from "../hook/useFetchData";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = getAuth();
  const [session, setSession] = useState(null);
  const { setEnterprise_referenceId } = useFetchData();
  const navigate = useNavigate();
  let logoutTimer;

  // Function to handle user logout
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("enterprise_referenceId");
    setEnterprise_referenceId([]);
    localStorage.removeItem("selectedProject");
    localStorage.removeItem("pageReloaded");
  };

  const resetLogoutTimer = () => {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    if (localStorage.getItem("user")) {
      logoutTimer = setTimeout(() => {
        handleLogout();
        navigate("/session_expired");
      }, 24 * 60 * 60 * 1000);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && localStorage.getItem("user")) {
        setSession(user);
        resetLogoutTimer();
      } else {
        setSession(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        clearTimeout(logoutTimer);
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(logoutTimer);
    };
  }, []);

  useEffect(() => {
    const activityListener = () => {
      resetLogoutTimer();
    };

    window.addEventListener("mousemove", activityListener);
    window.addEventListener("keydown", activityListener);

    return () => {
      window.removeEventListener("mousemove", activityListener);
      window.removeEventListener("keydown", activityListener);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
