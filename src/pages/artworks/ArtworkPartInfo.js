import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Media from "react-bootstrap/Media";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardImg from "react-bootstrap/CardImg";
import { Link } from "react-router-dom";
import appStyles from "../../App.module.css";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import styles from "../../styles/Artwork.module.css";
import { OverlayTrigger } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";
import { axiosRes } from "../../api/AxiosDefaults";

const ArtworkPartInfo = (props) => {
  const {
    id,
    owner,
    artwork_title,
    artist_name,
    price,
    image,
    alt_text,
    description,
    sold,
    updated_at,
    style,
    type,
    bids_count,
    saved_count,
    save_id,
    setArtworks,
  } = props;

  const loggedInUser = useLoggedInUser();
  const is_owner = loggedInUser?.username === owner;

  const handleSave = async () => {
    try {
      const { data } = await axiosRes.post("/saved/", { artwork: id });
      setArtworks((prevArtworks) => ({
        ...prevArtworks,
        results: prevArtworks.results.map((artwork) => {
          return artwork.id === id
            ? {
                ...artwork,
                saved_count: artwork.saved_count + 1,
                save_id: data.id,
              }
            : artwork;
        }),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeselectSave = async () => {
    try {
      await axiosRes.delete(`/saved/${save_id}/`);
      setArtworks((prevArtworks) => ({
        ...prevArtworks,
        results: prevArtworks.results.map((artwork) => {
          return artwork.id === id
            ? {
                ...artwork,
                saved_count: artwork.saved_count - 1,
                like_id: null,
              }
            : artwork;
        }),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={styles.Parent}>
      <div>{sold ? <span className={styles.Ribbon}>Sold</span> : null}</div>

      <Card.Body style={{ opacity: sold ? "60%" : null }}>
        <Media className="align-items-center justify-content-between">
          {owner}
        </Media>

        <div className="d-flex align-items-center">
          <span>{updated_at}</span>
        </div>

        <Link to={`/artworks/${id}`}>
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
                  alt={alt_text}
                  className={appStyles.Image}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                {style && <Card.Text>Style: {style}</Card.Text>}
                {type && <Card.Text>Type: {type}</Card.Text>}
              </Col>
              <Col>
                {price && <Card.Text>Price: £{price}</Card.Text>}
                {bids_count === 0 ? (
                  <Card.Text>Number of bids: No bids yet</Card.Text>
                ) : (
                  <Card.Text>Number of bids: {bids_count}</Card.Text>
                )}
              </Col>
            </Row>
          </Container>
        </Link>
        <Col>
          <div>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't save your own post!</Tooltip>}
              >
                <i className="fa-regular fa-bookmark" />
              </OverlayTrigger>
            ) : save_id ? (
              <span onClick={handleDeselectSave}>
                <i className="fa-solid fa-bookmark" />
              </span>
            ) : loggedInUser ? (
              <span onClick={handleSave}>
                <i className="fa-regular fa-bookmark" />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to like posts!</Tooltip>}
              >
                <i class="fa-regular fa-bookmark" />
              </OverlayTrigger>
            )}
            {saved_count}
          </div>
        </Col>
      </Card.Body>
    </Card>
  );
};

export default ArtworkPartInfo;
