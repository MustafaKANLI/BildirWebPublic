import React from "react";
import classes from "./TextArea.module.css";

const TextArea = (props) => {
  return (
    <div className={classes.inputDiv}>
      <textarea
        type={props.type}
        id={props.label}
        className={classes.formInput}
        autoComplete="off"
        placeholder=" "
        onChange={props.onChange}
        ref={props.Iref}
        style={{ borderColor: props.Icolor }}
      />
      <label
        htmlFor={props.label}
        className={classes.formLabel}
        style={{ color: props.Icolor }}
      >
        {props.label}
      </label>
    </div>
  );
};

export default TextArea;
