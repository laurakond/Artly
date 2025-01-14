import React from "react";
import NoResults from "../assets/no-results.webp";
import Asset from "./Asset";
import styles from "../styles/PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div>
      <div className={`${styles.PageNotFound} text-align-center`}>
        <Asset
          src={NoResults}
          message="Oops! Something went wrong. The page you're trying to access does not exist!"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
