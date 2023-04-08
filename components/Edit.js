import { useRouter } from "next/router";
import styles from "../src/styles/CommentBox.module.css";
import loaderStyles from "../src/styles/Modal.module.css";
import { useState } from "react";
import axios from "axios";
import { PUT } from "@/utils/reqMethods";

export default function Edit({ setModalState, comment, setCommentContent }) {
  const [content, setContent] = useState(comment.content);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleEdit = async () => {
    if (content !== comment.content) {
      setIsLoading(true);
      const res = await axios.put(
        `/api/posts/${comment.postLink}/comment/${comment._id}`,
        {
          content,
        }
      );
      const result = res.data;
      setIsLoading(false);
      if (result.success) {
        //alert(`${result.comment.content}`);
        setCommentContent(result.comment.content);
      }
      setModalState("");
    } else {
      //alert("You need to change something if you want to edit the comment");
    }
  };

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <div className={styles.postBox}>
        <textarea
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
          placeholder="What's happening?"
        />
        <hr color="gainsboro" />
        {isLoading ? (
          <div className={loaderStyles.loader}></div>
        ) : (
          <button className={styles.tweetButton} onClick={handleEdit}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
