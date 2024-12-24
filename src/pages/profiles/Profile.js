import React from "react";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import { Link } from "react-router-dom";

const Profile = (props) => {
  const { profileData, mobile, imageSize = 55 } = props;
  const { id, artwork_count, profile_image, owner } = profileData;

  const loggedInUser = useLoggedInUser();
  const is_owner = loggedInUser?.username === owner;

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          avatar space
        </Link>
      </div>
      <div className="mx-2">
        <strong>{owner}</strong>
      </div>
    </div>
  );
};

export default Profile;
