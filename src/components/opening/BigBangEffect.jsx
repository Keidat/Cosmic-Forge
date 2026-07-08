import { useEffect, useMemo, useRef } from "react";
import styles from "./BigBangEffect.module.css";

const BURST_PARTICLE_COUNT = 40;
const TOTAL_DURATION_MS = 3600;

const BURST_COLORS = [
  "var(--color-particle-proton)",
  "var(--color-particle-neutron)",
  "var(--color-particle-electron)",
  "var(--color-accent-gold)",
];

function createBurstParticles() {
  return Array.from({ length: BURST_PARTICLE_COUNT }, (_, index) => {
    const angle = (index / BURST_PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.3;
    const distanceVmax = 45 + Math.random() * 35;
    const tx = `${(Math.cos(angle) * distanceVmax).toFixed(2)}vmax`;
    const ty = `${(Math.sin(angle) * distanceVmax).toFixed(2)}vmax`;
    const color = BURST_COLORS[index % BURST_COLORS.length];
    return { id: `burst_${index}`, tx, ty, color };
  });
}

export default function BigBangEffect({ onComplete }) {
  const burstParticles = useMemo(createBurstParticles, []);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onComplete();
      }
    }, TOTAL_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={styles.overlay}>
      <div className={styles.flash} />
      {burstParticles.map((particle) => (
        <div
          key={particle.id}
          className={styles.burstParticle}
          style={{
            "--tx": particle.tx,
            "--ty": particle.ty,
            backgroundColor: particle.color,
          }}
        />
      ))}
    </div>
  );
}