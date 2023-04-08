import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styles from "../src/styles/Widgets.module.css";
import { useRouter } from "next/router";

export default function AllUsers({ user }) {
  const { data: session } = useSession();

  const [isFollowed, setIsFollowed] = useState(
    user.followers.includes(session.user.id)
  );

  const router = useRouter();

  const followUser = async () => {
    const res = await axios.post(`/api/users/${user._id}`);
    const response = await res.data;
  };

  const unfollowUser = async () => {
    const res = await axios.delete(`/api/users/${user._id}`);
    const response = await res.data;
  };

  if (session.user.id !== user._id) {
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
        {isFollowed ? (
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
        )}
      </div>
    );
  } else {
    return <></>;
  }
}
