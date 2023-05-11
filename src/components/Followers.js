import axios from "axios";
import { useState } from "react";
import styles from "../styles/Following.module.css";
import { useRouter } from "next/router";

export default function Followers({ user }) {
  const router = useRouter();

  return (
    <div
      className={styles.userContainer}
      onClick={(event) => {
        event.stopPropagation();
        router.push(`/users/${user._id}`);
      }}
    >
      <img className={styles.userProfilePic} src={user.profilePicture} />
      <div className={styles.textPart}>
        <h5>{user.name}</h5>
        <p>@{user.username}</p>
      </div>
    </div>
  );
}
