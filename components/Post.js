import { ModalContext } from "@/pages/_app";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import styles from "../src/styles/Post.module.css";

export default function Post({ post }) {
  const timeago = formatDistanceToNow(new Date(post.createdAt));

  const { setModalState } = useContext(ModalContext);

  const { data: session } = useSession();
  // const [state, setState] = useState(post.likes.length);
  // const [liked, setLiked] = useState(false);

  // useEffect(() => {
  //   console.log(user);
  //   if (post.likes.length) {
  //     post.likes.forEach((like) => {
  //       console.log("Post Likes " + like.reactor + " ");
  //     });
  //   }
  // }, []);

  const handleComment = () => {
    if (session) {
      setModalState({
        state: "Comment",
        data: post,
      });
    } else {
      setModalState({
        state: "LogIn",
      });
    }
  };

  const handleReact = async () => {
    if (session) {
      await react();
      // if (liked) {
      //   setState(state - 1);
      // } else {
      //   setState(state + 1);
      // }
      // setLiked(!liked);
    } else {
      setModalState({
        state: "LogIn",
      });
    }
  };

  const react = async () => {
    const res = await axios
      .post(`http://localhost:3000/api/posts/${post._id}/react`)
      .catch((err) => console.log(err));

    console.log(res);
    //console.log(res);
    // if (!result.success) {
    //   alert("Something went wrong");
    // } else {
    //   console.log(result);
    // }
  };

  return (
    <div className={styles.post}>
      <img className={styles.profilePic} src={post.createdBy.profilePicture} />
      <div className={styles.postContents}>
        <div className={styles.headerContents}>
          <h4>{post.createdBy.name}</h4>
          <p>@{post.createdBy.username}</p>
          <div className={styles.dot}></div>
          <p>{timeago}</p>
        </div>
        <div className={styles.postText}>{post.content}</div>
        {post.image && <img className={styles.postPic} src={post.image} />}
        <div className={styles.infos}>
          <div className={styles.comments} onClick={handleComment}>
            <ChatBubbleOvalLeftEllipsisIcon className={styles.icon} />
            <p>{post.comments.length}</p>
          </div>
          <div className={styles.reactions} onClick={handleReact}>
            <HeartIcon className={styles.icon} />
            <p>{post.likes.length}</p>
          </div>
          {/* {liked ? (
            <div className={styles.liked} onClick={handleReact}>
              <HeartIcon className={styles.icon} />
              <p>{state}</p>
            </div>
          ) : (
            <div className={styles.reactions} onClick={handleReact}>
              <HeartIcon className={styles.icon} />
              <p>{state}</p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
