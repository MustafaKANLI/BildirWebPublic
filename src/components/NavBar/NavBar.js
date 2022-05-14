import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";

const NavBar = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.navBar}>
        <Link to="/">
          <img
            className={classes.logo}
            src="https://getir.com/_next/image?url=https%3A%2F%2Flanding-strapi-images-development.s3.eu-west-1.amazonaws.com%2Flogo_purple_e0b9221b8f.svg&w=128&q=75"
          />
        </Link>

        <>
          <Link to="/events">
            <div className={`${classes.link}  `}>Events</div>
          </Link>

          <Link to="/communities">
            <div className={`${classes.link} `}>Communities</div>
          </Link>
        </>
      </div>
      <div className={classes.profileBar}>
        <Link to="/profile">
          <div className={classes.profileName}>
            <div className={classes.nameFont}>Mustafa</div>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
