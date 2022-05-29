import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import classes from "./RegisterStudent.module.css";
import Input from "../../components/Inputs/Input";
import TextArea from "../../components/Inputs/TextArea";
import Logo from "../../logo/logo_1.svg";

const RegisterCommunity = (props) => {
  const navTo = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const userNameInputRef = useRef();
  const creationKeyInputRef = useRef();
  const descriptionInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://bildir.azurewebsites.net/api/Account/register-community",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userNameInputRef.current.value,
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
            confirmPassword: confirmPasswordInputRef.current.value,
            creationKey: creationKeyInputRef.current.value,
            description: descriptionInputRef.current.value,
          }),
        }
      );

      const json = await response.json();
      console.log(json);
      if (json.succeeded) {
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
          } else {
            console.log(json.Message);
          }
        } catch (Ex) {
          // console.error(Ex);
        }
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
          <img className={classes.logo} src={Logo} />

          <h1 className={classes.title}>Kayıt Ol</h1>
          <form onSubmit={submitHandler}>
            <div className={classes.inputGroup}>
              <div>
                <Input
                  type="text"
                  label="Topluluk Adı"
                  Iref={userNameInputRef}
                  height="8.2"
                />
              </div>
              <div>
                <Input
                  type="email"
                  label="E-mail"
                  Iref={emailInputRef}
                  height="8.2"
                />
              </div>
            </div>

            <div className={classes.inputGroup}>
              <div>
                <Input
                  type="password"
                  label="Şifre"
                  Iref={passwordInputRef}
                  height="8.2"
                />
              </div>
              <div>
                <Input
                  type="password"
                  label="Şifrenizi tekrar giriniz"
                  Iref={confirmPasswordInputRef}
                  height="8.2"
                />
              </div>
            </div>

            <div className={classes.inputGroup}>
              <div>
                <Input
                  type="text"
                  label="Mailinize gelen anahtar"
                  Iref={creationKeyInputRef}
                  height="8.2"
                />
              </div>
            </div>

            <div className={classes.textArea}>
              <TextArea
                label="Profilinizde gösterilecek olan açıklama metninizi giriniz..."
                Iref={descriptionInputRef}
              />
            </div>

            <button className={classes.button}>Kayıt Ol</button>
            <div className={classes.register}>
              <Link to="/login" className={classes.registerLink}>
                <span>Giriş Yap</span>
              </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default RegisterCommunity;
