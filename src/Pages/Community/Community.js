import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../components/Button/Button';
import classes from './Community.module.css';
import { TiLocation } from 'react-icons/ti';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import Slideshow from '../../components/Slider/Slideshow';
import Logo from '../../logo/logo_1.svg';

const Community = () => {
  const location = useLocation();

  const [followingState, setFollowingState] = useState(
    location.state.community.followingState ?? false
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
            communityId: location.state.community.id,
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
            communityId: location.state.community.id,
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
    setFollowingState(location.state.community.followingState ?? false);
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
    <div className={classes.eventPage}>
      <div className={classes.eventPageHeader}>
        <h1>{location.state.community.name}</h1>
        {generateContent()}
      </div>
      <div className={classes.eventPageDetail}>
        <Link to="/">
          <img className={classes.logo} src={Logo} />
        </Link>
        <div>{location.state.community.description}</div>
        <div>{`E-Mail: ${location.state.community.email}`}</div>
        <div>{`Events: ${location.state.community.organizedEvents.length}`}</div>
        <div>{`Followers: ${location.state.community.followers.length}`}</div>
      </div>

      <div className={classes.slider}>
        <Slideshow
          imgs={[
            location.state.community.backgroundImage
              ? `https://bildir.azurewebsites.net/${location.state.community.backgroundImage.path}`
              : 'https://www.china-admissions.com/wp-content/uploads/2021/06/Divi-Community-Update-May-2020-scaled-1.jpeg',
          ]}
        />
      </div>
    </div>
  );
};

export default Community;
