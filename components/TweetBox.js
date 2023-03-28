import { ModalContext } from "@/pages/_app";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { GlobeAmericasIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import styles from "../src/styles/TweetBox.module.css";

export default function TweetBox() {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const { setModalState } = useContext(ModalContext);

  const tweetPost = async () => {
    const res = await axios
      .post("http://localhost:3000/api/posts", {
        image: "",
        content,
      })
      .catch((err) => console.log(err));

    const post = await res.data;
    setContent("");
    if (post.success) {
      alert("Posted Successfully");
    } else {
      alert("Something went wrong");
    }
  };
  return (
    <div className={styles.container}>
      <img src={session.user.profilePicture} className={styles.profilePic} />
      <div className={styles.postBox}>
        <div className={styles.viewers}>
          <p>Everyone</p>
          <ChevronDownIcon className={styles.downIcon} />
        </div>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="What's happening?"
        />
        <div className={styles.repliers}>
          <GlobeAmericasIcon className={styles.globeIcon} />
          <p>Everyone can reply</p>
        </div>
        <hr color="gainsboro" />
        <div className={styles.buttonContainer}>
          <PhotoIcon className={styles.photoIcon} />
          <button className={styles.tweetButton} onClick={tweetPost}>
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
