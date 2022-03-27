import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import classes from "./Login.module.css";
import Input from "../../components/Inputs/Input";

const Login = (props) => {
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("Login succesfull");
  };

  return (
    <div className={classes.body}>
      <div className={classes.base}>
        <div className={classes.navLink}>
          <Link to="/login" className={classes.link}>
            Öğrenci
          </Link>
          <Link to="/login" className={classes.link}>
            Topluluk
          </Link>
        </div>
        <section className={classes.section}>
          <h1>{"Login"}</h1>
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
