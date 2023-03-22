import Post from "./Post";
import styles from "../src/styles/Feed.module.css"


export default function Feed() {
  return (
    <div className={styles.feed}>
        <Post imageIncluded={false}/>
        <Post imageIncluded={true}/>
        <Post imageIncluded={false}/>
    </div>
  )
}