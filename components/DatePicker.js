import React, { useContext, useState } from "react";
import styles from "../src/styles/Modal.module.css";
import { DateContext } from "./Modal";

export default function DatePicker() {
  const { day, month, year, setDay, setMonth, setYear } =
    useContext(DateContext);

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div className={styles.datePickerContainer}>
      <div className={styles.datePickerBox}>
        <p className={styles.dateLabel}>Month</p>
        <select
          id="dob-month"
          name="dob-month"
          value={month}
          onChange={handleMonthChange}
          className={styles.monthPicker}
        >
          <option value="" disabled></option>
          {[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ].map((month, index) => (
            <option key={index + 1} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.datePickerBox}>
        <p className={styles.dateLabel}>Day</p>
        <select
          id="dob-day"
          name="dob-day"
          value={day}
          onChange={handleDayChange}
          className={styles.inputs}
        >
          <option value="" disabled></option>
          {Array.from({ length: 31 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.datePickerBox}>
        <p className={styles.dateLabel}>Year</p>
        <select
          id="dob-year"
          name="dob-year"
          value={year}
          onChange={handleYearChange}
          className={styles.inputs}
        >
          <option value="" disabled></option>
          {Array.from({ length: 100 }, (_, index) => (
            <option key={2022 - index} value={2022 - index}>
              {2022 - index}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
