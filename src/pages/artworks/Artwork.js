import React from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import CardImg from "react-bootstrap/CardImg";
import { DropdownMenu } from "../../components/DropdownMenu";
import { axiosRes } from "../../api/AxiosDefaults";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import Avatar from "../../components/Avatar";
import sharedArtStyles from "../../styles/ArtworkPartInfo.module.css";
import styles from "../../styles/Artwork.module.css";

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
    artworkPage,
    profile_id,
    profile_image,
    // save_id,
    updated_at,
    // handleDeselectSave,
    // handleSave,
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
    <Card
      className={`flex-column p-0 ${sharedArtStyles.Parent}`}
      lg={8}
      style={{ maxWidth: "100%" }}
    >
      <div>
        {sold ? <span className={sharedArtStyles.Ribbon}>Sold</span> : null}
      </div>
      <Link to={`/artworks/${id}`} className={`d-flex justify-content-center`}>
        <CardImg
          variant="top"
          src={image}
          alt={artwork_title}
          className={styles.ArtworkContainImage}
        />
      </Link>

      <div className={`d-flex flex-column`}>
        <Card.Header className={`${sharedArtStyles.CardHeader}`}>
          <div className="d-flex justify-content-between align-items-center">
            <Link to={`/profiles/${profile_id}`}>
              <Avatar
                src={profile_image}
                height={40}
                alt={`${owner}'s avatar`}
              />
              {owner}
            </Link>
            <div>
              {is_owner ? (
                artworkPage &&
                !sold && (
                  <DropdownMenu
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                )
              ) : (
                <div>{updated_at}</div>
              )}
            </div>
          </div>
          <div
            className={`d-flex justify-content-center align-items-center ${styles.HeaderPriceAndLocation}`}
          >
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Artwork price</Tooltip>}
            >
              <div>
                {price && (
                  <div>
                    <i className="fa-solid fa-hand-holding-dollar"></i> £{price}
                  </div>
                )}
              </div>
            </OverlayTrigger>
            <div>
              <i className="fa-solid fa-location-dot"></i> {location}
            </div>
          </div>
        </Card.Header>

        <Card.Body className={`flex-grow-1 ${styles.CardBody}`}>
          <Link to={`/artworks/${id}`}>
            <div>
              {artwork_title && (
                <Card.Title className={`${sharedArtStyles.CardTitle}`}>
                  {artwork_title}
                </Card.Title>
              )}
              {artist_name && (
                <Card.Text className={`${sharedArtStyles.CardText}`}>
                  By {artist_name}
                </Card.Text>
              )}
              {description && (
                <Card.Text className={`${sharedArtStyles.CardText}`}>
                  {description}
                </Card.Text>
              )}
            </div>
          </Link>
        </Card.Body>

        <Card.Footer className={`${sharedArtStyles.CardFooter} mt-auto`}>
          <div className="d-flex justify-content-around">
            <div>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Artwork style</Tooltip>}
              >
                <div>
                  {style && (
                    <div>
                      <i className="fa-solid fa-pen"></i> {style}
                    </div>
                  )}
                </div>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Payment method</Tooltip>}
              >
                <div>
                  {payment_method && (
                    <div>
                      <i className="fa-solid fa-coins"></i> {payment_method}
                    </div>
                  )}
                </div>
              </OverlayTrigger>
            </div>
            <div>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Artwork type</Tooltip>}
              >
                <div>
                  {type && (
                    <div>
                      <i className="fa-solid fa-palette"></i> {type}
                    </div>
                  )}
                </div>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Seller's contact</Tooltip>}
              >
                <div>
                  {contact && (
                    <div>
                      <i className="fa-solid fa-mobile-screen-button"></i>{" "}
                      {contact}
                    </div>
                  )}
                </div>
              </OverlayTrigger>
            </div>
          </div>
          {/* <div className={`${styles.Bookmark}`}>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't save your own artwork</Tooltip>}
              >
                <span>
                  <i
                    className={`fa-regular fa-bookmark ${sharedArtStyles.Bookmark}`}
                  />
                </span>
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
                  <i
                    className={`fa-solid fa-bookmark ${sharedArtStyles.Bookmark}`}
                  />
                </span>
              </OverlayTrigger>
            ) : loggedInUser ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Click to save the artwork</Tooltip>}
              >
                <span onClick={handleSave}>
                  <i
                    className={`fa-regular fa-bookmark ${sharedArtStyles.Bookmark}`}
                  />
                </span>
              </OverlayTrigger>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to save the artwork</Tooltip>}
              >
                <i
                  className={`fa-regular fa-bookmark ${sharedArtStyles.Bookmark}`}
                />
              </OverlayTrigger>
            )}
          </div> */}
        </Card.Footer>
      </div>
    </Card>
  );
};

export default Artwork;
