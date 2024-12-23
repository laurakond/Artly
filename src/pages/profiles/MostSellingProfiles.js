import React, { useEffect, useState } from "react";
// import appStyles from "../../App.module.css";
import { Container } from "react-bootstrap";
import { axiosReq } from "../../api/AxiosDefaults";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import Asset from "../../components/Asset";

const MostSellingProfiles = () => {
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
    <Container>
      {mostSellingProfiles.results.length ? (
        <>
          <p>Top sellers</p>
          {mostSellingProfiles.results.map((profile) => (
            <p key={profile.id}>{profile.owner}</p>
          ))}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default MostSellingProfiles;
