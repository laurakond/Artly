import React, { useEffect, useState } from "react";
// import appStyles from "../../App.module.css";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/AxiosDefaults";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import Asset from "../../components/Asset";
import Profile from "./Profile";

const MostSellingProfiles = ({ mobile }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    mostSellingProfiles: { results: [] },
  });

  const { mostSellingProfiles } = profileData;
  const loggedInUser = useLoggedInUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(
          "/profiles/?ordering=-artwork_count"
        );
        setProfileData((prevState) => ({
          ...prevState,
          mostSellingProfiles: data,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    handleMount();
  }, [loggedInUser]);

  return (
    <Container className={`${mobile && "d-lg-none text-center mb-3"}`}>
      {mostSellingProfiles.results.length ? (
        <>
          <p>Top sellers</p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {mostSellingProfiles.results.slice(0, 4).map((profile) => (
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
