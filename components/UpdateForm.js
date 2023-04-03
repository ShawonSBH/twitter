import { useState } from "react";
import styles from "../src/styles/Modal.module.css";

export default function UpdateForm() {
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    profilePicture: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.form}>
      <h2>Update Your Account</h2>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        value={userData.name}
        onChange={handleChange}
        className={styles.inputs}
      />
      <input
        type="text"
        id="username"
        name="username"
        placeholder="Username"
        value={userData.username}
        onChange={handleChange}
        className={styles.inputs}
      />
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <button onClick={handleSignUp} className={styles.submitButton}>
          Submit
        </button>
      )}
    </div>
  );
}
