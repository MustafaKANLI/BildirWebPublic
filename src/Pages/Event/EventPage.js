import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import classes from "./EventPage.module.css";
import { TiLocation } from "react-icons/ti";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import EventDetails from "./EventDetails";
import EventFlow from "./EventFlow";
import Slideshow from "../../components/Slider/Slideshow";

const EventPage = () => {
  const [eventDetails, setEventDetails] = useState(true);
  const [eventFlow, setEventFlow] = useState(false);

  const eventDetailsTabClickHandler = () => {
    setEventDetails(true);
    setEventFlow(false);
  };

  const eventFlowTabClickHandler = () => {
    setEventDetails(false);
    setEventFlow(true);
  };

  return (
    <div className={classes.eventPage}>
      <div className={classes.eventPageHeader}>
        <h1>Event Name</h1>
        <Button title="Katıl" />
      </div>
      <div className={classes.eventPageDetail}>
        <Link to="/">
          <img
            className={classes.logo}
            src="https://getir.com/_next/image?url=https%3A%2F%2Flanding-strapi-images-development.s3.eu-west-1.amazonaws.com%2Flogo_purple_e0b9221b8f.svg&w=128&q=75"
          />
        </Link>
        <div>
          <TiLocation />
          Akdeniz Üniversitesi
        </div>
        <div>#Career#Summit</div>
        <div>
          <BsFillCalendarCheckFill />
          01/06/2022 19.00
        </div>
      </div>

      <div className={classes.eventTabs}>
        <h2
          className={classes.tabHeading}
          onClick={eventDetailsTabClickHandler}
        >
          Event Details
        </h2>
        <hr></hr>
        <h2 className={classes.tabHeading} onClick={eventFlowTabClickHandler}>
          Event Flow
        </h2>
      </div>

      <div>{eventDetails && <EventDetails></EventDetails>}</div>
      <div>{eventFlow && <EventFlow></EventFlow>}</div>
      <div className={classes.slider}>
        <Slideshow
          imgs={[
            "https://images.unsplash.com/photo-1585255318859-f5c15f4cffe9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500",
            "https://images.unsplash.com/photo-1584226761916-3fd67ab5ac3a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500",
            "https://images.unsplash.com/photo-1585179292338-45ba1f62f082?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500",
            "https://images.unsplash.com/photo-1584753987666-ead137ec0614?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500",
            "https://images.unsplash.com/photo-1584691267914-91c0bee55964?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500",
            "https://images.unsplash.com/photo-1585084335487-f653d0859c14?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500",
            "https://images.unsplash.com/photo-1583217874534-581393fd5325?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=500&ixlib=rb-1.2.1&q=80&w=500",
          ]}
        />
      </div>
    </div>
  );
};

export default EventPage;
