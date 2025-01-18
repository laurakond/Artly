import React from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {
  useLoggedInUser,
  useSetLoggedInUser,
} from "../contexts/LoggedInUserContext";
import logoSplash from "../assets/splash-logo.png";
import styles from "../styles/NavBar.module.css";
import axios from "axios";
import useNavBarToggle from "../hooks/useNavBarToggle";
import Avatar from "./Avatar";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const loggedInUser = useLoggedInUser();
  const setLoggedInUser = useSetLoggedInUser();
  const { expanded, setExpanded, ref } = useNavBarToggle();

  // Function that handles signout functionality
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setLoggedInUser(null);
      removeTokenTimestamp();
      toast.success("You are signed out!");
    } catch (error) {
      toast.error(
        "Something went wrong while attempting to sign out. Please try again."
      );
    }
  };

  // Icons to show when the user is logged in
  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/artworks/create"
      >
        List Art
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/saved"
      >
        Saved artworks
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/followed"
      >
        Followed profiles
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={`/profiles/${loggedInUser?.profile_id}`}
      >
        <Avatar src={loggedInUser?.profile_image} height={40} />
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        Sign out
      </NavLink>
    </>
  );

  // Icons to show when the user is logged out
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
      >
        Sign up
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        Sign in
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={styles.NavBar}
      expand="md"
      fixed="top"
    >
      <Container fluid>
        <NavLink exact to="/">
          <Navbar.Brand>
            <img src={logoSplash} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
            >
              Home
            </NavLink>
            {loggedInUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
