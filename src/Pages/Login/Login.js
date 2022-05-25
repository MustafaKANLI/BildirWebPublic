import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import classes from "./Login.module.css";
import Input from "../../components/Inputs/Input";

const Login = (props) => {
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navTo = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://bildir.azurewebsites.net/api/Account/authenticate",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
          }),
        }
      );

      const json = await response.json();
      console.log(json);
      if (json.succeeded) {
        localStorage.setItem("role", json.data.roles[0]);
        localStorage.setItem("token", json.data.jwToken);
        navTo("/");
      } else {
        console.log(json.Message);
      }
    } catch (Ex) {
      // console.error(Ex);
    }
  };

  return (
    <div className={classes.body}>
      <div className={classes.base}>
        {/* <div className={classes.navLink}>
          <Link to="/login" className={classes.link}>
            Öğrenci
          </Link>
          <Link to="/login" className={classes.link}>
            Topluluk
          </Link>
        </div> */}
        <section className={classes.section}>
          <h1 className={classes.title}>Login</h1>
          <form onSubmit={submitHandler}>
            <Input
              type="text"
              label="Username"
              Iref={emailInputRef}
              height="8.2"
            />

            <Input
              type="password"
              label="Password"
              Iref={passwordInputRef}
              height="8.2"
            />

            <button className={classes.button}>Giriş</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
