import React from "react";
import "./card.css"
import {TiLocation} from "react-icons/ti";
import {BsFillCalendarCheckFill} from "react-icons/bs";

const Card = () => {
  return (
    <div>
      
      <div className="Card">
        <div className="Card_image">
        </div>
       
        <div className="Card_content">
        <h1>Event Name</h1>
        <p>Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bil
          inmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karış
          tırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır.</p>
        <div className="Card_detail">
        <div>
          <BsFillCalendarCheckFill/>
            01/06/2022 19.00
          </div>
          <div>
            <TiLocation/>Akdeniz Üniversitesi
          </div>
          <div>
            #Career#Summit
          </div>
          <button className="Card_detail-button">Katıl</button>
        </div>
        </div>
       
      </div>
    </div>
  );
};

export default Card;
