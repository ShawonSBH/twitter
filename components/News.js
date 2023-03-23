import styles from "../src/styles/News.module.css";

export default function News({ article }) {
  return (
    <a href={article.url} target="_blank" style={{textDecoration: "none", color: "black"}}>
      <div className={styles.newsContainer}>
        <div className={styles.textPart}>
          <h5>{article.title}</h5>
          <p>{article.source.name}</p>
        </div>
        <img src={article.urlToImage} className={styles.newsImage} />
      </div>
    </a>
  );
}
