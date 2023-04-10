import { useContext } from "react";
import styles from "../src/styles/DeleteModal.module.css";
import { ModalContext } from "@/pages/_app";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function DeleteModal() {
  const { modalState, setModalState } = useContext(ModalContext);

  const handleDelete = async () => {
    const res = await axios.delete(`/api/tweets/${modalState.tweet._id}`);
    const response = await res.data;
    if (response.success) {
      const updatedTweets = modalState.tweets.filter(
        (tweetIterator) => tweetIterator._id !== modalState.tweet._id
      );
      modalState.setTweets(updatedTweets);
    } else {
      console.log("Something went wrong");
    }
    setModalState({});
  };

  return (
    <div className={styles.box}>
      <ExclamationTriangleIcon className={styles.dangerIcon} />
      <h4>Are you sure?</h4>
      <p>Do you really want to delete this Tweet?</p>
      <button
        className={`${styles.button} ${styles.delete}`}
        onClick={handleDelete}
      >
        Yes
      </button>
      <button
        className={`${styles.button} ${styles.update}`}
        onClick={() => setModalState({})}
      >
        No
      </button>
    </div>
  );
}
