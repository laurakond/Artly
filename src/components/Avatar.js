import React from "react";
import styles from "../styles/Avatar.module.css";

/* This code snippet was taken from Code Institute's Moments walkthrough,
which is noted in the README.md*/
const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;
