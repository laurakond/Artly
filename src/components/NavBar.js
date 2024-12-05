import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import React from 'react';

const NavBar = () => {
    return (
        <div>
            <Navbar expand="md" fixed='top'>
                <Container>
                    <Navbar.Brand href="#home">
                        Artly
                        </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto text-left">
                            <Nav.Link>
                                Post your Artwork
                            </Nav.Link>
                            <Nav.Link>
                                Saved
                            </Nav.Link>
                            <Nav.Link>
                                Sign in
                            </Nav.Link>
                            <Nav.Link>
                                Sign up
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavBar