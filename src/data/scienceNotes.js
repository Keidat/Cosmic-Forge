export const SCIENCE_NOTES = [
  {
    id: "note_big_bang_particles",
    title: "빅뱅과 기본 입자",
    content:
      "빅뱅 직후 우주는 상상할 수 없이 뜨거웠다. 시간이 흐르며 온도가 내려가자 쿼크가 뭉쳐 양성자와 중성자가 생겼고, 곧이어 전자가 등장했다. 이 세 입자가 이후 모든 원소의 재료가 된다.",
    unlockCondition: { type: "afterBigBang" },
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "note_isotope_neutron",
    title: "동위원소와 중성자 개수",
    content:
      "같은 원소라도 중성자 개수가 다르면 동위원소가 된다. 원소의 정체성은 양성자 개수로 정해지지만, 중성자 개수는 안정성과 질량을 좌우한다.",
    unlockCondition: { type: "elementDiscovered", target: "helium" },
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "note_nuclear_fusion",
    title: "핵융합이란?",
    content:
      "핵융합은 가벼운 원자핵이 합쳐져 더 무거운 원자핵이 되는 과정이다. 이 과정에서 막대한 에너지가 방출되며, 별이 빛나는 이유도 바로 이 핵융합 때문이다.",
    unlockCondition: { type: "originFirstSeen", target: "stellarFusion" },
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "note_stellar_nucleosynthesis",
    title: "별은 어떻게 원소를 만드는가",
    content:
      "별은 중심부의 온도와 압력에 따라 순서대로 더 무거운 원소를 만들어낸다. 수소에서 헬륨으로, 헬륨에서 탄소로, 그리고 산소, 네온, 마그네슘, 규소를 거쳐 마지막으로 철에 도달한다.",
    unlockCondition: { type: "elementDiscovered", target: "carbon" },
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "note_iron_fusion_stop",
    title: "철에서 핵융합이 멈추는 이유",
    content:
      "철은 원자핵 중에서 가장 안정적인 상태에 가깝다. 철을 융합하려면 에너지를 방출하는 대신 오히려 에너지를 흡수해야 하므로, 별의 핵융합은 철에서 멈춘다. 그 다음 단계는 초신성처럼 훨씬 격렬한 사건이 필요하다.",
    unlockCondition: { type: "elementDiscovered", target: "iron" },
    unlocked: false,
    unlockedAt: null,
  },
];

export function getScienceNoteById(noteId) {
  return SCIENCE_NOTES.find((note) => note.id === noteId) || null;
}