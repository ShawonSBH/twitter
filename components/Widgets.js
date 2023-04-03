import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import styles from "../src/styles/Widgets.module.css";
import LogInBox from "./LogInBox";
import News from "./News";

export default function Widgets({ userResults, newsResults }) {
  const [numOfUsers, setNumOfUsers] = useState(3);
  const { data: session } = useSession();
  console.log(userResults);

  const followUser = async (user) => {
    const res = await axios.post(`http://localhost:3000/api/users/${user._id}`);
    const response = await res.data;
    if (response.success) {
      alert(response.message);
    }
  };

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
            {[...userResults]?.slice(0, numOfUsers).map((user) => {
              if (
                session.user.email !== user.email ||
                user.followers.includes(session.user.id)
              ) {
                return (
                  <div className={styles.userContainer} key={user.email}>
                    <img
                      className={styles.userProfilePic}
                      src={user.profilePicture}
                    />
                    <div className={styles.textPart}>
                      <h5>{user.name}</h5>
                      <p>@{user.username}</p>
                    </div>
                    <button
                      className={styles.followButton}
                      onClick={async () => await followUser(user)}
                    >
                      Follow
                    </button>
                  </div>
                );
              } else {
                return <></>;
              }
            })}
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
