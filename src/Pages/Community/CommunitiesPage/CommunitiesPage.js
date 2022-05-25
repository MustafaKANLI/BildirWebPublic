import React, { useState, useEffect } from "react";
import CommunityCard from "../../../components/Card/CommunityCard/CommunityCard";
import classes from "./CommunitiesPage.module.css";

const CommunityPage = () => {
  const [communities, setCommunities] = useState([]);

  const fetching = async () => {
    const response = await fetch(
      "https://bildir.azurewebsites.net/api/v1/Community"
    );
    const data = await response.json();

    console.log(data.data[0].title);
    setCommunities(data.data);
  };
  useEffect(() => {
    fetching();
  }, []);
  return (
    <div className={classes.homePage}>
      {communities.map((e) => (
        <CommunityCard
          cardTitle={e.name}
          key={e.id}
          id={e.id}
          communityText={e.description}
          tags={e.tags}
          date={e.date}
        />
      ))}
    </div>
  );
};

export default CommunityPage;
