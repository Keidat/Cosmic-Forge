import { MISSIONS } from "../../data/missions.js";
import { ACHIEVEMENTS } from "../../data/achievements.js";
import { evaluateCondition } from "../../utils/conditionEvaluator.js";
import { useGame } from "../../context/GameContext.jsx";
import styles from "./MissionAchievementPanel.module.css";

const SORTED_MISSIONS = [...MISSIONS].sort((a, b) => a.order - b.order);

export default function MissionAchievementPanel() {
  const { gameProgress } = useGame();

  return (
    <div className={styles.panel}>
      <section>
        <h2 className={styles.title}>발전 과제</h2>
        <ul className={styles.list}>
          {SORTED_MISSIONS.map((mission) => {
            const isDone = evaluateCondition(mission.condition, gameProgress);
            return (
              <li key={mission.id} className={`${styles.item} ${isDone ? styles.done : ""}`}>
                <span className={styles.check}>{isDone ? "✅" : "⬜"}</span>
                <div>
                  <p className={styles.itemTitle}>{mission.title}</p>
                  <p className={styles.itemDesc}>{mission.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <section>
        <h2 className={styles.title}>업적</h2>
        <ul className={styles.list}>
          {ACHIEVEMENTS.map((achievement) => {
            const isDone = evaluateCondition(achievement.condition, gameProgress);
            return (
              <li key={achievement.id} className={`${styles.item} ${isDone ? styles.done : ""}`}>
                <span className={styles.check}>{isDone ? "🏆" : "🔒"}</span>
                <div>
                  <p className={styles.itemTitle}>{achievement.title}</p>
                  <p className={styles.itemDesc}>{achievement.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}