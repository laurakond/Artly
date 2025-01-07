import React from "react";
// import appStyles from "../../App.module.css";
import { Container } from "react-bootstrap";
import Asset from "../../components/Asset";
import Profile from "./Profile";
import styles from "../../styles/MostSellingProfiles.module.css";
import allArtworkStyles from "../../styles/AllArtworksPage.module.css";
import { useProfileData } from "../../contexts/ProfileDataContext";

const MostSellingProfiles = ({ mobile }) => {
  const { mostSellingProfiles } = useProfileData();

  return (
    <Container
      className={`${mobile && "d-lg-none text-center mb-3"} ${
        allArtworkStyles.ContentWidth
      }`}
    >
      {mostSellingProfiles.results.length ? (
        <>
          <p>Top sellers</p>
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
