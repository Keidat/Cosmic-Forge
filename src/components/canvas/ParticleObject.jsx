import { useEffect, useRef, useState } from "react";
import styles from "./ParticleObject.module.css";

const PARTICLE_SIZE_PX = { proton: 22, neutron: 22, electron: 14 };
const BOUNCE_DURATION_MS = 350;

export default function ParticleObject({ particle, containerRef, onDragEnd }) {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dragStartRef = useRef({ clientX: 0, clientY: 0 });

  const seed = (particle.position.x * 7.31 + particle.position.y * 3.17) % 10;
  const appearDelayMs = seed * 150;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), appearDelayMs);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      x: particle.position.x + dragOffset.x,
      y: particle.position.y + dragOffset.y,
    };

    const result = onDragEnd(particle.id, finalPosition);
    setDragOffset({ x: 0, y: 0 });

    if (!result.success) {
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), BOUNCE_DURATION_MS);
    }
  }

  const size = PARTICLE_SIZE_PX[particle.type];
  const floatX = (particle.velocity.x * 10).toFixed(1);
  const floatY = (particle.velocity.y * 10 - 4).toFixed(1);
  const floatDuration = (3 + seed * 0.3).toFixed(2);
  const floatDelay = (-seed * 0.4).toFixed(2);

  return (
    <div
      className={`${styles.particle} ${styles[particle.type]} ${isVisible ? styles.visible : ""} ${
        isDragging ? styles.dragging : ""
      } ${isBouncing ? styles.bouncing : ""}`}
      style={{
        left: `${particle.position.x + dragOffset.x}%`,
        top: `${particle.position.y + dragOffset.y}%`,
        width: `${size}px`,
        height: `${size}px`,
        "--float-x": `${floatX}px`,
        "--float-y": `${floatY}px`,
        animationDuration: `${floatDuration}s`,
        animationDelay: `${floatDelay}s`,
        animationPlayState: isDragging ? "paused" : "running",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      title={particle.type}
    />
  );
}