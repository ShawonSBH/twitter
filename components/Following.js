import axios from "axios";
import { useState } from "react";
import styles from "../src/styles/Following.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Following({ user, currentUser }) {
  const [isFollowed, setIsFollowed] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  console.log(isFollowed);

  const followUser = async () => {
    const res = await axios.post(`/api/users/${user._id}`);
    const response = await res.data;
  };

  const unfollowUser = async () => {
    const res = await axios.delete(`/api/users/${user._id}`);
    const response = await res.data;
  };
  return (
    <div
      className={styles.userContainer}
      onClick={(event) => {
        event.stopPropagation();
        router.push(`/users/${user._id}`);
      }}
    >
      <img
        className={styles.userProfilePic}
        src={user.profilePicture}
        onClick={(event) => {
          event.stopPropagation();
          router.push(`/users/${user._id}`);
        }}
      />
      <div className={styles.textPart}>
        <h5>{user.name}</h5>
        <p>@{user.username}</p>
      </div>
      {currentUser._id === session.user.id &&
        (isFollowed ? (
          <button
            className={styles.followButton}
            onClick={async (event) => {
              event.stopPropagation();
              setIsFollowed(!isFollowed);
              await unfollowUser();
            }}
          >
            Unfollow
          </button>
        ) : (
          <button
            className={styles.followButton}
            onClick={async (event) => {
              event.stopPropagation();
              setIsFollowed(!isFollowed);
              await followUser();
            }}
          >
            Follow
          </button>
        ))}
    </div>
  );
}
