import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import styles from "../src/styles/Post.module.css";

export default function Post({ post }) {
  return (
    <div className={styles.post}>
      <img className={styles.profilePic} src={post.user.image} />
      <div className={styles.postContents}>
        <div className={styles.headerContents}>
          <h4>{post.user.name}</h4>
          <p>@{post.user.username}</p>
          <div className={styles.dot}></div>
          <p>{post.time}</p>
        </div>
        <div className={styles.postText}>{post.text}</div>
        {post.image && <img className={styles.postPic} src={post.image} />}
        <div className={styles.infos}>
          <div className={styles.comments}>
            <ChatBubbleOvalLeftEllipsisIcon className={styles.icon} />
            <p>{post.comments}</p>
          </div>
          <div className={styles.reactions}>
            <HeartIcon className={styles.icon} />
            <p>{post.likes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
