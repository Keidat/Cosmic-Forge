export const MISSIONS = [
  {
    id: "mission_create_hydrogen",
    title: "수소 생성",
    description:
      "화면에 떠다니는 작은 점들이 입자입니다. 주황색 입자(양성자) 1개와 하늘색 입자(전자) 1개를 마우스로 끌어서 서로 겹치게 놓아보세요.",
    condition: { type: "elementDiscovered", target: "hydrogen" },
    completed: false,
    order: 1,
  },
  {
    id: "mission_create_helium",
    title: "헬륨 생성",
    description:
      "주황색 입자(양성자) 2개, 회색 입자(중성자) 2개, 하늘색 입자(전자) 2개, 총 6개를 한 곳에 겹쳐 모아보세요.",
    condition: { type: "elementDiscovered", target: "helium" },
    completed: false,
    order: 2,
  },
  {
    id: "mission_create_lithium",
    title: "리튬 생성",
    description: "양성자 3개, 중성자 4개, 전자 3개, 총 10개를 한 곳에 겹쳐 모아보세요.",
    condition: { type: "elementDiscovered", target: "lithium" },
    completed: false,
    order: 3,
  },
  {
    id: "mission_create_first_star",
    title: "첫 별 탄생",
    description:
      "왼쪽 사이드바의 📖 도감을 열면 이미 만든 원소를 클릭해서 캔버스에 다시 소환할 수 있습니다. 수소를 12번, 헬륨을 1번 소환해서 한 자리에 모아보세요.",
    condition: { type: "starCreated" },
    completed: false,
    order: 4,
  },
  {
    id: "mission_star_first_explosion",
    title: "별의 폭발",
    description: "별은 태어난 뒤 스스로 수축하다가 터집니다. 가만히 기다려보면 주변에 새로운 원소가 나타납니다.",
    condition: { type: "elementDiscovered", target: "carbon" },
    completed: false,
    order: 5,
  },
  {
    id: "mission_add_element_to_star",
    title: "재료 추가하기",
    description:
      "별이 폭발하면 근처에 탄소와 산소가 생깁니다. 별이 또 태어나면, 터지기 전에 그 탄소나 산소를 끌어다 별 위에 놓아보세요.",
    condition: { type: "addedToStar" },
    completed: false,
    order: 6,
  },
  {
    id: "mission_create_iron",
    title: "철의 탄생",
    description:
      "새로 태어난 별에 탄소와 산소를 둘 다 넣고, 이어서 규소까지 넣어보세요. 반응이 가장 오래 지속되어 철까지 만들어집니다.",
    condition: { type: "elementDiscovered", target: "iron" },
    completed: false,
    order: 7,
  },
  {
    id: "mission_obtain_nitrogen",
    title: "질소 획득",
    description: "질소를 발견했습니다.",
    condition: { type: "elementDiscovered", target: "nitrogen" },
    completed: false,
    order: 8,
  },
  {
    id: "mission_obtain_oxygen",
    title: "산소 획득",
    description: "산소를 발견했습니다.",
    condition: { type: "elementDiscovered", target: "oxygen" },
    completed: false,
    order: 9,
  },
  {
    id: "mission_obtain_neon",
    title: "네온 획득",
    description: "네온을 발견했습니다.",
    condition: { type: "elementDiscovered", target: "neon" },
    completed: false,
    order: 10,
  },
  {
    id: "mission_obtain_magnesium",
    title: "마그네슘 획득",
    description: "마그네슘을 발견했습니다.",
    condition: { type: "elementDiscovered", target: "magnesium" },
    completed: false,
    order: 11,
  },
  {
    id: "mission_obtain_silicon",
    title: "규소 획득",
    description: "규소를 발견했습니다.",
    condition: { type: "elementDiscovered", target: "silicon" },
    completed: false,
    order: 12,
  },
  {
    id: "mission_obtain_sulfur",
    title: "황 획득",
    description: "황을 발견했습니다.",
    condition: { type: "elementDiscovered", target: "sulfur" },
    completed: false,
    order: 13,
  },
  {
    id: "mission_obtain_phosphorus",
    title: "인 획득",
    description: "인을 발견했습니다.",
    condition: { type: "elementDiscovered", target: "phosphorus" },
    completed: false,
    order: 14,
  },
  {
    id: "mission_obtain_all_elements",
    title: "우주의 모든 원소",
    description: "우주에 존재하는 12종의 원소를 모두 발견했습니다.",
    condition: { type: "allElementsDiscovered" },
    completed: false,
    order: 15,
  },
];

export function getMissionById(missionId) {
  return MISSIONS.find((mission) => mission.id === missionId) || null;
}