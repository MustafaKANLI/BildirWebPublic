import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navTo = useNavigate();

  localStorage.clear();

  useEffect(() => {
    window.location.href = 'https://' + window.location.host;
  }, []);
  return <></>;
};

export default Logout;
