import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import React from "react";
import styles from "../styles/NavBar.module.css";
import {NavLink} from 'react-router-dom';

const NavBar = () => {
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
                    <NavLink className={styles.NavLink} to='/signin'>
                        Sign in
                    </NavLink>
                    <NavLink className={styles.NavLink} to='/signup'>
                        Sign up
                    </NavLink>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
