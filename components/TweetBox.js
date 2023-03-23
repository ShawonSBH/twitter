import { PhotoIcon } from "@heroicons/react/24/outline";
import { GlobeAmericasIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import styles from "../src/styles/TweetBox.module.css";

export default function TweetBox() {
  return (
    <div className={styles.container}>
      <img src="/user.jpeg" className={styles.profilePic} />
      <div className={styles.postBox}>
        <div className={styles.viewers}>
          <p>Everyone</p>
          <ChevronDownIcon className={styles.downIcon} />
        </div>
        <textarea placeholder="What's happening?"/>
        <div className={styles.repliers}>
          <GlobeAmericasIcon className={styles.globeIcon}/>
          <p>Everyone can reply</p>
        </div>
        <hr color="gainsboro"/>
        <div className={styles.buttonContainer}>
          <PhotoIcon className={styles.photoIcon}/>
          <button className={styles.tweetButton}>Tweet</button>
        </div>
      </div>
    </div>
  );
}
