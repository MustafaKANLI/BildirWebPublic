import React, { useState, useEffect } from "react";
import CommunityCard from "../../../components/Card/CommunityCard/CommunityCard";
import classes from "./FollowedCommunities.module.css";

const FollowedCommunities = () => {
  const [communities, setCommunities] = useState([]);
  const [followingState, setfollowingState] = useState("");

  const fetching = async () => {
    let followings = null;
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
      setCommunities(userJson.data.followedCommunities);
      // console.log(followings);
    }
  };

  useEffect(() => {
    fetching();
  }, []);
  return (
    <div className={classes.homePage}>
      {communities.map((c) => (
        <CommunityCard
          cardTitle={c.name}
          key={c.id}
          id={c.id}
          communityText={c.description}
        />
      ))}
    </div>
  );
};

export default FollowedCommunities;
