import styles from "../src/styles/Post.module.css"

export default function Post() {
    return (
        <div className={styles.post}>
            <div className="post-content"><img className={styles.profilePic} src="/user.jpeg"/></div>
        </div>
    )
}