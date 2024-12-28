import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import NoResults from "../../assets/no-results.png";
import appStyles from "../../App.module.css";

import { axiosReq } from "../../api/AxiosDefaults";
// import Artwork from './Artwork';
import Asset from "../../components/Asset";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import ArtworkPartInfo from "./ArtworkPartInfo";
import MostSellingProfiles from "../profiles/MostSellingProfiles";

const AllArtworksPage = ({ message, filter = "" }) => {
  const [artworks, setArtworks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  // search for style/type/sold status
  const [styleQuery, setStyleQuery] = useState("");
  const [typeQuery, setTypeQuery] = useState("");
  const [soldFilter, setSoldFilter] = useState(undefined);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const { data } = await axiosReq.get(`/artworks/?search=${searchQuery}`);
        setArtworks(data);
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchArtworks();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  // useEffect for filtering based on the style category.
  useEffect(() => {
    const fetchStyles = async () => {
      try {
        const { data } = await axiosReq.get(
          `/artworks/?${filter}search=${styleQuery}`
        );
        setArtworks(data);
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };

    setHasLoaded(false);
    fetchStyles();
  }, [filter, styleQuery]);

  // useEffect for filtering based on the type category.
  useEffect(() => {
    const fetchType = async () => {
      try {
        const { data } = await axiosReq.get(
          `/artworks/?${filter}search=${typeQuery}`
        );
        setArtworks(data);
        setHasLoaded(true);
      } catch (error) {
        console.log(error);
      }
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
      } catch (error) {
        console.log(error);
      }
    };
    setHasLoaded(false);
    fetchSoldStatus();
  }, [filter, soldFilter]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <MostSellingProfiles mobile />
        <i className="fas fa-search" />
        <Form onSubmit={(event) => event.preventDefault()}>
          <Form.Control
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search artworks or artist name"
          />
        </Form>
        {/* Search for styles/types of artwork */}
        <Form onSubmit={(event) => event.preventDefault()}>
          <Form.Label>View by Style</Form.Label>
          <Form.Control
            value={styleQuery}
            onChange={(event) => setStyleQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            as="select"
          >
            <option value="">Select artwork style</option>
            <option value="Modern">Modern</option>
            <option value="Contemporary">Contemporary</option>
            <option value="Digital art">Digital art</option>
            <option value="Old Masters">Old Masters</option>
            <option value="Classical">Classical</option>
            <option value="Other">Other</option>
          </Form.Control>
        </Form>

        <Form onSubmit={(event) => event.preventDefault()}>
          <Form.Label>View by Type</Form.Label>
          <Form.Control
            value={typeQuery}
            onChange={(event) => setTypeQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            as="select"
          >
            <option value="">Select artwork type</option>
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
        </Form>

        <Form onSubmit={(event) => event.preventDefault()}>
          <Form.Label>View by Sold status</Form.Label>
          <Form.Control
            value={soldFilter}
            onChange={(event) => setSoldFilter(event.target.value)}
            type="text"
            className="mr-sm-2"
            as="select"
          >
            <option value="">All</option>
            <option value="true">Sold</option>
            <option value="false">For sale</option>
          </Form.Control>
        </Form>

        {hasLoaded ? (
          <>
            {artworks.results.length ? (
              <InfiniteScroll
                children={artworks.results.map((artwork) => (
                  // <Artwork key={artwork.id} {...artwork} />
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
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <MostSellingProfiles />
      </Col>
    </Row>
  );
};

export default AllArtworksPage;
