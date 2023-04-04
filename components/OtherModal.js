import styles from "../src/styles/Modal.module.css";
import Reply from "./Reply";
import UpdateForm from "./UpdateForm";

export default function OtherModal({
  modalState,
  setModalState,
  data,
  numberOfReplies,
  setNumberOfReplies,
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
        {modalState === "Reply" && (
          <Reply
            setModalState={setModalState}
            commentID={data}
            numberOfReplies={numberOfReplies}
            setNumberOfReplies={setNumberOfReplies}
          />
        )}
      </div>
    </div>
  );
}
