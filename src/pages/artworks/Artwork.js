import React from "react";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Media from "react-bootstrap/Media";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardImg from "react-bootstrap/CardImg";
import { Link, useHistory } from "react-router-dom";
import appStyles from "../../App.module.css";
import { DropdownMenu } from "../../components/DropdownMenu";
import { axiosRes } from "../../api/AxiosDefaults";
import { toast } from "react-toastify";
import styles from "../../styles/Artwork.module.css";
import Avatar from "../../components/Avatar";

const Artwork = (props) => {
  const {
    id,
    owner,
    artwork_title,
    artist_name,
    style,
    type,
    payment_method,
    price,
    image,
    contact,
    location,
    description,
    sold,
    updated_at,
    artworkPage,
    profile_id,
    profile_image,
  } = props;

  const loggedInUser = useLoggedInUser();
  const is_owner = loggedInUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/artworks/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/artworks/${id}/`);
      history.goBack();
      toast.success("Artwork deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error(
        "Something went wrong while attempting to delete your artwork."
      );
    }
  };

  return (
    <Card className={styles.Parent}>
      <div>{sold ? <span className={styles.Ribbon}>Sold</span> : null}</div>
      <Card.Body style={{ opacity: sold ? "60%" : null }}>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar
              src={profile_image}
              height={55}
              alt={`profile image for ${owner}`}
            />
            {owner}
          </Link>
        </Media>

        <div className="d-flex align-items-center">
          <span>{updated_at}</span>
          {is_owner && artworkPage && (
            <DropdownMenu handleEdit={handleEdit} handleDelete={handleDelete} />
          )}
        </div>

        {/* <Link to={`/artworks/${id}`}> */}
        <div className="text-center">
          {artwork_title && <Card.Title>{artwork_title}</Card.Title>}
          {artist_name && <Card.Text>By {artist_name}</Card.Text>}
          {description && <Card.Text>Description: {description}</Card.Text>}
        </div>

        <Container className="p-4">
          <Row>
            <Col>
              <CardImg
                src={image}
                alt={artwork_title}
                className={appStyles.Image}
              />
            </Col>

            <Col>
              <Card.Body>
                <div>
                  {style && <Card.Text>Style: {style}</Card.Text>}
                  {type && <Card.Text>Type: {type}</Card.Text>}
                  {payment_method && (
                    <Card.Text>Payment method: {payment_method}</Card.Text>
                  )}
                  {price && <Card.Text>Price: {price}</Card.Text>}
                  {contact && <Card.Text>Contact: {contact}</Card.Text>}
                  {location && <Card.Text>Location: {location}</Card.Text>}
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Container>
        {/* </Link> */}
      </Card.Body>
    </Card>
  );
};

export default Artwork;
