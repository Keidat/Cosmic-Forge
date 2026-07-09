import { useDragAndDrop } from "../../hooks/useDragAndDrop.js";
import styles from "./StarGeneratorObject.module.css";

export default function StarGeneratorObject({ entry, containerRef, onDragEnd }) {
  const { displayPosition, isDragging, handlePointerDown, handlePointerMove, handlePointerUp } =
    useDragAndDrop({
      containerRef,
      position: entry.position,
      onDrop: (finalPosition) => onDragEnd(entry.id, finalPosition),
    });

  return (
    <div
      className={`${styles.starGenerator} ${isDragging ? styles.dragging : ""}`}
      style={{ left: `${displayPosition.x}%`, top: `${displayPosition.y}%` }}
      title="별 생성기 (수소 12개 포함)"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <span className={styles.icon}>★</span>
      <span className={styles.badge}>수소12개</span>
    </div>
  );
}