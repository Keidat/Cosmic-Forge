import { ELEMENTS } from "../../data/elements.js";
import { useGame } from "../../context/GameContext.jsx";
import styles from "./ElementCollection.module.css";

const BASIC_PARTICLES = [
  { type: "proton", label: "양성자", symbol: "P" },
  { type: "neutron", label: "중성자", symbol: "N" },
  { type: "electron", label: "전자", symbol: "e" },
];

export default function ElementCollection() {
  const { gameProgress, summonElement, summonParticle } = useGame();

  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>도감</h2>

      <h3 className={styles.subtitle}>기본 입자</h3>
      <div className={styles.particleRow}>
        {BASIC_PARTICLES.map((particle) => (
          <button
            key={particle.type}
            type="button"
            className={`${styles.particleCell} ${styles[particle.type]}`}
            onClick={() => summonParticle(particle.type)}
            title={`${particle.label} 소환하기`}
          >
            <span className={styles.particleSymbol}>{particle.symbol}</span>
            <span className={styles.particleLabel}>{particle.label}</span>
          </button>
        ))}
      </div>

      <h3 className={styles.subtitle}>원소</h3>
      <div className={styles.grid}>
        {ELEMENTS.map((element) => {
          const entry = gameProgress.elements[element.id];
          const isDiscovered = Boolean(entry?.discovered);

          if (!isDiscovered) {
            return (
              <div key={element.id} className={`${styles.cell} ${styles.locked}`} aria-label="미발견 원소">
                <span className={styles.lockIcon}>🔒</span>
              </div>
            );
          }

          return (
            <button
              key={element.id}
              type="button"
              className={`${styles.cell} ${styles.discovered}`}
              onClick={() => summonElement(element.id)}
              title={`${element.name} 소환하기`}
            >
              <span className={styles.symbol}>{element.symbol}</span>
              <span className={styles.name}>{element.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}