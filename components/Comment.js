import styles from "../src/styles/Post.module.css";
import commentStyle from "../src/styles/Comment.module.css";
import { formatDistanceToNow } from "date-fns";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";

export default function Comment({ comment }) {
  const timeago = formatDistanceToNow(new Date(comment.createdAt));

  return (
    <div className={commentStyle.comment}>
      <img
        className={styles.profilePic}
        src={comment?.commentor.profilePicture}
      />
      <div className={styles.postContents}>
        <div className={styles.headerContents}>
          <h4>{comment?.commentor.name}</h4>
          <p>@{comment?.commentor.username}</p>
          <div className={styles.dot}></div>
          <p>{timeago}</p>
        </div>
        <div className={styles.postText}>{comment?.content}</div>
        <div className={styles.infos}>
          <div className={styles.comments}>
            <ChatBubbleOvalLeftEllipsisIcon className={styles.icon} />
            <p>{comment.replies.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
