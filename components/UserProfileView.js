import {
  ArrowSmallLeftIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import styles from "../src/styles/UserProfile.module.css";
import { useState } from "react";

export default function UserProfileView({
  user,
  selectedOption,
  setSelectedOption,
}) {
  const formatted_date = () =>
    new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(user.createdAt));

  return (
    <div>
      <div className={styles.topBar}>
        <ArrowSmallLeftIcon className={styles.backIcon} />
        <div className={styles.headerInfo}>
          <h3>{user.name}</h3>
          <p>0 Tweets</p>
        </div>
      </div>
      <div className={styles.coverPicture}></div>
      <div className={styles.pictureAndEditContentBox}>
        <img src={user.profilePicture} className={styles.profilePicture} />
        <button className={styles.editProfileButton}>Set Up Profile</button>
      </div>
      <div className={styles.textContent}>
        <h3>{user.name}</h3>
        <p>@{user.username}</p>
        <div className={styles.joinTime}>
          <CalendarDaysIcon className={styles.joinIcon} />
          <p>Joined {formatted_date()}</p>
        </div>
        <div className={styles.followerfollowingCount}>
          <p>{user.following.length} following</p>
          <p>{user.followers.length} followers</p>
        </div>
      </div>
      <div className={styles.viewOptions}>
        <div
          className={`${styles.options} ${
            selectedOption === "tweets" ? styles.selected : ""
          }`}
          onClick={() => setSelectedOption("tweets")}
        >
          Tweets
        </div>
        <div
          className={`${styles.options} ${
            selectedOption === "followers" ? styles.selected : ""
          }`}
          onClick={() => setSelectedOption("followers")}
        >
          Followers
        </div>
        <div
          className={`${styles.options} ${
            selectedOption === "following" ? styles.selected : ""
          }`}
          onClick={() => setSelectedOption("following")}
        >
          Following
        </div>
      </div>
    </div>
  );
}
