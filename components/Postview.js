import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import styles from "../src/styles/Postview.module.css";
import Comment from "./Comment";
import LikedHeartIcon from "./LikedHeartIcon";
import axios from "axios";
import loaderStyles from "../src/styles/Modal.module.css";

export default function Postview({ post }) {
  const { data: session } = useSession();
  const [isLiked, setIsLiked] = useState(
    post.likes?.some((like) => like.reactor === session?.user.id)
  );
  const [content, setContent] = useState("");
  const [numberOfLikes, setNumberOfLikes] = useState(post.likes.length);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState(post.comments);
  const [numberOfComments, setNumberOfComments] = useState(
    post.comments.length
  );

  const handleComment = async () => {
    setIsLoading(true);
    const res = await axios.post(`/api/posts/${post._id}/comment`, {
      content,
    });
    const result = await res.data;
    setContent("");
    setIsLoading(false);
    if (result.success) {
      setComments([result.data, ...comments]);
      setNumberOfComments(numberOfComments + 1);
    } else {
      alert(`Something went wrong`);
    }
  };

  const handleReact = async (event) => {
    if (session) {
      const res = await axios
        .post(`http://localhost:3000/api/posts/${post._id}/react`)
        .catch((err) => console.log(err));
      const result = await res.data;
      if (result.success) {
        if (isLiked) {
          setNumberOfLikes(numberOfLikes - 1);
        } else {
          setNumberOfLikes(numberOfLikes + 1);
        }
        setIsLiked(!isLiked);
      } else {
        alert("Something Went Wrong");
      }
    } else {
      setModalState({
        state: "LogIn",
      });
    }
  };

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
      {session && (
        <div className={styles.commentArea}>
          <img
            src={session.user.profilePicture}
            className={styles.profilePic}
          />
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder="Tweet your reply"
            rows={1}
          />
          {isLoading ? (
            <div className={loaderStyles.loader}></div>
          ) : (
            <button className={styles.commentButton} onClick={handleComment}>
              Reply
            </button>
          )}
        </div>
      )}
      <div>
        {comments?.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
