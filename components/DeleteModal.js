import { useContext } from "react";
import styles from "../src/styles/DeleteModal.module.css";
import { ModalContext } from "@/pages/_app";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { TweetActions, tweetDispatch } from "@/actions/tweet";

export default function DeleteModal() {
  const { modalState, setModalState } = useContext(ModalContext);

  const handleDelete = async () => {
    tweetDispatch({
      type: TweetActions.deleteTweet,
      payload: {
        modalState,
        setModalState,
      },
    });
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
