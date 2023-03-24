import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import styles from "../src/styles/Widgets.module.css";
import LogInBox from "./LogInBox";
import News from "./News";

export default function Widgets({ newsResults, userResults }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className={styles.widgets}>
      {isLoggedIn ? (
        <div>
          <div className={styles.searchbox}>
            <MagnifyingGlassIcon className={styles.searchIcon} />
            <input
              className={styles.inputarea}
              type="text"
              placeholder="Search Twitter"
            />
          </div>
          <div className={styles.container}>
            <h4 className={styles.header}>What's Happening?</h4>
            {newsResults?.slice(0, 4).map((article) => (
              <News article={article} key={article.url} />
            ))}
          </div>
          <div className={styles.container}>
            <h4 className={styles.header}>Who to Follow</h4>
            {userResults?.slice(0, 3).map((user) => {
              return (
                <div className={styles.userContainer}>
                  <img className={styles.userProfilePic} src={user.image} />
                  <div className={styles.textPart}>
                    <h5>{user.firstName + " " + user.lastName}</h5>
                    <p>@{user.username}</p>
                  </div>
                  <button className={styles.followButton}>Follow</button>
                </div>
              );
            })}
            <h4 className={styles.more}>Show more</h4>
          </div>
        </div>
      ) : (
        <LogInBox />
      )}
    </div>
  );
}
