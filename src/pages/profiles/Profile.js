import React from "react";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Profile.module.css";
import appStyles from "../../App.module.css";

const Profile = (props) => {
  const { profileData, mobile, imageSize = 55 } = props;
  const { id, owner, following_id, profile_image } = profileData;
  const { handleFollowUser, handleUnfollowUser } = useSetProfileData();

  const loggedInUser = useLoggedInUser();
  const is_owner = loggedInUser?.username === owner;

  return (
    <div
      className={`my-3 flex-column align-items-center justify-content-center ${
        mobile && "flex-column"
      }`}
    >
      <div className="position-relative">
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={profile_image} height={imageSize} />
        </Link>
      </div>
      <div className="text-center">
        <strong>{owner}</strong>
      </div>
      <div className={`${styles.FollowIconStyle} ${appStyles.HoverEffect}`}>
        {!mobile &&
          loggedInUser &&
          !is_owner &&
          (following_id ? (
            <OverlayTrigger
              placement="top"
              PopperProps={{ style: { pointerEvents: "none" } }}
              overlay={<Tooltip>Click to unfollow {owner}</Tooltip>}
            >
              <div className={styles.FollowIcon}>
                <i
                  className="fa-solid fa-minus fa-lg"
                  onClick={() => handleUnfollowUser(profileData)}
                ></i>
              </div>
            </OverlayTrigger>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Click to follow {owner}</Tooltip>}
              PopperProps={{ style: { pointerEvents: "none" } }}
            >
              <div className={appStyles.HoverEffect}>
                <i
                  className="fa-solid fa-plus fa-lg"
                  onClick={() => handleFollowUser(profileData)}
                ></i>
              </div>
            </OverlayTrigger>
          ))}
      </div>
    </div>
  );
};

export default Profile;
