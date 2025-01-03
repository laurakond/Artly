import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router";
import { axiosReq, axiosRes } from "../../api/AxiosDefaults";
import Artwork from "./Artwork";
import BidCreateForm from "../bids/BidCreateForm";
import { useLoggedInUser } from "../../contexts/LoggedInUserContext";
import Bid from "../bids/Bid";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import MostSellingProfiles from "../profiles/MostSellingProfiles";
import { toast } from "react-toastify";

const ArtworkPage = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState({ results: [] });
  const loggedInUser = useLoggedInUser();
  const [bids, setBids] = useState({ results: [] });
  const not_owner = !artwork.results[0]?.is_owner;
  const artwork_is_sold = artwork.results[0]?.sold;
  const profile_image = loggedInUser?.profile_image;

  const handleAcceptBid = async (id) => {
    try {
      await axiosRes.put(`/bids/${id}/`, { status: "Approved" });
      setBids((prevBids) => ({
        ...prevBids,
        results: prevBids.results.map((bid) =>
          bid.id === id ? { ...bid, status: "Approved" } : bid
        ),
      }));
      toast.success("Bid accepted.");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while attempting to accept the bid.");
    }
  };

  const handleRejectBid = async (id) => {
    try {
      await axiosRes.put(`/bids/${id}/`, { status: "Rejected" });
      setBids((prevBids) => ({
        ...prevBids,
        results: prevBids.results.map((bid) =>
          bid.id === id ? { ...bid, status: "Rejected" } : bid
        ),
      }));
      toast.success("Bid rejected.");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while attempting to reject the bid.");
    }
  };

  const handleSoldBid = async (id) => {
    try {
      await axiosRes.put(`/bids/${id}/`, { status: "Sold" });
      setBids((prevBids) => ({
        ...prevBids,
        results: prevBids.results.map((bid) =>
          bid.id === id ? { ...bid, status: "Sold" } : bid
        ),
      }));

      // Sets the artwork's sold status as true, which allows to generate
      // the status straight away upon the bid status update.
      setArtwork((prevArtwork) => ({
        ...prevArtwork,
        results: prevArtwork.results.map((artwork) => ({
          ...artwork,
          sold: true,
        })),
      }));
      toast.success("Artwork is now sold.");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while attempting to sell the artwork.");
    }
  };

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: artwork }, { data: bids }] = await Promise.all([
          axiosReq.get(`/artworks/${id}`),
          axiosReq.get(`bids/?artwork=${id}`),
        ]);
        setArtwork({ results: [artwork] });
        setBids(bids);
      } catch (err) {
        console.log(err);
      }
    };
    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <MostSellingProfiles mobile />
        <Artwork {...artwork.results[0]} setArtworks={setArtwork} artworkPage />
        <Container>
          {loggedInUser && not_owner && !artwork_is_sold ? (
            <BidCreateForm
              artwork={id}
              setArtwork={setArtwork}
              setBids={setBids}
              profile_id={loggedInUser.profile_id}
              profile_image={profile_image}
            />
          ) : bids.results.length ? (
            "Bids"
          ) : null}

          {bids.results.length ? (
            <InfiniteScroll
              children={bids.results.map((bid) => (
                <Bid
                  key={bid.id}
                  {...bid}
                  setArtwork={setArtwork}
                  setBids={setBids}
                  handleRejectBid={handleRejectBid}
                  handleAcceptBid={handleAcceptBid}
                  handleSoldBid={handleSoldBid}
                  artwork_is_sold={artwork_is_sold}
                />
              ))}
              dataLength={bids.results.length}
              loader={<Asset spinner />}
              hasMore={!!bids.next}
              next={() => fetchMoreData(bids, setBids)}
            />
          ) : loggedInUser ? (
            <span>No bids yet</span>
          ) : (
            <span>Log in to leave a bid</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <MostSellingProfiles />
      </Col>
    </Row>
  );
};

export default ArtworkPage;
