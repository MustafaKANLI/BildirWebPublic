import React from "react";
import classes from "./Thumbnail.module.css";

const Thumbnail = ({ arr, image, index }) => {
  return (
    <div>
      {arr.map((imgsrc, i) => (
        <img
          key={i}
          height="50"
          src={imgsrc}
          onClick={() => image(i)}
          className={index === i ? classes.active : ""}
        />
      ))}
    </div>
  );
};

export default Thumbnail;
