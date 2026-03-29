import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import { useProgress } from '../hooks/useProgress';
import { bodySystems } from '../data/bodySystems';
import { cranialNerves } from '../data/cranialNerves';

const START_DATE = new Date('2026-03-29T00:00:00');

export default function Analytics() {
  const { progress } = useProgress();
  const { drillSessions, cranialNervesMastered } = progress;

  // Session trend data
  const trendData = [...drillSessions]
    .reverse()
    .map((s, i) => ({ name: `Session ${i + 1}`, score: s.percentage }));

  // System radar data — average score per system
  const radarData = bodySystems
    .filter((s) => s.id !== 'general-survey')
    .map((system) => {
      const scores = drillSessions.map((session) => session.scores[system.id] ?? 0);
      const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
      return {
        subject: system.abbreviation,
        fullName: system.name,
        value: Math.round((avg / 2) * 100),
      };
    });

  // CN mastery bar data
  const cnBarData = cranialNerves.map((cn) => {
    const count = cranialNervesMastered[cn.number] ?? 0;
    const level = count >= 3 ? 2 : count >= 1 ? 1 : 0;
    return { name: `CN ${cn.number}`, label: cn.name.slice(0, 6), level };
  });

  // Stats
  const totalSessions = drillSessions.length;
  const avgScore =
    totalSessions > 0
      ? Math.round(drillSessions.reduce((a, s) => a + s.percentage, 0) / totalSessions)
      : 0;
  const bestScore =
    totalSessions > 0 ? Math.max(...drillSessions.map((s) => s.percentage)) : 0;
  const streak = (() => {
    const today = new Date();
    const dayNumber = Math.max(
      1,
      Math.floor((today.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24)) + 1
    );
    let s = 0;
    for (let d = dayNumber; d >= 1; d--) {
      if (progress.drillDaysComplete[d]) s++;
      else break;
    }
    return s;
  })();

  // Weak systems
  const systemAvgs = bodySystems
    .filter((s) => s.id !== 'general-survey')
    .map((system) => {
      const scores = drillSessions.map((session) => session.scores[system.id] ?? 0);
      const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
      return { system, avg };
    })
    .sort((a, b) => a.avg - b.avg);
  const weakSystems = systemAvgs.slice(0, 3).filter((s) => s.avg < 1.6);

  const cnColor = (level: number) => {
    if (level === 2) return '#22C55E';
    if (level === 1) return '#F59E0B';
    return '#CBD5E1';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Your Progress Analytics</h1>
        <p className="text-slate-500 text-sm mt-1">See your strengths and where to focus</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Sessions', value: totalSessions, suffix: '' },
          { label: 'Average Score', value: avgScore, suffix: '%' },
          { label: 'Best Score', value: bestScore, suffix: '%' },
          { label: 'Current Streak', value: streak, suffix: ' days' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-[#E2E8F0] px-4 py-4 text-center"
          >
            <div className="text-2xl font-black text-slate-800">
              {stat.value}
              <span className="text-base font-semibold text-slate-400">{stat.suffix}</span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Score trend */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
        <h2 className="font-bold text-slate-800 mb-4">Drill Score Trend</h2>
        {trendData.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
            <div className="text-3xl mb-2">📊</div>
            <p className="text-sm">Complete your first practice session to see your progress here.</p>
            <Link
              to="/drills"
              className="mt-3 text-sm text-[#0D7A5D] font-medium hover:underline"
            >
              Go to Drill Protocol →
            </Link>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94A3B8' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#94A3B8' }} unit="%" />
              <Tooltip
                formatter={(val) => [`${val}%`, 'Score']}
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E2E8F0' }}
              />
              <ReferenceLine y={80} stroke="#EF4444" strokeDasharray="4 4" label={{ value: '80% pass', position: 'insideTopRight', fontSize: 10, fill: '#EF4444' }} />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#0F9E75"
                strokeWidth={2.5}
                dot={{ fill: '#0F9E75', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Radar + CN bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* System radar */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <h2 className="font-bold text-slate-800 mb-2">System Performance</h2>
          <p className="text-xs text-slate-400 mb-4">Average score per body system across all sessions</p>
          {drillSessions.length === 0 ? (
            <div className="flex items-center justify-center py-10 text-slate-300 text-sm">
              No session data yet
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748B' }} />
                <Radar
                  dataKey="value"
                  stroke="#0F9E75"
                  fill="#0F9E75"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Tooltip
                  formatter={(val) => [`${val}%`, 'Score']}
                  contentStyle={{ fontSize: 12, borderRadius: 8 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* CN mastery */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <h2 className="font-bold text-slate-800 mb-2">Cranial Nerve Mastery</h2>
          <p className="text-xs text-slate-400 mb-4">Gray = not started · Amber = in progress · Green = mastered (3+)</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={cnBarData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94A3B8' }} />
              <YAxis domain={[0, 2]} ticks={[0, 1, 2]} tick={{ fontSize: 10, fill: '#94A3B8' }} />
              <Tooltip
                formatter={(val) => {
                  const labels = ['Not started', 'In progress', 'Mastered'];
                  const idx = typeof val === 'number' ? val : 0;
                  return [labels[idx] ?? String(val), 'Level'];
                }}
                contentStyle={{ fontSize: 12, borderRadius: 8 }}
              />
              <Bar dataKey="level" radius={[4, 4, 0, 0]}>
                {cnBarData.map((entry, index) => (
                  <Cell key={index} fill={cnColor(entry.level)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weakness spotlight */}
      {weakSystems.length > 0 && drillSessions.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
          <h2 className="font-bold text-slate-800 mb-3">Weakness Spotlight</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {weakSystems.map(({ system }) => (
              <span
                key={system.id}
                className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-700 border border-red-200"
              >
                {system.name}
              </span>
            ))}
          </div>
          <p className="text-sm text-slate-500">
            These systems have the lowest average scores across your practice sessions.
          </p>
          <Link
            to="/drills"
            className="inline-block mt-3 text-sm text-[#0D7A5D] font-medium hover:underline"
          >
            Go to Drill Protocol to log a session →
          </Link>
        </div>
      )}
    </div>
  );
}
