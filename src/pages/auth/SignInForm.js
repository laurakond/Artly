import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { useSetLoggedInUser } from "../../contexts/LoggedInUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { toast } from "react-toastify";

function SignInForm() {
  const setLoggedInUser = useSetLoggedInUser();
  useRedirect("loggedIn");
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = signInData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setLoggedInUser(data.user);
      history.goBack();
      toast.success("You are signed in!");
    } catch (error) {
      setErrors(error.response?.data);
      toast.error(
        "Something went wrong while attempting to sign in. Please try again."
      );
    }
  };

  return (
    <Row>
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container>
          <h1>Sign In</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
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

            <Form.Group controlId="password">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}

            <Button type="submit">Sign In</Button>
            {errors.non_field_errors?.map((message, index) => (
              <Alert variant="warning" key={index}>
                {message}
              </Alert>
            ))}
          </Form>
        </Container>
        <Container>
          <Link to="/signup">
            Don't have an account?
            <span>Sign up now!</span>
          </Link>
        </Container>
      </Col>
      <Col md={6}>
        <Image />
      </Col>
    </Row>
  );
}

export default SignInForm;
