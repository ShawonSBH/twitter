import "@/styles/globals.css";
import { MessageProvider } from "../utils/Providers/MessageProvider";

import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";

export const ModalContext = createContext();
export const PostContext = createContext();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [modalState, setModalState] = useState("");
  const [posts, setPosts] = useState([]);

  return (
    <SessionProvider session={session}>
      <ModalContext.Provider value={{ modalState, setModalState }}>
        <PostContext.Provider value={{ posts, setPosts }}>
          <MessageProvider>
            <Component {...pageProps} />
          </MessageProvider>
        </PostContext.Provider>
      </ModalContext.Provider>
    </SessionProvider>
  );
}

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
