import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useSetLoggedInUser } from "../../contexts/LoggedInUserContext";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils.js";
import ImageCarousel from "../../components/ImageCarousel";
import styles from "../../styles/SignUpInPage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import formStyles from "../../styles/FormStyles.module.css";

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

  // Manages login submission of the form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setLoggedInUser(data.user);
      setTokenTimestamp(data);
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
    <Container>
      <Row className={styles.RowHeight}>
        <Col className="my-auto py-4 p-md-2" lg={6}>
          <Container className={styles.CustomContainerWidth}>
            <h1 className={`mb-3 ${styles.FontSize}`}>Sign In</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
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

              <Form.Group controlId="password">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  className={formStyles.FormControlBorderRadius}
                />
              </Form.Group>
              {errors.password?.map((message, index) => (
                <Alert variant="warning" key={index}>
                  {message}
                </Alert>
              ))}

              <button type="submit" className={btnStyles.ButtonStyles}>
                Sign In
              </button>
              {errors.non_field_errors?.map((message, index) => (
                <Alert variant="warning" key={index}>
                  {message}
                </Alert>
              ))}
            </Form>

            <Container className="py-3 px-0">
              <Link to="/signup">
                Don't have an account?
                <span
                  className={`${appStyles.AccentFont} ${appStyles.AccentFontColor} ${appStyles.HoverEffect}`}
                >
                  {" "}
                  Sign Up
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
}

export default SignInForm;
