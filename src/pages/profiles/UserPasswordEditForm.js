import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/AxiosDefaults";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import btnStyles from "../../styles/Buttons.module.css";
import formStyles from "../../styles/ArtworkCreateEditForm.module.css";

const UserPasswordEditForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const loggedInUser = useLoggedInUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (loggedInUser?.profile_id?.toString() !== id) {
      // redirect user if they are not the owner of this profile
      history.push("/");
    }
  }, [loggedInUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      toast.success("PAssword updated successfully!");
      history.goBack();
    } catch (error) {
      console.log(error);
      toast.error(
        "Something went wrong while attempting to update your password."
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
              <Form.Label className={formStyles.FormLabelFont}>
                New password
              </Form.Label>
              <Form.Control
                placeholder="new password"
                type="password"
                value={new_password1}
                onChange={handleChange}
                name="new_password1"
                className={`mt-2 ${formStyles.FormControlBorderRadius}`}
              />
            </Form.Group>
            {errors?.new_password1?.map((message, index) => (
              <Alert key={index} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group>
              <Form.Label className={formStyles.FormLabelFont}>
                Confirm password
              </Form.Label>
              <Form.Control
                placeholder="confirm new password"
                type="password"
                value={new_password2}
                onChange={handleChange}
                name="new_password2"
                className={`mb-4 ${formStyles.FormControlBorderRadius}`}
              />
            </Form.Group>
            {errors?.new_password2?.map((message, index) => (
              <Alert key={index} variant="warning">
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

export default UserPasswordEditForm;
