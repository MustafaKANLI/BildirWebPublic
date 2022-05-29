import React, { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import classes from "./RegisterStudent.module.css";
import Input from "../../components/Inputs/Input";

const RegisterStudent = (props) => {
  const navTo = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const facultyInputRef = useRef();
  const departmentInputRef = useRef();
  const genderInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://bildir.azurewebsites.net/api/Account/register-student",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstNameInputRef.current.value,
            lastName: lastNameInputRef.current.value,
            schoolEmail: emailInputRef.current.value,
            faculty: facultyInputRef.current.value,
            department: departmentInputRef.current.value,
            gender: genderInputRef.current.value,
            password: passwordInputRef.current.value,
            confirmPassword: confirmPasswordInputRef.current.value,
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
          <h1 className={classes.title}>Kayıt Ol</h1>
          <form onSubmit={submitHandler}>
            <div className={classes.inputGroup}>
              <div>
                <Input
                  type="text"
                  label="Ad"
                  Iref={firstNameInputRef}
                  height="8.2"
                />
              </div>
              <div>
                <Input
                  type="text"
                  label="Soyad"
                  Iref={lastNameInputRef}
                  height="8.2"
                />
              </div>
            </div>

            <div className={classes.inputGroup}>
              <div>
                <Input
                  type="text"
                  label="Okul Maili"
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
                  label="Fakülte"
                  Iref={facultyInputRef}
                  height="8.2"
                />
              </div>
              <div>
                <Input
                  type="text"
                  label="Bölüm"
                  Iref={departmentInputRef}
                  height="8.2"
                />
              </div>
            </div>

            <div className={classes.inputGroup}>
              <div>
                <Input
                  type="text"
                  label="Cinsiyet"
                  Iref={genderInputRef}
                  height="8.2"
                />
              </div>
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

export default RegisterStudent;
