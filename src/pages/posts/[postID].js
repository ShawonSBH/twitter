import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Postview from "../../../components/Postview";
import Sidebar from "../../../components/Sidebar";
import styles from "../../styles/SinglePost.module.css";

export default function SinglePost({ post }) {
  const router = useRouter();
  const { postID } = router.query;

  return (
    <div className={styles.container}>
      <Sidebar />
      <Postview post={post} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { postID } = context.query;
  console.log(context.params);
  const postResponse = await fetch(`http://localhost:3000/api/posts/${postID}`);
  const data = await postResponse.json();

  return {
    props: {
      post: data.post,
    },
  };
}
