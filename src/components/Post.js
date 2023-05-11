import { ModalContext } from "@/pages/_app";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "../styles/Post.module.css";
import LikedHeartIcon from "./LikedHeartIcon";

export default function Post({ post, setPosts, liked }) {
  const timeago = formatDistanceToNow(new Date(post.createdAt));

  const { setModalState } = useContext(ModalContext);
  const router = useRouter();

  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(
    liked?.some((likedPost) => likedPost.postLink === post._id)
  );

  const [numberOfLikes, setNumberOfLikes] = useState(post.likes.length);
  const [numberOfComments, setNumberOfComments] = useState(
    post.comments.length
  );

  const refetchPosts = async () => {
    const postResponse = await fetch("/api/posts");
    const data = await postResponse.json();
    setPosts(data.posts);
  };

  // useEffect(() => {
  //   console.log(post);
  // }, []);

  const handleComment = async (event) => {
    event.stopPropagation();
    if (session) {
      setModalState({
        state: "Comment",
        data: post,
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
      .post(`/api/posts/${post._id}/react`)
      .catch((err) => console.log(err));

    console.log(res);
  };

  const routeToPost = () => {
    console.log(post._id);
    router.push(`/posts/${post._id}`);
  };

  return (
    <div className={styles.post} onClick={routeToPost}>
      <img
        className={styles.profilePic}
        src={post.createdBy.profilePicture}
        onClick={(event) => {
          event.stopPropagation();
          router.push(`/users/${post.createdBy._id}`);
        }}
      />
      <div className={styles.postContents}>
        <div className={styles.headerContents}>
          <h4>{post.createdBy.name}</h4>
          <p>@{post.createdBy.username}</p>
          <div className={styles.dot}></div>
          <p>{timeago}</p>
        </div>
        <div className={styles.postText}>{post.content}</div>
        {post.image && <img className={styles.postPic} src={post.image} />}
        <div className={styles.infos}>
          <div className={styles.comments} onClick={handleComment}>
            <ChatBubbleOvalLeftEllipsisIcon className={styles.icon} />
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
        </div>
      </div>
    </div>
  );
}
