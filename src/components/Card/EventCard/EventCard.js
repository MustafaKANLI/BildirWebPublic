import React, { useState, useEffect } from "react";
import classes from "./EventCard.module.css";
import { TiLocation } from "react-icons/ti";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";
import ButtonDisabled from "../../Button/ButtonDisabled";

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

const EventCard = (props) => {
  const [participationState, setParticipationState] = useState("");

  useEffect(() => {
    setParticipationState(props.participationState);
  }, [props.participationState]);

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
      setParticipationState("Participating");
    } catch (ex) {
      console.log(ex);
    }
  };

  const eventCardClickHandler = (id) => {};

  const leaveButtonHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (!localStorage.getItem("token")) console.error("Not logged in");
      if (localStorage.getItem("role") !== "Student")
        console.error("Only students can abandon");

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

      const abandonResponse = await fetch(
        "https://bildir.azurewebsites.net/api/v1/Student/AbandonEvent",
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

      const abandonJson = await abandonResponse.json();
      setParticipationState("Abandoned");
    } catch (ex) {
      console.log(ex);
    }
  };

  const generateButton = () => {
    if (props.state === "Active") {
      if (!localStorage.getItem("token"))
        <Link to="/login">
          <Button title="Katıl" onClick={joinButtonHandler} />;
        </Link>;

      if (localStorage.getItem("role") !== "Student") return;

      if (!participationState || participationState === "Abandoned")
        return <Button title="Katıl" onClick={joinButtonHandler} />; // redirect to login

      if (participationState === "Participating")
        return <Button title="Ayrıl" onClick={leaveButtonHandler} />;
    } else if (props.state === "Canceled")
      return <ButtonDisabled title="Etkinlik iptal edildi" />;
    else if (props.state === "Ended")
      return <ButtonDisabled title="Etkinlik sona erdi" />;
  };

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

              {generateButton()}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
