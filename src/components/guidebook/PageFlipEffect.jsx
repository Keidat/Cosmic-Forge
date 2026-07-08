import styles from "./PageFlipEffect.module.css";

export default function PageFlipEffect({ pageKey, children }) {
  return (
    <div key={pageKey} className={styles.pageFlip}>
      {children}
    </div>
  );
}