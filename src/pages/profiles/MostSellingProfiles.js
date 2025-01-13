import React from "react";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";
import Profile from "./Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";
import styles from "../../styles/MostSellingProfiles.module.css";
import appStyles from "../../App.module.css";

const MostSellingProfiles = ({ mobile }) => {
  const { mostSellingProfiles } = useProfileData();

  return (
    <Container className={`${mobile && "d-lg-none text-center mb-3"} `}>
      {mostSellingProfiles.results.length ? (
        <>
          <p className={appStyles.AccentFont}>Top sellers</p>
          <div className={`${styles.MostSellingContainer}`}>
            {mostSellingProfiles.results.map((profile) => (
              <Profile key={profile.id} profileData={profile} />
            ))}
          </div>
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default MostSellingProfiles;
