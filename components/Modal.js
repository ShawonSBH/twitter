import { ModalContext } from "@/pages/_app";
import { createContext, useContext, useState } from "react";
import styles from "../src/styles/Modal.module.css";
import DatePicker from "./DatePicker";

export const DateContext = createContext();

export default function Modal() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const date = new Date(year, month - 1, day);
    const now = new Date();
    let age = now.getFullYear() - date.getFullYear();
    const monthDiff = now.getMonth() - date.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < date.getDate())) {
      age--;
    }
    if (age < 13) {
      alert("You must be at least 13 years old to sign up.");
    } else {
      alert("Sign up successful!");
    }
  };
  return (
    <div className={styles.modalPage}>
      <div className={styles.modalContainer}>
        <span className={styles.close} onClick={() => setModalsShown(false)}>
          &times;
        </span>
        <div className={styles.form}>
          <h2>Create An Account</h2>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className={styles.inputs}
          />
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className={styles.inputs}
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className={styles.inputs}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className={styles.inputs}
          />
          <DateContext.Provider
            value={{ day, month, year, setDay, setMonth, setYear }}
          >
            <DatePicker />
          </DateContext.Provider>
          <button onClick={handleSubmit} className={styles.submitButton}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
