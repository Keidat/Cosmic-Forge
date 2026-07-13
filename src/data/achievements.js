export const ACHIEVEMENTS = [
  {
    id: "achievement_first_element",
    title: "최초의 원소",
    description: "첫 원소를 발견했습니다.",
    condition: { type: "firstElementEver" },
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "achievement_first_star",
    title: "별의 탄생",
    description: "첫 번째 별을 탄생시켰습니다.",
    condition: { type: "starCreated" },
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "achievement_added_to_star",
    title: "재료 추가",
    description: "별에 원소를 추가해 반응 시간을 늘렸습니다.",
    condition: { type: "addedToStar" },
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "achievement_iron_forged",
    title: "핵융합의 끝",
    description: "철을 발견하여 별의 핵융합이 도달할 수 있는 마지막 원소까지 만들었습니다.",
    condition: { type: "elementDiscovered", target: "iron" },
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "achievement_lithium",
    title: "숨겨진 원소",
    description: "별과는 무관하게, 입자 조합만으로 리튬을 만들었습니다.",
    condition: { type: "elementDiscovered", target: "lithium" },
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "achievement_all_elements",
    title: "완전한 도감",
    description: "12종의 원소를 모두 발견했습니다.",
    condition: { type: "allElementsDiscovered" },
    unlocked: false,
    unlockedAt: null,
  },
];

export function getAchievementById(achievementId) {
  return ACHIEVEMENTS.find((achievement) => achievement.id === achievementId) || null;
}