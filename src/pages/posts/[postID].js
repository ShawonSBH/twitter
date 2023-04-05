import { useRouter } from "next/router";
import Postview from "../../../components/Postview";
import Sidebar from "../../../components/Sidebar";
import styles from "../../styles/SinglePost.module.css";
import { useSession } from "next-auth/react";
import PostOwnerControl from "../../../components/PostOwnerControl";
import { useState } from "react";
import OtherModal from "../../../components/OtherModal";

export default function SinglePost({ post }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [modalState, setModalState] = useState("");

  return (
    <div className={styles.container}>
      <Sidebar />
      <Postview post={post} />
      {session?.user.id === post?.createdBy._id && (
        <PostOwnerControl
          post={post}
          modalState={modalState}
          setModalState={setModalState}
        />
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { postID } = context.query;
  const postResponse = await fetch(`http://localhost:3000/api/posts/${postID}`);
  const data = await postResponse.json();

  return {
    props: {
      post: data.post,
    },
  };
}
