import React, { useState, useEffect } from "react";
import CommunityCard from "../../../components/Card/CommunityCard/CommunityCard";
import classes from "./CommunitiesPage.module.css";

const CommunityPage = () => {
  const [events, setEvents] = useState([]);

  const fetching = async () => {
    const response = await fetch("http://127.0.0.1:11111/api/v1/Community");
    const data = await response.json();

    console.log(data.data[0].title);
    setEvents(data.data);
  };
  useEffect(() => {
    fetching();
  }, []);
  return (
    <div className={classes.homePage}>
      {events.map((e) => (
        <CommunityCard
          eventTitle={e.title}
          key={e.id}
          id={e.id}
          eventText={e.description}
          location={e.location}
          tags={e.tags}
          date={e.date}
        />
      ))}
    </div>
  );
};

export default CommunityPage;
