import React from "react";
import { Link } from "react-router-dom";
import Media from "react-bootstrap/Media";
// import { OverlayTrigger } from "react-bootstrap";
// import { Tooltip } from "react-bootstrap";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import Avatar from "../../components/Avatar";
import { BuyerDropdownMenu } from "../../components/DropdownMenu";
import artworkStyles from "../../styles/Artwork.module.css";
import styles from "../../styles/Bid.module.css";
import btnStyles from "../../styles/Buttons.module.css";

const Bid = (props) => {
  const {
    buyer,
    updated_at,
    bid_price,
    seller,
    email,
    status,
    artwork_is_sold,
    id,
    handleAcceptBid,
    handleRejectBid,
    handleSoldBid,
    handleDeleteBid,
    profile_id,
    profile_image,
  } = props;
  const loggedInUser = useLoggedInUser();
  const is_seller = loggedInUser?.username === seller;
  const is_buyer = loggedInUser?.username === buyer;

  return (
    <div>
      <Media
        className={`${
          is_seller && !artwork_is_sold
            ? styles.SellerActionButtons
            : is_buyer && !artwork_is_sold
            ? styles.BuyerDeleteBid
            : styles.ExistingBids
        }`}
      >
        <div className={`d-flex flex-flow-row `}>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} />
          </Link>
          <Media.Body className="align-self-center ml-2">
            <div
              className={`d-flex justify-content-between flex-column ${styles.Test}`}
            >
              <span>{updated_at}</span>

              {/* Bid display based on the bid status and if artwork is sold */}
              {artwork_is_sold && status === "Sold" ? (
                <p className="mb-0">
                  Bid placed: £{bid_price} Status: {status}
                </p>
              ) : artwork_is_sold ? (
                <p>Bid placed: £{bid_price}</p>
              ) : (
                <p>
                  Bid placed: £{bid_price} Status: {status}
                </p>
              )}
            </div>
          </Media.Body>
        </div>
        <div>
          {is_seller && status === "Sold" ? (
            <div className="d-flex align-items-center m-2">
              <a
                href={`mailto:${email}`}
                rel="noopener"
                aria-label="Email the buyer (opens email in the new window)"
                className={` ${btnStyles.ButtonStyles}`}
              >
                Email the buyer
              </a>
              <br />
              <br />
            </div>
          ) : (
            is_seller &&
            !artwork_is_sold && (
              <div>
                <button
                  onClick={() => handleAcceptBid(id)}
                  className={`m-2 ${btnStyles.ButtonStyles}`}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleRejectBid(id)}
                  className={`m-2 ${btnStyles.ButtonStyles}`}
                >
                  Reject
                </button>
                <button
                  onClick={() => handleSoldBid(id)}
                  className={`m-2 ${btnStyles.ButtonStyles}`}
                >
                  Mark as sold
                </button>
              </div>
            )
          )}
        </div>
        {/* Delete bid available for the buyer only if the bid is not marked as sold */}
        {is_buyer && !artwork_is_sold && (
          <div className={artworkStyles.EditDeleteButton}>
            <BuyerDropdownMenu handleDelete={() => handleDeleteBid(id)} />
          </div>
        )}
      </Media>
    </div>
  );
};

export default Bid;
