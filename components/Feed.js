import Post from "./Post";
import styles from "../src/styles/Feed.module.css";
import TweetBox from "./TweetBox";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Feed({ posts }) {
  const { data: session } = useSession();
  const [fetchedPosts, setFetchedPosts] = useState(posts);
  const router = useRouter();

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setFetchedPosts(data.posts);
  };

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  return (
    <div className={styles.feed}>
      <div className={styles.homeBar}>
        <h2>Home</h2>
      </div>
      {session && <TweetBox setPosts={setFetchedPosts} />}
      {fetchedPosts.map((post) => (
        <Post key={post.id} post={post} setPosts={setFetchedPosts} />
      ))}
    </div>
  );
}
