import React from "react";
import classes from "./Button.module.css";

const ButtonDisabled = (props) => {
  return (
    <button className={classes.buttonDisabled} onClick={props.onClick} disabled>
      {props.title}
    </button>
  );
};

export default ButtonDisabled;
