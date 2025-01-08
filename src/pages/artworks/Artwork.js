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
    updated_at,
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
      className={`flex-column p-0 ${sharedArtStyles.Parent} ${styles.ArtworkCardWidth}`}
    >
      <div>
        {sold ? <span className={sharedArtStyles.Ribbon}>Sold</span> : null}
      </div>
      <div className={`d-flex justify-content-center`}>
        <CardImg
          variant="top"
          src={image}
          alt={artwork_title}
          className={styles.ArtworkContainImage}
        />
      </div>

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
            <div className={styles.EditDeleteButton}>
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
          <div>
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
          </div>
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
        </Card.Footer>
      </div>
    </Card>
  );
};

export default Artwork;
