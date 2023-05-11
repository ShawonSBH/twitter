import Retweet from "./Retweet";
import RetweetIcon from "./RetweetIcon";
import Tweet from "./Tweet";
import styles from "../styles/Post.module.css";

export default function TweetShower({ tweet, tweets, setTweets }) {
  return (
    <>
      {tweet.typeOfTweet === "Original" && (
        <Tweet tweet={tweet} tweets={tweets} setTweets={setTweets} />
      )}
      {tweet.typeOfTweet === "Retweet" && (
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <RetweetIcon className={styles.icon} /> Retweeted by{" "}
            {tweet.createdBy.username}
          </div>
          <Retweet tweet={tweet} tweets={tweets} setTweets={setTweets} />
        </div>
      )}
    </>
  );
}
