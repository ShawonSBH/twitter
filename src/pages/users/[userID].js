import { ArrowSmallLeftIcon, BackspaceIcon } from "@heroicons/react/24/outline";
import Sidebar from "../../../components/Sidebar";
import UserProfileView from "../../../components/UserProfileView";
import styles from "../../styles/UserProfile.module.css";
import { useState } from "react";
import Posts from "@/models/Posts";
import connectMongo from "@/utils/db";
import Post from "../../../components/Post";
import Following from "../../../components/Following";
import Followers from "../../../components/Followers";

export default function ProfilePage({ user, posts }) {
  const [selectedOption, setSelectedOption] = useState("tweets");

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.profileBar}>
        <UserProfileView
          user={user}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        {selectedOption === "tweets" &&
          posts.map((post) => <Post post={post} key={post._id} />)}
        {selectedOption === "followers" && user.followers.length > 0
          ? user.followers.map((follower) => (
              <Followers user={follower} key={follower._id} />
            ))
          : selectedOption === "followers" && (
              <div className={styles.followerContainer}>
                <img
                  className={styles.notFollowingImage}
                  src="/followers.png"
                />
                <h3>Looking for followers?</h3>
                <p>
                  When someone follows this account, they’ll show up here.
                  Tweeting and interacting with others helps boost followers.
                </p>
              </div>
            )}
        {selectedOption === "following" && user.following.length > 0
          ? user.following.map((followingUser) => (
              <Following user={followingUser} key={followingUser._id} />
            ))
          : selectedOption === "following" && (
              <div className={styles.followerContainer}>
                <h3>Be in the know</h3>
                <p>
                  Following accounts is an easy way to curate your timeline and
                  know what’s happening with the topics and people you’re
                  interested in.
                </p>
                <button className={styles.findPeople}>
                  Find People to Follow
                </button>
              </div>
            )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { userID } = context.query;
  await connectMongo();
  const userResponse = await fetch(`http://localhost:3000/api/users/${userID}`);
  const data = await userResponse.json();
  try {
    const posts = await Posts.find({ createdBy: userID })
      .sort({ createdAt: -1 })
      .populate({
        path: "createdBy",
        select: {
          _id: 1,
          name: 1,
          username: 1,
          email: 1,
          profilePicture: 1,
        },
      });
    return {
      props: {
        user: data.data,
        posts: JSON.parse(JSON.stringify(posts)),
      },
    };
  } catch (error) {
    return {
      props: {
        user: data.data,
        error: JSON.parse(JSON.stringify(error.message)),
      },
    };
  }
}