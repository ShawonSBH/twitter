import axios from "axios";
import { useState } from "react";
import styles from "../src/styles/Following.module.css";
import { useSession } from "next-auth/react";

export default function Following({ user, currentUser }) {
  const [isFollowed, setIsFollowed] = useState(true);
  const { data: session } = useSession();
  console.log(isFollowed);

  const followUser = async () => {
    const res = await axios.post(`/api/users/${user._id}`);
    const response = await res.data;
    if (response.success) {
      alert(response.message);
    }
  };

  const unfollowUser = async () => {
    const res = await axios.delete(`/api/users/${user._id}`);
    const response = await res.data;
    if (response.success) {
      alert(response.message);
    }
  };
  return (
    <div className={styles.userContainer}>
      <img className={styles.userProfilePic} src={user.profilePicture} />
      <div className={styles.textPart}>
        <h5>{user.name}</h5>
        <p>@{user.username}</p>
      </div>
      {currentUser._id === session.user.id &&
        (isFollowed ? (
          <button
            className={styles.followButton}
            onClick={async () => {
              setIsFollowed(!isFollowed);
              await unfollowUser();
            }}
          >
            Unfollow
          </button>
        ) : (
          <button
            className={styles.followButton}
            onClick={async () => {
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
