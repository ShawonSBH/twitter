import styles from "../src/styles/Post.module.css";
import commentStyle from "../src/styles/Comment.module.css";
import { formatDistanceToNow } from "date-fns";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRouter } from "next/router";
import OtherModal from "./OtherModal";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { DELETE } from "@/utils/reqMethods";

export default function Comment({ comment }) {
  const timeago = formatDistanceToNow(new Date(comment.createdAt));
  const [numberOfReplies, setNumberOfReplies] = useState(
    comment.replies.length
  );
  console.log(comment);
  const [modalState, setModalState] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const [commentContent, setCommentContent] = useState(comment?.content);
  const { postID } = router.query;

  const handleDelete = async (event) => {
    event.stopPropagation();
    const res = await fetch(
      `/api/posts/${comment.postLink}/comment/${comment._id}`,
      {
        method: DELETE,
      }
    );
    const response = await res.json();
  };

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
        <div className={styles.postText}>{commentContent}</div>
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
          {session?.user.id === comment.commentor._id && (
            <>
              <div className={styles.delete} onClick={handleDelete}>
                <TrashIcon className={styles.icon} />
              </div>
              <div
                className={styles.comments}
                onClick={(event) => {
                  event.stopPropagation();
                  setModalState("Edit");
                }}
              >
                <PencilSquareIcon className={styles.icon} />
              </div>
            </>
          )}
        </div>
      </div>
      {modalState !== "" && (
        <OtherModal
          modalState={modalState}
          setModalState={setModalState}
          data={comment}
          numberOfReplies={numberOfReplies}
          setNumberOfReplies={setNumberOfReplies}
          setCommentContent={setCommentContent}
        />
      )}
    </div>
  );
}
