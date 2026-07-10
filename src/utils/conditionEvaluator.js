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
      // 과거 기록 누락 대비: 이 원소들은 별에 재료를 추가해야만 나올 수 있으므로,
      // 하나라도 발견했다면 이미 재료 추가를 해낸 것과 같다.
      return STAR_ADD_ONLY_ELEMENT_IDS.some((id) => gameProgress.elements[id]?.discovered);
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