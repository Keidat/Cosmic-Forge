import { useRef, useState } from "react";
import { useGame } from "../../context/GameContext.jsx";
import { useCombination } from "../../hooks/useCombination.js";
import { useStarFormation } from "../../hooks/useStarFormation.js";
import { ADDABLE_STAR_ELEMENT_IDS } from "../../utils/starFusion.js";
import ParticleObject from "./ParticleObject.jsx";
import ElementObject from "./ElementObject.jsx";
import StarGeneratorObject from "./StarGeneratorObject.jsx";
import StarObject from "./StarObject.jsx";
import CombineEffect from "./CombineEffect.jsx";
import styles from "./CombinationCanvas.module.css";

let effectCounter = 0;

export default function CombinationCanvas() {
  const { gameProgress, moveCanvasElement } = useGame();
  const { attemptCombination } = useCombination();
  const { attemptStarFormation, attemptGeneratorDrop, attemptHeliumDropOnGenerator, attemptAddToStar } =
    useStarFormation();
  const containerRef = useRef(null);
  const [effects, setEffects] = useState([]);

  function handleParticleDragEnd(particleId, finalPosition) {
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

  function handleElementDragEnd(entryId, finalPosition, elementId) {
    if (elementId === "helium") {
      const generatorFusion = attemptHeliumDropOnGenerator(entryId, finalPosition);
      if (generatorFusion.success) return generatorFusion;

      const manualFusion = attemptStarFormation(entryId, finalPosition);
      if (manualFusion.success) return manualFusion;

      moveCanvasElement(entryId, finalPosition);
      return { success: false };
    }

    if (elementId === "hydrogen") {
      const manualFusion = attemptStarFormation(entryId, finalPosition);
      if (manualFusion.success) return manualFusion;

      moveCanvasElement(entryId, finalPosition);
      return { success: false };
    }

    if (ADDABLE_STAR_ELEMENT_IDS.includes(elementId)) {
      return attemptAddToStar(entryId, finalPosition, elementId);
    }

    moveCanvasElement(entryId, finalPosition);
    return { success: true };
  }

  function handleStarGeneratorDragEnd(generatorId, finalPosition) {
    return attemptGeneratorDrop(generatorId, finalPosition);
  }

  const visibleParticles = gameProgress.particles.filter((particle) => !particle.isConsumed);
  const summonedElements = gameProgress.canvasElements || [];
  const starGenerators = gameProgress.starGenerators || [];
  const activeStars = gameProgress.stars || [];

  return (
    <div className={styles.canvas} ref={containerRef}>
      {visibleParticles.map((particle) => (
        <ParticleObject
          key={particle.id}
          particle={particle}
          containerRef={containerRef}
          onDragEnd={handleParticleDragEnd}
        />
      ))}
      {summonedElements.map((entry) => (
        <ElementObject
          key={entry.id}
          entry={entry}
          containerRef={containerRef}
          onDragEnd={handleElementDragEnd}
        />
      ))}
      {starGenerators.map((entry) => (
        <StarGeneratorObject
          key={entry.id}
          entry={entry}
          containerRef={containerRef}
          onDragEnd={handleStarGeneratorDragEnd}
        />
      ))}
      {activeStars.map((star) => (
        <StarObject key={`${star.id}_${star.explodeAt}`} star={star} />
      ))}
      {effects.map((effect) => (
        <CombineEffect key={effect.id} effect={effect} />
      ))}
    </div>
  );
}