import styles from "../styles/AuthBottomBar.module.css";
import { useContext } from "react";
import { ModalContext } from "@/pages/_app";

export function AuthBottomBar() {
  const { setModalState } = useContext(ModalContext);
  return (
    <div className={styles.authBottomBar}>
      <div className={styles.left}></div>
      <div className={styles.center}>
        <p className={styles.title}>Don’t miss what’s happening</p>
        <p className={styles.subtitle}>
          People on Twitter are the first to know.
        </p>
      </div>
      <div className={styles.right}>
        <button
          onClick={() => setModalState({ state: "LogIn" })}
          className={styles.login}
        >
          Log in
        </button>
        <button
          onClick={() => setModalState({ state: "SignUp" })}
          className={styles.signup}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
