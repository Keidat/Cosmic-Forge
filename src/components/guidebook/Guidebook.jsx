import { useState } from "react";
import { useGuidebook } from "../../hooks/useGuidebook.js";
import { MISSIONS } from "../../data/missions.js";
import PageFlipEffect from "./PageFlipEffect.jsx";
import styles from "./Guidebook.module.css";

const SORTED_MISSIONS = [...MISSIONS].sort((a, b) => a.order - b.order);

function getPageContent(pageNumber) {
  if (pageNumber === 0) {
    return {
      title: "코스믹 포지",
      body: "입자들을 서로 가까이 끌어다 놓아 원소를 만들어보세요. 첫 목표는 수소입니다.",
    };
  }
  const mission = SORTED_MISSIONS[pageNumber - 1];
  if (!mission) {
    return { title: "계속 진행 중", body: "새로운 페이지를 준비하고 있습니다." };
  }
  return { title: mission.title, body: mission.description };
}

export default function Guidebook() {
  const { currentPage, maxUnlockedPage, goToPreviousPage, goToCurrentPage } = useGuidebook();
  const [isMinimized, setIsMinimized] = useState(false);
  const isViewingPast = currentPage < maxUnlockedPage;
  const content = getPageContent(currentPage);

  return (
    <div className={styles.guidebook}>
      <div className={styles.spine} />
      <button
        type="button"
        className={styles.minimizeButton}
        onClick={() => setIsMinimized((prev) => !prev)}
        aria-label={isMinimized ? "가이드북 펼치기" : "가이드북 접기"}
      >
        {isMinimized ? "▸" : "▾"}
      </button>
      {!isMinimized && (
        <>
          <PageFlipEffect pageKey={currentPage}>
            <h3 className={styles.title}>{content.title}</h3>
            <p className={styles.body}>{content.body}</p>
          </PageFlipEffect>
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.navButton}
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
            >
              ◀ 이전
            </button>
            {isViewingPast && (
              <button type="button" className={styles.navButton} onClick={goToCurrentPage}>
                현재로 ▶
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}