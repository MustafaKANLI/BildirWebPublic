import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import classes from './Login.module.css';
import Input from '../../components/Inputs/Input';
import Logo from '../../logo/logo_1.svg';
import { toast } from 'react-toastify';

const Login = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navTo = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    if (
      !emailInputRef.current.value.trim() ||
      !passwordInputRef.current.value.trim()
    ) {
      toast.error('Lütfen tüm alanları doldurun', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      return;
    }

    try {
      const response = await fetch(
        'https://bildir.azurewebsites.net/api/Account/authenticate',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
          }),
        }
      );

      const json = await response.json();

      if (json.succeeded) {
        localStorage.setItem('role', json.data.roles[0]);
        localStorage.setItem('token', json.data.jwToken);
        window.location.href = 'http://' + window.location.host;
      } else {
      }
    } catch (Ex) {
      // console.error(Ex);
    }
  };

  return (
    <div className={classes.body}>
      <div className={classes.base}>
        <section className={classes.section}>
          <img className={classes.logo} src={Logo} />

          <h1 className={classes.title}>Giriş Yap</h1>
          <form onSubmit={submitHandler}>
            <Input
              type="text"
              label="Kullanıcı adı"
              Iref={emailInputRef}
              height="8.2"
            />

            <Input
              type="password"
              label="Şifre"
              Iref={passwordInputRef}
              height="8.2"
            />

            <button className={classes.button}>Giriş</button>
            <div className={classes.register}>
              Kaydol:
              <Link to="/studentregister" className={classes.registerLink}>
                <span>Öğrenci</span>
              </Link>
              <span> / </span>
              <Link to="/communityregister" className={classes.registerLink}>
                <span>Topluluk</span>
              </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
