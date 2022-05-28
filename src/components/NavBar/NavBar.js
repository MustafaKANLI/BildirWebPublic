import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from "./Navbar.module.css";
import Logo from "../../logo/logo_2.svg";
import HomePage from "../../Pages/Home/HomePage";

const NavBar = (props) => {
  const location = useLocation().pathname;
  const [user, setUser] = useState(null);

  const active = (url) => {
    if (location.includes(url)) {
      return classes.active;
    }
  };

  const fetching = async () => {
    const userResponse = await fetch(
      "https://bildir.azurewebsites.net/api/v1/Student/CurrentlyLoggedIn",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const userJson = await userResponse.json();
    userJson.succeeded === true && setUser(userJson.data);
  };
  console.log("User: ", user);

  useEffect(() => {
    fetching();
  }, []);

  return (
    <header className={classes.header}>
      <div className={classes.navBar}>
        <Link to="/">
          <img className={classes.logo} src={Logo} />
        </Link>

        <>
          <Link to="/">
            <div className={`${classes.link}  `}>Events</div>
          </Link>

          <Link to="/communities">
            <div className={`${classes.link} `}>Communities</div>
          </Link>
        </>
      </div>
      <div className={classes.profileBar}>
        {user !== null && (
          <Link to="/profile">
            <div className={classes.profileName}>
              <div className={classes.nameFont}>{user.firstName}</div>
            </div>
          </Link>
        )}
        {user === null && (
          <Link to="/login">
            <div className={classes.profileName}>
              <div className={classes.nameFont}>Login</div>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default NavBar;
