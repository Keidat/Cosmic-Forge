import { ELEMENTS } from "../data/elements.js";

export function evaluateCondition(condition, gameProgress) {
  switch (condition.type) {
    case "elementDiscovered":
      return Boolean(gameProgress.elements[condition.target]?.discovered);
    case "starCreated":
      return Boolean(gameProgress.milestones?.firstStarCreated);
    case "addedToStar":
      return Boolean(gameProgress.milestones?.hasAddedToStarOnce);
    case "firstElementEver":
      return Object.values(gameProgress.elements).some((element) => element.discovered);
    case "lifeElementsCompleted":
      return gameProgress.milestones.lifeElementsCompleted;
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