import { useState } from "react";
import { useGame } from "../../context/GameContext.jsx";
import ElementCollection from "./ElementCollection.jsx";
import MissionAchievementPanel from "./MissionAchievementPanel.jsx";
import ScienceNotePanel from "./ScienceNotePanel.jsx";
import styles from "./Sidebar.module.css";

const TABS = [
  { id: "collection", icon: "📖", label: "도감" },
  { id: "missions", icon: "🏆", label: "발전과제" },
  { id: "science", icon: "🔬", label: "과학 원리" },
];

export default function Sidebar() {
  const { resetGameProgress } = useGame();
  const [openTabId, setOpenTabId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  function handleToggle(tabId) {
    setOpenTabId((prev) => (prev === tabId ? null : tabId));
  }

  function handleConfirmReset() {
    setIsConfirmOpen(false);
    resetGameProgress();
  }

  return (
    <div className={styles.sidebarRoot}>
      <div className={styles.iconRail}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`${styles.iconButton} ${openTabId === tab.id ? styles.active : ""}`}
            onClick={() => handleToggle(tab.id)}
            title={tab.label}
            aria-label={tab.label}
          >
            <span className={styles.icon}>{tab.icon}</span>
          </button>
        ))}
        <button
          type="button"
          className={`${styles.iconButton} ${styles.exitButton}`}
          onClick={() => setIsConfirmOpen(true)}
          title="처음으로 돌아가기"
          aria-label="처음으로 돌아가기"
        >
          <span className={styles.icon}>🚪</span>
        </button>
      </div>

      {openTabId && (
        <div className={styles.panelOverlay}>
          {openTabId === "collection" && <ElementCollection />}
          {openTabId === "missions" && <MissionAchievementPanel />}
          {openTabId === "science" && <ScienceNotePanel />}
        </div>
      )}
      {isConfirmOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsConfirmOpen(false)}>
          <div className={styles.modalBox} onClick={(event) => event.stopPropagation()}>
            <p className={styles.modalText}>이 버튼을 누르면 합성한 모든 내용이 사라집니다.</p>
            <div className={styles.modalActions}>
              <button type="button" className={styles.modalCancel} onClick={() => setIsConfirmOpen(false)}>
                취소
              </button>
              <button type="button" className={styles.modalConfirm} onClick={handleConfirmReset}>
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}