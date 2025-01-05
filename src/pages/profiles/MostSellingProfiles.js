import React from "react";
// import appStyles from "../../App.module.css";
import { Container } from "react-bootstrap";
import Asset from "../../components/Asset";
import Profile from "./Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";

const MostSellingProfiles = ({ mobile }) => {
  const { mostSellingProfiles } = useProfileData();

  return (
    <Container className={`${mobile && "d-lg-none text-center mb-3"}`}>
      {mostSellingProfiles.results.length ? (
        <>
          <p>Top sellers</p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {mostSellingProfiles.results.slice(0, 3).map((profile) => (
                <Profile key={profile.id} profileData={profile} mobile />
              ))}
            </div>
          ) : (
            mostSellingProfiles.results.map((profile) => (
              <Profile key={profile.id} profileData={profile} />
            ))
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default MostSellingProfiles;
