import styles from "../src/styles/SidebarMenuItem.module.css"

export default function SidebarMenuItem({text, Icon}) {
  return (
    <div className={styles.menuitem}>
        <Icon className = {styles.icon}/>
        <span>{"  "}{text}</span>
    </div>
  )
}