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
import Reacts from "@/models/Reacts";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";

export default function ProfilePage({ user, posts, liked }) {
  const [selectedOption, setSelectedOption] = useState("tweets");
  const { data: session } = useSession();

  console.log(user);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.profileBar}>
        <UserProfileView
          user={user}
          numberOfTweets={posts.length}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        {selectedOption === "tweets" &&
          posts.map((post) => (
            <Post post={post} key={post._id} liked={liked} />
          ))}
        {selectedOption === "followers" && user.followers.length > 0 ? (
          user.followers.map((follower) => (
            <Followers user={follower} key={follower._id} />
          ))
        ) : selectedOption === "followers" &&
          session.user.id === user._id &&
          user.followers.length === 0 ? (
          <div className={styles.followerContainer}>
            <img className={styles.notFollowingImage} src="/followers.png" />
            <h3>Looking for followers?</h3>
            <p>
              When someone follows this account, they’ll show up here. Tweeting
              and interacting with others helps boost followers.
            </p>
          </div>
        ) : (
          selectedOption === "followers" &&
          user.followers.length === 0 && (
            <div>This user is not being followed by anyone</div>
          )
        )}
        {selectedOption === "following" && user.following.length > 0 ? (
          user.following.map((followingUser) => (
            <Following
              user={followingUser}
              key={followingUser._id}
              currentUser={user}
            />
          ))
        ) : selectedOption === "following" &&
          session.user.id === user._id &&
          user.following.length === 0 ? (
          <div className={styles.followerContainer}>
            <h3>Be in the know</h3>
            <p>
              Following accounts is an easy way to curate your timeline and know
              what’s happening with the topics and people you’re interested in.
            </p>
            <button className={styles.findPeople}>Find People to Follow</button>
          </div>
        ) : (
          selectedOption === "following" &&
          user.following.length === 0 && (
            <div>This user is not following anyone</div>
          )
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
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions()
  );
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
    if (session) {
      const allLikedPosts = await Reacts.find({
        reactor: session?.user.id,
      }).select({
        _id: 1,
        postLink: 1,
      });
      return {
        props: {
          user: data.data,
          posts: JSON.parse(JSON.stringify(posts)),
          liked: JSON.parse(JSON.stringify(allLikedPosts)),
        },
      };
    } else {
      return {
        props: {
          user: data.data,
          posts: JSON.parse(JSON.stringify(posts)),
        },
      };
    }
  } catch (error) {
    return {
      props: {
        user: data.data,
        error: JSON.parse(JSON.stringify(error.message)),
      },
    };
  }
}
