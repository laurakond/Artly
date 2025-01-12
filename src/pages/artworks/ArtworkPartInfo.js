import React from "react";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CardImg from "react-bootstrap/CardImg";
import { Link } from "react-router-dom";
import styles from "../../styles/ArtworkPartInfo.module.css";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
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
    description,
    sold,
    updated_at,
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
                save_id: null,
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
      className={`flex-column flex-sm-row p-0 ${styles.Parent} ${styles.Card}`}
      lg={8}
    >
      <div>{sold ? <span className={styles.Ribbon}>Sold</span> : null}</div>
      <Link to={`/artworks/${id}`} className={`d-flex justify-content-center`}>
        <CardImg
          variant="top"
          src={image}
          alt={artwork_title}
          className={styles.CardImageStyle}
        />
      </Link>

      <div className={`d-flex flex-column ${styles.MainCardWidth}`}>
        <Card.Header className={`${styles.CardHeader}`}>
          <div className="d-flex justify-content-between align-items-center">
            <Link to={`/profiles/${profile_id}`}>
              <Avatar
                src={profile_image}
                height={40}
                alt={`${owner}'s avatar`}
              />
              {owner}
            </Link>
            {!sold ? <div>{updated_at}</div> : null}
          </div>
        </Card.Header>

        <Card.Body className="flex-grow-1">
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
                {description.substring(0, 65)}
                {description.length > 65 ? "..." : ""}
              </Card.Text>
            )}
          </Link>
        </Card.Body>

        <Card.Footer className={`${styles.CardFooter} mt-auto`}>
          <div className="d-flex justify-content-around">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Artwork price</Tooltip>}
            >
              {price && (
                <div>
                  <i className="fa-solid fa-hand-holding-dollar"></i> £{price}
                </div>
              )}
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Number of bids</Tooltip>}
            >
              {bids_count === 0 ? (
                <div>
                  <i className="fa-solid fa-gavel"></i> 0
                </div>
              ) : (
                <div>
                  <i className="fa-solid fa-gavel"></i> {bids_count}
                </div>
              )}
            </OverlayTrigger>
            <div>
              {is_owner ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>You can't save your own artwork</Tooltip>}
                >
                  <i className={`fa-regular fa-bookmark ${styles.Bookmark}`} />
                </OverlayTrigger>
              ) : save_id ? (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      Click to remove the artwork from the saved artwork list
                    </Tooltip>
                  }
                >
                  <span onClick={handleDeselectSave}>
                    <i className={`fa-solid fa-bookmark ${styles.Bookmark}`} />
                  </span>
                </OverlayTrigger>
              ) : loggedInUser ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Click to save the artwork</Tooltip>}
                >
                  <span onClick={handleSave}>
                    <i
                      className={`fa-regular fa-bookmark ${styles.Bookmark}`}
                    />
                  </span>
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Log in to save the artwork</Tooltip>}
                >
                  <i className={`fa-regular fa-bookmark ${styles.Bookmark}`} />
                </OverlayTrigger>
              )}
              {saved_count}
            </div>
          </div>
        </Card.Footer>
      </div>
    </Card>
  );
};

export default ArtworkPartInfo;
