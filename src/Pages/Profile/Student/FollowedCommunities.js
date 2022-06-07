import React, { useState, useEffect } from 'react';
import CommunityCard from '../../../components/Card/CommunityCard/CommunityCard';
import classes from './FollowedCommunities.module.css';

const FollowedCommunities = () => {
  const [communities, setCommunities] = useState([]);

  const fetching = async () => {
    let followings = null;
    if (localStorage.getItem('role') === 'Student') {
      const userResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Student/CurrentlyLoggedIn',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const userJson = await userResponse.json();
      setCommunities(
        userJson.data.followedCommunities.map((c) => {
          c.followingState = true;
          return c;
        })
      );
    }
  };

  useEffect(() => {
    fetching();
  }, []);
  return (
    <div className={classes.homePage}>
      {communities.map((c) => (
        <CommunityCard community={c} key={c.id} />
      ))}
    </div>
  );
};

export default FollowedCommunities;
