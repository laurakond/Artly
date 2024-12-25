import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/AxiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Button, Image } from "react-bootstrap";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import MostSellingProfiles from "./MostSellingProfiles";
import InfiniteScroll from "react-infinite-scroll-component";
import Artwork from "../artworks/Artwork";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/DropdownMenu";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const loggedInUser = useLoggedInUser();
  const { id } = useParams();
  const { setProfileData } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = loggedInUser?.username === profile?.owner;
  const [profileArtworks, setProfileArtworks] = useState({ results: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileArtworks }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/artworks/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileArtworks(profileArtworks);
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const profileContent = (
    <>
      {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image roundedCircle src={profile?.image} />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <div>
            {profile?.location === "" ? (
              <Card.Text>No location given.</Card.Text>
            ) : (
              <Card.Text>{profile?.location}</Card.Text>
            )}
          </div>
          <div>
            {profile?.portfolio_url === "" ? (
              <Card.Text>Porfolio: No portfolio given.</Card.Text>
            ) : (
              <Card.Text>{profile?.portfolio_url}</Card.Text>
            )}
          </div>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="my-2">
              <div>{profile?.artwork_count}</div>
              <div>artworks</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                {profile?.styles === "" ? (
                  <Card.Text>Style: No styles noted.</Card.Text>
                ) : (
                  <Card.Text>Style: {profile?.styles}</Card.Text>
                )}
              </div>
              <div>
                {profile?.techniques === "" ? (
                  <Card.Text>Technique: No techniques noted.</Card.Text>
                ) : (
                  <Card.Text>Technique: {profile?.techniques}</Card.Text>
                )}
              </div>
              <div>
                {profile?.influences === "" ? (
                  <Card.Text>Influences: No influences noted.</Card.Text>
                ) : (
                  <Card.Text>Influences: {profile?.influences}</Card.Text>
                )}
              </div>
              <div>
                {profile?.collaborations === "" ? (
                  <Card.Text>
                    Collaborations: No collaborations noted.
                  </Card.Text>
                ) : (
                  <Card.Text>
                    Collaborations: {profile?.collaborations}
                  </Card.Text>
                )}
              </div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {loggedInUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button onClick={() => {}}>unfollow</Button>
            ) : (
              <Button onClick={() => {}}>follow</Button>
            ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  const profileOwnersArtworks = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s artworks</p>
      <hr />
      {profileArtworks.results.length ? (
        <InfiniteScroll
          children={profileArtworks.results.map((artwork) => (
            <Artwork
              key={artwork.id}
              {...artwork}
              setArtworks={setProfileArtworks}
            />
          ))}
          dataLength={profileArtworks.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileArtworks.next}
          next={() => fetchMoreData(profileArtworks, setProfileArtworks)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <MostSellingProfiles mobile />
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {profileContent}
              {profileOwnersArtworks}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <MostSellingProfiles />
      </Col>
    </Row>
  );
}

export default ProfilePage;
