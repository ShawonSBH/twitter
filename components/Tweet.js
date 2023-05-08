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
import { TweetActions, tweetDispatch } from "@/actions/tweet";

export default function Tweet({ tweet, tweets, setTweets }) {
  const timeago = formatDistanceToNow(new Date(tweet.createdAt));

  const { setModalState } = useContext(ModalContext);
  const router = useRouter();

  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Update isLiked state when session object changes
    setIsLiked(
      tweet.likes?.some(
        (liker) => liker.toString() === session?.user.id.toString()
      )
    );
    setRetweeted(tweet.retweets.includes(session?.user.id));
  }, [session, tweet.likes]);

  const [numberOfLikes, setNumberOfLikes] = useState(tweet.likes.length);
  const [numberOfComments, setNumberOfComments] = useState(
    tweet.comments.length
  );
  const [numberOfRetweets, setNumberOfRetweets] = useState(
    tweet.retweets.length
  );

  const [tweetContent, setTweetContent] = useState(tweet.content);
  const [tweetImage, setTweetImage] = useState(tweet.image);

  const [comments, setComments] = useState(tweet.comments);
  const [retweeted, setRetweeted] = useState(false);

  const handleComment = async (event) => {
    event.stopPropagation();
    if (session) {
      setModalState({
        state: "Comment",
        data: tweet,
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
      tweetDispatch({
        type: TweetActions.postLike,
        payload: {
          tweet,
          isLiked,
          setIsLiked,
          setNumberOfLikes,
          numberOfLikes,
        },
      });
    } else {
      setModalState({
        state: "LogIn",
      });
    }
  };

  const handleEdit = async () => {
    setModalState({
      state: "Edit Tweet",
      tweet,
      setTweetContent,
      setTweetImage,
      tweetContent,
      tweetImage,
    });
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDelete = async () => {
    setModalState({
      state: "Delete",
      tweet,
      setTweets,
      tweets,
    });
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleRetweet = async () => {
    if (session) {
      tweetDispatch({
        type: TweetActions.postRetweet,
        payload: {
          tweet,
          setRetweeted,
          retweeted,
          setTweets,
          tweets,
          setNumberOfRetweets,
          numberOfRetweets,
        },
      });
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
            className={`${styles.retweets} ${
              retweeted ? styles.retweetLit : ""
            } `}
            onClick={handleRetweet}
          >
            <RetweetIcon
              className={`${styles.icon} ${retweeted ? styles.retweetLit : ""}`}
            />
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
      {session?.user.id === tweet.createdBy._id && (
        <div className={styles.optionsMenu}>
          <EllipsisVerticalIcon
            className={styles.optionsIcon}
            onClick={() => {
              console.log(isDropdownOpen);
              setIsDropdownOpen(!isDropdownOpen);
            }}
          />
          {isDropdownOpen && (
            <ul className={styles.dropdownMenu}>
              <li
                className={`${styles.dropdownMenuItem} ${styles.update}`}
                onClick={handleEdit}
              >
                Edit
              </li>
              <li
                className={`${styles.dropdownMenuItem} ${styles.deleteOption}`}
                onClick={handleDelete}
              >
                Delete
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
