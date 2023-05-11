import styles from "../styles/Modal.module.css";
import Edit from "./Edit";
import Reply from "./Reply";
import UpdateForm from "./UpdateForm";
import UpdateTweet from "./UpdateTweet";

export default function OtherModal({
  modalState,
  setModalState,
  data,
  numberOfReplies,
  setNumberOfReplies,
  setCommentContent,
}) {
  return (
    <div className={styles.modalPage}>
      <div className={styles.modalContainer}>
        <span className={styles.close} onClick={() => setModalState("")}>
          &times;
        </span>
        {modalState === "Update" && (
          <UpdateForm setModalState={setModalState} user={data} />
        )}
        {modalState === "Edit" && (
          <Edit
            setModalState={setModalState}
            comment={data}
            setCommentContent={setCommentContent}
          />
        )}
        {modalState === "Reply" && (
          <Reply
            setModalState={setModalState}
            comment={data}
            numberOfReplies={numberOfReplies}
            setNumberOfReplies={setNumberOfReplies}
          />
        )}
        {modalState === "Tweet" && (
          <UpdateTweet setModalState={setModalState} post={data} />
        )}
      </div>
    </div>
  );
}
