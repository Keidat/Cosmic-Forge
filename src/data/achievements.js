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
    id: "achievement_life_elements",
    title: "생명의 재료",
    description: "생명 원소 5종(수소, 탄소, 질소, 산소, 인)을 모두 발견했습니다.",
    condition: { type: "lifeElementsCompleted" },
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
];

export function getAchievementById(achievementId) {
  return ACHIEVEMENTS.find((achievement) => achievement.id === achievementId) || null;
}