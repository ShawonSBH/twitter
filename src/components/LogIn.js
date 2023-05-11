import { ModalContext } from "@/pages/_app";
import { signIn } from "next-auth/react";
import { useContext, useState } from "react";
import styles from "../styles/Modal.module.css";
import { UserActions, userDispatch } from "@/actions/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LogIn() {
  const { setModalState } = useContext(ModalContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogIn = (event) => {
    event.preventDefault();
    userDispatch({
      type: UserActions.login,
      payload: {
        setIsLoading,
        userData,
        signIn,
        setModalState,
      },
    });
    //setIsLoading(false);
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
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
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
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <button onClick={handleLogIn} className={styles.submitButton}>
          Submit
        </button>
      )}
      <p>
        New to Twitter?{" "}
        <div
          className={styles.link}
          onClick={() => setModalState({ state: "SignUp" })}
        >
          Sign up
        </div>{" "}
        using your email
      </p>
    </div>
  );
}
