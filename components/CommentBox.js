import { ModalContext } from "@/pages/_app";
import axios from "axios";
import React, { useContext, useState } from "react";
import styles from "../src/styles/CommentBox.module.css";

export default function CommentBox() {
  const [content, setContent] = useState("");
  const { modalState, setModalState } = useContext(ModalContext);

  const comment = async () => {
    const res = await axios
      .post(`http://localhost:3000/api/posts/${modalState.data._id}/comment`, {
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
        <button className={styles.tweetButton} onClick={() => comment()}>
          Comment
        </button>
      </div>
    </div>
  );
}
