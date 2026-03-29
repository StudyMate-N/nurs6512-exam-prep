import { useState } from 'react';
import { useProgress } from '../hooks/useProgress';
import CountdownTimer from '../components/CountdownTimer';
import { drillDays, phases } from '../data/drillPlan';
import { bodySystems } from '../data/bodySystems';
import type { DrillSession } from '../hooks/useProgress';

const START_DATE = new Date('2026-03-29T00:00:00');
const EXAM_DATE = new Date('2026-04-28T15:30:00-04:00');

const taskIcons: Record<string, string> = {
  read: '📖',
  script: '📄',
  'blueprint-cn': '🧠',
  'first-run': '👤',
  timed: '⏱',
  'weak-systems': '🎯',
  'full-run': '📈',
  'dress-rehearsal': '⭐',
  rest: '✅',
};

function getDayStatus(day: number) {
  const now = new Date();
  const dayDate = new Date(START_DATE);
  dayDate.setDate(dayDate.getDate() + day - 1);
  if (dayDate.toDateString() === now.toDateString()) return 'today';
  if (dayDate < now) return 'past';
  return 'future';
}

export default function Drills() {
  const { progress, toggleDrillDay, addDrillSession } = useProgress();
  const [sessionScores, setSessionScores] = useState<Record<string, number>>({});
  const [sessionSaved, setSessionSaved] = useState(false);

  const daysLeft = Math.max(
    0,
    Math.ceil((EXAM_DATE.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );
  const dayNumber = Math.max(
    1,
    Math.floor((Date.now() - START_DATE.getTime()) / (1000 * 60 * 60 * 24)) + 1
  );
  const completedDays = Object.values(progress.drillDaysComplete).filter(Boolean).length;
  const currentStreak = (() => {
    let streak = 0;
    for (let d = dayNumber; d >= 1; d--) {
      if (progress.drillDaysComplete[d]) streak++;
      else break;
    }
    return streak;
  })();

  const estimatedReadiness = Math.round(
    Math.min(100, (completedDays / 30) * 60 + (daysLeft < 10 ? 40 : 20))
  );

  const scoreTotal = Object.values(sessionScores).reduce((a, b) => a + b, 0);
  const maxScore = bodySystems.length * 2;
  const scorePercent = maxScore > 0 ? Math.round((scoreTotal / maxScore) * 100) : 0;

  const handleSaveSession = () => {
    if (Object.keys(sessionScores).length === 0) return;
    const session: DrillSession = {
      date: new Date().toLocaleDateString(),
      scores: sessionScores,
      total: scoreTotal,
      percentage: scorePercent,
    };
    addDrillSession(session);
    setSessionSaved(true);
    setTimeout(() => setSessionSaved(false), 3000);
  };

  const getScoreColor = (score: number) => {
    if (score === 2) return 'bg-green-100 text-green-700 border-green-200';
    if (score === 1) return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">30-Day Drill Protocol</h1>
        <p className="text-slate-500 text-sm mt-1">What to do each day between now and April 28</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Sessions Done', value: completedDays, suffix: '/30' },
          { label: 'Current Streak', value: currentStreak, suffix: ' days' },
          { label: 'Days Remaining', value: daysLeft, suffix: '' },
          { label: 'Est. Readiness', value: estimatedReadiness, suffix: '%' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-[#E2E8F0] px-4 py-3 text-center"
          >
            <div className="text-2xl font-black text-slate-800">
              {stat.value}
              <span className="text-base font-semibold text-slate-400">{stat.suffix}</span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Phase overview */}
      <div>
        <h2 className="font-bold text-slate-800 mb-3">Phase Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {phases.map((phase) => (
            <div
              key={phase.number}
              className={`rounded-xl border-2 p-4 ${phase.color}`}
            >
              <div className="font-black text-lg">{phase.name}</div>
              <div className="text-xs font-semibold mt-0.5">{phase.days}</div>
              <div className="text-xs mt-2 leading-relaxed opacity-80">{phase.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 30-day calendar */}
      <div>
        <h2 className="font-bold text-slate-800 mb-3">30-Day Calendar</h2>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
            {drillDays.map((day) => {
              const done = progress.drillDaysComplete[day.day] ?? false;
              const status = getDayStatus(day.day);
              const isToday = status === 'today';
              return (
                <button
                  key={day.day}
                  onClick={() => toggleDrillDay(day.day)}
                  title={`Day ${day.day}: ${day.label} — ${day.description}`}
                  className={`
                    relative flex flex-col items-center justify-center rounded-xl p-1.5 gap-0.5 transition-all text-center
                    ${done
                      ? 'bg-[#0F9E75] text-white'
                      : isToday
                      ? 'ring-2 ring-[#0F9E75] bg-[#E6F7F2] text-slate-700'
                      : status === 'past'
                      ? 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                      : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                    }
                  `}
                >
                  <span className="text-[10px] font-bold">{day.day}</span>
                  <span className="text-sm leading-none">{taskIcons[day.taskType]}</span>
                  {isToday && !done && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#0F9E75] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-3 mt-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-[#0F9E75] inline-block" />
              Completed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md ring-2 ring-[#0F9E75] bg-[#E6F7F2] inline-block" />
              Today
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-100 inline-block" />
              Past
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-md bg-slate-50 border border-slate-200 inline-block" />
              Future
            </span>
          </div>
        </div>
      </div>

      {/* Exam timer + grading in two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Exam timer */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <h2 className="font-bold text-slate-800 mb-4">Exam Timer</h2>
          <CountdownTimer />
        </div>

        {/* Self-grading rubric */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
          <h2 className="font-bold text-slate-800 mb-4">Log a Practice Session</h2>
          <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin">
            {bodySystems.map((system) => {
              const score = sessionScores[system.id] ?? -1;
              return (
                <div
                  key={system.id}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-sm text-slate-700 flex-1 min-w-0 truncate">
                    {system.name}
                  </span>
                  <div className="flex gap-1 shrink-0">
                    {[0, 1, 2].map((s) => (
                      <button
                        key={s}
                        onClick={() =>
                          setSessionScores((prev) => ({ ...prev, [system.id]: s }))
                        }
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                          score === s
                            ? s === 2
                              ? 'bg-green-500 text-white'
                              : s === 1
                              ? 'bg-amber-400 text-white'
                              : 'bg-red-500 text-white'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {Object.keys(sessionScores).length > 0 && (
            <div
              className={`mt-4 p-3 rounded-xl border text-center ${
                scorePercent >= 80
                  ? 'bg-green-50 border-green-200'
                  : scorePercent >= 60
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="text-2xl font-black text-slate-800">{scorePercent}%</div>
              <div className="text-xs text-slate-500">
                {scoreTotal}/{maxScore} points
                {scorePercent < 80 && ' — below passing threshold of 80%'}
              </div>
            </div>
          )}

          <button
            onClick={handleSaveSession}
            disabled={Object.keys(sessionScores).length === 0}
            className="mt-3 w-full py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-40"
            style={{ backgroundColor: '#0F9E75', color: 'white' }}
          >
            {sessionSaved ? '✓ Session Saved!' : 'Save Session'}
          </button>
        </div>
      </div>

      {/* Session history */}
      {progress.drillSessions.length > 0 && (
        <div>
          <h2 className="font-bold text-slate-800 mb-3">Recent Sessions</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {progress.drillSessions.slice(0, 5).map((session, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl border p-4 text-center ${
                  session.percentage >= 80
                    ? 'border-green-200'
                    : session.percentage >= 60
                    ? 'border-amber-200'
                    : 'border-red-200'
                }`}
              >
                <div
                  className={`text-2xl font-black ${
                    session.percentage >= 80
                      ? 'text-green-600'
                      : session.percentage >= 60
                      ? 'text-amber-600'
                      : 'text-red-600'
                  }`}
                >
                  {session.percentage}%
                </div>
                <div className="text-xs text-slate-500 mt-1">{session.date}</div>
                <div className="text-xs text-slate-400 mt-0.5">{session.total}/{bodySystems.length * 2} pts</div>
                {/* Weak systems */}
                <div className="mt-2 space-y-0.5">
                  {Object.entries(session.scores)
                    .filter(([, score]) => score < 2)
                    .slice(0, 2)
                    .map(([systemId, score]) => {
                      const system = bodySystems.find((s) => s.id === systemId);
                      return (
                        <div
                          key={systemId}
                          className={`text-[9px] px-1.5 py-0.5 rounded font-medium border ${getScoreColorClass(score)}`}
                        >
                          {system?.name ?? systemId}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getScoreColorClass(score: number) {
  if (score === 1) return 'bg-amber-100 text-amber-700 border-amber-200';
  return 'bg-red-100 text-red-700 border-red-200';
}
