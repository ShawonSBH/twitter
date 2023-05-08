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
import { TweetActions, tweetDispatch } from "@/actions/tweet";

export default function TweetEditBox({ tweets, setTweets }) {
  const { data: session } = useSession();
  const { modalState, setModalState } = useContext(ModalContext);
  const [content, setContent] = useState(modalState.tweetContent);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(modalState.tweetImage);
  const [isLoading, setIsLoading] = useState(false);

  const tweetPost = async () => {
    tweetDispatch({
      type: TweetActions.editTweet,
      payload: {
        setIsLoading,
        content,
        selectedImageFile,
        imageURL,
        modalState,
        setContent,
        setSelectedImageFile,
        setImageURL,
        setModalState,
      },
    });
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
        {imageURL && (
          <div>
            <span
              className={styles.cancel}
              onClick={() => {
                setImageURL(null);
                setSelectedImageFile(null);
                //console.log()
              }}
            >
              &times;
            </span>
            <img
              src={imageURL}
              alt="Uploaded image"
              style={{ width: "20rem" }}
            />
          </div>
        )}
        <div className={styles.repliers}>
          <GlobeAmericasIcon className={styles.globeIcon} />
          <p>Everyone can reply</p>
        </div>
        <hr color="gainsboro" />
        <div className={styles.buttonContainer}>
          <label htmlFor="photo-edit-upload">
            <PhotoIcon className={styles.photoIcon} />
          </label>
          <input
            type="file"
            id="photo-edit-upload"
            accept="image/*"
            style={{ visibility: "hidden" }}
            onChange={(e) => {
              const file = e.target.files[0];
              setSelectedImageFile(file);
              const reader = new FileReader();
              reader.onload = (e) => {
                setImageURL(e.target.result);
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
