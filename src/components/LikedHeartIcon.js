import { HeartIcon } from "@heroicons/react/24/solid";
import React from "react";
import styles from "../styles/Post.module.css";
import singlePostStyles from "../styles/Postview.module.css";

export default function LikedHeartIcon({ postView }) {
  return (
    <>
      {postView === "Feed" && <HeartIcon className={styles.icon} />}
      {postView === "Single" && <HeartIcon className={singlePostStyles.icon} />}
    </>
  );
}
