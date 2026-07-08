import { useRef, useState } from "react";
import { useGame } from "../../context/GameContext.jsx";
import { useCombination } from "../../hooks/useCombination.js";
import ParticleObject from "./ParticleObject.jsx";
import ElementObject from "./ElementObject.jsx";
import CombineEffect from "./CombineEffect.jsx";
import styles from "./CombinationCanvas.module.css";

let effectCounter = 0;

export default function CombinationCanvas() {
  const { gameProgress } = useGame();
  const { attemptCombination } = useCombination();
  const containerRef = useRef(null);
  const [effects, setEffects] = useState([]);

  function handleDragEnd(particleId, finalPosition) {
    const result = attemptCombination(particleId, finalPosition);

    if (result.success) {
      const effectId = `effect_${(effectCounter += 1)}`;
      setEffects((prev) => [
        ...prev,
        {
          id: effectId,
          position: result.center,
          label: `${result.element.symbol} · ${result.element.name}`,
        },
      ]);
      setTimeout(() => {
        setEffects((prev) => prev.filter((effect) => effect.id !== effectId));
      }, 900);
    }

    return result;
  }

  const visibleParticles = gameProgress.particles.filter((particle) => !particle.isConsumed);
  const summonedElements = gameProgress.canvasElements || [];

  return (
    <div className={styles.canvas} ref={containerRef}>
      {visibleParticles.map((particle) => (
        <ParticleObject
          key={particle.id}
          particle={particle}
          containerRef={containerRef}
          onDragEnd={handleDragEnd}
        />
      ))}
      {summonedElements.map((entry) => (
        <ElementObject key={entry.id} entry={entry} containerRef={containerRef} />
      ))}
      {effects.map((effect) => (
        <CombineEffect key={effect.id} effect={effect} />
      ))}
    </div>
  );
}