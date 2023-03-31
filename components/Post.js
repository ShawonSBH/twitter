import { ModalContext } from "@/pages/_app";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styles from "../src/styles/Post.module.css";

export default function Post({ post, setPosts }) {
  const timeago = formatDistanceToNow(new Date(post.createdAt));

  const { setModalState } = useContext(ModalContext);
  const router = useRouter();

  const { data: session } = useSession();
  const [liked, setLiked] = useState(false);

  const refetchPosts = async () => {
    const postResponse = await fetch("/api/posts");
    const data = await postResponse.json();
    setPosts(data.posts);
  };

  // useEffect(() => {
  //   console.log(post);
  // }, []);

  const handleComment = async () => {
    if (session) {
      setModalState({
        state: "Comment",
        data: post,
      });
      await refetchPosts();
    } else {
      setModalState({
        state: "LogIn",
      });
    }
  };

  const handleReact = async () => {
    if (session) {
      await react();
      await refetchPosts();
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
  };

  const routeToPost = () => {
    console.log(post._id);
    router.push(`/posts/${post._id}`);
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
        <div className={styles.postText} onClick={routeToPost}>
          {post.content}
        </div>
        {post.image && (
          <img
            className={styles.postPic}
            src={post.image}
            onClick={routeToPost}
          />
        )}
        <div className={styles.infos}>
          <div className={styles.comments} onClick={handleComment}>
            <ChatBubbleOvalLeftEllipsisIcon className={styles.icon} />
            <p>{post.comments.length}</p>
          </div>
          <div className={styles.reactions} onClick={handleReact}>
            <HeartIcon className={styles.icon} />
            <p>{post.likes.length}</p>
          </div>
          {/* {matchFound ? (
            <div className={styles.liked} onClick={handleReact}>
              <HeartIcon className={styles.icon} />
              <p>{post.likes.length}</p>
            </div>
          ) : (
            <div className={styles.reactions} onClick={handleReact}>
              <HeartIcon className={styles.icon} />
              <p>{post.likes.length}</p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
