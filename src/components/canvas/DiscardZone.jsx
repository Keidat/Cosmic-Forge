import { forwardRef } from "react";
import styles from "./DiscardZone.module.css";

const DiscardZone = forwardRef(function DiscardZone(_props, ref) {
  return (
    <div ref={ref} className={styles.discardZone} title="여기로 끌어다 놓으면 저 먼 우주로 보냅니다">
      <span className={styles.icon}>🌀</span>
      <span className={styles.label}>저 멀리 보내기</span>
    </div>
  );
});

export default DiscardZone;