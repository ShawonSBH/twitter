import { ModalContext, PostContext } from "@/pages/_app";
import { POST } from "@/utils/reqMethods";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { GlobeAmericasIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "../src/styles/TweetBox.module.css";
import loaderStyles from "../src/styles/Modal.module.css";

export default function TweetBox({ posts, setPosts }) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const tweetPost = async () => {
    if (content || selectedImage) {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("image", selectedImage);
      try {
        const res = await fetch("/api/posts", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        console.log(data);
        setContent("");
        setImageUrl(null);
        setIsLoading(false);
        if (data.success) {
          setPosts([data.post, ...posts]);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Tweet needs at least an image or some text");
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
        {imageUrl && (
          <img src={imageUrl} alt="Uploaded image" style={{ width: "20rem" }} />
        )}
        <div className={styles.repliers}>
          <GlobeAmericasIcon className={styles.globeIcon} />
          <p>Everyone can reply</p>
        </div>
        <hr color="gainsboro" />
        <div className={styles.buttonContainer}>
          <label htmlFor="photo-upload">
            <PhotoIcon className={styles.photoIcon} />
          </label>
          <input
            type="file"
            id="photo-upload"
            accept="image/*"
            style={{ visibility: "hidden" }}
            onChange={(e) => {
              const file = e.target.files[0];
              setSelectedImage(file);
              const reader = new FileReader();
              reader.onload = (e) => {
                setImageUrl(e.target.result);
              };
              reader.readAsDataURL(file);
            }}
          />
          {isLoading ? (
            <div className={loaderStyles.loader}></div>
          ) : (
            <button className={styles.tweetButton} onClick={tweetPost}>
              Tweet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
