import { ModalContext } from "@/pages/_app";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { formatDistanceToNow } from "date-fns";
import { useContext } from "react";
import styles from "../src/styles/Post.module.css";

export default function Post({ post }) {
  const timeago = formatDistanceToNow(new Date(post.createdAt));

  const { setModalState } = useContext(ModalContext);
  return (
    <div className={styles.post}>
      <img className={styles.profilePic} src={post.createdBy.profilePicture} />
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
          <div
            className={styles.comments}
            onClick={() => setModalState({ state: "Comment", data: post })}
          >
            <ChatBubbleOvalLeftEllipsisIcon className={styles.icon} />
            <p>{post.comments.length}</p>
          </div>
          <div className={styles.reactions}>
            <HeartIcon className={styles.icon} />
            <p>{post.numberOfLikes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
