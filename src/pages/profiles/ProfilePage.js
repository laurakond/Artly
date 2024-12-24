import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Asset from "../../components/Asset";

import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import MostSellingProfiles from "./MostSellingProfiles";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/AxiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Image } from "react-bootstrap";
import Artwork from "../artworks/Artwork";
import InfiniteScroll from "react-infinite-scroll-component";
import NoResults from "../../assets/no-results.png";
import { fetchMoreData } from "../../utils/utils";

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

  const sellerProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image roundedCircle src={profile?.image} />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <Row className="justify-content-center no-gutter">
            <Col xs={3}>
              <div>{profile?.artwork_count}</div>
              <div>artworks</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          <p>Follow button</p>
        </Col>
        <Col className="p-3">Profile content</Col>
      </Row>
    </>
  );

  const sellerProfileArtworks = (
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
              setProfileArtworks={setProfileArtworks}
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
        <Container>
          {hasLoaded ? (
            <>
              {sellerProfile}
              {sellerProfileArtworks}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <MostSellingProfiles />
      </Col>
      {profile?.influences && <Col>{profile.influences}</Col>}
    </Row>
  );
}

export default ProfilePage;
