import Image from "next/image"
import SidebarMenuItem from "./SidebarMenuItem"
import {HomeIcon} from "@heroicons/react/24/solid"
import {HashtagIcon, BellIcon, ClipboardIcon, BookmarkIcon, UserIcon, InboxIcon, EllipsisHorizontalCircleIcon} from "@heroicons/react/24/outline"
import MiniProfile from "./MiniProfile"
import styles from "../src/styles/Sidebar.module.css"

export default function Sidebar() {
    return (
      // <div className={styles.stickyMenu}>
        <div className={styles.sidebar}>
          <div className={styles.logoImage}>
            <Image width = "30" height = "25" src = "/Twitter-logo.png"></Image>
          </div>
          <div className={styles.sidebarmenu}>
            <SidebarMenuItem text = "Home" Icon = {HomeIcon}/>
            <SidebarMenuItem text = "Explore" Icon = {HashtagIcon}/>
            <SidebarMenuItem text = "Notifications" Icon = {BellIcon}/>
            <SidebarMenuItem text = "Messages" Icon = {InboxIcon}/>
            <SidebarMenuItem text = "Bookmarks" Icon = {BookmarkIcon}/>
            <SidebarMenuItem text = "Lists" Icon = {ClipboardIcon}/>
            <SidebarMenuItem text = "Profile" Icon = {UserIcon}/>
            <SidebarMenuItem text = "More" Icon = {EllipsisHorizontalCircleIcon}/>
          </div>
          <button className={styles.tweetButton}>Tweet</button>
          <div className={styles.profileLink}>
            <MiniProfile />
          </div> 
        </div>
        // </div>
    )
}