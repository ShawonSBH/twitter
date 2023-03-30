import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "../src/styles/Widgets.module.css";
import LogInBox from "./LogInBox";
import News from "./News";

export default function Widgets() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: session } = useSession();
  const [userResults, setUerResults] = useState([]);
  const [newsResults, setNewsResults] = useState([]);
  //console.log(session);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json`
      );
      const users = await fetch(`https://dummyjson.com/users`);
      const dummyUsers = await users.json();
      const ads = await res.json();
      setUerResults(dummyUsers);
      setNewsResults(ads);
    }
    fetchData();
  }, []);
  return (
    <div className={styles.widgets}>
      {session ? (
        <>
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
            {[...newsResults]?.slice(0, 4).map((article) => (
              <News article={article} key={article.url} />
            ))}
          </div>
          <div className={styles.container}>
            <h4 className={styles.header}>Who to Follow</h4>
            {[...userResults]?.slice(0, 3).map((user) => {
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
        </>
      ) : (
        <LogInBox />
      )}
    </div>
  );
}
