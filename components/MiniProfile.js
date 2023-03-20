import styles from "../src/styles/MiniProfile.module.css"

export default function MiniProfile() {
  return (
    <div className={styles.profileContainer}>
        <img className={styles.profilePic} src="/user.jpeg" alt="user" />
        <div className={styles.profileInfo}>
            <h4>Mazhar Ali Shawon</h4>
            <p>@mazhar_ali_shawon</p>
        </div>
    </div>
  )

}