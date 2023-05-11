import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "../styles/Widgets.module.css";
import AllUsers from "./AllUsers";
import LogInBox from "./LogInBox";
import News from "./News";

export default function Widgets({ userResults, newsResults }) {
  const [numOfUsers, setNumOfUsers] = useState(3);
  const { data: session } = useSession();
  // const [isFollowed, setIsFollowed] = useState([]);
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
            {[...userResults]?.slice(0, numOfUsers).map((user) => (
              <AllUsers user={user} key={user.email} />
            ))}
            <h4
              className={styles.more}
              onClick={() => setNumOfUsers(numOfUsers + 2)}
            >
              Show more
            </h4>
          </div>
        </>
      ) : (
        <LogInBox />
      )}
    </div>
  );
}
