export const REQUIRED_HYDROGEN_COUNT = 12;
export const REQUIRED_HELIUM_COUNT = 1;

export const LIGHT_METALS = ["neon", "nitrogen", "magnesium"];
export const HEAVY_NONMETALS = ["phosphorus", "sulfur"];
export const ADDABLE_STAR_ELEMENT_IDS = ["carbon", "oxygen", "silicon", ...LIGHT_METALS, ...HEAVY_NONMETALS];

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