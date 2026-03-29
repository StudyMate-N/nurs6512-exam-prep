import { useState, useEffect } from 'react';

export interface DrillSession {
  date: string;
  scores: Record<string, number>;
  total: number;
  percentage: number;
}

export interface Progress {
  orientationComplete: boolean;
  equipmentChecklist: Record<string, boolean>;
  systemsReviewed: Record<string, boolean>;
  scriptComplete: boolean;
  cranialNervesMastered: Record<number, number>; // CN number → correct streak count
  drillDaysComplete: Record<number, boolean>;
  drillSessions: DrillSession[];
  lastVisited: string;
}

const DEFAULT_PROGRESS: Progress = {
  orientationComplete: false,
  equipmentChecklist: {},
  systemsReviewed: {},
  scriptComplete: false,
  cranialNervesMastered: {},
  drillDaysComplete: {},
  drillSessions: [],
  lastVisited: new Date().toISOString(),
};

const STORAGE_KEY = 'nurs6512-progress';

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
      }
    } catch {
      // ignore parse errors
    }
    return DEFAULT_PROGRESS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (updates: Partial<Progress>) => {
    setProgress((prev) => ({ ...prev, ...updates }));
  };

  const toggleEquipment = (item: string) => {
    setProgress((prev) => ({
      ...prev,
      equipmentChecklist: {
        ...prev.equipmentChecklist,
        [item]: !prev.equipmentChecklist[item],
      },
    }));
  };

  const toggleSystem = (systemId: string) => {
    setProgress((prev) => ({
      ...prev,
      systemsReviewed: {
        ...prev.systemsReviewed,
        [systemId]: !prev.systemsReviewed[systemId],
      },
    }));
  };

  const recordCranialNerve = (cnNumber: number, correct: boolean) => {
    setProgress((prev) => {
      const current = prev.cranialNervesMastered[cnNumber] ?? 0;
      return {
        ...prev,
        cranialNervesMastered: {
          ...prev.cranialNervesMastered,
          [cnNumber]: correct ? current + 1 : 0,
        },
      };
    });
  };

  const toggleDrillDay = (day: number) => {
    setProgress((prev) => ({
      ...prev,
      drillDaysComplete: {
        ...prev.drillDaysComplete,
        [day]: !prev.drillDaysComplete[day],
      },
    }));
  };

  const addDrillSession = (session: DrillSession) => {
    setProgress((prev) => ({
      ...prev,
      drillSessions: [session, ...prev.drillSessions].slice(0, 20),
    }));
  };

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress(DEFAULT_PROGRESS);
  };

  // Computed values
  const cranialNervesMasteredCount = Object.values(progress.cranialNervesMastered).filter(
    (count) => count >= 3
  ).length;

  const drillDaysCount = Object.values(progress.drillDaysComplete).filter(Boolean).length;
  const systemsReviewedCount = Object.values(progress.systemsReviewed).filter(Boolean).length;

  const modulesCompleted = [
    progress.orientationComplete,
    systemsReviewedCount >= 9,
    progress.scriptComplete,
    cranialNervesMasteredCount >= 12,
    drillDaysCount >= 15,
  ].filter(Boolean).length;

  const overallProgress = Math.round(
    (((progress.orientationComplete ? 1 : 0) * 20 +
      (progress.scriptComplete ? 1 : 0) * 20 +
      (cranialNervesMasteredCount / 12) * 25 +
      (drillDaysCount / 30) * 20 +
      (systemsReviewedCount / 9) * 15) /
      100) *
      100
  );

  return {
    progress,
    updateProgress,
    toggleEquipment,
    toggleSystem,
    recordCranialNerve,
    toggleDrillDay,
    addDrillSession,
    resetProgress,
    cranialNervesMasteredCount,
    drillDaysCount,
    systemsReviewedCount,
    modulesCompleted,
    overallProgress,
  };
}
