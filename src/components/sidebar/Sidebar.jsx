import { useState } from "react";
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
  const [openTabId, setOpenTabId] = useState(null);

  function handleToggle(tabId) {
    setOpenTabId((prev) => (prev === tabId ? null : tabId));
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
      </div>
      {openTabId && (
        <div className={styles.panelOverlay}>
          {openTabId === "collection" && <ElementCollection />}
          {openTabId === "missions" && <MissionAchievementPanel />}
          {openTabId === "science" && <ScienceNotePanel />}
        </div>
      )}
    </div>
  );
}