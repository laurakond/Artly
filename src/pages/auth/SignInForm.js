import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import { Link } from "react-router-dom";

function SignInForm() {

    return (
        <Row>
        <Col className="my-auto p-0 p-md-2" md={6}>
            <Container>
            <h1 >sign in</h1>
            <Form>
                <Form.Group controlId="username">
                    <Form.Label className="d-none">Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Username"
                        name="username" 
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label className="d-none">Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        name="password"
                    />
                </Form.Group>
                <Button 
                    type="submit"
                >
                    Sign In
                </Button>
            </Form>
        </Container>
        <Container>
            <Link to="/signup">
                Don't have an account? <span>Sign up now!</span>
            </Link>
            </Container>
        </Col>
        <Col md={6}>
            <Image/>
        </Col>
        </Row>
    );
}

export default SignInForm;