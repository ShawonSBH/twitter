import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import { HomeIcon } from "@heroicons/react/24/solid";
import {
  HashtagIcon,
  BellIcon,
  ClipboardIcon,
  BookmarkIcon,
  UserIcon,
  InboxIcon,
  EllipsisHorizontalCircleIcon,
  Cog6ToothIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";
import MiniProfile from "./MiniProfile";
import styles from "../src/styles/Sidebar.module.css";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { ModalContext } from "@/pages/_app";
import { useRouter } from "next/router";

export default function Sidebar() {
  const { data: session } = useSession();
  const { setModalState } = useContext(ModalContext);
  const router = useRouter();

  const routeToHome = () => {
    router.push("/");
  };

  const routeToProfile = () => {
    router.push(`/users/${session.user.id}`);
  };

  const routeToMessages = () => {
    router.push(`/messages`);
  };

  return (
    // <div className={styles.stickyMenu}>
    <div className={styles.sidebar}>
      <div className={styles.logoImage} onClick={() => router.push("/")}>
        <Image width="30" height="25" src="/Twitter-logo.png"></Image>
      </div>
      <div className={styles.sidebarmenu}>
        {session ? (
          <>
            <SidebarMenuItem
              text="Home"
              Icon={HomeIcon}
              handleClick={routeToHome}
            />
            <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
            <SidebarMenuItem text="Notifications" Icon={BellIcon} />
            <SidebarMenuItem
              text="Messages"
              Icon={InboxIcon}
              onClick={routeToMessages}
            />
            <SidebarMenuItem text="Bookmarks" Icon={BookmarkIcon} />
            <SidebarMenuItem text="Lists" Icon={ClipboardIcon} />
            <SidebarMenuItem
              text="Profile"
              Icon={UserIcon}
              handleClick={routeToProfile}
            />
            <SidebarMenuItem text="More" Icon={EllipsisHorizontalCircleIcon} />{" "}
          </>
        ) : (
          <div className={styles.logOutSideBar}>
            <SidebarMenuItem text="Explore" Icon={HashtagIcon} />
            <SidebarMenuItem text="Settings" Icon={Cog6ToothIcon} />
          </div>
        )}
      </div>
      {session && (
        <>
          <button
            className={styles.tweetButton}
            onClick={() => setModalState({ state: "Tweet" })}
          >
            Tweet
          </button>

          <div className={styles.profileLink}>
            <MiniProfile />
          </div>
        </>
      )}
    </div>
    // </div>
  );
}
