import { ELEMENTS } from "../data/elements.js";

export const PROXIMITY_THRESHOLD_PERCENT = 6;

function getDistancePercent(positionA, positionB) {
  const dx = positionA.x - positionB.x;
  const dy = positionA.y - positionB.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function findNearbyParticles(particles, targetPosition) {
  return particles.filter(
    (particle) =>
      !particle.isConsumed &&
      getDistancePercent(particle.position, targetPosition) <= PROXIMITY_THRESHOLD_PERCENT
  );
}

export function countParticleTypes(particleGroup) {
  return particleGroup.reduce(
    (counts, particle) => {
      counts[particle.type] += 1;
      return counts;
    },
    { proton: 0, neutron: 0, electron: 0 }
  );
}

export function matchElementRecipe(particleGroup) {
  const counts = countParticleTypes(particleGroup);
  return (
    ELEMENTS.find(
      (element) =>
        element.recipe.proton === counts.proton &&
        element.recipe.neutron === counts.neutron &&
        element.recipe.electron === counts.electron
    ) || null
  );
}

export function getGroupCenter(particleGroup) {
  const sum = particleGroup.reduce(
    (acc, particle) => ({
      x: acc.x + particle.position.x,
      y: acc.y + particle.position.y,
    }),
    { x: 0, y: 0 }
  );
  return {
    x: sum.x / particleGroup.length,
    y: sum.y / particleGroup.length,
  };
}