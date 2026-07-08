import { useState } from "react";
import { SCIENCE_NOTES } from "../../data/scienceNotes.js";
import { useGame } from "../../context/GameContext.jsx";
import styles from "./ScienceNotePanel.module.css";

export default function ScienceNotePanel() {
  const { gameProgress } = useGame();
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>과학 원리</h2>
      <ul className={styles.list}>
        {SCIENCE_NOTES.map((note) => {
          const entry = gameProgress.scienceNotes[note.id];
          const isUnlocked = Boolean(entry?.unlocked);

          if (!isUnlocked) {
            return (
              <li key={note.id} className={`${styles.item} ${styles.locked}`}>
                <span className={styles.lockIcon}>🔒</span>
                <span className={styles.lockedTitle}>???</span>
              </li>
            );
          }

          const isExpanded = expandedId === note.id;

          return (
            <li key={note.id} className={styles.item}>
              <button
                type="button"
                className={styles.noteButton}
                onClick={() => setExpandedId(isExpanded ? null : note.id)}
              >
                <span className={styles.noteIcon}>{isExpanded ? "▾" : "▸"}</span>
                {note.title}
              </button>
              {isExpanded && <p className={styles.content}>{note.content}</p>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}