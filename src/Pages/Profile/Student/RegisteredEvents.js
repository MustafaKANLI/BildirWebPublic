import React, { useState, useEffect } from "react";
import { BsDashCircleFill } from "react-icons/bs";
import EventCard from "../../../components/Card/EventCard/EventCard";
import classes from "./RegisteredEvents.module.css";

const RegisteredEvents = () => {
  const [events, setEvents] = useState([]);

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
      participations = userJson.data.participatedEvents;
      setEvents(participations);
    }
  };
  useEffect(() => {
    fetching();
  }, []);

  return (
    <div className={classes.homePage}>
      {events.map((e) => (
        <EventCard
          eventTitle={e.title}
          key={e.id}
          id={e.id}
          state={e.state}
          participationState={e.participationState}
          eventText={e.description}
          location={e.location}
          tags={e.tags}
          date={e.date}
        />
      ))}
      {/* <EventCard eventTitle={"sada"} /> */}
    </div>
  );
};

export default RegisteredEvents;
