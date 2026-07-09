import { useRef, useState } from "react";
import { getElementById } from "../../data/elements.js";
import styles from "./ElementObject.module.css";

export default function ElementObject({ entry, containerRef, onDragEnd }) {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ clientX: 0, clientY: 0 });

  const element = getElementById(entry.elementId);

  function handlePointerDown(event) {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = { clientX: event.clientX, clientY: event.clientY };
    setIsDragging(true);
  }

  function handlePointerMove(event) {
    if (!isDragging || !containerRef?.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dxPercent = ((event.clientX - dragStartRef.current.clientX) / rect.width) * 100;
    const dyPercent = ((event.clientY - dragStartRef.current.clientY) / rect.height) * 100;
    setDragOffset({ x: dxPercent, y: dyPercent });
  }

  function handlePointerUp(event) {
    if (!isDragging) return;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);

    const finalPosition = {
      x: entry.position.x + dragOffset.x,
      y: entry.position.y + dragOffset.y,
    };
    onDragEnd(entry.id, finalPosition, entry.elementId);
    setDragOffset({ x: 0, y: 0 });
  }

  if (!element) return null;

  return (
    <div
      className={`${styles.elementObject} ${isDragging ? styles.dragging : ""}`}
      style={{
        left: `${entry.position.x + dragOffset.x}%`,
        top: `${entry.position.y + dragOffset.y}%`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      title={element.name}
    >
      <span className={styles.symbol}>{element.symbol}</span>
    </div>
  );
}