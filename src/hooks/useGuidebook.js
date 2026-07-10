import { useEffect, useMemo } from "react";
import { useGame } from "../context/GameContext.jsx";
import { MISSIONS } from "../data/missions.js";
import { evaluateCondition } from "../utils/conditionEvaluator.js";

const SORTED_MISSIONS = [...MISSIONS].sort((a, b) => a.order - b.order);

export function useGuidebook() {
    const { gameProgress, setGameProgress } = useGame();

    const maxUnlockedPage = useMemo(() => {
        let count = 0;
        for (const mission of SORTED_MISSIONS) {
            if (evaluateCondition(mission.condition, gameProgress)) {
                count += 1;
            } else {
                break;
            }
        }
        return Math.min(count + 1, SORTED_MISSIONS.length + 1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameProgress.elements, gameProgress.stars, gameProgress.milestones]);

    useEffect(() => {
        setGameProgress((prev) => {
            if (prev.guidebook.maxUnlockedPage === maxUnlockedPage) {
                return prev;
            }
            const wasAtFrontier = prev.guidebook.currentPage === prev.guidebook.maxUnlockedPage;
            return {
                ...prev,
                guidebook: {
                    maxUnlockedPage,
                    currentPage: wasAtFrontier ? maxUnlockedPage : prev.guidebook.currentPage,
                },
            };
        });
    }, [maxUnlockedPage, setGameProgress]);

    function goToPreviousPage() {
        setGameProgress((prev) => ({
            ...prev,
            guidebook: {
                ...prev.guidebook,
                currentPage: Math.max(0, prev.guidebook.currentPage - 1),
            },
        }));
    }

    function goToCurrentPage() {
        setGameProgress((prev) => ({
            ...prev,
            guidebook: {
                ...prev.guidebook,
                currentPage: prev.guidebook.maxUnlockedPage,
            },
        }));
    }

    return {
        currentPage: gameProgress.guidebook.currentPage,
        maxUnlockedPage: gameProgress.guidebook.maxUnlockedPage,
        goToPreviousPage,
        goToCurrentPage,
    };
}