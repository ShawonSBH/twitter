import { ModalContext } from "@/pages/_app";
import axios from "axios";
import { signIn } from "next-auth/react";
import { createContext, useContext, useState } from "react";
import styles from "../src/styles/Modal.module.css";
import DatePicker from "./DatePicker";

export const DateContext = createContext();

export default function SignUp() {
  const [day, setDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    profilePicture: "",
  });
  const { setModalState } = useContext(ModalContext);
  const [isLoading, setIsLoading] = useState(false);

  const sendSignUpRequest = async (date) => {
    const res = await axios
      .post("/api/users", {
        name: userData.name,
        username: userData.username,
        email: userData.email,
        password: userData.password,
        dob: date,
        profilePicture: userData.profilePicture,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const date = new Date(year, month - 1, day);
    const now = new Date();
    let age = now.getFullYear() - date.getFullYear();
    const monthDiff = now.getMonth() - date.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < date.getDate())) {
      age--;
    }
    if (age < 13) {
      //alert("You must be at least 13 years old to sign up.");
    } else {
      setIsLoading(true);
      const data = await sendSignUpRequest(date);
      console.log(data);
      if (data.success) {
        await signIn("credentials", {
          email: userData.email,
          password: userData.password,
        });
      }
      // setModalState({});
    }
  };

  const handleChange = (event) => {
    setUserData((previousState) => ({
      ...previousState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className={styles.form}>
      <h2>Create An Account</h2>
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
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleChange}
        className={styles.inputs}
      />
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        value={userData.password}
        onChange={handleChange}
        className={styles.inputs}
      />
      <DateContext.Provider
        value={{ day, month, year, setDay, setMonth, setYear }}
      >
        <DatePicker />
      </DateContext.Provider>
      {isLoading ? (
        <div className={styles.loader}></div>
      ) : (
        <button onClick={handleSignUp} className={styles.submitButton}>
          Submit
        </button>
      )}
      <p>
        Have an account already?{" "}
        <div
          className={styles.link}
          onClick={() => setModalState({ state: "LogIn" })}
        >
          Log in
        </div>{" "}
        using your account
      </p>
    </div>
  );
}
