import { ChevronDownIcon } from "@heroicons/react/24/solid"
import styles from "../src/styles/TweetBox.module.css"

export default function TweetBox() {
  return (
    <div className={styles.container}>
        <img src="/user.jpeg" className={styles.profilePic}/>
        <div className={styles.postBox}>
          <div className={styles.viewers}>
            <p>Everyone</p>
            <ChevronDownIcon className={styles.downIcon}/>
          </div>
          <textarea placeholder="What's happening?"/>
        </div>
    </div>
  )
}