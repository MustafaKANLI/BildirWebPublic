import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import classes from './RegisterStudent.module.css';
import Input from '../../components/Inputs/Input';
import TextArea from '../../components/Inputs/TextArea';
import Logo from '../../logo/logo_1.svg';
import { toast } from 'react-toastify';
import { BiCamera } from 'react-icons/bi';

const RegisterCommunity = (props) => {
  const navTo = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const userNameInputRef = useRef();
  const creationKeyInputRef = useRef();
  const descriptionInputRef = useRef();
  const fileRef = useRef();
  const [images, setImages] = useState([]);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (
      !emailInputRef.current.value.trim() ||
      !passwordInputRef.current.value.trim() ||
      !confirmPasswordInputRef.current.value.trim() ||
      !userNameInputRef.current.value.trim() ||
      !creationKeyInputRef.current.value.trim() ||
      !descriptionInputRef.current.value.trim()
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
      const registerResponse = await fetch(
        'https://bildir.azurewebsites.net/api/Account/register-community',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
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

      const registerJson = await registerResponse.json();

      if (registerJson.succeeded) {
        if (images) {
          const body = new FormData();
          body.append('file', images[0], images[0].name);

          const uploadResponse = await fetch(
            `http://bildir.azurewebsites.net/api/v1/Community/AddBackgroundImage/${registerJson.data}`,
            {
              method: 'POST',
              body,
            }
          );
          const uploadJson = await uploadResponse.json();
        }

        const authResponse = await fetch(
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

        const authJson = await authResponse.json();

        if (authJson.succeeded) {
          localStorage.setItem('role', authJson.data.roles[0]);
          localStorage.setItem('token', authJson.data.jwToken);
        } else {
        }

        toast.success('Kayıt başarıyla oluşturuldu', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        navTo('/');
      } else {
        toast.error('Kayıt oluşturulurken bir hata meydana geldi', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (Ex) {
      console.error(Ex);
    }
  };

  return (
    <div className={classes.body}>
      <div className={classes.base}>
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
            <div className={classes.fileSelectWrapper}>
              <label htmlFor="imageselect">
                <BiCamera className={classes.icon} />
                <input
                  id="imageselect"
                  className={classes.fileSelector}
                  type="file"
                  ref={fileRef}
                  accept="image/png, image/jpg"
                  onChange={() => {
                    setImages(Array.from(fileRef.current.files));
                  }}
                ></input>
              </label>
              <div>
                {images.map((i, idx) => (
                  <p key={idx}>{i.name}</p>
                ))}
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

export default RegisterCommunity;
