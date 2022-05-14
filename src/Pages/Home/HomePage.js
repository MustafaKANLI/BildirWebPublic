import React from "react";
import Card from "../../components/EventCard/Card";
import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={classes.homePage}>
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default HomePage;
