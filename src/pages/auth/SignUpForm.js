import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Image, Col, Row, Container } from "react-bootstrap";

const SignUpForm = () => {
    return (
        <Row>
        <Col className="my-auto py-2 p-md-2" md={6}>
            <Container>
            <h1>sign up</h1>

            <Form>
                <Form.Group controlId="username">
                    <Form.Label className="d-none">username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="username"
                        name="username"
                    />
                </Form.Group>

                <Form.Group controlId="passwrod1">
                    <Form.Label className="d-none">Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password1"
                    />
                </Form.Group>

                <Form.Group controlId="passwrod2">
                    <Form.Label className="d-none">Confirm password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        name="password2"
                    />
                </Form.Group>

                <Button type="submit">
                    Sign up
                </Button>
            </Form>
            </Container>
            <Container >
            <Link  to="/signin">
                Already have an account? <span>Sign in</span>
            </Link>
            </Container>
        </Col>
        <Col>
            <Image/>
        </Col>
        </Row>
    );
};

export default SignUpForm;
