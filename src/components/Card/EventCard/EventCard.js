import React, { useState, useEffect } from 'react';
import classes from './EventCard.module.css';
import { TiLocation } from 'react-icons/ti';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Button from '../../Button/Button';
import ButtonDisabled from '../../Button/ButtonDisabled';

const EventCard = (props) => {
  const [participationState, setParticipationState] = useState('');
  const [eventState, setEventState] = useState('');

  useEffect(() => {
    setParticipationState(props.event.participationState);
    setEventState(props.event.state);
  }, []);

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
            eventId: props.event.id,
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
            eventId: props.event.id,
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
            id: props.event.id,
            communityId: userId,
          }),
        }
      );

      const abandonJson = await abandonResponse.json();
      setEventState('Ended');
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
            id: props.event.id,
            communityId: userId,
          }),
        }
      );

      const abandonJson = await abandonResponse.json();
      setEventState('Canceled');
    } catch (ex) {
      console.log(ex);
    }
  };

  const generateButton = () => {
    if (eventState === 'Active') {
      if (!localStorage.getItem('token'))
        return (
          <Link to="/login">
            <Button title="Katıl" />
          </Link>
        );

      if (localStorage.getItem('role') === 'Student') {
        if (!participationState || participationState === 'Abandoned')
          return <Button title="Katıl" onClick={joinButtonHandler} />;

        if (participationState === 'Participating')
          return <Button title="Ayrıl" onClick={leaveButtonHandler} />;
      } else {
        if (props.event.isEditable)
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

  return (
    <div onClick={eventCardClickHandler.bind(null, props.event.id)}>
      <Link
        to={`/event/${props.event.id}`}
        state={{ event: props.event }}
        className={classes.link}
      >
        <div className={classes.card}>
          <img
            src={
              props.event.images.length >= 1
                ? `https://bildir.azurewebsites.net/${props.event.images[0].path}`
                : 'https://ironcodestudio.com/wp-content/uploads/2015/03/css-remove-horizontal-scrollbar.jpg'
            }
            className={classes.cardImage}
            alt="eventImage"
          ></img>

          <div className={classes.cardContent}>
            <h1 className={classes.cardHeader}>{props.event.title}</h1>
            <p>{props.event.description}</p>
            <div className={classes.cardDetail}>
              <p>{`@ ${props.event.eventOf.name}`}</p>
              <div>
                <BsFillCalendarCheckFill />
                {props.event.date.split('T')[0]}
              </div>
              <div>
                <TiLocation />
                {props.event.location}
              </div>
              <div>{`# ${props.event.tags}`}</div>
              {generateButton()}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
