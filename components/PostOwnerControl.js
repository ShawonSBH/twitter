import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import styles from "../src/styles/PostOwnerControl.module.css";
import OtherModal from "./OtherModal";

export default function PostOwnerControl({ post, modalState, setModalState }) {
  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <h2>Post Options</h2>
        <button
          className={`${styles.button} ${styles.update}`}
          onClick={() => setModalState("Tweet")}
        >
          Update Post
        </button>
        <button className={`${styles.button} ${styles.delete}`}>
          Delete Post
        </button>
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
