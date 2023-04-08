import Post from "./Post";
import styles from "../src/styles/Feed.module.css";
import TweetBox from "./TweetBox";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Tweet from "./Tweet";

export default function Feed({ tweets, posts, liked }) {
  const { data: session } = useSession();
  const [fetchedPosts, setFetchedPosts] = useState(posts);
  const [fetchedTweets, setFetchedTweets] = useState(tweets);
  const router = useRouter();

  // useEffect(() => {
  //   console.log(liked);
  //   console.log(
  //     liked.some((post) => {
  //       return post._id === "642517218c5c6f411f9f590a";
  //     })
  //   );
  // }, []);

  return (
    <div className={styles.feed}>
      <div className={styles.homeBar}>
        <h2>Home</h2>
      </div>
      {session && (
        <TweetBox posts={fetchedTweets} setPosts={setFetchedTweets} />
      )}
      {fetchedPosts.map((post) => (
        <Post
          key={post._id}
          post={post}
          setPosts={setFetchedPosts}
          liked={liked}
        />
      ))}
      {fetchedTweets.map((tweet) => (
        <Tweet key={tweet._id} tweet={tweet} setTweets={setFetchedTweets} />
      ))}
    </div>
  );
}
