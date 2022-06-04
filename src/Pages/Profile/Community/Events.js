import React, { useState, useEffect } from "react";
import { BsDashCircleFill } from "react-icons/bs";
import EventCard from "../../../components/Card/EventCard/EventCard";
import classes from "./Events.module.css";

const Events = () => {
  const [events, setEvents] = useState([]);

  const fetching = async () => {
    const userResponse = await fetch(
      "https://bildir.azurewebsites.net/api/v1/Community/CurrentlyLoggedIn",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const userJson = await userResponse.json();
    setEvents(userJson.data.organizedEvents);
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

export default Events;
