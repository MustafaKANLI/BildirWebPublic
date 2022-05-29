import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navTo = useNavigate();

  localStorage.clear();

  useEffect(() => {
    window.location.href = "http://" + window.location.host;
    //navTo("/");
  }, []);
  return <></>;
};

export default Logout;
