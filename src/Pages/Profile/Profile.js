import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./Profile.module.css";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState({});

  const fetching = async () => {
    let participations = null;
    if (localStorage.getItem("role") === "Student") {
      const userResponse = await fetch(
        "https://bildir.azurewebsites.net/api/v1/Student/CurrentlyLoggedIn",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const userJson = await userResponse.json();
      setUser(userJson.data);
    }
  };
  useEffect(() => {
    fetching();
  }, []);
  console.log(user);

  return (
    <div className={classes.wrapper}>
      <div className={classes.section}>
        <div className={classes.profile}>
          <div className={classes.profileIcon}>
            <FaUserCircle></FaUserCircle>
          </div>
          <div className={classes.profileInfo}>
            <h3>{user.firstName}</h3>
            <p>{user.schoolEmail}</p>
            <p>{user.department}</p>
          </div>
        </div>

        <div className={classes.content}>
          <Link to="/profile/registeredEvents">
            <div className={classes.link}>Katıldığım Etkinlikler</div>
          </Link>
          <Link to="/profile/followedCommunities">
            <div className={classes.link}>Takip Ettiğim Topluluklar</div>
          </Link>
          <Link to="/logout">
            <div className={classes.link}>Çıkış Yap</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
