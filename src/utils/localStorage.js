export const SAVE_KEY = "cosmic-forge-save";

export function loadGameProgress() {
  try {
    const raw = window.localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to load game progress:", error);
    return null;
  }
}

export function saveGameProgress(gameProgress) {
  try {
    window.localStorage.setItem(SAVE_KEY, JSON.stringify(gameProgress));
    return true;
  } catch (error) {
    console.error("Failed to save game progress:", error);
    return false;
  }
}

export function clearGameProgress() {
  try {
    window.localStorage.removeItem(SAVE_KEY);
    return true;
  } catch (error) {
    console.error("Failed to clear game progress:", error);
    return false;
  }
}