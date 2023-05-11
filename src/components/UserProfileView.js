import {
  ArrowSmallLeftIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import styles from "../styles/UserProfile.module.css";
import { useState } from "react";
import OtherModal from "./OtherModal";
import { useSession } from "next-auth/react";
import { UserActions, userDispatch } from "@/actions/user";

export default function UserProfileView({
  user,
  numberOfTweets,
  selectedOption,
  setSelectedOption,
  isFollowed,
  setIsFollowed,
  followers,
  setFollowers,
}) {
  const formatted_date = () =>
    new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(user.createdAt));
  const { data: session } = useSession();

  const [modalState, setModalState] = useState("");

  const editProfile = () => {
    setModalState("Update");
  };

  const followUser = async () => {
    userDispatch({
      type: UserActions.followUser,
      payload: {
        user,
        setIsFollowed,
        isFollowed,
        followers,
        setFollowers,
        currentUser: session.user,
      },
    });
    // setFollowers([...followers, session.user]);
  };

  const unfollowUser = async () => {
    userDispatch({
      type: UserActions.unfollowUser,
      payload: {
        user,
        setIsFollowed,
        isFollowed,
        followers,
        setFollowers,
        currentUser: session.user,
      },
    });
    // const updatedFollowers = followers.filter(
    //   (Follower) =>
    //     Follower.id !== session.user.id && Follower._id !== session.user.id
    // );
    // console.log(updatedFollowers);
    // setFollowers(updatedFollowers);
  };

  return (
    <div>
      <div className={styles.topBar}>
        <ArrowSmallLeftIcon className={styles.backIcon} />
        <div className={styles.headerInfo}>
          <h3>{user.name}</h3>
          <p>{numberOfTweets} Tweets</p>
        </div>
      </div>
      <div className={styles.coverPicture}></div>
      <div className={styles.pictureAndEditContentBox}>
        <img src={user.profilePicture} className={styles.profilePicture} />
        {session?.user.id === user._id ? (
          <button className={styles.editProfileButton} onClick={editProfile}>
            Set Up Profile
          </button>
        ) : isFollowed ? (
          <button
            className={styles.editProfileButton}
            onClick={() => unfollowUser()}
          >
            Unfollow
          </button>
        ) : (
          <button
            className={styles.editProfileButton}
            onClick={() => followUser()}
          >
            Follow
          </button>
        )}
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
      {modalState === "Update" && (
        <OtherModal
          modalState={modalState}
          setModalState={setModalState}
          data={user}
        />
      )}
    </div>
  );
}
