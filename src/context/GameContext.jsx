import { createContext, useContext, useEffect } from "react";
import { useGameProgress, generateInitialParticles } from "../hooks/useGameProgress.js";
import { SCIENCE_NOTES } from "../data/scienceNotes.js";
import { evaluateCondition } from "../utils/conditionEvaluator.js";

const GameContext = createContext(null);

function createCanvasElementId() {
  return `element_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

function createParticleId(type) {
  return `particle_${type}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}

export function GameProvider({ children }) {
  const { gameProgress, setGameProgress, resetGameProgress } = useGameProgress();

  useEffect(() => {
    setGameProgress((prev) => {
      let hasChanged = false;
      const updatedNotes = { ...prev.scienceNotes };

      SCIENCE_NOTES.forEach((note) => {
        const isAlreadyUnlocked = Boolean(updatedNotes[note.id]?.unlocked);
        if (!isAlreadyUnlocked && evaluateCondition(note.unlockCondition, prev)) {
          updatedNotes[note.id] = { unlocked: true, unlockedAt: Date.now() };
          hasChanged = true;
        }
      });

      if (!hasChanged) return prev;
      return { ...prev, scienceNotes: updatedNotes };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameProgress.hasSeenOpening, gameProgress.elements, gameProgress.stars]);

  function igniteBigBang() {
    setGameProgress((prev) => {
      if (prev.hasSeenOpening) return prev;
      return {
        ...prev,
        hasSeenOpening: true,
        particles: generateInitialParticles(),
      };
    });
  }

  function summonElement(elementId) {
    const jitterX = (Math.random() - 0.5) * 16;
    const jitterY = (Math.random() - 0.5) * 16;
    const newEntry = {
      id: createCanvasElementId(),
      elementId,
      position: {
        x: Math.min(90, Math.max(10, 50 + jitterX)),
        y: Math.min(90, Math.max(10, 50 + jitterY)),
      },
    };
    setGameProgress((prev) => ({
      ...prev,
      canvasElements: [...prev.canvasElements, newEntry],
    }));
  }

  function summonParticle(type) {
    const jitterX = (Math.random() - 0.5) * 16;
    const jitterY = (Math.random() - 0.5) * 16;
    const newParticle = {
      id: createParticleId(type),
      type,
      position: {
        x: Math.min(90, Math.max(10, 50 + jitterX)),
        y: Math.min(90, Math.max(10, 50 + jitterY)),
      },
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2,
      },
      isDragging: false,
      isConsumed: false,
    };
    setGameProgress((prev) => ({
      ...prev,
      particles: [...prev.particles, newParticle],
    }));
  }

  function moveCanvasElement(entryId, newPosition) {
    setGameProgress((prev) => ({
      ...prev,
      canvasElements: prev.canvasElements.map((entry) =>
        entry.id === entryId ? { ...entry, position: newPosition } : entry
      ),
    }));
  }

  const value = {
    gameProgress,
    setGameProgress,
    resetGameProgress,
    igniteBigBang,
    summonElement,
    summonParticle,
    moveCanvasElement,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}