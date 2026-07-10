import { useRef } from "react";
import { GameProvider, useGame } from "./context/GameContext.jsx";
import OpeningScreen from "./components/opening/OpeningScreen.jsx";
import CombinationCanvas from "./components/canvas/CombinationCanvas.jsx";
import DiscardZone from "./components/canvas/DiscardZone.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Guidebook from "./components/guidebook/Guidebook.jsx";
import styles from "./App.module.css";

function MainExperience() {
  const discardZoneRef = useRef(null);

  return (
    <div className={styles.mainExperience}>
      <CombinationCanvas discardZoneRef={discardZoneRef} />
+      <DiscardZone ref={discardZoneRef} />
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