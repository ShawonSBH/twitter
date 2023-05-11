import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import styles from "../styles/Postview.module.css";
import Comment from "./Comment";
import LikedHeartIcon from "./LikedHeartIcon";
import axios from "axios";
import loaderStyles from "../styles/Modal.module.css";
import { useRouter } from "next/router";

export default function PostDetails({ post, numberOfComments }) {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(
    post.likes?.some((like) => like.reactor === session?.user.id)
  );
  const [numberOfLikes, setNumberOfLikes] = useState(post.likes.length);
  const router = useRouter();

  const handleReact = async (event) => {
    if (session) {
      const res = await axios
        .post(`/api/posts/${post._id}/react`)
        .catch((err) => console.log(err));
      const result = await res.data;
      if (result.success) {
        if (isLiked) {
          setNumberOfLikes(numberOfLikes - 1);
        } else {
          setNumberOfLikes(numberOfLikes + 1);
        }
        setIsLiked(!isLiked);
      }
    } else {
      setModalState({
        state: "LogIn",
      });
    }
  };

  return (
    <>
      <div className={styles.profile}>
        <img
          src={post.createdBy.profilePicture}
          className={styles.profilePic}
          onClick={() => router.push(`/users/${post.createdBy._id}`)}
        />
        <div className={styles.profileInfo}>
          <h3>{post.createdBy.name}</h3>
          <p>@{post.createdBy.username}</p>
        </div>
        <EllipsisHorizontalIcon className={styles.icon} />
      </div>
      <div className={styles.postContent}>{post.content}</div>
      {post.image && <img className={styles.postPic} src={post.image} />}
      <div className={styles.timeStamp}>{post.createdAt}</div>
      <div className={styles.infoSection}>
        <div className={styles.comments}>
          <ChatBubbleOvalLeftEllipsisIcon className={styles.icon} />
          <p>{numberOfComments}</p>
        </div>
        {isLiked ? (
          <div className={styles.liked} onClick={handleReact}>
            <LikedHeartIcon postView={"Single"} />
            <p>{numberOfLikes}</p>
          </div>
        ) : (
          <div className={styles.reactions} onClick={handleReact}>
            <HeartIcon className={styles.icon} />
            <p>{numberOfLikes}</p>
          </div>
        )}
      </div>
    </>
  );
}
