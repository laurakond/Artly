import React, { useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import NoResults from '../../assets/no-results.png';
import appStyles from "../../App.module.css";

import { axiosReq } from '../../api/AxiosDefaults';
import Artwork from './Artwork';
import Asset from '../../components/Asset';

const AllArtworksPage = ({message}) => {
    const [artworks, setArtworks] = useState({results: []});
    const [hasLoaded, setHasLoaded] = useState(false); 
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const {data} = await axiosReq.get(`/artworks/?search=${searchQuery}`);
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

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>Popular profiles mobile</p>
                <i className={`fas fa-search`} />
                <Form onSubmit={(event) => event.preventDefault()}>
                <Form.Control
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    type="text"
                    className="mr-sm-2"
                    placeholder="Search artworks"
                />
            </Form>
                {hasLoaded ? (
                    <>
                        {artworks.results.length ? (
                            artworks.results.map((artwork)=>(
                                <Artwork key={artwork.id} {...artwork} />
                            ))
                        ):(
                            <Container className={appStyles.Content}>
                                <Asset src={NoResults} message={message}/>
                            </Container>
                        )}
                        </>
                    ) : (
                        <Container className={appStyles.Content}>
                            < Asset spinner />
                        </Container>
                    )}
            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                    <p>Popular profiles for desktop</p>
            </Col>
        </Row>
    );
}

export default AllArtworksPage