import React, { useState, useEffect } from 'react';
import classes from './CommunityCard.module.css';
import { TiLocation } from 'react-icons/ti';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Button from '../../Button/Button';

const CommunityCard = (props) => {
  const [followingState, setFollowingState] = useState(
    props.community.followingState ?? false
  );

  const followCommunity = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (localStorage.getItem('role') !== 'Student')
        console.error('Only students can follow');

      const userResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Student/CurrentlyLoggedIn',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const userJson = await userResponse.json();
      const userId = userJson.data.id;

      const followResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Student/AddfollowedCommunity',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            communityId: props.community.id,
            studentId: userId,
          }),
        }
      );

      const followJson = await followResponse.json();
      if (!followJson.succeeded) throw new Error(followJson.message);
      setFollowingState(true);
    } catch (ex) {
      console.log(ex);
    }
  };

  const unfollowCommunity = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (!localStorage.getItem('token')) console.error('Not logged in');
      if (localStorage.getItem('role') !== 'Student')
        console.error('Only students can unfollow');

      const userResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Student/CurrentlyLoggedIn',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const userJson = await userResponse.json();
      const userId = userJson.data.id;

      const unfollowResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Student/RemoveFollowedCommunity',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            communityId: props.community.id,
            studentId: userId,
          }),
        }
      );

      const unfollowJson = await unfollowResponse.json();
      if (!unfollowJson.succeeded) throw new Error(unfollowJson.message);
      setFollowingState(false);
    } catch (ex) {
      console.log(ex);
    }
  };

  useEffect(() => {
    setFollowingState(props.community.followingState ?? false);
  }, []);

  const generateContent = () => {
    if (localStorage.getItem('role') !== 'Community') {
      if (!localStorage.getItem('token')) {
        return (
          <Link to="/login">
            <Button title="Takip Et" />
          </Link>
        );
      }
      return followingState ? (
        <Button title="Takipten Çık" onClick={unfollowCommunity} />
      ) : (
        <Button title="Takip Et" onClick={followCommunity} />
      );
    }
  };

  return (
    <div>
      <Link
        to={`/community/${props.community.id}`}
        state={{ community: props.community }}
        className={classes.link}
      >
        <div className={classes.card}>
          <img
            src={
              props.community.backgroundImage
                ? `https://bildir.azurewebsites.net/${props.community.backgroundImage.path}`
                : 'https://www.china-admissions.com/wp-content/uploads/2021/06/Divi-Community-Update-May-2020-scaled-1.jpeg'
            }
            className={classes.cardImage}
            alt="communityImage"
          ></img>
          <div className={classes.cardContent}>
            <h1 className={classes.cardHeader}>{props.community.name}</h1>
            <div className={classes.cardDetail}>
              <div>{props.community.description}</div>

              {generateContent()}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CommunityCard;
