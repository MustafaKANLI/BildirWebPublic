import React, { useState, useEffect } from "react";
import classes from "./EventCard.module.css";
import { TiLocation } from "react-icons/ti";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";

const EventCard = (props) => {
  
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

      console.log(userJson);

      const registerResponse = await fetch(
        "https://bildir.azurewebsites.net/api/v1/Student/RegisterToEvent",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventId: props.id,
            studentId: userId,
          }),
        }
      );

      const registerJson = await registerResponse.json();
      console.log(registerJson);
    } catch (ex) {
      console.log(ex);
    }
  };

  const eventCardClickHandler = (id) => {};

  const button = () => {
    if(props.state === "Active") {
      if(!localStorage.getItem("token")) return (<Button title="Katıl" onClick={joinButtonHandler} />);

      if(!props.participationState) return (<Button title="Katıl" onClick={joinButtonHandler} />);
      if(props.participationState === "Participating") return (<Button title="İptal Et" onClick={joinButtonHandler} />);
      if(props.participationState === "Abandoned") return (<Button title="Katıl" onClick={joinButtonHandler} />);

    }
  }

  return (
    <div onClick={eventCardClickHandler.bind(null, props.id)}>
      <Link to={`/event/${props.id}`} className={classes.link}>
        <div className={classes.card}>
          <div className={classes.cardImage}></div>

          <div className={classes.cardContent}>
            <h1 className={classes.cardHeader}>{props.eventTitle}</h1>
            <p>{props.eventText}</p>
            <div className={classes.cardDetail}>
              <div>
                <BsFillCalendarCheckFill />
                {props.date}
              </div>
              <div>
                <TiLocation />
                {props.location}
              </div>
              <div>{props.tags}</div>

              <Button title="Katıl" onClick={joinButtonHandler} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
