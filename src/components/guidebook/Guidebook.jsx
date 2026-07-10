import { useState } from "react";
import { useGuidebook } from "../../hooks/useGuidebook.js";
import { MISSIONS } from "../../data/missions.js";
import PageFlipEffect from "./PageFlipEffect.jsx";
import styles from "./Guidebook.module.css";

const SORTED_MISSIONS = [...MISSIONS].sort((a, b) => a.order - b.order);

// "첫 별 탄생" 단계에서만 노출되는 대비책 안내 (수소 12개가 필요한데, 처음 나온 입자를 이미 다 썼을 경우)
const PARTICLE_SHORTAGE_TIP =
  "입자가 부족하다면 왼쪽 사이드바 📖 도감에서 기본 입자를 다시 소환할 수 있습니다.";

const STAR_GENERATOR_UNLOCKED_TIP =
  "도감에 별 생성기가 잠금 해제되었습니다 — 이제 수소 12개를 매번 모으지 않고 도감에서 바로 소환할 수 있습니다.";

const PAGE_TIPS = {
  4: [PARTICLE_SHORTAGE_TIP],
  6: [STAR_GENERATOR_UNLOCKED_TIP],
};

function getPageContent(pageNumber) {
  if (pageNumber === 0) {
    return {
      title: "코스믹 포지",
      body: "화면에 떠다니는 작은 점들이 입자입니다. 마우스로 하나를 잡아서 다른 입자 위로 끌어다 놓아보세요. 조건에 맞으면 새로운 원소가 만들어집니다.",
    };
  }
  const mission = SORTED_MISSIONS[pageNumber - 1];
  if (!mission) {
    return {
      title: "여기까지가 현재 버전입니다",
      body: "철의 탄생까지 확인하셨습니다. 더 많은 원소와 별의 다음 단계는 업데이트 예정입니다.",
    };
  }
  return { title: mission.title, body: mission.description };
}

export default function Guidebook() {
  const { currentPage, maxUnlockedPage, goToPreviousPage, goToCurrentPage } = useGuidebook();
  const [isMinimized, setIsMinimized] = useState(false);
  const isViewingPast = currentPage < maxUnlockedPage;
  const content = getPageContent(currentPage);
  const tips = PAGE_TIPS[currentPage] || [];

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
            {tips.map((tip) => (
              <div key={tip} className={styles.tipBox}>
                <span className={styles.tipIcon}>💡</span>
                <p className={styles.tipText}>{tip}</p>
              </div>
            ))}
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