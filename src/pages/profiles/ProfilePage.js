import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
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
import MostSellingProfiles from "./MostSellingProfiles";
import ArtworkPartInfo from "../artworks/ArtworkPartInfo";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/artly-no-results.png";
import styles from "../../styles/ProfilePage.module.css";
import formStyles from "../../styles/ArtworkCreateEditForm.module.css";
import btnStyles from "../../styles/Buttons.module.css";
import { ProfileEditDropdown } from "../../components/DropdownMenu";

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

      <Row noGutters className=" text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={`${styles.ProfileImage}`}
            roundedCircle
            src={profile?.profile_image}
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
              <div className="mb-2">
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
                <div className={`mb-2 ${styles.SubjectStyles}`}>
                  <i className="fa-solid fa-arrow-up-right-from-square fa-sm"></i>
                  <a href={profile?.portfolio_url}>Portfolio link</a>
                </div>
              </OverlayTrigger>
            )}
          </div>
          <Row className="justify-content-center no-gutters">
            <Col xs={6} sm={3} className={`my-2 ${formStyles.FormLabelFont}`}>
              <div>{profile?.artwork_count}</div>
              <div>artworks</div>
            </Col>
            <Col xs={6} sm={3} className={`my-2 ${formStyles.FormLabelFont}`}>
              <div>{profile?.sold_artwork_count}</div>
              <div>sold artworks</div>
            </Col>
            <Col xs={6} sm={3} className={`my-2 ${formStyles.FormLabelFont}`}>
              <div>{profile?.following_count}</div>
              <div>following</div>
            </Col>
            <Col xs={6} sm={3} className={`my-2 ${formStyles.FormLabelFont}`}>
              <div>{profile?.followers_count}</div>
              <div>followers</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                {profile?.styles === "" ? (
                  <div>
                    <p className={`mb-0 ${styles.SubjectStyles}`}>Style:</p>
                    <p className={formStyles.FormLabelFont}>
                      {" "}
                      No styles noted.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className={`mb-0 ${styles.SubjectStyles}`}>Style:</p>
                    <p className={formStyles.FormLabelFont}>
                      {profile?.styles}
                    </p>
                  </div>
                )}
              </div>
              <div>
                {profile?.techniques === "" ? (
                  <div>
                    <p className={`mb-0 ${styles.SubjectStyles}`}>Technique:</p>
                    <p className={formStyles.FormLabelFont}>
                      No techniques noted.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className={`mb-0 ${styles.SubjectStyles}`}>Technique:</p>
                    <p className={formStyles.FormLabelFont}>
                      {profile?.techniques}
                    </p>
                  </div>
                )}
              </div>
              <div>
                {profile?.influences === "" ? (
                  <div>
                    <p className={`mb-0 ${styles.SubjectStyles}`}>
                      Influences:
                    </p>
                    <p className={formStyles.FormLabelFont}>
                      No influences noted
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className={`mb-0 ${styles.SubjectStyles}`}>
                      Influences:
                    </p>
                    <p className={formStyles.FormLabelFont}>
                      {profile?.influences}
                    </p>
                  </div>
                )}
              </div>
              <div>
                {profile?.collaborations === "" ? (
                  <div>
                    <p className={`mb-0 ${styles.SubjectStyles}`}>
                      Collaborations:
                    </p>
                    <p className={formStyles.FormLabelFont}>
                      No collaborations noted.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className={`mb-0 ${styles.SubjectStyles}`}>
                      Collaborations:
                    </p>
                    <p className={formStyles.FormLabelFont}>
                      {profile?.collaborations}
                    </p>
                  </div>
                )}
              </div>
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
                unfollow
              </button>
            ) : (
              <button
                onClick={() => handleFollowUser(profile)}
                className={btnStyles.ButtonStyles}
              >
                follow
              </button>
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

  return (
    <Row className="h-100 justify-content-center">
      <Col className="py-2 p-0 p-lg-2">
        <Col xs={12}>
          {/* Here might put max width for larger screens */}
          <MostSellingProfiles />
        </Col>
        <Col
          className={`py-2 pt-4 p-0 p-lg-2 `}
          // lg={6}
        >
          <Container className={styles.ProfileDetailWidth}>
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
      </Col>
    </Row>
  );
}

export default ProfilePage;
