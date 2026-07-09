import { useEffect } from "react";
import { useStarFormation } from "../../hooks/useStarFormation.js";
import { getStarStageColors } from "../../utils/starFusion.js";
import styles from "./StarObject.module.css";

const EXPLODE_PHASE_MS = 1000; // 500 → 1000

export default function StarObject({ star }) {
  const { detonateStar } = useStarFormation();

  useEffect(() => {
    const remainingMs = Math.max(0, star.explodeAt - Date.now());
    const timer = setTimeout(() => detonateStar(star.id), remainingMs);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [star.explodeAt, star.id]);

  const remainingMs = Math.max(50, star.explodeAt - Date.now());
  const shrinkMs = Math.max(0, remainingMs - EXPLODE_PHASE_MS);
  const stageColors = getStarStageColors(star.explodeSeconds);

  return (
    <div
      className={styles.star}
      style={{
        left: `${star.position.x}%`,
        top: `${star.position.y}%`,
        animationDuration: `${shrinkMs}ms, ${EXPLODE_PHASE_MS}ms`,
        animationDelay: `0ms, ${shrinkMs}ms`,
        "--star-core": stageColors.core,
        "--star-mid": stageColors.mid,
        "--star-edge": stageColors.edge,
        "--star-glow": stageColors.glow,
      }}
    />
  );
}