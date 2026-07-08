import { useEffect, useState } from "react";
import { ELEMENTS } from "../data/elements.js";
import { MISSIONS } from "../data/missions.js";
import { ACHIEVEMENTS } from "../data/achievements.js";
import { SCIENCE_NOTES } from "../data/scienceNotes.js";
import { loadGameProgress, saveGameProgress, clearGameProgress } from "../utils/localStorage.js";

const PARTICLE_TYPES = ["proton", "neutron", "electron"];
const PARTICLES_PER_TYPE = 14;

function buildInitialElementCollection() {
  const collection = {};
  ELEMENTS.forEach((element) => {
    collection[element.id] = { discovered: false, count: 0 };
  });
  return collection;
}

function buildInitialScienceNoteState() {
  const noteState = {};
  SCIENCE_NOTES.forEach((note) => {
    noteState[note.id] = { unlocked: false, unlockedAt: null };
  });
  return noteState;
}

export function generateInitialParticles() {
  const particles = [];
  let counter = 0;

  PARTICLE_TYPES.forEach((type) => {
    for (let i = 0; i < PARTICLES_PER_TYPE; i += 1) {
      counter += 1;
      particles.push({
        id: `particle_${type}_${counter}`,
        type,
        position: {
          x: 10 + Math.random() * 80,
          y: 10 + Math.random() * 80,
        },
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        },
        isDragging: false,
        isConsumed: false,
      });
    }
  });

  return particles;
}

export function buildInitialGameProgress() {
  return {
    hasSeenOpening: false,
    particles: [],
    canvasElements: [],
    elements: buildInitialElementCollection(),
    stars: [],
    missions: MISSIONS.map((mission) => ({ ...mission })),
    achievements: ACHIEVEMENTS.map((achievement) => ({ ...achievement })),
    scienceNotes: buildInitialScienceNoteState(),
    guidebook: {
      currentPage: 0,
      maxUnlockedPage: 0,
    },
    milestones: {
      lifeElementsCompleted: false,
      lifeElementsCompletedAt: null,
    },
  };
}

export function useGameProgress() {
  const [gameProgress, setGameProgress] = useState(() => {
    const loaded = loadGameProgress();
    return loaded ? { ...buildInitialGameProgress(), ...loaded } : buildInitialGameProgress();
  });

  useEffect(() => {
    saveGameProgress(gameProgress);
  }, [gameProgress]);

  function resetGameProgress() {
    clearGameProgress();
    setGameProgress(buildInitialGameProgress());
  }

  return { gameProgress, setGameProgress, resetGameProgress };
}