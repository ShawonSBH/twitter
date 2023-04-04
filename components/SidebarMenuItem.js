import styles from "../src/styles/SidebarMenuItem.module.css";

export default function SidebarMenuItem({ text, Icon, handleClick }) {
  return (
    <div className={styles.menuitem} onClick={handleClick}>
      <Icon className={styles.icon} />
      <span>{text}</span>
    </div>
  );
}
