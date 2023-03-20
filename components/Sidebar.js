import Image from "next/image"
import SidebarMenuItem from "./SidebarMenuItem"
import {HomeIcon, ListBulletIcon} from "@heroicons/react/24/solid"
import {HashtagIcon, BellIcon, ClipboardIcon, BookmarkIcon, UserIcon, InboxIcon} from "@heroicons/react/24/outline"
import MiniProfile from "./MiniProfile"
import styles from "../src/styles/Sidebar.module.css"

export default function Sidebar() {
    return (
        <div>
          <div className="logo-image">
            <Image width = "50" height = "50" src = "https://static01.nyt.com/images/2014/08/10/magazine/10wmt/10wmt-articleLarge-v4.jpg?quality=75&auto=webp&disable=upscale"></Image>
          </div>
          <div className={styles.sidebar}>
            <SidebarMenuItem text = "Home" Icon = {HomeIcon}/>
            <SidebarMenuItem text = "Explore" Icon = {HashtagIcon}/>
            <SidebarMenuItem text = "Notifications" Icon = {BellIcon}/>
            <SidebarMenuItem text = "Messages" Icon = {InboxIcon}/>
            <SidebarMenuItem text = "Bookmarks" Icon = {BookmarkIcon}/>
            <SidebarMenuItem text = "Lists" Icon = {ClipboardIcon}/>
            <SidebarMenuItem text = "Profile" Icon = {UserIcon}/>
            <SidebarMenuItem text = "More" Icon = {ListBulletIcon}/>
          </div>
          <button className={styles.tweetButton}>Tweet</button>
          <MiniProfile />
          
        </div>
    )
}