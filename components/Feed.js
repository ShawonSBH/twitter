import Post from "./Post";
import styles from "../src/styles/Feed.module.css"


export default function Feed() {
  return (
    <div className={styles.feed}>
        <Post />
    </div>
  )
}