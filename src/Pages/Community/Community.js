import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import classes from "./Community.module.css";
import { TiLocation } from "react-icons/ti";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import CommunityDetails from "./CommunityDetails";
import Slideshow from "../../components/Slider/Slideshow";
import Logo from "../../logo/logo_1.svg";

const Community = () => {
  const buttonClickHandler = () => {
    console.log("Clicked Button");
  };

  return (
    <div className={classes.eventPage}>
      <div className={classes.eventPageHeader}>
        <h1>Girişimcilik ve Kariyer Topluluğu</h1>
        <Button title="Katıl" onClick={buttonClickHandler} />
      </div>
      <div className={classes.eventPageDetail}>
        <Link to="/">
          <img className={classes.logo} src={Logo} />
        </Link>
        <div>
          <TiLocation />
          Akdeniz Üniversitesi
        </div>
        <div>#Career#Summit</div>
      </div>

      <CommunityDetails></CommunityDetails>

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

export default Community;
