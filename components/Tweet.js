import { useRouter } from "next/router";
import styles from "../src/styles/Post.module.css";
import { useContext, useState } from "react";
import { ModalContext } from "@/pages/_app";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisVerticalIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export default function Tweet({ tweet, setTweets }) {
  const timeago = formatDistanceToNow(new Date(tweet.createdAt));

  const { setModalState } = useContext(ModalContext);
  const router = useRouter();

  const { data: session } = useSession();
  //   const [isLiked, setIsLiked] = useState(
  //     liked?.some((likedPost) => likedPost.postLink === tweet._id)
  //   );

  const [numberOfLikes, setNumberOfLikes] = useState(tweet.likes.length);
  const [numberOfComments, setNumberOfComments] = useState(
    tweet.comments.length
  );

  // useEffect(() => {
  //   console.log(post);
  // }, []);

  const handleComment = async (event) => {
    // event.stopPropagation();
    // if (session) {
    //   setModalState({
    //     state: "Comment",
    //     data: post,
    //   });
    // } else {
    //   setModalState({
    //     state: "LogIn",
    //   });
    // }
  };

  const handleReact = async (event) => {
    // event.stopPropagation();
    // if (session) {
    //   await react();
    //   if (isLiked) {
    //     setNumberOfLikes(numberOfLikes - 1);
    //   } else {
    //     setNumberOfLikes(numberOfLikes + 1);
    //   }
    //   setIsLiked(!isLiked);
    // } else {
    //   setModalState({
    //     state: "LogIn",
    //   });
    // }
  };

  //   const react = async () => {
  //     const res = await axios
  //       .post(`/api/posts/${post._id}/react`)
  //       .catch((err) => console.log(err));

  //     console.log(res);
  //   };

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
            <ChatBubbleOvalLeftEllipsisIcon className={styles.icon} />
            <p>{numberOfComments}</p>
          </div>
          <div className={styles.reactions} onClick={handleReact}>
            <HeartIcon className={styles.icon} />
            <p>{numberOfLikes}</p>
          </div>
          {/* {isLiked ? (
            <div className={styles.liked} onClick={handleReact}>
              <LikedHeartIcon postView={"Feed"} />
              <p>{numberOfLikes}</p>
            </div>
          ) : (
            <div className={styles.reactions} onClick={handleReact}>
              <HeartIcon className={styles.icon} />
              <p>{numberOfLikes}</p>
            </div>
          )} */}
        </div>
      </div>
      {session?.user.id === tweet.createdBy._id && (
        <EllipsisVerticalIcon className={styles.optionsIcon} />
      )}
    </div>
  );
}
