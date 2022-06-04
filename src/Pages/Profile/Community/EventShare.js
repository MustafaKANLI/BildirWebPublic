import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import classes from "./EventShare.module.css";
import Input from "../../../components/Inputs/Input";
import TextArea from "../../../components/Inputs/TextArea";
import Logo from "../../../logo/logo_1.svg";

const EventShare = (props) => {
  const navTo = useNavigate();

  const emailInputRef = useRef();
  const locationInputRef = useRef();
  const tagsInputRef = useRef();
  const userNameInputRef = useRef();
  const dateInputRef = useRef();
  const descriptionInputRef = useRef();

  const [community, setCommunity] = useState({});

  const fetching = async () => {
    const userResponse = await fetch(
      "https://bildir.azurewebsites.net/api/v1/Community/CurrentlyLoggedIn",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const userJson = await userResponse.json();
    setCommunity(userJson.data);
  };
  useEffect(() => {
    fetching();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://bildir.azurewebsites.net/api/v1/Event",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: userNameInputRef.current.value,
            location: locationInputRef.current.value,
            tags: tagsInputRef.current.value,
            description: descriptionInputRef.current.value,
            date: dateInputRef.current.value,
            communityId: community.id,
          }),
        }
      );

      const json = await response.json();
      console.log(json);
    } catch (Ex) {
      // console.error(Ex);
    }
  };

  console.log("tokennnn ", localStorage.getItem("token"));

  return (
    <div className={classes.body}>
      <div className={classes.base}>
        <section className={classes.section}>
          <img className={classes.logo} src={Logo} />

          <h1 className={classes.title}>Etkinlik Paylaş</h1>
          <form onSubmit={submitHandler}>
            <div className={classes.inputGroup}>
              <div>
                <Input
                  type="text"
                  label="Etkinlik Adı"
                  Iref={userNameInputRef}
                  height="8.2"
                />
              </div>
              <div>
                <Input
                  type="text"
                  label="Konum"
                  Iref={emailInputRef}
                  height="8.2"
                />
              </div>
            </div>

            <div className={classes.inputGroup}>
              <div>
                <Input
                  type="text"
                  label="Etiketler"
                  Iref={tagsInputRef}
                  height="8.2"
                />
              </div>
              <div>
                <Input
                  type="date"
                  label="Tarih"
                  Iref={dateInputRef}
                  height="8.2"
                />
              </div>
            </div>

            <div className={classes.textArea}>
              <TextArea label="Etkinlik Detayları" Iref={descriptionInputRef} />
            </div>

            <button className={classes.button}>Paylaş</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EventShare;
