import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import appStyles from "../../App.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/AxiosDefaults";
import {
  useLoggedInUser,
  useSetLoggedInUser,
} from "../../contexts/LoggedInUserContext";

const ProfileEditForm = () => {
  const loggedInUser = useLoggedInUser();
  const setLoggedInUser = useSetLoggedInUser();
  const { id } = useParams();
  const history = useHistory();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    location: "",
    profile_image: "",
    styles: "",
    techniques: "",
    influences: "",
    collaborations: "",
    portfolio_url: "",
  });
  const {
    name,
    location,
    profile_image,
    styles,
    techniques,
    influences,
    collaborations,
    portfolio_url,
  } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (loggedInUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const {
            name,
            location,
            profile_image,
            styles,
            techniques,
            influences,
            collaborations,
            portfolio_url,
          } = data;
          setProfileData({
            name,
            location,
            profile_image,
            styles,
            techniques,
            influences,
            collaborations,
            portfolio_url,
          });
        } catch (error) {
          console.log(error);
          history.push("/");
        }
      } else {
        history.push("/");
      }
    };

    handleMount();
  }, [loggedInUser, history, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("location", location);
    formData.append("styles", styles);
    formData.append("techniques", techniques);
    formData.append("influences", influences);
    formData.append("collaborations", collaborations);
    formData.append("portfolio_url", portfolio_url);

    if (imageFile?.current?.files[0]) {
      formData.append("profile_image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      setLoggedInUser((loggedInUser) => ({
        ...loggedInUser,
        profile_image: data.profile_image,
      }));
      history.goBack();
    } catch (error) {
      console.log(error);
      setErrors(error.response?.data);
    }
  };

  const textFields = (
    <>
      <Form.Group>
        <Form.Label>Location</Form.Label>
        <Form.Control
          type="text"
          value={location}
          onChange={handleChange}
          name="location"
          // rows={7}
        />
      </Form.Group>

      {errors?.content?.map((message, index) => (
        <Alert variant="warning" key={index}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Styles</Form.Label>
        <Form.Control
          type="textarea"
          value={styles}
          onChange={handleChange}
          name="styles"
          // rows={7}
        />
      </Form.Group>

      {errors?.content?.map((message, index) => (
        <Alert variant="warning" key={index}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Techniques</Form.Label>
        <Form.Control
          type="textarea"
          value={techniques}
          onChange={handleChange}
          name="techniques"
          rows={7}
        />
      </Form.Group>

      {errors?.content?.map((message, index) => (
        <Alert variant="warning" key={index}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Influences</Form.Label>
        <Form.Control
          type="textarea"
          value={influences}
          onChange={handleChange}
          name="influences"
          rows={7}
        />
      </Form.Group>

      {errors?.content?.map((message, index) => (
        <Alert variant="warning" key={index}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Collaborations</Form.Label>
        <Form.Control
          type="textarea"
          value={collaborations}
          onChange={handleChange}
          name="collaborations"
          rows={7}
        />
      </Form.Group>

      {errors?.content?.map((message, index) => (
        <Alert variant="warning" key={index}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Portfolio</Form.Label>
        <Form.Control
          type="url"
          value={portfolio_url}
          onChange={handleChange}
          name="portfolio_url"
          // rows={7}
        />
      </Form.Group>

      {errors?.content?.map((message, index) => (
        <Alert variant="warning" key={index}>
          {message}
        </Alert>
      ))}

      <Button onClick={() => history.goBack()}>cancel</Button>
      <Button type="submit">save</Button>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
          <Container>
            <Form.Group>
              {profile_image && (
                <figure>
                  <Image
                    className={appStyles.Image}
                    src={profile_image}
                    fluid
                  />
                </figure>
              )}
              {errors?.profile_image?.map((message, index) => (
                <Alert variant="warning" key={index}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label className={`btn my-auto`} htmlFor="image-upload">
                  Change the image
                </Form.Label>
              </div>
              <Form.File
                id="image-upload"
                ref={imageFile}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files.length) {
                    setProfileData({
                      ...profileData,
                      profile_image: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
          <Container>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEditForm;
