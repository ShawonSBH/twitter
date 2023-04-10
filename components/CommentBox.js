import { ModalContext } from "@/pages/_app";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import styles from "../src/styles/CommentBox.module.css";
import loaderStyles from "../src/styles/Modal.module.css";
import { useSession } from "next-auth/react";

export default function CommentBox({ parameter, setFunction }) {
  const { modalState, setModalState } = useContext(ModalContext);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (modalState.state === "Edit Comment") {
      setContent(modalState.data.content);
    }
  }, []);

  const comment = async () => {
    console.log(parameter);
    const commentID = modalState.data._id;
    setIsLoading(true);
    if (modalState.state === "Comment") {
      const res = await axios
        .post(`/api/comment`, {
          content,
          typeOfTweet: "Comment",
          originalTweetLink: commentID,
        })
        .catch((err) => console.log(err));

      console.log(res);
      const result = await res.data;
      if (result.success) {
        setFunction([result.comment, ...parameter]);
        modalState.setNumberOfComments(modalState.numberOfComments + 1);
      }
    } else {
      const res = await axios
        .put(`/api/comment`, {
          content,
          commentID,
        })
        .catch((err) => console.log(err));

      const result = await res.data;
      if (result.success) {
        setFunction(result.comment.content);
      }
    }
    setContent("");
    setModalState({});

    // router.push(`/posts/${postID}`);
  };

  return (
    <div className={styles.container}>
      {session?.user.id && (
        <img src={session.user.profilePicture} className={styles.profilePic} />
      )}
      <div className={styles.postBox}>
        <textarea
          onChange={(e) => {
            setContent(e.target.value);
            console.log(content);
          }}
          value={content}
          placeholder="What's happening?"
        />
        <hr color="gainsboro" />
        {isLoading ? (
          <div className={loaderStyles.loader}></div>
        ) : (
          <button className={styles.tweetButton} onClick={() => comment()}>
            Comment
          </button>
        )}
      </div>
    </div>
  );
}
