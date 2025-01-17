import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../api/AxiosDefaults";
import signUpInstyles from "../styles/SignUpInPage.module.css";
import Asset from "./Asset";
import appStyles from "../App.module.css";

const ImageCarousel = () => {
  const [artworkImages, setArtworkImages] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchArtworkImages = async () => {
      try {
        const { data } = await axiosReq.get(`/artworks/`);
        if (isMounted) {
          setArtworkImages(data);
          setHasLoaded(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchArtworkImages();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container className={signUpInstyles.CustomCarouselContainer}>
      {hasLoaded ? (
        <Carousel className={`w-100 ${signUpInstyles.CustomCarouselStyle}`}>
          {artworkImages?.results?.length > 0 ? (
            artworkImages?.results.map((artwork) => (
              <Carousel.Item key={artwork.id}>
                <img
                  className={`d-block w-100`}
                  src={artwork.image}
                  alt={artwork.artwork_title}
                />
              </Carousel.Item>
            ))
          ) : (
            <img
              src="src/assets/default-carousel-image.webp"
              className={`d-block w-100`}
              alt="carousel default"
            />
          )}
        </Carousel>
      ) : (
        <Container className={appStyles.Content}>
          <Asset spinner />
        </Container>
      )}
    </Container>
  );
};

export default ImageCarousel;
