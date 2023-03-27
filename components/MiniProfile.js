import { useSession } from "next-auth/react"
import styles from "../src/styles/MiniProfile.module.css"

export default function MiniProfile() {

  const {data:session} = useSession();
  return (
    <div className={styles.profileContainer}>
        <img className={styles.profilePic} src={session.user.profilePicture} alt="user" />
        <div className={styles.profileInfo}>
            <h4>{session.user.name}</h4>
            <p>@{session.user.username}</p>
        </div>
    </div>
  )

}