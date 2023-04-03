import styles from "../src/styles/Modal.module.css";

export default function ProfileUpdateModal({ modalState, setModalState }) {
  return (
    <div className={styles.modalPage}>
      <div className={styles.modalContainer}>
        <span className={styles.close} onClick={() => setModalState({})}>
          &times;
        </span>
        {modalState === "Update" && <UpdateForm />}
      </div>
    </div>
  );
}
