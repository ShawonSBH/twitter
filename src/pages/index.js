import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useContext } from "react";
import { AuthBottomBar } from "../../components/AuthBottomBar";
import Feed from "../../components/Feed";
import Modal from "../../components/Modal";
import Sidebar from "../../components/Sidebar";
import Widgets from "../../components/Widgets";
import styles from "../styles/Home.module.css";
import { authOptions } from "./api/auth/[...nextauth]";
import { ModalContext } from "./_app";

export default function Home({ userResults, newsResults, postResults }) {
  const { modalState } = useContext(ModalContext);
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Twitter-logo.ico" />
      </Head>
      <main className={styles.main}>
        <Sidebar />
        <Feed posts={postResults} />
        <Widgets userResults={userResults} newsResults={newsResults} />
        {modalState.state && <Modal />}
        {!session && <AuthBottomBar />}
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  let likedResults;
  const postResponse = await fetch("http://localhost:3000/api/posts");

  // setPosts(data.posts);

  const data = await postResponse.json();
  if (session?.user) {
    // const userID = session.user.id;
    // const likedPostsResponse = await fetch(
    //   `http://localhost:3000/api/users/${userID}/liked`
    // );
    // likedResults = await likedPostsResponse.json();
    const res = await fetch(
      `https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json`
    );
    const users = await fetch(`http://localhost:3000/api/users`);
    const userResults = await users.json();
    const newsResults = await res.json();
    return {
      props: {
        userResults: userResults.users,
        newsResults: newsResults.articles,
        postResults: data.posts,
      },
    };
  } else {
    return {
      props: {
        postResults: data.posts,
      },
    };
  }
}
