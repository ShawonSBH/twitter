import styles from "../src/styles/Post.module.css";
import commentStyle from "../src/styles/Comment.module.css";
import { formatDistanceToNow } from "date-fns";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import OtherModal from "./OtherModal";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { DELETE } from "@/utils/reqMethods";
import { ModalContext } from "@/pages/_app";

export default function TweetComment({ comment }) {
  const timeago = formatDistanceToNow(new Date(comment.createdAt));
  const [numberOfReplies, setNumberOfReplies] = useState(
    comment.comments.length
  );
  //console.log(comment);
  const { setModalState } = useContext(ModalContext);
  //const router = useRouter();
  const { data: session } = useSession();
  const [commentContent, setCommentContent] = useState(comment?.content);

  const [replies, setReplies] = useState(comment?.comments);
  //   const handleDelete = async (event) => {
  //     event.stopPropagation();
  //     const res = await fetch(
  //       `/api/posts/${comment.postLink}/comment/${comment._id}`,
  //       {
  //         method: DELETE,
  //       }
  //     );
  //     const response = await res.json();
  //   };

  const handleComment = async (event) => {
    event.stopPropagation();
    if (session) {
      setModalState({
        state: "Comment",
        data: comment,
        setComments: setReplies,
        comments: replies,
      });
    } else {
      setModalState({
        state: "LogIn",
      });
    }
  };

  return (
    <div className={commentStyle.comment}>
      <img
        className={styles.profilePic}
        src={comment?.createdBy.profilePicture}
      />
      <div className={commentStyle.postContents}>
        <div className={commentStyle.headerContents}>
          <h4>{comment?.createdBy.name}</h4>
          <p>@{comment?.createdBy.username}</p>
          <div className={styles.dot}></div>
          <p>{timeago}</p>
        </div>
        <div className={commentStyle.postText}>{commentContent}</div>
        <div className={styles.infos}>
          <div className={styles.comments} onClick={handleComment}>
            <ChatBubbleOvalLeftEllipsisIcon className={styles.icon} />
            <p>{numberOfReplies}</p>
          </div>
          {session?.user.id === comment.createdBy._id && (
            <>
              <div className={styles.delete}>
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
        {replies.map((reply) => (
          <TweetComment comment={reply} key={reply._id} />
        ))}
      </div>
    </div>
  );
}
