import React, { useState, useEffect } from "react";
import classes from "./EventCard.module.css";
import { TiLocation } from "react-icons/ti";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Button from "../../Button/Button";

const EventCard = (props) => {
  const joinButtonHandler = (e) => {
    e.stopPropagation();
    alert("Etkinlige katildiniz");
    e.preventDefault();
  };

  const eventCardClickHandler = (id) => {};

  return (
    <div onClick={eventCardClickHandler.bind(null, props.id)}>
      <Link to={`/event/${props.id}`} className={classes.link}>
        <div className={classes.card}>
          <div className={classes.cardImage}></div>

          <div className={classes.cardContent}>
            <h1 className={classes.cardHeader}>{props.eventTitle}</h1>
            <p>{props.eventText}</p>
            <div className={classes.cardDetail}>
              <div>
                <BsFillCalendarCheckFill />
                {props.date}
              </div>
              <div>
                <TiLocation />
                {props.location}
              </div>
              <div>{props.tags}</div>
              <Button title="Katıl" onClick={joinButtonHandler} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
