import React, { useState, useEffect } from "react";
import CommunityCard from "../../../components/Card/CommunityCard/CommunityCard";
import classes from "./CommunitiesPage.module.css";

const CommunityPage = () => {
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
      followings = userJson.data.followedCommunities;
      // console.log(followings);
    }

    const response = await fetch(
      "https://bildir.azurewebsites.net/api/v1/Community"
    );
    const data = await response.json();
    data.data = data.data.map((community) => {
      community.followingState = "Unfollowed";
      return community;
    });

    if (followings) {
      data.data = data.data.map((community) => {
        const foundCommunity = followings.find(
          (followedCommunity) => followedCommunity.id === +community.id
        );
        console.log(foundCommunity);
        if (foundCommunity) community.followingState = "Followed";
        else community.followingState = "Unfollowed";
        return community;
      });
    }
    setCommunities(data.data);
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
          followingState={c.followingState}
          tags={c.tags}
          date={c.date}
        />
      ))}
    </div>
  );
};

export default CommunityPage;
