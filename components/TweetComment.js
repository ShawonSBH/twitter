import styles from "../src/styles/Post.module.css";
import commentStyle from "../src/styles/Comment.module.css";
import { formatDistanceToNow } from "date-fns";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import OtherModal from "./OtherModal";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { DELETE } from "@/utils/reqMethods";
import { ModalContext } from "@/pages/_app";
import axios from "axios";
import LikedHeartIcon from "./LikedHeartIcon";

export default function TweetComment({
  comment,
  comments,
  setComments,
  totalNumberOfComments,
  setTotalNumberOfComments,
}) {
  const timeago = formatDistanceToNow(new Date(comment.createdAt));
  const [numberOfReplies, setNumberOfReplies] = useState(
    comment.comments.length
  );
  //console.log(comment);
  const { setModalState } = useContext(ModalContext);
  //const router = useRouter();
  const { data: session } = useSession();
  const [commentContent, setCommentContent] = useState(comment?.content);
  const [numberOfLikes, setNumberOfLikes] = useState(comment.likes.length);

  const [replies, setReplies] = useState(comment?.comments);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Update isLiked state when session object changes
    setIsLiked(
      comment.likes?.some(
        (liker) => liker.toString() === session?.user.id.toString()
      )
    );
    console.log(isLiked);
  }, [session, comment.likes]);

  const handleDelete = async () => {
    const res = await axios.delete(`/api/comment/${comment._id}`);
    const response = await res.data;
    if (response.success) {
      const updatedComments = comments.filter(
        (commentIterator) => commentIterator._id !== comment._id
      );
      setComments(updatedComments);
      setTotalNumberOfComments(totalNumberOfComments - 1);
    } else {
      console.log("Something went wrong");
    }
  };

  const handleComment = (operation) => {
    if (session) {
      if (operation === "Reply") {
        setModalState({
          state: "Comment",
          data: comment,
          setFunction: setReplies,
          parameter: replies,
          setNumberOfComments: setNumberOfReplies,
          numberOfComments: numberOfReplies,
        });
      } else if (operation === "Edit") {
        setModalState({
          state: "Edit Comment",
          data: comment,
          setFunction: setCommentContent,
          parameter: commentContent,
        });
      }
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
      .post(`/api/react`, {
        tweetID: comment._id,
      })
      .catch((err) => console.log(err));

    console.log(res);
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
          <div
            className={styles.comments}
            onClick={() => handleComment("Reply")}
          >
            <ChatBubbleOvalLeftEllipsisIcon className={styles.icon} />
            <p>{numberOfReplies}</p>
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
          {session?.user.id === comment.createdBy._id && (
            <>
              <div className={styles.delete}>
                <TrashIcon className={styles.icon} onClick={handleDelete} />
              </div>
              <div
                className={styles.comments}
                onClick={() => handleComment("Edit")}
              >
                <PencilSquareIcon className={styles.icon} />
              </div>
            </>
          )}
        </div>
        {replies.map((reply) => (
          <TweetComment
            comment={reply}
            key={reply._id}
            comments={replies}
            setComments={setReplies}
            setTotalNumberOfComments={setNumberOfReplies}
            totalNumberOfComments={numberOfReplies}
          />
        ))}
      </div>
    </div>
  );
}
