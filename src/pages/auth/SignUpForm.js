import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import ImageCarousel from "../../components/ImageCarousel";
import { useRedirect } from "../../hooks/useRedirect";
import styles from "../../styles/SignUpInPage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import formStyles from "../../styles/FormStyles.module.css";

const SignUpForm = () => {
  useRedirect("loggedIn");

  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  // Handles form inputs
  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };
  // Manages form submission for the signup
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
    <Container>
      <Row className={styles.RowHeight}>
        <Col className="my-auto py-4 p-md-2" lg={6}>
          <Container className={styles.CustomContainerWidth}>
            <h1 className={`mb-3 ${styles.FontSize}`}>Sign Up</h1>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label className="d-none">username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  className={formStyles.FormControlBorderRadius}
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
                  className={formStyles.FormControlBorderRadius}
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
                  className={formStyles.FormControlBorderRadius}
                />
              </Form.Group>
              {errors.password2?.map((message, index) => (
                <Alert variant="warning" key={index}>
                  {message}
                </Alert>
              ))}

              <button type="submit" className={btnStyles.ButtonStyles}>
                Sign Up
              </button>
              {errors.non_field_errors?.map((message, index) => (
                <Alert variant="warning" key={index}>
                  {message}
                </Alert>
              ))}
            </Form>
            <Container className="py-3 px-0">
              <Link to="/signin">
                Already have an account?
                <span
                  className={`${appStyles.AccentFont} ${appStyles.AccentFontColor} ${appStyles.HoverEffect}`}
                >
                  {" "}
                  Sign In
                </span>
              </Link>
            </Container>
          </Container>
        </Col>
        <Col className={`py-2 p-md-2 ${styles.CustomMargin}`} lg={6}>
          <ImageCarousel />
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpForm;
