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

export default function Tweet({ tweet, setTweets }) {
  const timeago = formatDistanceToNow(new Date(tweet.createdAt));

  const { setModalState } = useContext(ModalContext);
  const router = useRouter();

  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Update isLiked state when session object changes
    setIsLiked(
      tweet.likes?.some(
        (liker) => liker.toString() === session?.user.id.toString()
      )
    );
    console.log(isLiked);
  }, [session, tweet.likes]);

  const [numberOfLikes, setNumberOfLikes] = useState(tweet.likes.length);
  const [numberOfComments, setNumberOfComments] = useState(
    tweet.comments.length
  );
  const [numberOfRetweets, setNumberOfRetweets] = useState(
    tweet.numberOfRetweets
  );

  const [comments, setComments] = useState(tweet.comments);

  // useEffect(() => {
  //   console.log(post);
  // }, []);

  const handleComment = async (event) => {
    event.stopPropagation();
    if (session) {
      setModalState({
        state: "Comment",
        data: tweet,
        setComments,
        comments,
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
        tweetID: tweet._id,
      })
      .catch((err) => console.log(err));

    console.log(res);
  };

  return (
    <div className={styles.post}>
      <img
        className={styles.profilePic}
        src={tweet.createdBy.profilePicture}
        onClick={(event) => {
          event.stopPropagation();
          router.push(`/users/${tweet.createdBy._id}`);
        }}
      />
      <div className={styles.postContents}>
        <div className={styles.headerContents}>
          <h4>{tweet.createdBy.name}</h4>
          <p>@{tweet.createdBy.username}</p>
          <div className={styles.dot}></div>
          <p>{timeago}</p>
        </div>
        <div className={styles.postText}>{tweet.content}</div>
        {tweet.image && <img className={styles.postPic} src={tweet.image} />}
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
          <div className={styles.retweets} onClick={handleReact}>
            <RetweetIcon className={styles.icon} />
            <p>{numberOfRetweets}</p>
          </div>
        </div>
        {comments.map((comment) => (
          <TweetComment comment={comment} key={comment._id} />
        ))}
      </div>
      {session?.user.id === tweet.createdBy._id && (
        <EllipsisVerticalIcon className={styles.optionsIcon} />
      )}
    </div>
  );
}
