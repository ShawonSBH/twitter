import Post from "./Post";
import styles from "../src/styles/Feed.module.css";
import TweetBox from "./TweetBox";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Feed({ posts, liked }) {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(liked);
  }, []);

  return (
    <div className={styles.feed}>
      <div className={styles.homeBar}>
        <h2>Home</h2>
      </div>
      {session && <TweetBox />}
      {posts.map((post) => (
        <Post key={post.id} post={post} likedPosts={liked} />
      ))}
    </div>
  );
}
