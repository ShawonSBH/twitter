import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import styles from "../src/styles/PostOwnerControl.module.css";
import OtherModal from "./OtherModal";
import { useState } from "react";
import { useRouter } from "next/router";

export default function PostOwnerControl({ post, modalState, setModalState }) {
  const [deleteConfirmMessage, setDeleteConfirmMessage] = useState(true);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setDeleteConfirmMessage(false);
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
    setDeleteConfirmMessage(false);
  };

  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <h2>Post Options</h2>
        {deleteConfirmMessage ? (
          <>
            <p style={{ fontSize: "0.95rem", color: "red" }}>
              Are you sure you want to delete this Post? Once Deleted it cannot
              be recovered.
            </p>
            <button
              className={`${styles.button} ${styles.delete}`}
              onClick={handleDelete}
            >
              Yes
            </button>
            <button
              className={`${styles.button} ${styles.update}`}
              onClick={() => setDeleteConfirmMessage(false)}
            >
              No
            </button>
          </>
        ) : (
          <>
            <button
              className={`${styles.button} ${styles.update}`}
              onClick={() => setModalState("Tweet")}
            >
              Update Post
            </button>
            <button
              className={`${styles.button} ${styles.delete}`}
              onClick={() => setDeleteConfirmMessage(true)}
            >
              Delete Post
            </button>
          </>
        )}
      </div>
      <div className={styles.additionalContent}>
        <div className={styles.row}>
          <a href="https://twitter.com/tos">Terms of Service</a>
          <a href="https://twitter.com/privacy">Privacy Policy</a>
        </div>
        <div className={styles.row}>
          <a href="https://support.twitter.com/articles/20170514">
            Cookie Policy
          </a>
          <a href="https://help.twitter.com/resources/accessibility">
            Accessibility
          </a>
          <a href="https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo">
            Ads Info
          </a>
        </div>
        <div className={styles.lastRow}>
          <a>More</a>
          <EllipsisHorizontalIcon width={16} />
          <p>&copy;2023 Twitter Inc.</p>
        </div>
      </div>
      {modalState === "Tweet" && (
        <OtherModal
          data={post}
          modalState={modalState}
          setModalState={setModalState}
        />
      )}
    </div>
  );
}
