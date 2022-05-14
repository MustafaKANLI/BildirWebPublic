import React from "react";
import classes from "./Card.module.css";
import { TiLocation } from "react-icons/ti";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div>
      <Link to="/event" className={classes.link}>
        <div className={classes.card}>
          <div className={classes.cardImage}></div>

          <div className={classes.cardContent}>
            <h1 className={classes.cardHeader}>Event Name</h1>
            <p>
              Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır
              metinlerdir. Lorem Ipsum, adı bil inmeyen bir matbaacının bir
              hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak
              karış tırdığı 1500'lerden beri endüstri standardı sahte metinler
              olarak kullanılmıştır.
            </p>
            <div className={classes.cardDetail}>
              <div>
                <BsFillCalendarCheckFill />
                01/06/2022 19.00
              </div>
              <div>
                <TiLocation />
                Akdeniz Üniversitesi
              </div>
              <div>#Career#Summit</div>
              <button className={classes.cardDetailButton}>Katıl</button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
