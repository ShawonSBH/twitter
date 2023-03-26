import { ModalContext } from "@/pages/_app";
import { useContext, useState } from "react";
import styles from "../src/styles/Modal.module.css";
import LogIn from "./LogIn";
import SignUp from "./SignUp";

export default function Modal() {
  const { modalState, setModalState } = useContext(ModalContext);

  return (
    <div className={styles.modalPage}>
      <div className={styles.modalContainer}>
        <span className={styles.close} onClick={() => setModalState(false)}>
          &times;
        </span>
        {modalState === "SignUp" && <SignUp />}
        {modalState === "LogIn" && <LogIn />}
      </div>
    </div>
  );
}
