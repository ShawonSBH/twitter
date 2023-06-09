import React, { useContext } from "react";
import styles from "../src/styles/LogInBox.module.css";
import { useSession, signIn } from "next-auth/react";
import { ModalContext } from "@/pages/_app";

export default function LogInBox() {
  const { data: session } = useSession();
  const { setModalState } = useContext(ModalContext);
  return (
    <div className={styles.container}>
      <h3>New to Twitter?</h3>
      <p>Sign up now to get your own personalized timeline!</p>
      <div
        className={styles.logInButton}
        onClick={async () => await signIn("github")}
      >
        <img className={styles.btnImage} src="/social.png" />
        Sign In With Github!
      </div>
      <div
        className={styles.logInButton}
        onClick={() => setModalState({ state: "SignUp" })}
      >
        Create Account
      </div>
      <p>
        By signing up, you agree to the{" "}
        <a href="https://twitter.com/en/tos">Terms of Service</a> and{" "}
        <a href="https://twitter.com/en/privacy">Privacy Policy</a>, including{" "}
        <a href="https://help.twitter.com/en/rules-and-policies/twitter-cookies">
          Cookie Use.
        </a>
      </p>
    </div>
  );
}
