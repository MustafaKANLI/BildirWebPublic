import React, { useState, useEffect } from "react";
import Thumbnail from "./Thumbnail";
import classes from "./Slideshow.module.css";
import { AiOutlineLeft } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";

const Slideshow = ({ imgs }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, []);

  const next = () => {
    if (index === imgs.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };
  const prev = () => {
    if (index === 0) {
      setIndex(imgs.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <div className={classes.slideshow}>
      <img className={classes.mainImg} src={imgs[index]} />
      <div className={classes.actions}>
        <button onClick={prev} className={classes.button}>
          <AiOutlineLeft />
        </button>
        <button onClick={next} className={classes.button}>
          <AiOutlineRight />
        </button>
      </div>
      <Thumbnail arr={imgs} image={setIndex} index={index} />
    </div>
  );
};

export default Slideshow;
