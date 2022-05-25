import React, { useState, useEffect } from "react";
import { BsDashCircleFill } from "react-icons/bs";
import EventCard from "../../components/Card/EventCard/EventCard";
import classes from "./HomePage.module.css";

const HomePage = () => {
  const [events, setEvents] = useState([]);

  const fetching = async () => {
    const response = await fetch(
      "https://bildir.azurewebsites.net/api/v1/Event"
    );
    const data = await response.json();

    console.log(data.data);
    setEvents(data.data);
  };
  useEffect(() => {
    fetching();
  }, []);

  console.log("sdfddf", events);

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

export default HomePage;
