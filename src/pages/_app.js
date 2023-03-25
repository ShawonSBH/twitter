import "@/styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { createContext, useState } from "react";

export const ModalContext = createContext();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [modalState, setModalState] = useState("");

  return (
    <SessionProvider session={session}>
      <ModalContext.Provider value={{ modalState, setModalState }}>
        <Component {...pageProps} />
      </ModalContext.Provider>
    </SessionProvider>
  );
}

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
