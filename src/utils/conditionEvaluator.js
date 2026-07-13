import { ELEMENTS } from "../data/elements.js";

const STAR_ADD_ONLY_ELEMENT_IDS = [
  "neon",
  "nitrogen",
  "magnesium",
  "silicon",
  "phosphorus",
  "sulfur",
  "iron",
];

export function evaluateCondition(condition, gameProgress) {
  switch (condition.type) {
    case "elementDiscovered":
      return Boolean(gameProgress.elements[condition.target]?.discovered);
    case "starCreated":
      return Boolean(gameProgress.milestones?.firstStarCreated);
    case "addedToStar":
      if (gameProgress.milestones?.hasAddedToStarOnce) return true;
      return STAR_ADD_ONLY_ELEMENT_IDS.some((id) => gameProgress.elements[id]?.discovered);
    case "allElementsDiscovered":
      return ELEMENTS.every((element) => gameProgress.elements[element.id]?.discovered);
    case "firstElementEver":
      return Object.values(gameProgress.elements).some((element) => element.discovered);
    case "afterBigBang":
      return gameProgress.hasSeenOpening;
    case "originFirstSeen":
      return ELEMENTS.some(
        (element) =>
          element.origin === condition.target && gameProgress.elements[element.id]?.discovered
      );
    default:
      return false;
  }
}