import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../../components/Button/Button";
import classes from "./Community.module.css";
import { TiLocation } from "react-icons/ti";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import Slideshow from "../../components/Slider/Slideshow";
import Logo from "../../logo/logo_1.svg";

const Community = () => {
  const [community, setCommunity] = useState({});
  const location = useLocation().pathname.split("/").at(-1);
  const [followingState, setfollowingState] = useState("Unfollowed");

  const joinButtonHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (!localStorage.getItem("token")) console.error("Not logged in");
      if (localStorage.getItem("role") !== "Student")
        console.error("Only students can join");

      const userResponse = await fetch(
        "https://bildir.azurewebsites.net/api/v1/Student/CurrentlyLoggedIn",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const userJson = await userResponse.json();
      const userId = userJson.data.id;

      const registerResponse = await fetch(
        "https://bildir.azurewebsites.net/api/v1/Student/AddFollowedCommunity",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            communityId: location,
            studentId: userId,
          }),
        }
      );

      const registerJson = await registerResponse.json();
      console.log(registerJson);
      setfollowingState("Followed");
    } catch (ex) {
      console.log(ex);
    }
  };

  const disJoinButtonHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (!localStorage.getItem("token")) console.error("Not logged in");
      if (localStorage.getItem("role") !== "Student")
        console.error("Only students can join");

      const userResponse = await fetch(
        "https://bildir.azurewebsites.net/api/v1/Student/CurrentlyLoggedIn",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const userJson = await userResponse.json();
      const userId = userJson.data.id;

      const registerResponse = await fetch(
        "https://bildir.azurewebsites.net/api/v1/Student/RemoveFollowedCommunity",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            communityId: location,
            studentId: userId,
          }),
        }
      );

      const registerJson = await registerResponse.json();
      console.log(registerJson);
      setfollowingState("Unfollowed");
    } catch (ex) {
      console.log(ex);
    }
  };

  const fetching = async () => {
    const response = await fetch(
      `https://bildir.azurewebsites.net/api/v1/Community/${location}`
    );
    const data = await response.json();
    console.log(data);
    setCommunity(data.data);
  };

  const buttonCreate = () => {
    if (followingState === "Followed")
      return <Button title="Takipten Çık" onClick={disJoinButtonHandler} />;
    else return <Button title="Takip Et" onClick={joinButtonHandler} />;
  };

  useEffect(() => {
    fetching();
  }, []);

  const buttonClickHandler = () => {};

  return (
    <div className={classes.eventPage}>
      <div className={classes.eventPageHeader}>
        <h1>{community.name}</h1>
        {buttonCreate()}
      </div>
      <div className={classes.eventPageDetail}>
        <Link to="/">
          <img className={classes.logo} src={Logo} />
        </Link>
        {/* <div>
          <TiLocation />
          Akdeniz Üniversitesi
        </div> */}
        {/* <div>{community.tags}</div> */}
      </div>
      <div>{community.description}</div>

      <div className={classes.slider}>
        <Slideshow
          imgs={[
            "https://images.unsplash.com/photo-1585255318859-f5c15f4cffe9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500",
            "https://images.unsplash.com/photo-1584226761916-3fd67ab5ac3a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500",
            "https://images.unsplash.com/photo-1585179292338-45ba1f62f082?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500",
            "https://images.unsplash.com/photo-1584753987666-ead137ec0614?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500",
            "https://images.unsplash.com/photo-1584691267914-91c0bee55964?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500",
            "https://images.unsplash.com/photo-1585084335487-f653d0859c14?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500",
            "https://images.unsplash.com/photo-1583217874534-581393fd5325?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500",
          ]}
        />
      </div>
    </div>
  );
};

export default Community;
