export const MISSIONS = [
  {
    id: "mission_create_hydrogen",
    title: "수소 생성",
    description: "양성자 1개와 전자 1개를 가까이 놓아보세요.",
    condition: { type: "elementDiscovered", target: "hydrogen" },
    completed: false,
    order: 1,
  },
  {
    id: "mission_create_helium",
    title: "헬륨 생성",
    description: "양성자 2개, 중성자 2개, 전자 2개를 모아보세요.",
    condition: { type: "elementDiscovered", target: "helium" },
    completed: false,
    order: 2,
  },
  {
    id: "mission_create_lithium",
    title: "리튬 생성",
    description: "양성자 3개, 중성자 4개, 전자 3개를 모아보세요.",
    condition: { type: "elementDiscovered", target: "lithium" },
    completed: false,
    order: 3,
  },
  {
    id: "mission_create_first_star",
    title: "첫 별 탄생",
    description: "수소 12개와 헬륨 1개를 한 자리에 모아보세요.",
    condition: { type: "starCreated" },
    completed: false,
    order: 4,
  },
  {
    id: "mission_star_first_explosion",
    title: "별의 폭발",
    description: "별이 터질 때까지 기다려보세요.",
    condition: { type: "elementDiscovered", target: "carbon" },
    completed: false,
    order: 5,
  },
  {
    id: "mission_add_element_to_star",
    title: "재료 추가하기",
    description: "폭발로 얻은 것들을 새로 태어난 별에 다시 넣어보세요.",
    condition: { type: "addedToStar" },
    completed: false,
    order: 6,
  },
  {
    id: "mission_create_iron",
    title: "철의 탄생",
    description: "별의 반응 시간을 최대한 늘려보세요.",
    condition: { type: "elementDiscovered", target: "iron" },
    completed: false,
    order: 7,
  },
];

export function getMissionById(missionId) {
  return MISSIONS.find((mission) => mission.id === missionId) || null;
}