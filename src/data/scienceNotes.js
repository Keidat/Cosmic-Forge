export const SCIENCE_NOTES = [
  {
    id: "note_big_bang_particles",
    title: "빅뱅과 기본 입자",
    content:
      "약 138억 년 전 빅뱅 이후 쿼크와 전자 같은 기본 입자가 생겨났다. 이 입자들이 결합해 양성자와 중성자가 되었고, 다시 전자와 결합해 수소(H)와 헬륨(He) 원자가 만들어졌다.",
    unlockCondition: { type: "afterBigBang" },
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "note_nuclear_fusion",
    title: "핵융합이란?",
    content:
      "높은 온도와 압력에서 수소(H) 원자핵이 결합해 헬륨(He)이 되는 과정을 핵융합이라 한다. 이 과정에서 막대한 에너지가 방출되며, 별이 빛나는 이유도 바로 여기에 있다.",
    unlockCondition: { type: "originFirstSeen", target: "stellarFusion" },
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "note_first_generation_star",
    title: "1세대 별의 탄생",
    content:
      "우주 초기의 별(종족 III)은 수소와 헬륨 외에 다른 원소가 전혀 없었다. 중원소가 없어 중심부가 훨씬 뜨거워진 뒤에야 수소끼리 부딪혀 헬륨을 만들었고(p-p 연쇄 반응), 헬륨이 쌓여 온도가 1억 K를 넘으면 헬륨 원자핵 3개가 동시에 충돌해 탄소를 만든다(삼중 알파 반응).",
    unlockCondition: { type: "starCreated" },
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "note_stellar_nucleosynthesis",
    title: "별은 어떻게 원소를 만드는가",
    content:
      "별은 핵융합으로 H → He → C → O → Si → Fe 순으로 점점 더 무거운 원소를 만든다. 세대가 진화할수록 별 내부에 쌓인 무거운 원소를 이용해 더 다양하고 효율적인 융합 경로를 밟는다.",
    unlockCondition: { type: "elementDiscovered", target: "carbon" },
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "note_star_reaction_duration",
    title: "반응이 오래갈수록 무거운 원소가 나온다",
    content:
      "별에 탄소나 산소 같은 재료를 더 넣으면, 핵융합 반응이 더 오랫동안 지속된다. 반응 시간이 길어질수록 별 내부는 더 무거운 원소(네온, 마그네슘, 규소, 철 등)까지 합성할 여유를 갖게 된다.",
    unlockCondition: { type: "addedToStar" },
    unlocked: false,
    unlockedAt: null,
  },
  {
    id: "note_iron_fusion_stop",
    title: "철에서 핵융합이 멈추는 이유",
    content:
      "철(Fe)은 원자핵 중 가장 안정한 상태에 가깝다. 철을 융합하려면 에너지를 방출하는 대신 오히려 흡수해야 하므로, 별의 핵융합은 철에서 멈춘다. 그 다음 단계로 나아가려면 초신성 폭발 같은 훨씬 격렬한 사건이 필요하다.",
    unlockCondition: { type: "elementDiscovered", target: "iron" },
    unlocked: false,
    unlockedAt: null,
  },
];

export function getScienceNoteById(noteId) {
  return SCIENCE_NOTES.find((note) => note.id === noteId) || null;
}