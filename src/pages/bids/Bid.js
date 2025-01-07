import React from "react";
import { Link } from "react-router-dom";
import Media from "react-bootstrap/Media";
// import { OverlayTrigger } from "react-bootstrap";
// import { Tooltip } from "react-bootstrap";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import Avatar from "../../components/Avatar";
import { BuyerDropdownMenu } from "../../components/DropdownMenu";
import artworkStyles from "../../styles/Artwork.module.css";

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
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span>{updated_at}</span>

          {/* Bid display based on the bid status and if artwork is sold */}
          {artwork_is_sold && status === "Sold" ? (
            <p>
              Bid placed: £{bid_price} Status: {status}
            </p>
          ) : artwork_is_sold ? (
            <p>Bid placed: £{bid_price}</p>
          ) : (
            <p>
              Bid placed: £{bid_price} Status: {status}
            </p>
          )}

          {/* Additional information shown to the seller */}
          {is_seller && status === "Sold" ? (
            <>
              <a
                href={`mailto:${email}`}
                rel="noopener"
                aria-label="Email the buyer (opens email in the new window)"
              >
                Email the buyer
              </a>
              <br />
              <br />
            </>
          ) : (
            is_seller &&
            !artwork_is_sold && (
              <>
                <div>
                  <button onClick={() => handleAcceptBid(id)}>Approve</button>
                  <button onClick={() => handleRejectBid(id)}>Reject</button>
                  <button onClick={() => handleSoldBid(id)}>
                    Mark as sold
                  </button>
                </div>
              </>
            )
          )}
        </Media.Body>

        {/* Delete bid available for the buyer only if the bid is not marked as sold */}
        {is_buyer && !artwork_is_sold && (
          <div className={artworkStyles.EditDeleteButton}>
            <BuyerDropdownMenu handleDelete={() => handleDeleteBid(id)} />
          </div>
        )}
        {/* {is_buyer && (
          <button onClick={handleDeleteBid} className="warning">
            Delete bid
          </button>
        )} */}
      </Media>
    </div>
  );
};

export default Bid;
