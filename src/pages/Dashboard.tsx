import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import ProgressRing from '../components/ProgressRing';
import { AlertIcon } from '../components/Icons';

const EXAM_DATE = new Date('2026-04-28T15:30:00-04:00');
const START_DATE = new Date('2026-03-29T00:00:00');

const DISQUALIFIERS = [
  'No-show without communication (either attempt)',
  'Using notes, aids, or outside assistance during exam',
  'Arriving without required equipment',
  'Arriving without a volunteer patient',
  'Not understanding the purpose of the exam',
  'Scoring below 80% on second attempt',
];

const QUICK_LINKS = [
  { to: '/orientation', label: 'Orientation', emoji: 'ℹ️' },
  { to: '/blueprint', label: 'Blueprint', emoji: '📋' },
  { to: '/script', label: 'The Script', emoji: '📄' },
  { to: '/cranial-nerves', label: 'CN Nerves', emoji: '🧠' },
  { to: '/drills', label: 'Drills', emoji: '✅' },
];

function getPhase(dayNumber: number) {
  if (dayNumber <= 3) {
    return {
      phase: 'Orientation Phase',
      task: 'Read Module 1 and 2 — understand the exam format, confirm your equipment',
      color: 'bg-blue-50 border-blue-200',
      badge: 'bg-blue-100 text-blue-700',
    };
  } else if (dayNumber <= 10) {
    return {
      phase: 'Content Phase',
      task: 'Study the Script and Blueprint — read each system aloud, 15 min CN flashcards daily',
      color: 'bg-purple-50 border-purple-200',
      badge: 'bg-purple-100 text-purple-700',
    };
  } else if (dayNumber <= 25) {
    return {
      phase: 'Drill Phase',
      task: 'Run timed full rehearsals with your volunteer — self-score and target weak areas',
      color: 'bg-amber-50 border-amber-200',
      badge: 'bg-amber-100 text-amber-700',
    };
  } else {
    return {
      phase: 'Final Phase',
      task: 'Dress rehearsals only — no new content. Polish fluency and confidence.',
      color: 'bg-green-50 border-green-200',
      badge: 'bg-green-100 text-green-700',
    };
  }
}

export default function Dashboard() {
  const {
    progress,
    overallProgress,
    cranialNervesMasteredCount,
    drillDaysCount,
    modulesCompleted,
    systemsReviewedCount,
  } = useProgress();

  const now = new Date();
  const daysLeft = Math.max(0, Math.ceil((EXAM_DATE.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const dayNumber = Math.max(1, Math.floor((now.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24)) + 1);
  const phase = getPhase(dayNumber);

  const stats = [
    { label: 'Modules Completed', value: modulesCompleted, total: 5, color: '#0F9E75' },
    { label: 'CN Mastered', value: cranialNervesMasteredCount, total: 12, color: '#8B5CF6' },
    { label: 'Drill Days Done', value: drillDaysCount, total: 30, color: '#F59E0B' },
    { label: 'Systems Reviewed', value: systemsReviewedCount, total: 9, color: '#3B82F6' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Welcome, Leanne</h1>
        <p className="text-slate-500 mt-0.5">NURS 6512 Skills Check-Off Prep</p>
      </div>

      {/* Top row: countdown + today's task */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Countdown */}
        <div className="bg-[#0F172A] rounded-2xl p-6 flex flex-col items-center text-center gap-2">
          <div
            className="text-7xl font-black tabular-nums"
            style={{ color: '#0F9E75', lineHeight: 1 }}
          >
            {daysLeft}
          </div>
          <div className="text-slate-300 text-base font-medium">days until your exam</div>
          <div className="text-slate-400 text-sm">April 28, 2026 · 3:30 PM ET</div>
          <div className="text-slate-500 text-xs">with Aimee Kirkendol</div>
        </div>

        {/* Today's task */}
        <div className={`rounded-2xl border p-6 ${phase.color}`}>
          <div className="flex items-start gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${phase.badge}`}>
                  Day {dayNumber} of 30
                </span>
              </div>
              <h2 className="font-bold text-slate-800 text-base mb-2">{phase.phase}</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{phase.task}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress overview */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-bold text-slate-800">Progress Overview</h2>
          <div className="flex items-center gap-2">
            <ProgressRing percentage={overallProgress} size={56} strokeWidth={6} />
            <span className="text-xs text-slate-500 leading-tight">Overall<br />Progress</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-xl">
              <ProgressRing
                percentage={Math.round((stat.value / stat.total) * 100)}
                size={64}
                strokeWidth={7}
                color={stat.color}
              />
              <div className="text-center">
                <div className="font-semibold text-slate-800 text-sm">
                  {stat.value}/{stat.total}
                </div>
                <div className="text-xs text-slate-500 leading-tight mt-0.5">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Orientation complete banner */}
      {!progress.orientationComplete && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertIcon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800 text-sm">Start with Orientation</p>
            <p className="text-amber-700 text-sm mt-0.5">
              You haven't completed the orientation module yet. That's your first step.{' '}
              <Link to="/orientation" className="underline font-medium">
                Go to Orientation →
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* Quick access */}
      <div>
        <h2 className="font-bold text-slate-800 mb-3">Quick Access</h2>
        <div className="grid grid-cols-5 gap-2">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex flex-col items-center gap-2 bg-white rounded-xl border border-[#E2E8F0] p-3 hover:border-[#0F9E75] hover:shadow-sm transition-all text-center group"
            >
              <span className="text-2xl">{link.emoji}</span>
              <span className="text-xs font-medium text-slate-600 group-hover:text-[#0D7A5D] leading-tight">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Exam rules reminder */}
      <div className="bg-white rounded-2xl border border-red-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertIcon className="w-5 h-5 text-red-500" />
          <h2 className="font-bold text-red-700">Automatic Disqualifiers</h2>
        </div>
        <ul className="space-y-2">
          {DISQUALIFIERS.map((d) => (
            <li key={d} className="flex items-start gap-2 text-sm">
              <span className="text-red-400 mt-0.5 shrink-0">✕</span>
              <span className="text-slate-700">{d}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-slate-400 mt-4 border-t border-slate-100 pt-3">
          48-hour cancellation notice required. Medical cancellations need documentation.
        </p>
      </div>
    </div>
  );
}
