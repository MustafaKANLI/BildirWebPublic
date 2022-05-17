import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";
import Logo from "../../logo/logo_2.svg";

const NavBar = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.navBar}>
        <Link to="/">
          <img className={classes.logo} src={Logo} />
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
