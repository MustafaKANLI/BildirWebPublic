import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import classes from './EventShare.module.css';
import Input from '../../../components/Inputs/Input';
import TextArea from '../../../components/Inputs/TextArea';
import Logo from '../../../logo/logo_1.svg';
import { toast } from 'react-toastify';
import { BiCamera } from 'react-icons/bi';

const EventShare = (props) => {
  const navigate = useNavigate();

  const locationInputRef = useRef();
  const tagsInputRef = useRef();
  const titleInputRef = useRef();
  const dateInputRef = useRef();
  const descriptionInputRef = useRef();
  const fileRef = useRef();
  const [community, setCommunity] = useState({});
  const [images, setImages] = useState([]);

  const fetching = async () => {
    const userResponse = await fetch(
      'https://bildir.azurewebsites.net/api/v1/Community/CurrentlyLoggedIn',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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

    if (
      !titleInputRef.current.value.trim() ||
      !descriptionInputRef.current.value.trim() ||
      !locationInputRef.current.value.trim() ||
      !tagsInputRef.current.value.trim() ||
      !dateInputRef.current.value.trim()
    ) {
      toast.error('Etkinliği oluşturmak için lütfen tüm alanları doldurun', {
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
      const createResponse = await fetch(
        'https://bildir.azurewebsites.net/api/v1/Event',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: titleInputRef.current.value.trim(),
            location: locationInputRef.current.value.trim(),
            tags: tagsInputRef.current.value.trim(),
            description: descriptionInputRef.current.value.trim(),
            date: dateInputRef.current.value.trim(),
            communityId: community.id,
          }),
        }
      );

      const createJson = await createResponse.json();
      if (!createJson.succeeded) {
        toast.error('Etkinlik oluşturulurken bir hata meydana geldi', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        throw new Error(`Cant create event ${createJson.message}`);
      }

      let imagesUploaded = true;
      let uploadMessage = '';
      if (images.length !== 0) {
        const body = new FormData();
        images.forEach((p) => body.append('file', p, p.name));

        const uploadResponse = await fetch(
          `https://bildir.azurewebsites.net/api/v1/Event/AddImagesToEvent/${createJson.data}`,
          {
            method: 'POST',
            body,
          }
        );
        const uploadJson = await uploadResponse.json();
        imagesUploaded = uploadJson.succeeded;
        uploadMessage = uploadJson.message;
      }

      if (imagesUploaded) {
        toast.success('Etkinlik başarıyla oluşturuldu', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        navigate(-1);
      } else {
        toast.error('Etkinlik oluşturulurken bir hata meydana geldi', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        throw new Error(`Cant create event ${uploadMessage}`);
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

          <h1 className={classes.title}>Etkinlik Paylaş</h1>
          <form onSubmit={submitHandler}>
            <div className={classes.inputGroup}>
              <div>
                <Input
                  type="text"
                  label="Etkinlik Adı"
                  Iref={titleInputRef}
                  height="8.2"
                />
              </div>
              <div>
                <Input
                  type="text"
                  label="Konum"
                  Iref={locationInputRef}
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
                  value={new Date().toISOString().split('T')[0]}
                  Iref={dateInputRef}
                  height="8.2"
                />
              </div>
            </div>

            <div className={classes.textArea}>
              <TextArea label="Etkinlik Detayları" Iref={descriptionInputRef} />
            </div>

            <div className={classes.fileSelectWrapper}>
              <label htmlFor="imageselect">
                <BiCamera className={classes.icon} />
                <input
                  id="imageselect"
                  className={classes.fileSelector}
                  type="file"
                  multiple={true}
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

            <button className={classes.button} onClick={submitHandler}>
              Paylaş
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default EventShare;
