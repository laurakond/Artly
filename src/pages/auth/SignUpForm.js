import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Button,
  Image,
  Col,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
      toast.success("You are signed up! Please sing in.");
    } catch (error) {
      setErrors(error.response?.data);
      toast.error(
        "Something went wrong while attempting to sign up. Please try again."
      );
    }
  };

  return (
    <Row>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container>
          <h1>Sign Up</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">username</Form.Label>
              <Form.Control
                type="text"
                placeholder="username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="passwrod1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="passwrod2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}

            <Button type="submit">Sign up</Button>
            {errors.non_field_errors?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container>
          <Link to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Col>
      <Col>
        <Image />
      </Col>
    </Row>
  );
};

export default SignUpForm;
