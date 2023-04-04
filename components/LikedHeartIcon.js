import { HeartIcon } from "@heroicons/react/24/solid";
import React from "react";
import styles from "../src/styles/Post.module.css";
import singlePostStyles from "../src/styles/Postview.module.css";

export default function LikedHeartIcon({ postView }) {
  return (
    <>
      {postView === "Feed" && <HeartIcon className={styles.icon} />}
      {postView === "Single" && <HeartIcon className={singlePostStyles.icon} />}
    </>
  );
}
