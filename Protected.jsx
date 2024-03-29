import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Protected() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      // Redirect to the login page if there's no token
      navigate("/login");
    }
  }, [token, navigate]);

  return token ? <Outlet /> : null; // You can also return a loading indicator or an empty component here
}
