import React, { useState, useEffect } from 'react';
import CommunityCard from '../../../components/Card/CommunityCard/CommunityCard';
import classes from './CommunitiesPage.module.css';

const CommunityPage = () => {
  const [communities, setCommunities] = useState([]);
  const [followingState, setfollowingState] = useState('');

  const fetching = async () => {
    try {
      let followedCommunities = null;
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
        followedCommunities = userJson?.data?.followedCommunities;
      }

      const response = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Community'
      );

      const data = await response.json();
      let mappedCommunities = data.data;

      if (followedCommunities)
        mappedCommunities = data.data
          .map((c) => {
            let foundCommunity = followedCommunities.find((p) => p.id === c.id);
            if (foundCommunity) c.followingState = true;
            else c.followingState = false;
            return c;
          })
          .sort((e1, e2) => {
            if (e1.followingState && !e2.followingState) return 1;
            if (!e1.followingState && e2.followingState) return -1;
            return 0;
          });

      setCommunities(mappedCommunities);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetching();
  }, []);
  return (
    <div className={classes.homePage}>
      {communities.map((c) => (
        <CommunityCard key={c.id} community={c} />
      ))}
    </div>
  );
};

export default CommunityPage;
