import React from "react";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import Media from "react-bootstrap/Media";

const Bid = (props) => {
  const {
    updated_at,
    bid_price,
    seller,
    email,
    status,
    artwork_sold_status,
    id,
    handleAcceptBid,
    handleRejectBid,
    handleSoldBid,
    profile_id,
    profile_image,
  } = props;
  const loggedInUser = useLoggedInUser();
  const is_seller = loggedInUser?.username === seller;
  const artwork_available = status !== "Sold";

  return (
    <div>
      {/* <span>{buyer} -- </span> */}
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span>{updated_at}</span>
          <p>
            {" "}
            Bid placed: £{bid_price} Status: {status}{" "}
          </p>

          {is_seller && status === "Sold" ? (
            <>
              <a
                href={`mailto:${email}`}
                rel="noopener"
                aria-label="Email the buyer (opens an email claient to choose from in new window)"
              >
                Email the buyer
              </a>
              <br />
              <br />
            </>
          ) : (
            is_seller &&
            artwork_available &&
            !artwork_sold_status && (
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
      </Media>
    </div>
  );
};

export default Bid;
