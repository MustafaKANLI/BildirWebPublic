import React from "react";
import classes from "./PopupCard.module.css";

const PopupCard = (props) => {
  return (
    <div onClick={props.onClick} className={`${classes.card} ${props.cName}`}>
      {props.children}
    </div>
  );
};

export default PopupCard;
