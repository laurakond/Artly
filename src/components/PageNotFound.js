import React from "react";
import { Link } from "react-router-dom";
import NoResults from "../assets/no-results.webp";
import Asset from "./Asset";
import styles from "../styles/PageNotFound.module.css";
import appStyles from "../App.module.css";
import Container from "react-bootstrap/Container";

//This code was appropriated from Code Institute's Moments walkthrough project.
const PageNotFound = () => {
  return (
    <Container>
      <div className={`${styles.PageNotFound} text-align-center`}>
        <Asset
          src={NoResults}
          message="Oops! The page you're trying to access does not exist."
        />
      </div>
      <Link to="/">
        <div className="text-center">
          Click{" "}
          <span
            className={`${appStyles.AccentFont} ${appStyles.AccentFontColor} ${appStyles.HoverEffect}`}
          >
            here
          </span>{" "}
          to go back to Home page.
        </div>
      </Link>
    </Container>
  );
};

export default PageNotFound;
