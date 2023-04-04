import styles from "../src/styles/Post.module.css";
import commentStyle from "../src/styles/Comment.module.css";
import { formatDistanceToNow } from "date-fns";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRouter } from "next/router";
import OtherModal from "./OtherModal";

export default function Comment({ comment }) {
  const timeago = formatDistanceToNow(new Date(comment.createdAt));
  const [numberOfReplies, setNumberOfReplies] = useState(
    comment.replies.length
  );
  console.log(comment);
  const [modalState, setModalState] = useState("");
  const router = useRouter();
  const { postID } = router.query;

  return (
    <div
      className={commentStyle.comment}
      onClick={() => router.push(`/comments/${comment._id}`)}
    >
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
          <div
            className={styles.comments}
            onClick={(event) => {
              event.stopPropagation();
              setModalState("Reply");
            }}
          >
            <ChatBubbleOvalLeftEllipsisIcon className={styles.icon} />
            <p>{numberOfReplies}</p>
          </div>
        </div>
      </div>
      {modalState !== "" && (
        <OtherModal
          modalState={modalState}
          setModalState={setModalState}
          data={comment._id}
          numberOfReplies={numberOfReplies}
          setNumberOfReplies={setNumberOfReplies}
        />
      )}
    </div>
  );
}
