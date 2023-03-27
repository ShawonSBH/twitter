import React, { useContext, useState } from "react";
import styles from "../src/styles/Modal.module.css";
import { DateContext } from "./SignUp";

export default function DatePicker() {
  const { day, month, year, setDay, setMonth, setYear } =
    useContext(DateContext);

  //   const [daysInMonth, setDaysInMonth] = useState(31);

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    // console.log(month);
    // if (month === 2) {
    //   if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    //     // Leap year, February has 29 days
    //     setDaysInMonth(29);
    //     console.log(daysInMonth);
    //   } else {
    //     // Not a leap year, February has 28 days
    //     setDaysInMonth(28);
    //     console.log(daysInMonth);
    //   }
    // } else if ([4, 6, 9, 11].includes(month)) {
    //   // April, June, September, November have 30 days
    //   setDaysInMonth(30);
    // }
    // console.log(daysInMonth);
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
          ].map((nameOfMonth, index) => (
            <option key={index + 1} value={index + 1}>
              {nameOfMonth}
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
