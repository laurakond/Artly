import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Container from "react-bootstrap/Container";
import NoResults from "../../assets/no-results.webp";
import { axiosReq } from "../../api/AxiosDefaults";
import Asset from "../../components/Asset";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import { fetchMoreData } from "../../utils/utils";
import ArtworkPartInfo from "./ArtworkPartInfo";
import MostSellingProfiles from "../profiles/MostSellingProfiles";
import styles from "../../styles/AllArtworksPage.module.css";
import appStyles from "../../App.module.css";

const AllArtworksPage = ({ message, filter = "" }) => {
  const [artworks, setArtworks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const loggedInUser = useLoggedInUser();
  const { pathname } = useLocation();
  const [styleQuery, setStyleQuery] = useState("");
  const [typeQuery, setTypeQuery] = useState("");
  const [soldFilter, setSoldFilter] = useState(undefined);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch artworks and filter them by search query
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const { data } = await axiosReq.get(
          `/artworks/?${filter}search=${searchQuery}`
        );
        setArtworks(data);
        setHasLoaded(true);
      } catch (error) {}
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchArtworks();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, pathname, filter, loggedInUser]);

  // useEffect for filtering based on the style category.
  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const { data } = await axiosReq.get(
          `/artworks/?${filter}style=${styleQuery}`
        );
        setArtworks(data);
        setHasLoaded(true);
      } catch (error) {}
    };

    setHasLoaded(false);
    fetchStyles();
  }, [filter, styleQuery]);

  // useEffect for filtering based on the type category.
  useEffect(() => {
    const fetchType = async () => {
      try {
        const { data } = await axiosReq.get(
          `/artworks/?${filter}type=${typeQuery}`
        );
        setArtworks(data);
        setHasLoaded(true);
      } catch (error) {}
    };
    setHasLoaded(false);
    fetchType();
  }, [filter, typeQuery]);

  // useEffect for filtering based on the sold status.
  useEffect(() => {
    const fetchSoldStatus = async () => {
      try {
        const { data } = await axiosReq.get(
          `/artworks/?${filter}sold=${soldFilter}`
        );
        setArtworks(data);
        setHasLoaded(true);
      } catch (error) {}
    };
    setHasLoaded(false);
    fetchSoldStatus();
  }, [filter, soldFilter]);

  return (
    <Row className={`h-100 justify-content-center`}>
      <Col xs={12}>
        <MostSellingProfiles />
      </Col>
      {/* search bar and filter icon view */}
      <Col
        className={`py-2 p-3 p-lg-2 py-lg-3 ${styles.ContentWidth}`}
        md={10}
        lg={8}
        style={{ position: "relative" }}
      >
        <Row className={`mx-auto ${styles.SearchAndFilterRowClass}`}>
          <Col xs={10} className="px-0 ">
            <i className={`fas fa-search ${styles.SearchIcon}`} />
            <Form
              onSubmit={(event) => event.preventDefault()}
              className={`${styles.SearchBar}`}
            >
              <Form.Control
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                type="text"
                className={`mr-sm-2 ${styles.Form}`}
                placeholder="Search by artwork, artist or user"
              />
            </Form>
          </Col>
          <Col className={styles.FilterDropdown} xs={2}>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>More filter options</Tooltip>}
            >
              <div className="d-flex justify-content-center">
                <i
                  onClick={() => setShowFilters(!showFilters)}
                  className="fa-solid fa-filter"
                ></i>
              </div>
            </OverlayTrigger>
          </Col>
        </Row>
        {showFilters && (
          <div className={styles.ParentFilterContainer}>
            <div className={styles.MoreFilterOptions}>
              {/* Search for styles of artwork */}
              <Form onSubmit={(event) => event.preventDefault()}>
                <div className={styles.StyleTypeSoldFilter}>
                  <Form.Label>Artwork Style</Form.Label>
                  <Form.Control
                    value={styleQuery}
                    onChange={(event) => {
                      setStyleQuery(event.target.value);
                      setShowFilters(false);
                    }}
                    type="text"
                    className={styles.SelectContainer}
                    as="select"
                  >
                    <option value="">Select style</option>
                    <option value="Modern">Modern</option>
                    <option value="Contemporary">Contemporary</option>
                    <option value="Digital art">Digital art</option>
                    <option value="Old Masters">Old Masters</option>
                    <option value="Classical">Classical</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                </div>
              </Form>
              {/* Search for types of artwork */}
              <Form onSubmit={(event) => event.preventDefault()}>
                <div className={styles.StyleTypeSoldFilter}>
                  <Form.Label>Artwork Type</Form.Label>
                  <Form.Control
                    value={typeQuery}
                    onChange={(event) => {
                      setTypeQuery(event.target.value);
                      setShowFilters(false);
                    }}
                    type="text"
                    className={styles.SelectContainer}
                    as="select"
                  >
                    <option value="">Select type</option>
                    <option value="Collage">Collage</option>
                    <option value="Drawing">Drawing</option>
                    <option value="Needlework">Needlework</option>
                    <option value="Etching">Etching</option>
                    <option value="Painting">Painting</option>
                    <option value="Photography">Photography</option>
                    <option value="Pottery">Pottery</option>
                    <option value="Sculpture">Scultpure</option>
                    <option value="Watercolour">Watercolour</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                </div>
              </Form>

              {/* Search for sold status */}
              <Form onSubmit={(event) => event.preventDefault()}>
                <div className={styles.StyleTypeSoldFilter}>
                  <Form.Label>Sold status</Form.Label>
                  <Form.Control
                    value={soldFilter}
                    onChange={(event) => {
                      setSoldFilter(event.target.value);
                      setShowFilters(false);
                    }}
                    type="text"
                    className={styles.SelectContainer}
                    as="select"
                  >
                    <option value="">All</option>
                    <option value="true">Sold</option>
                    <option value="false">For sale</option>
                  </Form.Control>
                </div>
              </Form>
            </div>
          </div>
        )}
        {/* Artwork list view of spinner */}
        {hasLoaded ? (
          <Container className={styles.ArtworkListWidth}>
            {artworks.results.length ? (
              <InfiniteScroll
                children={artworks.results.map((artwork) => (
                  <ArtworkPartInfo
                    key={artwork.id}
                    {...artwork}
                    setArtworks={setArtworks}
                  />
                ))}
                dataLength={artworks.results.length}
                loader={<Asset spinner />}
                hasMore={!!artworks.next}
                next={() => fetchMoreData(artworks, setArtworks)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </Container>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
};

export default AllArtworksPage;
