import { useProgress } from '../hooks/useProgress';
import SystemCard from '../components/SystemCard';
import { bodySystems } from '../data/bodySystems';

export default function Blueprint() {
  const { progress, toggleSystem } = useProgress();

  const reviewedCount = bodySystems.filter(
    (s) => progress.systemsReviewed[s.id]
  ).length;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-800">The 9 Body Systems</h1>
        <p className="text-slate-500 text-sm mt-1">
          What you must demonstrate for each system — head to toe
        </p>
        <div className="flex items-center gap-2 mt-3">
          <div className="h-2 flex-1 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(reviewedCount / bodySystems.length) * 100}%`,
                backgroundColor: '#0F9E75',
              }}
            />
          </div>
          <span className="text-sm font-medium text-slate-600 shrink-0">
            {reviewedCount}/{bodySystems.length} reviewed
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {bodySystems.map((system) => (
          <SystemCard
            key={system.id}
            system={system}
            reviewed={progress.systemsReviewed[system.id] ?? false}
            onToggleReviewed={() => toggleSystem(system.id)}
          />
        ))}
      </div>

      {reviewedCount === bodySystems.length && (
        <div className="bg-[#E6F7F2] border border-[#0F9E75] rounded-2xl p-5 text-center">
          <div className="text-2xl mb-2">🎉</div>
          <p className="font-bold text-[#0D7A5D]">All 9 systems reviewed!</p>
          <p className="text-sm text-slate-600 mt-1">
            Now move to the Drill Protocol and start running timed rehearsals.
          </p>
        </div>
      )}
    </div>
  );
}
