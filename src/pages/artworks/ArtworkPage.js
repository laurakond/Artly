import React, {useState, useEffect} from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useParams } from 'react-router';
import { axiosReq } from '../../api/AxiosDefaults';
import Artwork from './Artwork';
import BidCreateForm from '../bids/BidCreateForm';
import { useLoggedInUser } from '../../contexts/LoggedInUserContext';

const ArtworkPage = () => {
    const { id } = useParams();
    const [artwork, setArtwork] = useState({ results: [] });
    const loggedInUser = useLoggedInUser();
    // const profile_image = loggedInUser?.profile_image;
    const [bids, setBids] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
        try {
            const [{ data: artwork }] = await Promise.all([
            axiosReq.get(`/artworks/${id}`),
            ]);
            setArtwork({ results: [artwork] });
        } catch (err) {
            console.log(err);
        }
    };

        handleMount();
    }, [id]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>Popular artworks for mobile</p>
                <Artwork {...artwork.results[0]} setArtworks={setArtwork} artworkPage />
                <Container >
                {loggedInUser ? (
                    <BidCreateForm
                    // profile_id={currentUser.profile_id}
                    // profileImage={profile_image}
                    artwork={id}
                    setArtwork={setArtwork}
                    setBids={setBids}
                    />
                ) : bids.results.length ? (
                "Bids"
                ) : null}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                Popular artworks for desktop
            </Col>
        </Row>
    )
}

export default ArtworkPage