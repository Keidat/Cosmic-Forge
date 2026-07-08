import { useGame } from "../context/GameContext.jsx";
import {
  findNearbyParticles,
  matchElementRecipe,
  getGroupCenter,
} from "../utils/combinationChecker.js";

function createCanvasElementId() {
  return `element_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export function useCombination() {
  const { gameProgress, setGameProgress } = useGame();

  function persistParticlePosition(particleId, position) {
    setGameProgress((prev) => ({
      ...prev,
      particles: prev.particles.map((particle) =>
        particle.id === particleId ? { ...particle, position } : particle
      ),
    }));
  }

  function attemptCombination(droppedParticleId, droppedPosition) {
    const activeParticles = gameProgress.particles.filter((particle) => !particle.isConsumed);

    const particlesAtCurrentPositions = activeParticles.map((particle) =>
      particle.id === droppedParticleId ? { ...particle, position: droppedPosition } : particle
    );

    const nearbyGroup = findNearbyParticles(particlesAtCurrentPositions, droppedPosition);

    if (nearbyGroup.length < 2) {
      persistParticlePosition(droppedParticleId, droppedPosition);
      return { success: false };
    }

    const matchedElement = matchElementRecipe(nearbyGroup);

    if (!matchedElement) {
      persistParticlePosition(droppedParticleId, droppedPosition);
      return { success: false };
    }

    const consumedIds = new Set(nearbyGroup.map((particle) => particle.id));
    const center = getGroupCenter(nearbyGroup);

    const newCanvasEntry = {
      id: createCanvasElementId(),
      elementId: matchedElement.id,
      position: center,
    };

    setGameProgress((prev) => ({
      ...prev,
      particles: prev.particles.map((particle) =>
        consumedIds.has(particle.id) ? { ...particle, isConsumed: true } : particle
      ),
      canvasElements: [...(prev.canvasElements || []), newCanvasEntry],
      elements: {
        ...prev.elements,
        [matchedElement.id]: {
          discovered: true,
          count: (prev.elements[matchedElement.id]?.count || 0) + 1,
        },
      },
    }));

    return { success: true, element: matchedElement, center };
  }

  return { attemptCombination };
}