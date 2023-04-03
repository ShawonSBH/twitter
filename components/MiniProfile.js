import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "../src/styles/MiniProfile.module.css";

export default function MiniProfile() {
  const { data: session } = useSession();
  const router = useRouter();

  const routeToProfile = () => {
    router.push(`/users/${session.user.id}`);
  };

  return (
    <div className={styles.profileContainer} onClick={() => routeToProfile()}>
      <img
        className={styles.profilePic}
        src={session.user.profilePicture}
        alt="user"
      />
      <div className={styles.profileInfo}>
        <h3>{session.user.name}</h3>
        <p>@{session.user.username}</p>
      </div>
      <EllipsisVerticalIcon
        style={{ width: 24, marginLeft: 15 }}
        onClick={async (event) => {
          event.stopPropagation();
          console.log("SIGNING OUT...");
          await signOut();
        }}
      />
    </div>
  );
}
