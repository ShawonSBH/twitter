import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import React from "react";
import styles from "../src/styles/Postview.module.css";
import Comment from "./Comment";

export default function Postview({ post }) {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <img
          src={post.createdBy.profilePicture}
          className={styles.profilePic}
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
          <p>{post.comments.length}</p>
        </div>
        <div className={styles.reactions}>
          <HeartIcon className={styles.icon} />
          <p>{post.likes.length}</p>
        </div>
      </div>
      {session && (
        <div className={styles.commentArea}>
          <img
            src={session.user.profilePicture}
            className={styles.profilePic}
          />
          <textarea placeholder="Tweet your reply" rows={1} />
          <button className={styles.commentButton}>Reply</button>
        </div>
      )}
      <div>
        {post.comments?.map((comment) => (
          <Comment comment={comment} />
        ))}
      </div>
    </div>
  );
}
