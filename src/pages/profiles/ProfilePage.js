import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Asset from "../../components/Asset";
import { axiosReq } from "../../api/AxiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import { ProfileEditDropdown } from "../../components/DropdownMenu";
import MostSellingProfiles from "./MostSellingProfiles";
import ArtworkPartInfo from "../artworks/ArtworkPartInfo";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.webp";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import tabStyles from "../../styles/Tabs.module.css";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const loggedInUser = useLoggedInUser();
  const { id } = useParams();
  const { setProfileData, handleFollowUser, handleUnfollowUser } =
    useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = loggedInUser?.username === profile?.owner;
  const [profileArtworks, setProfileArtworks] = useState({ results: [] });

  useEffect(() => {
    // Manages profile information view
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
      {profile?.is_owner && (
        <ProfileEditDropdown
          id={profile?.id}
          className={appStyles.HoverEffect}
        />
      )}

      <Row noGutters className=" text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={`${styles.ProfileImage}`}
            roundedCircle
            src={profile?.profile_image}
            alt={`${profile?.owner}'s profile image`}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">{profile?.owner}</h3>
          <div>
            {profile?.location === "" ? (
              <div className={`mb-2 ${styles.SubjectStyles}`}>
                <i className="fa-solid fa-location-dot fa-lg"></i>
                <p>No location given.</p>
              </div>
            ) : (
              <div className={`mb-2 ${styles.SubjectStyles}`}>
                <i className="fa-solid fa-location-dot fa-lg"></i>
                {profile?.location}
              </div>
            )}
          </div>
          <div>
            {profile?.portfolio_url === "" ? (
              <div className={`mb-2 ${styles.SubjectStyles}`}>
                <i className="fa-solid fa-arrow-up-right-from-square fa-sm"></i>
                No portfolio given.
              </div>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>Opens {profile?.owner}'s portfolio website</Tooltip>
                }
              >
                <div
                  className={`mb-2 ${styles.SubjectStyles} ${appStyles.HoverEffect}`}
                >
                  <i className="fa-solid fa-arrow-up-right-from-square fa-sm"></i>
                  <a href={profile?.portfolio_url}>Portfolio link</a>
                </div>
              </OverlayTrigger>
            )}
          </div>
          <Row
            className={`justify-content-center no-gutters my-4 ${styles.ProfileStats}`}
          >
            <Col xs={6} sm={3} className={`my-2 ${appStyles.AccentFont}`}>
              <div>{profile?.artwork_count}</div>
              <div>artworks</div>
            </Col>
            <Col xs={6} sm={3} className={`my-2 ${appStyles.AccentFont}`}>
              <div>{profile?.sold_artwork_count}</div>
              <div>sold artworks</div>
            </Col>
            <Col xs={6} sm={3} className={`my-2 ${appStyles.AccentFont}`}>
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
            <Col xs={6} sm={3} className={`my-2 ${appStyles.AccentFont}`}>
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {loggedInUser &&
            !is_owner &&
            (profile?.following_id ? (
              <button
                onClick={() => handleUnfollowUser(profile)}
                className={btnStyles.ButtonStyles}
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => handleFollowUser(profile)}
                className={btnStyles.ButtonStyles}
              >
                Follow
              </button>
            ))}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  // Main Portfolio page information
  const profileOwnersArtworks = (
    <>
      <p className={`text-center mt-4 ${styles.SubjectStyles}`}>
        {profile?.owner}'s artworks
      </p>

      {profileArtworks.results.length ? (
        <InfiniteScroll
          children={profileArtworks.results.map((artwork) => (
            <ArtworkPartInfo
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

  // Portfolio details for users who are artists
  const portfolioDetails = (
    <>
      <Row>
        <Col>
          <div>
            {profile?.styles === "" ? (
              <div>
                <p className={`mb-0 ${styles.SubjectStyles}`}>Style:</p>
                <p className={appStyles.AccentFont}> No styles noted.</p>
              </div>
            ) : (
              <div>
                <p className={`mb-0 ${styles.SubjectStyles}`}>Style:</p>
                <p className={appStyles.AccentFont}>{profile?.styles}</p>
              </div>
            )}
          </div>
          <div>
            {profile?.techniques === "" ? (
              <div>
                <p className={`mb-0 ${styles.SubjectStyles}`}>Technique:</p>
                <p className={appStyles.AccentFont}>No techniques noted.</p>
              </div>
            ) : (
              <div>
                <p className={`mb-0 ${styles.SubjectStyles}`}>Technique:</p>
                <p className={appStyles.AccentFont}>{profile?.techniques}</p>
              </div>
            )}
          </div>
          <div>
            {profile?.influences === "" ? (
              <div>
                <p className={`mb-0 ${styles.SubjectStyles}`}>Influences:</p>
                <p className={appStyles.AccentFont}>No influences noted.</p>
              </div>
            ) : (
              <div>
                <p className={`mb-0 ${styles.SubjectStyles}`}>Influences:</p>
                <p className={appStyles.AccentFont}>{profile?.influences}</p>
              </div>
            )}
          </div>
          <div>
            {profile?.collaborations === "" ? (
              <div>
                <p className={`mb-0 ${styles.SubjectStyles}`}>
                  Collaborations:
                </p>
                <p className={appStyles.AccentFont}>No collaborations noted.</p>
              </div>
            ) : (
              <div>
                <p className={`mb-0 ${styles.SubjectStyles}`}>
                  Collaborations:
                </p>
                <p className={appStyles.AccentFont}>
                  {profile?.collaborations}
                </p>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </>
  );

  // Profile page tabs(code taken from Bootstrap)
  const profilePageTabs = (
    <>
      <Tabs
        defaultActiveKey="profile-details"
        transition={false}
        className={`${tabStyles.TabStyles} mt-3`}
      >
        <Tab eventKey="profile-details" title="More Details" className="mt-2">
          {portfolioDetails}
        </Tab>
        <Tab eventKey="artworks" title="Artworks" className="mt-2">
          {profileOwnersArtworks}
        </Tab>
      </Tabs>
    </>
  );

  return (
    <Container className={styles.Container}>
      <Row className="h-100 justify-content-center">
        <Col xs={12}>
          <MostSellingProfiles />
        </Col>
        <Col className={`py-2 pt-4 p-0 p-lg-2 `}>
          <Container className={styles.ProfileDetailWidth}>
            {hasLoaded ? (
              <>
                {profileContent}
                {profilePageTabs}
              </>
            ) : (
              <Asset spinner />
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
