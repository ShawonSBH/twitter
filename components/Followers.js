import axios from "axios";
import { useState } from "react";
import styles from "../src/styles/Following.module.css";

export default function Followers({ user }) {
  return (
    <div className={styles.userContainer}>
      <img className={styles.userProfilePic} src={user.profilePicture} />
      <div className={styles.textPart}>
        <h5>{user.name}</h5>
        <p>@{user.username}</p>
      </div>
    </div>
  );
}
