import { useRouter } from "next/router";
import styles from "../src/styles/CommentBox.module.css";
import loaderStyles from "../src/styles/Modal.module.css";
import { useState } from "react";
import axios from "axios";

export default function Reply({
  setModalState,
  comment,
  numberOfReplies,
  setNumberOfReplies,
}) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  console.log(comment);

  const handleReply = async () => {
    setIsLoading(true);
    const res = await axios.post(
      `/api/posts/${comment.postLink}/comment/${comment._id}`,
      {
        content,
      }
    );
    const result = await res.data;
    setIsLoading(false);
    if (result.success) {
      alert(`${result.data.content}`);
      setModalState("");
      setNumberOfReplies(numberOfReplies + 1);
    } else {
      alert("Something went wrong");
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
          <button className={styles.tweetButton} onClick={handleReply}>
            Reply
          </button>
        )}
      </div>
    </div>
  );
}
