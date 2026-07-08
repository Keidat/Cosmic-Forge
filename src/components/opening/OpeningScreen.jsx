import { useEffect, useState } from "react";
import BigBangEffect from "./BigBangEffect.jsx";
import { useGame } from "../../context/GameContext.jsx";
import styles from "./OpeningScreen.module.css";

const CHARGE_DELAY_MS = 1400;

export default function OpeningScreen() {
  const { igniteBigBang } = useGame();
  const [phase, setPhase] = useState("idle"); // idle | charging | exploding

  function handleButtonClick() {
    if (phase !== "idle") return;
    setPhase("charging");
  }

  useEffect(() => {
    if (phase !== "charging") return undefined;
    const timer = setTimeout(() => setPhase("exploding"), CHARGE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  function handleExplosionComplete() {
    igniteBigBang();
  }

  return (
    <div className={styles.openingScreen}>
      {(phase === "idle" || phase === "charging") && (
        <button
          type="button"
          className={`${styles.bigBangButton} ${phase === "charging" ? styles.charging : ""}`}
          aria-label="빅뱅 시작하기"
          onClick={handleButtonClick}
          disabled={phase === "charging"}
        />
      )}
      {phase === "exploding" && <BigBangEffect onComplete={handleExplosionComplete} />}
    </div>
  );
}