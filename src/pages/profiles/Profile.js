import React from "react";
import { Link } from "react-router-dom";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
import Avatar from "../../components/Avatar";

const Profile = (props) => {
  const { profileData, mobile, imageSize = 55 } = props;
  const { id, owner, following_id, profile_image } = profileData;
  const { handleFollowUser, handleUnfollowUser } = useSetProfileData();

  const loggedInUser = useLoggedInUser();
  const is_owner = loggedInUser?.username === owner;

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={profile_image} height={imageSize} />
        </Link>
      </div>
      <div className="mx-2">
        <strong>{owner}</strong>
      </div>
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {!mobile &&
          loggedInUser &&
          !is_owner &&
          (following_id ? (
            <button onClick={() => handleUnfollowUser(profileData)}>
              unfollow
            </button>
          ) : (
            <button onClick={() => handleFollowUser(profileData)}>
              follow
            </button>
          ))}
      </div>
    </div>
  );
};

export default Profile;
