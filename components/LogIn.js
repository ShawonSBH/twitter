import { ModalContext } from "@/pages/_app";
import { signIn } from "next-auth/react";
import { useContext, useState } from "react";
import styles from "../src/styles/Modal.module.css";

export default function LogIn() {
  const { setModalState } = useContext(ModalContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleLogIn = (event) => {
    event.preventDefault();
    console.log(userData);
    signIn("credentials", {
      email: userData.email,
      password: userData.password,
    });
  };

  const handleChange = (event) => {
    setUserData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className={styles.form}>
      <h2>Log In</h2>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={userData.email}
        className={styles.inputs}
      />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={userData.password}
        className={styles.inputs}
      />
      <button onClick={handleLogIn} className={styles.submitButton}>
        Submit
      </button>
      <p>
        New to Twitter?{" "}
        <div className={styles.link} onClick={() => setModalState("SignUp")}>
          Sign up
        </div>{" "}
        using your email
      </p>
    </div>
  );
}
