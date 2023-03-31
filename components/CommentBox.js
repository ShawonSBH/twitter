import { ModalContext } from "@/pages/_app";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import styles from "../src/styles/CommentBox.module.css";
import loaderStyles from "../src/styles/Modal.module.css";

export default function CommentBox() {
  const [content, setContent] = useState("");
  const { modalState, setModalState } = useContext(ModalContext);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const comment = async () => {
    const postID = modalState.data._id;
    setIsLoading(true);
    const res = await axios
      .post(`http://localhost:3000/api/posts/${postID}/comment`, {
        content,
      })
      .catch((err) => console.log(err));

    const result = await res.data;
    setContent("");
    if (!result.success) {
      alert("Something went wrong");
    } else {
      console.log(result);
    }
    router.push(`/posts/${postID}`);
    setModalState({});
  };

  return (
    <div className={styles.container}>
      <div className={styles.postBox}>
        <textarea
          onChange={(e) => setContent(e.target.value)}
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
