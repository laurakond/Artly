import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import appStyles from "../../App.module.css";
import formStyles from "../../styles/ArtworkCreateEditForm.module.css";
import btnStyles from "../../styles/Buttons.module.css";

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
      toast.success("Profile updated successfully!");
      history.goBack();
    } catch (error) {
      console.log(error);
      toast.error(
        "Something went wrong while attempting to update your profile."
      );
      setErrors(error.response?.data);
    }
  };

  const textFields = (
    <>
      <div className="text-center">
        <Form.Group>
          <Form.Label className={appStyles.AccentFont}>Location</Form.Label>
          <Form.Control
            type="text"
            value={location}
            onChange={handleChange}
            name="location"
            className={formStyles.FormControlBorderRadius}
            // rows={7}
          />
        </Form.Group>

        {errors?.content?.map((message, index) => (
          <Alert variant="warning" key={index}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label className={appStyles.AccentFont}>Styles</Form.Label>
          <Form.Control
            type="textarea"
            value={styles}
            onChange={handleChange}
            name="styles"
            className={formStyles.FormControlBorderRadius}
            // rows={7}
          />
        </Form.Group>

        {errors?.content?.map((message, index) => (
          <Alert variant="warning" key={index}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label className={appStyles.AccentFont}>Techniques</Form.Label>
          <Form.Control
            type="textarea"
            value={techniques}
            onChange={handleChange}
            name="techniques"
            rows={7}
            className={formStyles.FormControlBorderRadius}
          />
        </Form.Group>

        {errors?.content?.map((message, index) => (
          <Alert variant="warning" key={index}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label className={appStyles.AccentFont}>Influences</Form.Label>
          <Form.Control
            type="textarea"
            value={influences}
            onChange={handleChange}
            name="influences"
            rows={7}
            className={formStyles.FormControlBorderRadius}
          />
        </Form.Group>

        {errors?.content?.map((message, index) => (
          <Alert variant="warning" key={index}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label className={appStyles.AccentFont}>
            Collaborations
          </Form.Label>
          <Form.Control
            type="textarea"
            value={collaborations}
            onChange={handleChange}
            name="collaborations"
            rows={7}
            className={formStyles.FormControlBorderRadius}
          />
        </Form.Group>

        {errors?.content?.map((message, index) => (
          <Alert variant="warning" key={index}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label className={appStyles.AccentFont}>Portfolio</Form.Label>
          <Form.Control
            type="url"
            value={portfolio_url}
            onChange={handleChange}
            name="portfolio_url"
            className={formStyles.FormControlBorderRadius}
            // rows={7}
          />
        </Form.Group>

        {errors?.content?.map((message, index) => (
          <Alert variant="warning" key={index}>
            {message}
          </Alert>
        ))}

        <button
          onClick={() => history.goBack()}
          type="button"
          className={`mx-2 ${btnStyles.ButtonStyles}`}
        >
          cancel
        </button>
        <button type="submit" className={`mx-2 ${btnStyles.ButtonStyles}`}>
          save
        </button>
      </div>
    </>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="p-2 p-md-4" md={5} lg={6}>
          <Container
            className={`d-flex flex-column justify-content-center py-3 p-4 ${formStyles.MainArtworkFormContainer}`}
          >
            <Form.Group className="text-center col-s-mb-0">
              {profile_image && (
                <figure>
                  <Image
                    className={appStyles.Image}
                    src={profile_image}
                    // fluid
                    rounded
                  />
                </figure>
              )}
              {errors?.profile_image?.map((message, index) => (
                <Alert variant="warning" key={index}>
                  {message}
                </Alert>
              ))}
              <div>
                <Form.Label
                  htmlFor="image-upload"
                  className={`${appStyles.AccentFont} ${formStyles.CreateArtworkUpload} ${btnStyles.ButtonStyles}`}
                >
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
        <Col md={7} lg={6} className="d-none d-md-block p-2 p-md-2 pr-xl-5">
          <Container>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
};

export default ProfileEditForm;
