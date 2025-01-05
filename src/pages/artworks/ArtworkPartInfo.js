import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Media from "react-bootstrap/Media";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardImg from "react-bootstrap/CardImg";
import { Link } from "react-router-dom";
import appStyles from "../../App.module.css";
import styles from "../../styles/Artwork.module.css";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import { OverlayTrigger } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";
import { axiosRes } from "../../api/AxiosDefaults";
import Avatar from "../../components/Avatar";

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
    profile_id,
    profile_image,
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
    <Card
      className={`p-0 ${styles.Parent}`}
      lg={8}
      style={{ maxWidth: "18rem" }}
    >
      {sold ? <span className={styles.Ribbon}>Sold</span> : null}
      <CardImg
        variant="top"
        src={image}
        alt={alt_text}
        className={styles.CardImageStyle}
      />
      <Card.Header className={`${styles.CardHeader}`}>
        <div
          className={`d-flex flex-direction-row justify-content-between align-items-center`}
        >
          {/* <Media> */}
          <div>
            <Link to={`/profiles/${profile_id}`}>
              <Avatar
                src={profile_image}
                height={40}
                alt={`${owner}'s avatar`}
              />
            </Link>
            {/* </Media> */}
            {owner}
          </div>
          <div>{updated_at}</div>
        </div>
      </Card.Header>
      <Card.Body>
        <Link to={`/artworks/${id}`}>
          {artwork_title && (
            <Card.Title className={`${styles.CardTitle}`}>
              {artwork_title}
            </Card.Title>
          )}
          {artist_name && (
            <Card.Text className={`${styles.CardText}`}>
              By {artist_name}
            </Card.Text>
          )}
          {description && (
            <Card.Text className={`${styles.CardText}`}>
              {description}
            </Card.Text>
          )}
        </Link>
      </Card.Body>
      <Card.Footer className={`${styles.CardFooter}`}>
        <div className={`d-flex flex-direction-row justify-content-around`}>
          {price && (
            <div>
              <i class="fa-solid fa-hand-holding-dollar"></i> £{price}
            </div>
          )}

          {bids_count === 0 ? (
            <div>
              <i class="fa-solid fa-gavel"></i> 0
            </div>
          ) : (
            <div>
              <i class="fa-solid fa-gavel"></i> {bids_count}
            </div>
          )}

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
                <i className="fa-regular fa-bookmark" />
              </OverlayTrigger>
            )}
            {saved_count}
          </div>
        </div>
      </Card.Footer>
    </Card>

    // <Card className={`p-0 ${styles.Parent}`} lg={8}>
    //   <div>{sold ? <span className={styles.Ribbon}>Sold</span> : null}</div>

    //   <Card.Body style={{ opacity: sold ? "60%" : null }}>
    //     {/* <Media className="align-items-center justify-content-between"></Media> */}

    //     {/* <Row> */}
    //     <Link to={`/profiles/${profile_id}`}>
    //       <Avatar src={profile_image} height={55} alt={`${owner}'s avatar`} />
    //       {owner}
    //     </Link>
    //     <div className="d-flex align-items-center">
    //       <span>{updated_at}</span>
    //     </div>
    //     {/* </Row> */}

    //     <Link to={`/artworks/${id}`}>
    //       <div className="text-center">
    //         {artwork_title && <Card.Title>{artwork_title}</Card.Title>}
    //         {artist_name && <Card.Text>By {artist_name}</Card.Text>}
    //         {description && <Card.Text>Description: {description}</Card.Text>}
    //       </div>

    //       {/* <Row> */}
    //       {/* <Col> */}
    //       <CardImg src={image} alt={alt_text} className={appStyles.Image} />
    //       {/* </Col> */}
    //       {/* </Row> */}

    //       <Row>
    //         <Col>{price && <Card.Text>Price: £{price}</Card.Text>}</Col>
    //         <Col>
    //           {bids_count === 0 ? (
    //             <Card.Text>Number of bids: No bids yet</Card.Text>
    //           ) : (
    //             <Card.Text>Number of bids: {bids_count}</Card.Text>
    //           )}
    //         </Col>
    //       </Row>
    //     </Link>
    //     <Col>
    //       <div>
    //         {is_owner ? (
    //           <OverlayTrigger
    //             placement="top"
    //             overlay={<Tooltip>You can't save your own post!</Tooltip>}
    //           >
    //             <i className="fa-regular fa-bookmark" />
    //           </OverlayTrigger>
    //         ) : save_id ? (
    //           <span onClick={handleDeselectSave}>
    //             <i className="fa-solid fa-bookmark" />
    //           </span>
    //         ) : loggedInUser ? (
    //           <span onClick={handleSave}>
    //             <i className="fa-regular fa-bookmark" />
    //           </span>
    //         ) : (
    //           <OverlayTrigger
    //             placement="top"
    //             overlay={<Tooltip>Log in to like posts!</Tooltip>}
    //           >
    //             <i className="fa-regular fa-bookmark" />
    //           </OverlayTrigger>
    //         )}
    //         {saved_count}
    //       </div>
    //     </Col>
    //   </Card.Body>
    // </Card>
  );
};

export default ArtworkPartInfo;
