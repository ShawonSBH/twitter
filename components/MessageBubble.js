import { useSession } from "next-auth/react";
import styles from "../src/styles/MessageBubble.module.css";

function getDateFormatString(date) {
  let dateFormatString = new Date(date);
  let year = dateFormatString.getFullYear().toString();
  let month = (dateFormatString.getMonth() + 1).toString();
  let day = dateFormatString.getDay().toString();
  if (month.length === 1) month = "0" + month;
  if (day.length === 1) day = "0" + day;
  dateFormatString = year + "-" + month + "-" + day;
  return dateFormatString;
}

export function MessageBubble({ classname, style, message }) {
  const { data: session } = useSession();
  return (
    <div
      className={`${classname} ${styles.msgBubble} MessageBubble`}
      style={style}
    >
      <div
        className={
          session?.user.id === message.sender ? styles.myMsg : styles.otherMsg
        }
      >
        <div className={`${styles.msg}`}>{message.content.text}</div>
        <div className={`${styles.label}`}>
          {getDateFormatString(message.createdAt || Date.now())} |{" "}
          {message.seen ? "seen" : "sent"}
        </div>
      </div>
    </div>
  );
}
