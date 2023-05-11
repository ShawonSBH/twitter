import { use, useEffect } from "react";
import styles from "../styles/SidebarMenuItem.module.css";
import { useSession } from "next-auth/react";
import { useMessage } from "@/customHooks/useMessage";

export default function SidebarMenuItem({ text, Icon, handleClick }) {
  const { messageNotifications } = useMessage();

  useEffect(() => {
    if (text === "Messages") {
      console.log(messageNotifications.value);
    }
  }, []);

  return (
    <div className={styles.menuitem} onClick={handleClick}>
      <Icon className={styles.icon} />
      <span>{text}</span>
      {text === "Messages" && messageNotifications.value.size !== 0 && (
        <span className="notification-badge"></span>
      )}
    </div>
  );
}
