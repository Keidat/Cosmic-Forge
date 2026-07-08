import { useRef, useState } from "react";

export function useDragAndDrop({ containerRef, position, onDrop }) {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ clientX: 0, clientY: 0 });

  function handlePointerDown(event) {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = { clientX: event.clientX, clientY: event.clientY };
    setIsDragging(true);
  }

  function handlePointerMove(event) {
    if (!isDragging || !containerRef.current) return;
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
      x: position.x + dragOffset.x,
      y: position.y + dragOffset.y,
    };

    setDragOffset({ x: 0, y: 0 });

    if (onDrop) {
      onDrop(finalPosition);
    }
  }

  const displayPosition = {
    x: position.x + dragOffset.x,
    y: position.y + dragOffset.y,
  };

  return {
    displayPosition,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}