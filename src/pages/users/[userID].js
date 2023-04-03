import { ArrowSmallLeftIcon, BackspaceIcon } from "@heroicons/react/24/outline";
import Sidebar from "../../../components/Sidebar";
import UserProfileView from "../../../components/UserProfileView";
import styles from "../../styles/UserProfile.module.css";
import { useState } from "react";
import Posts from "@/models/Posts";
import connectMongo from "@/utils/db";
import Post from "../../../components/Post";

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
        {selectedOption === "followers" && <div>Followers</div>}
        {selectedOption === "following" && <div>Following</div>}
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
