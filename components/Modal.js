import { ModalContext } from "@/pages/_app";
import { useContext, useState } from "react";
import styles from "../src/styles/Modal.module.css";
import CommentBox from "./CommentBox";
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import TweetBox from "./TweetBox";
import TweetEditBox from "./TweetEditBox";
import PostOwnerControl from "./PostOwnerControl";
import DeleteModal from "./DeleteModal";

export default function Modal() {
  const { modalState, setModalState } = useContext(ModalContext);

  return (
    <div className={styles.modalPage}>
      <div className={styles.modalContainer}>
        <span className={styles.close} onClick={() => setModalState({})}>
          &times;
        </span>
        {modalState.state === "SignUp" && <SignUp />}
        {modalState.state === "LogIn" && <LogIn />}
        {modalState.state === "Tweet" && <TweetBox />}
        {modalState.state === "Delete" && <DeleteModal />}
        {modalState.state === "Edit Tweet" && <TweetEditBox />}
        {(modalState.state === "Edit Comment" ||
          modalState.state === "Comment") && (
          <CommentBox
            setFunction={modalState.setFunction}
            parameter={modalState.parameter}
          />
        )}
      </div>
    </div>
  );
}
