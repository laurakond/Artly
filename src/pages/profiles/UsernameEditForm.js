import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import formStyles from "../../styles/ArtworkCreateEditForm.module.css";

import { axiosRes } from "../../api/AxiosDefaults";
import {
  useLoggedInUser,
  useSetLoggedInUser,
} from "../../contexts/LoggedInUserContext";

const UsernameEditForm = () => {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const { id } = useParams();

  const loggedInUser = useLoggedInUser();
  const setLoggedInUser = useSetLoggedInUser();

  useEffect(() => {
    if (loggedInUser?.profile_id?.toString() === id) {
      setUsername(loggedInUser.username);
    } else {
      history.push("/");
    }
  }, [loggedInUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      setLoggedInUser((prevUser) => ({
        ...prevUser,
        username,
      }));
      toast.success("Username updated successfully!");
      history.goBack();
    } catch (error) {
      console.log(error);
      toast.error(
        "Something went wrong while attempting to update your username."
      );
      setErrors(error.response?.data);
    }
  };

  return (
    <Row>
      <Col className="p-2 mx-auto text-center" md={6}>
        <Container
          className={`d-flex flex-column justify-content-center py-3 p-4 ${formStyles.NameAndPasswordWidth}`}
        >
          <Form onSubmit={handleSubmit} className="my-2">
            <Form.Group>
              <Form.Label className={appStyles.AccentFont}>
                Change username
              </Form.Label>
              <Form.Control
                placeholder="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className={`mt-3 mb-4 ${formStyles.FormControlBorderRadius}`}
              />
            </Form.Group>
            {errors?.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <button
              onClick={() => history.goBack()}
              className={`mx-2 ${btnStyles.ButtonStyles}`}
            >
              Cancel
            </button>
            <button type="submit" className={`mx-2 ${btnStyles.ButtonStyles}`}>
              Save
            </button>
          </Form>
        </Container>
      </Col>
    </Row>
  );
};

export default UsernameEditForm;
