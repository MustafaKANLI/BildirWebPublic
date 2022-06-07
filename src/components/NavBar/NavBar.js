import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import Logo from '../../logo/logo_2.svg';

const NavBar = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.navBar}>
        <Link to="/">
          <img className={classes.logo} src={Logo} />
        </Link>

        <Link to="/">
          <div className={`${classes.link}  `}>Etkinlikler</div>
        </Link>

        <Link to="/communities">
          <div className={`${classes.link} `}>Topluluklar</div>
        </Link>
      </div>
      <div className={classes.profileBar}>
        {localStorage.getItem('token') ? (
          <Link to="/profile">
            <div className={classes.profileName}>
              <div className={classes.nameFont}>Profil</div>
            </div>
          </Link>
        ) : (
          <Link to="/login">
            <div className={classes.profileName}>
              <div className={classes.nameFont}>Profil</div>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default NavBar;
