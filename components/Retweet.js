import { useRouter } from "next/router";
import styles from "../src/styles/Post.module.css";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/pages/_app";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisVerticalIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import RetweetIcon from "./RetweetIcon";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import TweetComment from "./TweetComment";
import axios from "axios";
import LikedHeartIcon from "./LikedHeartIcon";

export default function Retweet({ tweet, tweets, setTweets }) {
  const timeago = formatDistanceToNow(new Date(tweet.createdAt));

  const { setModalState } = useContext(ModalContext);
  const router = useRouter();

  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);

  const [numberOfLikes, setNumberOfLikes] = useState(
    tweet.originalTweetLink.likes.length
  );
  const [numberOfComments, setNumberOfComments] = useState(
    tweet.originalTweetLink.comments.length
  );
  const [numberOfRetweets, setNumberOfRetweets] = useState(
    tweet.originalTweetLink.retweets.length
  );

  const [tweetContent, setTweetContent] = useState(
    tweet.originalTweetLink.content
  );
  const [tweetImage, setTweetImage] = useState(tweet.originalTweetLink.image);

  const [comments, setComments] = useState(tweet.comments);
  const [retweeted, setRetweeted] = useState(false);

  useEffect(() => {
    // Update isLiked state when session object changes
    setIsLiked(
      tweet.originalTweetLink.likes?.some(
        (liker) => liker.toString() === session?.user.id.toString()
      )
    );
    setRetweeted(tweet.retweets.includes(session?.user.id));
  }, [session, tweet.likes]);

  // useEffect(() => {
  //   console.log(post);
  // }, []);

  const handleComment = async (event) => {
    event.stopPropagation();
    if (session) {
      setModalState({
        state: "Comment",
        data: tweet.originalTweetLink,
        setFunction: setComments,
        parameter: comments,
        setNumberOfComments,
        numberOfComments,
      });
    } else {
      setModalState({
        state: "LogIn",
      });
    }
  };

  const handleReact = async (event) => {
    event.stopPropagation();
    if (session) {
      await react();
      if (isLiked) {
        setNumberOfLikes(numberOfLikes - 1);
      } else {
        setNumberOfLikes(numberOfLikes + 1);
      }
      setIsLiked(!isLiked);
    } else {
      setModalState({
        state: "LogIn",
      });
    }
  };

  const react = async () => {
    const res = await axios
      .post(`/api/react`, {
        tweetID: tweet.originalTweetLink,
      })
      .catch((err) => console.log(err));

    console.log(res);
  };

  const handleRetweet = async () => {
    if (session) {
      const res = await axios
        .post(`/api/tweets/${tweet._id}`)
        .catch((err) => console.log(err));
      const response = await res.data;
      if (response.success) {
        setRetweeted(!retweeted);
        if (response.message === "Retweet Successful") {
          setTweets([response.tweet, ...tweets]);
          setNumberOfRetweets(numberOfRetweets + 1);
        } else {
          const updatedTweets = tweets.filter(
            (tweetIterator) => tweetIterator._id !== response.deletedTweet._id
          );
          setTweets(updatedTweets);
          setNumberOfRetweets(numberOfRetweets - 1);
        }
        //alert("success");
      }
    } else {
      setModalState({
        state: "LogIn",
      });
    }
  };

  return (
    <div className={styles.post}>
      <img
        className={styles.profilePic}
        src={tweet.originalTweetLink.createdBy.profilePicture}
        onClick={(event) => {
          event.stopPropagation();
          router.push(`/users/${tweet.originalTweetLink.createdBy._id}`);
        }}
      />
      <div className={styles.postContents}>
        <div className={styles.headerContents}>
          <h4>{tweet.originalTweetLink.createdBy.name}</h4>
          <p>@{tweet.originalTweetLink.createdBy.username}</p>
          <div className={styles.dot}></div>
          <p>{timeago}</p>
        </div>
        <div className={styles.postText}>{tweetContent}</div>
        {tweetImage && <img className={styles.postPic} src={tweetImage} />}
        <div className={styles.infos}>
          <div className={styles.comments} onClick={handleComment}>
            <ChatBubbleOvalLeftIcon className={styles.icon} />
            <p>{numberOfComments}</p>
          </div>
          {isLiked ? (
            <div className={styles.liked} onClick={handleReact}>
              <LikedHeartIcon postView={"Feed"} />
              <p>{numberOfLikes}</p>
            </div>
          ) : (
            <div className={styles.reactions} onClick={handleReact}>
              <HeartIcon className={styles.icon} />
              <p>{numberOfLikes}</p>
            </div>
          )}
          {/* <div className={styles.reactions} onClick={handleReact}>
            <HeartIcon className={styles.icon} />
            <p>{numberOfLikes}</p>
          </div> */}
          <div
            className={`${styles.retweets} ${styles.retweetLit}`}
            onClick={handleRetweet}
          >
            <RetweetIcon className={`${styles.icon} ${styles.retweetLit}`} />
            <p>{numberOfRetweets}</p>
          </div>
        </div>
        {comments.map((comment) => (
          <TweetComment
            comment={comment}
            key={comment._id}
            comments={comments}
            setComments={setComments}
            totalNumberOfComments={numberOfComments}
            setTotalNumberOfComments={setNumberOfComments}
          />
        ))}
      </div>
    </div>
  );
}
