import { GameProvider, useGame } from "./context/GameContext.jsx";
import OpeningScreen from "./components/opening/OpeningScreen.jsx";
import CombinationCanvas from "./components/canvas/CombinationCanvas.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Guidebook from "./components/guidebook/Guidebook.jsx";
import styles from "./App.module.css";

function MainExperience() {
  const { resetGameProgress } = useGame();

  return (
    <div className={styles.mainExperience}>
      <button type="button" className={styles.resetButton} onClick={resetGameProgress}>
        초기화 (테스트용)
      </button>
      <CombinationCanvas />
      <Sidebar />
      <Guidebook />
    </div>
  );
}

function ExperienceRouter() {
  const { gameProgress } = useGame();
  return gameProgress.hasSeenOpening ? <MainExperience /> : <OpeningScreen />;
}

export default function App() {
  return (
    <GameProvider>
      <ExperienceRouter />
    </GameProvider>
  );
}