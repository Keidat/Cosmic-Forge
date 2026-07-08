import styles from "./CombineEffect.module.css";

export default function CombineEffect({ effect }) {
  return (
    <div
      className={styles.combineEffect}
      style={{ left: `${effect.position.x}%`, top: `${effect.position.y}%` }}
    >
      <span className={styles.ring} />
      <span className={styles.label}>{effect.label}</span>
    </div>
  );
}