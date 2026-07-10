import { useRef, useState } from "react";
import { getElementById } from "../../data/elements.js";
import styles from "./ElementObject.module.css";

// entry.id를 시드로 사용해 원소마다 살짝 다른 흔들림 값을 만들어낸다
function hashSeed(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h;
}

function getFloatStyle(seed) {
  const h = hashSeed(String(seed));
  const duration = 5600 + (h % 4400); // 5.6s ~ 9.4s (기존 대비 절반 속도)
  const delay = -(h % 8000); // 음수 delay로 시작 시점을 어긋나게 함
  const floatX = 1.5 + (h % 5) * 0.5; // 1.5px ~ 3.5px (기존 대비 절반 범위)
  const floatY = 1.5 + ((h >> 3) % 5) * 0.5; // 1.5px ~ 3.5px (기존 대비 절반 범위)
  return {
    "--float-duration": `${duration}ms`,
    "--float-delay": `${delay}ms`,
    "--float-x": `${floatX}px`,
    "--float-y": `${floatY}px`,
  };
}

export default function ElementObject({ entry, containerRef, discardZoneRef, onDragEnd, onDiscard }) {
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

    if (discardZoneRef?.current) {
      const zoneRect = discardZoneRef.current.getBoundingClientRect();
      const isOverDiscard =
        event.clientX >= zoneRect.left &&
        event.clientX <= zoneRect.right &&
        event.clientY >= zoneRect.top &&
        event.clientY <= zoneRect.bottom;
      if (isOverDiscard) {
        setDragOffset({ x: 0, y: 0 });
        onDiscard(entry.id);
        return;
      }
    }

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
        "--element-color": element.color,
        ...getFloatStyle(entry.id),
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