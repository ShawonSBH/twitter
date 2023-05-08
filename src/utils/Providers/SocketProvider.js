import { createContext, useContext, useEffect, useState } from "react";
import { getSocket } from "../getSocket";
import { useSession } from "next-auth/react";

const SocketContext = createContext();
export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(undefined);
  const { data: session } = useSession();
  const socketInitializer = async () => {
    if (!socket) {
      const socketClient = await getSocket();
      setSocket(socketClient);
    }
  };
  useEffect(() => {
    if (session) {
      socketInitializer();
    }
    return () => socket?.removeAllListeners();
  }, [socket, session?.user]);

  // useEffect(() => {
  //   socketInitializer();
  //   return () => socket?.removeAllListeners();
  // }, [session]);

  useEffect(() => {
    if (session && session.user) socket?.emit("join", session.user.id);
  }, [session, socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  const socket = useContext(SocketContext);
  return socket;
}
