import { useGame } from "../context/GameContext.jsx";
import {
  computeExplodeSeconds,
  canAddElementToStar,
  generateExplosionProducts,
  ADDABLE_STAR_ELEMENT_IDS,
  REQUIRED_HYDROGEN_COUNT,
  REQUIRED_HELIUM_COUNT,
} from "../utils/starFusion.js";

const STAR_PROXIMITY_THRESHOLD_PERCENT = 5;

function getDistancePercent(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function findNearestWithinThreshold(items, getPosition, targetPosition, thresholdPercent) {
  let nearest = null;
  let nearestDistance = Infinity;

  for (const item of items) {
    const distance = getDistancePercent(getPosition(item), targetPosition);
    if (distance <= thresholdPercent && distance < nearestDistance) {
      nearest = item;
      nearestDistance = distance;
    }
  }

  return nearest;
}

function createStarId() {
  return `star_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function createElementEntryId() {
  return `element_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function gatherNearbyAddables(canvasElements, excludeIds, position, thresholdPercent) {
  const nearby = canvasElements.filter(
    (entry) =>
      !excludeIds.has(entry.id) &&
      ADDABLE_STAR_ELEMENT_IDS.includes(entry.elementId) &&
      getDistancePercent(entry.position, position) <= thresholdPercent
  );

  if (nearby.length === 0) {
    return { addedElementIds: [], explodeSeconds: 2, consumedEntryIds: new Set() };
  }

  const candidateIds = new Set(nearby.map((entry) => entry.elementId));
  const explodeSeconds = computeExplodeSeconds(candidateIds);

  if (explodeSeconds === null) {
    return { addedElementIds: [], explodeSeconds: 2, consumedEntryIds: new Set() };
  }

  return {
    addedElementIds: [...candidateIds],
    explodeSeconds,
    consumedEntryIds: new Set(nearby.map((entry) => entry.id)),
  };
}

function buildNewStar(position, extras) {
  const now = Date.now();
  const addedElementIds = extras?.addedElementIds || [];
  const explodeSeconds = extras?.explodeSeconds || 2;
  return {
    id: createStarId(),
    position,
    createdAt: now,
    addedElementIds,
    explodeSeconds,
    explodeAt: now + explodeSeconds * 1000,
  };
}

export function useStarFormation() {
  const { gameProgress, setGameProgress } = useGame();

  function persistElementPosition(entryId, position) {
    setGameProgress((prev) => ({
      ...prev,
      canvasElements: (prev.canvasElements || []).map((entry) =>
        entry.id === entryId ? { ...entry, position } : entry
      ),
    }));
  }

  function persistGeneratorPosition(generatorId, position) {
    setGameProgress((prev) => ({
      ...prev,
      starGenerators: (prev.starGenerators || []).map((entry) =>
        entry.id === generatorId ? { ...entry, position } : entry
      ),
    }));
  }

  function markFirstStarMilestone(prev, now) {
    return {
      ...prev.milestones,
      firstStarCreated: true,
      firstStarCreatedAt: prev.milestones.firstStarCreated ? prev.milestones.firstStarCreatedAt : now,
    };
  }

  function markAddedToStarMilestone(prev, now) {
    return {
      ...prev.milestones,
      hasAddedToStarOnce: true,
      hasAddedToStarOnceAt: prev.milestones.hasAddedToStarOnce ? prev.milestones.hasAddedToStarOnceAt : now,
    };
  }

  function attemptStarFormation(droppedEntryId, droppedPosition) {
    const activeElements = gameProgress.canvasElements || [];
    const elementsAtCurrentPositions = activeElements.map((entry) =>
      entry.id === droppedEntryId ? { ...entry, position: droppedPosition } : entry
    );

    const nearbyGroup = elementsAtCurrentPositions.filter(
      (entry) => getDistancePercent(entry.position, droppedPosition) <= STAR_PROXIMITY_THRESHOLD_PERCENT
    );

    const hydrogenEntries = nearbyGroup.filter((entry) => entry.elementId === "hydrogen");
    const heliumEntries = nearbyGroup.filter((entry) => entry.elementId === "helium");
    const otherEntries = nearbyGroup.filter(
      (entry) => entry.elementId !== "hydrogen" && entry.elementId !== "helium"
    );

    const isExactMatch =
      hydrogenEntries.length === REQUIRED_HYDROGEN_COUNT &&
      heliumEntries.length === REQUIRED_HELIUM_COUNT &&
      otherEntries.length === 0;

    if (!isExactMatch) {
      return { success: false };
    }

    const consumedIds = new Set([...hydrogenEntries, ...heliumEntries].map((entry) => entry.id));
    const sum = nearbyGroup.reduce(
      (acc, entry) => ({ x: acc.x + entry.position.x, y: acc.y + entry.position.y }),
      { x: 0, y: 0 }
    );
    const center = { x: sum.x / nearbyGroup.length, y: sum.y / nearbyGroup.length };
    const now = Date.now();

    setGameProgress((prev) => ({
      ...prev,
      canvasElements: (prev.canvasElements || []).filter((entry) => !consumedIds.has(entry.id)),
      stars: [...(prev.stars || []), buildNewStar(center)],
      milestones: markFirstStarMilestone(prev, now),
    }));

    return { success: true };
  }

  function attemptGeneratorDrop(generatorId, droppedPosition) {
    const canvasElements = gameProgress.canvasElements || [];
    const heliumEntries = canvasElements.filter((entry) => entry.elementId === "helium");
    const nearbyHelium = findNearestWithinThreshold(
      heliumEntries,
      (entry) => entry.position,
      droppedPosition,
      STAR_PROXIMITY_THRESHOLD_PERCENT
    );

    if (!nearbyHelium) {
      persistGeneratorPosition(generatorId, droppedPosition);
      return { success: false };
    }

    const extras = gatherNearbyAddables(
      canvasElements,
      new Set([nearbyHelium.id]),
      droppedPosition,
      STAR_PROXIMITY_THRESHOLD_PERCENT
    );

    const now = Date.now();
    setGameProgress((prev) => {
      let milestones = markFirstStarMilestone(prev, now);
      if (extras.addedElementIds.length > 0) {
        milestones = markAddedToStarMilestone({ ...prev, milestones }, now);
      }
      return {
        ...prev,
        starGenerators: (prev.starGenerators || []).filter((entry) => entry.id !== generatorId),
        canvasElements: (prev.canvasElements || []).filter(
          (entry) => entry.id !== nearbyHelium.id && !extras.consumedEntryIds.has(entry.id)
        ),
        stars: [...(prev.stars || []), buildNewStar(droppedPosition, extras)],
        milestones,
      };
    });

    return { success: true };
  }

  function attemptHeliumDropOnGenerator(heliumEntryId, droppedPosition) {
    const generators = gameProgress.starGenerators || [];
    const nearbyGenerator = findNearestWithinThreshold(
      generators,
      (entry) => entry.position,
      droppedPosition,
      STAR_PROXIMITY_THRESHOLD_PERCENT
    );

    if (!nearbyGenerator) {
      return { success: false };
    }

    const canvasElements = gameProgress.canvasElements || [];
    const extras = gatherNearbyAddables(
      canvasElements,
      new Set([heliumEntryId]),
      droppedPosition,
      STAR_PROXIMITY_THRESHOLD_PERCENT
    );

    const now = Date.now();
    setGameProgress((prev) => {
      let milestones = markFirstStarMilestone(prev, now);
      if (extras.addedElementIds.length > 0) {
        milestones = markAddedToStarMilestone({ ...prev, milestones }, now);
      }
      return {
        ...prev,
        starGenerators: (prev.starGenerators || []).filter((entry) => entry.id !== nearbyGenerator.id),
        canvasElements: (prev.canvasElements || []).filter(
          (entry) => entry.id !== heliumEntryId && !extras.consumedEntryIds.has(entry.id)
        ),
        stars: [...(prev.stars || []), buildNewStar(droppedPosition, extras)],
        milestones,
      };
    });

    return { success: true };
  }

  function attemptAddToStar(droppedEntryId, droppedPosition, elementId) {
    const activeStars = gameProgress.stars || [];
    const nearbyStar = findNearestWithinThreshold(
      activeStars,
      (star) => star.position,
      droppedPosition,
      STAR_PROXIMITY_THRESHOLD_PERCENT
    );

    if (!nearbyStar) {
      persistElementPosition(droppedEntryId, droppedPosition);
      return { success: false };
    }

    const currentAddedIds = new Set(nearbyStar.addedElementIds);
    const result = canAddElementToStar(currentAddedIds, elementId);

    if (!result.valid) {
      persistElementPosition(droppedEntryId, droppedPosition);
      return { success: false };
    }

    const now = Date.now();
    setGameProgress((prev) => ({
      ...prev,
      canvasElements: (prev.canvasElements || []).filter((entry) => entry.id !== droppedEntryId),
      stars: (prev.stars || []).map((star) =>
        star.id === nearbyStar.id
          ? {
              ...star,
              addedElementIds: [...result.addedElementIds],
              explodeSeconds: result.explodeSeconds,
              explodeAt: star.createdAt + result.explodeSeconds * 1000,
            }
          : star
      ),
      milestones: markAddedToStarMilestone(prev, now),
    }));

    return { success: true };
  }

  function detonateStar(starId) {
    setGameProgress((prev) => {
      const star = (prev.stars || []).find((s) => s.id === starId);
      if (!star) return prev;

      const products = generateExplosionProducts(star.explodeSeconds);
      const newEntries = products.map((elementId, index) => {
        const angle = (index / products.length) * Math.PI * 2;
        const jitterRadius = 3 + Math.random() * 2;
        return {
          id: createElementEntryId(),
          elementId,
          position: {
            x: Math.min(90, Math.max(10, star.position.x + Math.cos(angle) * jitterRadius)),
            y: Math.min(90, Math.max(10, star.position.y + Math.sin(angle) * jitterRadius)),
          },
        };
      });

      const updatedElements = { ...prev.elements };
      products.forEach((elementId) => {
        updatedElements[elementId] = {
          discovered: true,
          count: (updatedElements[elementId]?.count || 0) + 1,
        };
      });

      return {
        ...prev,
        stars: prev.stars.filter((s) => s.id !== starId),
        canvasElements: [...(prev.canvasElements || []), ...newEntries],
        elements: updatedElements,
      };
    });
  }

  return {
    attemptStarFormation,
    attemptGeneratorDrop,
    attemptHeliumDropOnGenerator,
    attemptAddToStar,
    detonateStar,
  };
}