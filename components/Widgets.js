import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import styles from "../src/styles/Widgets.module.css";
import News from "./News";

export default function Widgets({ newsResults }) {
  return (
    <div className={styles.widgets}>
      <div className={styles.searchbox}>
        <MagnifyingGlassIcon className={styles.searchIcon} />
        <input
          className={styles.inputarea}
          type="text"
          placeholder="Search Twitter"
        />
      </div>
      <h2 className={styles.header}>What's Happening?</h2>
      <div className={styles.newsArticles}>
        {newsResults?.slice(0, 4).map((article) => (
          <News article={article} key={article.url}/>
        ))}
      </div>
    </div>
  );
}
