import React, { useState, useEffect } from "react";
import { BsDashCircleFill } from "react-icons/bs";
import EventCard from "../../components/Card/EventCard/EventCard";
import classes from "./HomePage.module.css";

const HomePage = () => {
  const [events, setEvents] = useState([]);

  const fetching = async () => {
    let participations = null;
    let followedCommunities = null;
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
      followedCommunities = userJson.data.followedCommunities;
    }

    const response = await fetch(
      "https://bildir.azurewebsites.net/api/v1/Event"
    );

    const data = await response.json();
    let mappedEvents = data.data;

    if (participations)
      mappedEvents = data.data
        .map((e) => {
          let foundEvent = participations.find((p) => p.id === e.id);
          if (foundEvent) e.participationState = foundEvent.participationState;
          return e;
        })
        .map((e) => {
          let foundCommunity = followedCommunities.find(
            (c) => c.id === e.eventOf.id
          );
          if (foundCommunity) e.eventOfFollowedCommunity = true;
          else e.eventOfFollowedCommunity = false;
          return e;
        })
        .sort((e1, e2) => {
          if (e1.state === "Active" && e2.state !== "Active") return -1;
          else if (e1.state !== "Active" && e2.state === "Active") return 1;
          else if (e1.state === "Active" && e2.state === "Active") {
            if (e1.eventOfFollowedCommunity && !e2.eventOfFollowedCommunity)
              return -1;
            else if (
              !e1.eventOfFollowedCommunity &&
              e2.eventOfFollowedCommunity
            )
              return 1;
            else return 0;
          }
        });

    if (!localStorage.getItem("token")) {
      mappedEvents = mappedEvents.sort((e1, e2) => {
        if (e1.state === "Active" && e2.state !== "Active") return -1;
        else if (e1.state !== "Active" && e2.state === "Active") return 1;
        else if (e1.state === "Active" && e2.state === "Active") return 0;
      });
    }

    setEvents(mappedEvents);
  };
  useEffect(() => {
    fetching();
  }, []);

  return (
    <div className={classes.homePage}>
      {events.map((e) => (
        <EventCard key={e.id} event={e} />
      ))}
    </div>
  );
};

export default HomePage;
