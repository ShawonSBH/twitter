//import { MainLayout } from "@/core/layouts/main-layout";
import { getSocket } from "../../utils/getSocket";
//import { getUsers } from "@/features/user/services/server/get-user.server";
//import { CreatePost } from "@/shared/components/create-post/CreatePost";
import { MiniProfile } from "../../../components/MiniProfileMessage";
import { useListState } from "../../customHooks/useListState";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "../../styles/Message.module.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useMessage } from "../../customHooks/useMessage";
import { TbSettings } from "react-icons/tb";
import { MdOutlineForward, MdOutlineForwardToInbox } from "react-icons/md";
import { Input } from "../../../components/Input";
import { MessageBubble } from "../../../components/MessageBubble";
import { debounce } from "../../utils/debounce";
import axios from "axios";
import { useCustomState } from "../../customHooks/useCustomState";
import { useSocket } from "../../utils/Providers/SocketProvider";
import { deleteMessageNotification } from "../../services/notifications/delete-message-notification.server";
import { getAllConversationsByUser } from "../../services/conversations/get-conversation.server";
import useIntersectionObserver from "../../customHooks/useIntersectionObserver";
import Users from "@/models/Users";
import connectMongo from "@/utils/db";
import Sidebar from "../../../components/Sidebar";
import tweetStyles from "../../styles/TweetBox.module.css";

export async function getServerSideProps(ctx) {
  await connectMongo();
  const { user } = await getServerSession(
    ctx.req,
    ctx.res,
    authOptions(ctx.req)
  );
  let users = await Users.find();
  users = users.filter((u) => u._id.toString() !== user.id.toString());
  const { room } = ctx.query;
  let receiver;
  let messages;
  if (room) {
    const receiverId = room;
    receiver = users.reduce(
      (acc, cur) => (cur._id.toString() === receiverId ? cur : acc),
      undefined
    );
    await deleteMessageNotification({
      userId: user.id,
      notificationSenderId: receiverId,
    });
    messages = await getAllConversationsByUser({
      userId: user.id,
      receiverID: receiverId,
      pageIndex: 1,
    });
    messages.reverse();
  }
  return {
    props: JSON.parse(
      JSON.stringify({
        users: users,
        previousMessages: messages,
        receiver: receiver,
      })
    ),
  };
}

export default function Page({ users, previousMessages, receiver }) {
  const router = useRouter();
  const { room } = router.query;
  const { data: session } = useSession();
  const userList = useCustomState(users);
  const { messages, messageNotifications, sendMessage } = useMessage();
  const conversations = useListState([]);
  const pageIndex = useCustomState(2);
  const isLastPage = useCustomState(false);
  const loaderRef = useRef();
  const [message, setMessage] = useState("");
  const isLoaderOnScreen = !!useIntersectionObserver(loaderRef, {})
    ?.isIntersecting;

  useEffect(() => {
    if (isLoaderOnScreen && !isLastPage.value) {
      const fetchMoreMessages = async () => {
        try {
          console.log(session?.user.id + " " + receiver._id);
          const { data: newPage } = await axios.post(
            `/api/conversations/?pageIndex=${pageIndex.value}`,
            {
              userId: session?.user.id,
              receiverID: receiver._id,
            }
          );
          console.log(receiver._id);
          if (newPage?.data?.length < 50) {
            isLastPage.set(true);
          } else {
            conversations.set((state) => [...state, ...newPage?.data]);
            pageIndex.set((value) => value + 1);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchMoreMessages();
    }
  }, [isLoaderOnScreen]);

  useEffect(() => {
    const receiverMessages = messages?.value[receiver?._id] || [];
    if (
      receiverMessages.length > 0 &&
      conversations.value.length != receiverMessages.length
    ) {
      conversations.set(receiverMessages);
    }
  }, [messages.value]);

  useEffect(() => {}, [conversations.value]);

  // useEffect(() => {
  //   console.log(users);
  // }, []);

  useEffect(() => {
    //console.log(previousMessages);
    if (receiver?._id) {
      messages.set((curr) => {
        if (!curr[receiver._id]) {
          curr[receiver._id] = previousMessages;
        }
        return { ...curr };
      });
    }
  }, []);

  const postMessage = () => {
    if (message) {
      const newMessage = {
        content: { text: message },
        sender: session.user.id,
        receiver: room,
      };
      console.log(newMessage);
      sendMessage(newMessage);
      setMessage("");
    }
  };

  const onUserSearch = useCallback((e) => {
    let text = e.target.value.trim();
    const search = async () => {
      const searchKey = text.replace(" ", "_");
      const { data } = await axios.get("/api/user/?search=" + searchKey);
      userList.set(data);
    };
    if (text.length === 0) {
      userList.set(users);
    } else {
      debounce(search, 1000)();
    }
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className={styles.messageContainer}>
        <div className={styles.userList}>
          <div className={styles.userBoxHeader}>
            <div className={styles.userBoxHeaderOptionsAndText}>
              <h4>Messages</h4>
              <span className={styles.userBoxSettingsOption}>
                <TbSettings />
              </span>
              <span>
                <MdOutlineForwardToInbox />
              </span>
            </div>
            <div>
              <Input onChange={onUserSearch} placeHolder={"Search User"} />
            </div>
          </div>
          {userList.value?.map((user) => (
            <div
              className={`${styles.user} ${
                room === user._id ? styles.selected : ""
              }`}
            >
              <Link
                style={{ position: "relative", width: "100%" }}
                key={user._id}
                href={{ pathname: "/messages", query: { room: user._id } }}
              >
                <MiniProfile user={user} />{" "}
                {messageNotifications.value.has(user._id) && (
                  <span className="notification-badge"></span>
                )}
              </Link>
            </div>
          ))}
        </div>

        {receiver ? (
          <div className={styles.chatBox}>
            <Link href={`/users/${receiver?._id}`} className={styles.receiver}>
              <MiniProfile user={receiver} />
            </Link>
            <div>
              {conversations.value?.map((msg, idx) => (
                <MessageBubble key={idx} message={msg} />
              ))}
              {isLastPage.value ? <></> : <div ref={loaderRef}>Loading</div>}
            </div>
            <div className={styles.sendMsg}>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="Write a message"
              />
              <button
                className={tweetStyles.tweetButton}
                onClick={() => postMessage()}
              >
                Tweet
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.empty}>
            <h1>Select a Message</h1>
            <p>
              Choose from your existing conversations, start a new one, or just
              keep swimming.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
