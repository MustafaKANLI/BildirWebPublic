import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import ButtonDisabled from '../../components/Button/Button';
import classes from './EventPage.module.css';
import { TiLocation } from 'react-icons/ti';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import EventDetails from './EventDetails';
import EventFlow from './EventFlow';
import Slideshow from '../../components/Slider/Slideshow';
import Logo from '../../logo/logo_1.svg';

const EventPage = (props) => {
  const location = useLocation();
  const [eventState, setEventState] = useState('');
  const [participationState, setParticipationState] = useState('');
  const navigate = useNavigate();

  const joinButtonHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (!localStorage.getItem('token')) console.error('Not logged in');
      if (localStorage.getItem('role') !== 'Student')
        console.error('Only students can join');

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

      const registerResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Student/RegisterToEvent',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId: location.state.event.id,
            studentId: userId,
          }),
        }
      );

      const registerJson = await registerResponse.json();
      setParticipationState('Participating');
    } catch (ex) {
      console.log(ex);
    }
  };

  const eventCardClickHandler = (id) => {};

  const leaveButtonHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (!localStorage.getItem('token')) console.error('Not logged in');
      if (localStorage.getItem('role') !== 'Student')
        console.error('Only students can abandon');

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

      const abandonResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Student/AbandonEvent',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            eventId: location.state.event.id,
            studentId: userId,
          }),
        }
      );

      const abandonJson = await abandonResponse.json();
      setParticipationState('Abandoned');
    } catch (ex) {
      console.log(ex);
    }
  };

  const endEventHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (localStorage.getItem('role') !== 'Community')
        console.error('Only communities can end event');

      const userResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Community/CurrentlyLoggedIn',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const userJson = await userResponse.json();
      const userId = userJson.data.id;

      const abandonResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Event/EndEvent',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: location.state.event.id,
            communityId: userId,
          }),
        }
      );

      const abandonJson = await abandonResponse.json();
      setEventState('Ended');
      navigate(-1);
    } catch (ex) {
      console.log(ex);
    }
  };

  const cancelEventHandler = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      if (!localStorage.getItem('token')) console.error('Not logged in');
      if (localStorage.getItem('role') !== 'Community')
        console.error('Only communities can cancel event');

      const userResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Community/CurrentlyLoggedIn',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const userJson = await userResponse.json();
      const userId = userJson.data.id;

      const abandonResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Event/CancelEvent',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: location.state.event.id,
            communityId: userId,
          }),
        }
      );

      const abandonJson = await abandonResponse.json();
      setEventState('Canceled');
      navigate(-1);
    } catch (ex) {
      console.log(ex);
    }
  };

  const generateButton = () => {
    if (!localStorage.getItem('token'))
      return (
        <Link to="/login">
          <Button title="Katıl" />
        </Link>
      );

    if (eventState === 'Active') {
      if (localStorage.getItem('role') === 'Student') {
        if (!participationState || participationState === 'Abandoned')
          return <Button title="Katıl" onClick={joinButtonHandler} />;

        if (participationState === 'Participating')
          return <Button title="Ayrıl" onClick={leaveButtonHandler} />;
      } else {
        if (location.state.event.isEditable)
          return (
            <div>
              <Button title="Etkinliği Bitir" onClick={endEventHandler} />

              <Button title="Etkinliği iptal et" onClick={cancelEventHandler} />
            </div>
          );
      }
    } else if (eventState === 'Canceled')
      return <ButtonDisabled title="Etkinlik iptal edildi" />;
    else if (eventState === 'Ended')
      return <ButtonDisabled title="Etkinlik sona erdi" />;
  };

  useEffect(() => {
    setParticipationState(location.state.event.participationState);
    setEventState(location.state.event.state);
  }, []);

  return (
    <div className={classes.eventPage}>
      <div className={classes.eventPageHeader}>
        <h1>{location.state.event.title}</h1>
        {generateButton()}
      </div>
      <div className={classes.eventPageDetail}>
        <Link to="/">
          <img className={classes.logo} src={Logo} />
        </Link>
        <p>{`@ ${location.state.event.eventOf.name}`}</p>
        <div>
          <TiLocation />
          {location.state.event.location}
        </div>
        <div>{location.state.event.tags}</div>
        <div>
          <BsFillCalendarCheckFill />
          {location.state.event.date.split('T')[0]}
        </div>
      </div>

      <div>
        <EventDetails eventDetailText={location.state.event.description} />
      </div>
      <div className={classes.slider}>
        <Slideshow
          className={classes.slider}
          imgs={location.state.event.images.map(
            (i) => `https://bildir.azurewebsites.net/${i.path}`
          )}
        />
      </div>
    </div>
  );
};

export default EventPage;
