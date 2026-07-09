export const REQUIRED_HYDROGEN_COUNT = 12;
export const REQUIRED_HELIUM_COUNT = 1;

export const LIGHT_METALS = ["neon", "nitrogen", "magnesium"];
export const HEAVY_NONMETALS = ["phosphorus", "sulfur"];
export const ADDABLE_STAR_ELEMENT_IDS = ["carbon", "oxygen", "silicon", ...LIGHT_METALS, ...HEAVY_NONMETALS];

// explodeSeconds(폭발까지 걸리는 시간)로 구분한 별의 진화 단계별 색상
export const STAR_STAGE_COLORS = {
  2: { core: "#ffffff", mid: "#bfe2ff", edge: "#5aa9ff", glow: "120, 190, 255" },  // 1단계: 어리고 뜨거운 청백색 별
  3: { core: "#fff9d6", mid: "#ffd23f", edge: "#ff8a00", glow: "255, 190, 60" },   // 2단계: 노랑-주황 별
  4: { core: "#ffd9a0", mid: "#ff7a3d", edge: "#d6432f", glow: "255, 120, 60" },   // 3단계: 주황-빨강 별
  5: { core: "#ffb199", mid: "#e8432f", edge: "#8a1f6b", glow: "232, 67, 110" },   // 4단계: 짙은 적색-보라
  6: { core: "#ff9ad6", mid: "#c23bd0", edge: "#3a1f6b", glow: "194, 59, 210" },   // 5단계: 초신성 직전, 붉은보라 거성
};

export function getStarStageColors(explodeSeconds) {
  return STAR_STAGE_COLORS[explodeSeconds] || STAR_STAGE_COLORS[2];
}


export function computeExplodeSeconds(addedElementIds) {
  const hasCarbon = addedElementIds.has("carbon");
  const hasOxygen = addedElementIds.has("oxygen");
  const extras = [...addedElementIds].filter((id) => id !== "carbon" && id !== "oxygen");

  if (!hasCarbon && !hasOxygen) {
    if (extras.length > 0) return null;
    return 2;
  }

  if (hasCarbon !== hasOxygen) {
    if (extras.length > 0) return null;
    return 3;
  }

  if (extras.length === 0) return 4;

  if (extras.length === 1) {
    const extra = extras[0];
    if (extra === "silicon") return 6;
    if (LIGHT_METALS.includes(extra)) return 4;
    if (HEAVY_NONMETALS.includes(extra)) return 5;
    return null;
  }

  return null;
}

export function canAddElementToStar(currentAddedIds, newElementId) {
  const candidateSet = new Set(currentAddedIds);
  candidateSet.add(newElementId);
  const explodeSeconds = computeExplodeSeconds(candidateSet);
  if (explodeSeconds === null) return { valid: false };
  return { valid: true, explodeSeconds, addedElementIds: candidateSet };
}

function pickRandomUnique(pool, count) {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function generateExplosionProducts(explodeSeconds) {
  switch (explodeSeconds) {
    case 2:
      return ["carbon", "oxygen"];
    case 3:
      return ["carbon", "oxygen", ...pickRandomUnique(LIGHT_METALS, 1)];
    case 4:
      return ["carbon", "oxygen", ...pickRandomUnique([...LIGHT_METALS, "silicon"], 2)];
    case 5:
      return ["carbon", "oxygen", "silicon", ...pickRandomUnique([...LIGHT_METALS, ...HEAVY_NONMETALS], 3)];
    case 6:
      return [
        "carbon",
        "oxygen",
        "silicon",
        ...pickRandomUnique(LIGHT_METALS, 1),
        ...pickRandomUnique(HEAVY_NONMETALS, 1),
        "iron",
      ];
    default:
      return ["carbon", "oxygen"];
  }
}