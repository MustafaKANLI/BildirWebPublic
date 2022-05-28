import React, { useState, useEffect } from "react";
import classes from "./CommunityCard.module.css";
import { TiLocation } from "react-icons/ti";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";

const CommunityCard = (props) => {
  const [followingState, setfollowingState] = useState("");

  useEffect(() => {
    setfollowingState(props.followingState);
    console.log(props.followingState);
  }, []);

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
            communityId: props.id,
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
        "https://bildir.azurewebsites.net/api/v1/Student/AddFollowedCommunity",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            communityId: props.id,
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
  const communityCardClickHandler = (id) => {};
  return (
    <div onClick={communityCardClickHandler.bind(null, props.id)}>
      <Link to={`/community/${props.id}`} className={classes.link}>
        <div className={classes.card}>
          <div className={classes.cardImage}></div>

          <div className={classes.cardContent}>
            <h1 className={classes.cardHeader}>{props.cardTitle}</h1>
            <p>{props.communityText}</p>
            <div className={classes.cardDetail}>
              {/* <div>
                <TiLocation />
                {props.location}
              </div> */}
              <div>{props.tags}</div>

              {followingState === "Followed" && (
                <Button title="Takipten Çık" onClick={disJoinButtonHandler} />
              )}
              {followingState === "Unfollowed" && (
                <Button title="Takip Et" onClick={joinButtonHandler} />
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CommunityCard;
