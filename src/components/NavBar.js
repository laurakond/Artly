import React from "react";
import { useLoggedInUser } from "../contexts/LoggedInUserContext";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import styles from "../styles/NavBar.module.css";
import {NavLink} from 'react-router-dom';

const NavBar = () => {
    const loggedInUser = useLoggedInUser();
    const loggedInIcons = (
        <>
            {loggedInUser?.username}
        </>
    )
    const loggedOutIcons = (
        <>
            <NavLink className={styles.NavLink} to='/signin'>
                Sign in
            </NavLink>
            <NavLink className={styles.NavLink} to='/signup'>
                Sign up
            </NavLink>
        </>
    );

    return (
        <Navbar className={styles.NavBar} expand="md" fixed="top">
            <Container>
                <NavLink to='/'>
                    <Navbar.Brand>
                        Artly
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto text-left">
                    <NavLink className={styles.NavLink} to='/'>
                        Home
                    </NavLink>
                    <NavLink className={styles.NavLink} to='/create'>
                        Post your Artwork
                    </NavLink>
                    {loggedInUser ? loggedInIcons : loggedOutIcons}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
