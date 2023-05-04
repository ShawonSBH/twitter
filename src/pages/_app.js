import "@/styles/globals.css";
import { MessageProvider } from "../utils/Providers/MessageProvider";

import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";
import { SocketProvider } from "@/utils/Providers/SocketProvider";

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
        <SocketProvider>
          <MessageProvider>
            <Component {...pageProps} />
          </MessageProvider>
        </SocketProvider>
      </ModalContext.Provider>
    </SessionProvider>
  );
}

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
