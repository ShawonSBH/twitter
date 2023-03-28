import Post from "./Post";
import styles from "../src/styles/Feed.module.css";
import TweetBox from "./TweetBox";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { PostContext } from "@/pages/_app";

export default function Feed() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  // const { posts, setPosts } = useContext(PostContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/posts/");
      const data = await res.json();
      // console.log(data);
      setPosts(data.posts);
    };
    fetchPosts();
  }, [posts]);

  return (
    <div className={styles.feed}>
      <div className={styles.homeBar}>
        <h2>Home</h2>
      </div>
      {session && <TweetBox />}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
