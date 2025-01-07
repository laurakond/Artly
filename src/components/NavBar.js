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

const NavBar = () => {
  const loggedInUser = useLoggedInUser();
  const setLoggedInUser = useSetLoggedInUser();
  const { expanded, setExpanded, ref } = useNavBarToggle();

  // Function that handles signout functionality
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setLoggedInUser(null);
      toast.success("You are logged out!");
    } catch (error) {
      console.log(error);
      toast.error(
        "Something went wrong while attempting to log out. Please try again."
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
        <i className="fa-solid fa-paintbrush"></i>
        List Art
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/saved"
      >
        <i className="fa-solid fa-bookmark" />
        Saved
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/followed"
      >
        <i className="fa-solid fa-bars-staggered"></i>
        Followed
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={`/profiles/${loggedInUser?.profile_id}`}
      >
        <Avatar
          src={loggedInUser?.profile_image}
          // text={loggedInUser?.username}
          height={40}
        />
      </NavLink>
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fa-solid fa-right-to-bracket"></i>
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
        <i className="fa-solid fa-user-plus"></i>
        Sign up
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fa-solid fa-right-to-bracket"></i>
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
              <i className="fa-solid fa-house"></i>
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
