import PageNav from "../components/PageNav";
import styles from "./PageNotFound.module.css";
export default function PageNotFound() {
  return (
    <div className={styles.container}>
      <PageNav />
      <div className={styles.textContainer}>
        <h1 className={styles.error}>Oops!</h1>
        <p className={styles.text}>Sorry, an unexpected error has occured.</p>
        <p className={styles.text}>
          <em>Page Not Found</em>
        </p>
      </div>
    </div>
  );
}
