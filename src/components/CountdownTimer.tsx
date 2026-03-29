import { useState, useEffect, useRef } from 'react';

const THIRTY_MINUTES = 30 * 60;

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(THIRTY_MINUTES);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setIsRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (timeLeft / THIRTY_MINUTES) * 100;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (progress / 100) * circumference;

  const colorClass =
    timeLeft <= 5 * 60
      ? '#EF4444'
      : timeLeft <= 10 * 60
      ? '#F59E0B'
      : '#0F9E75';

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(THIRTY_MINUTES);
  };

  const done = timeLeft === 0;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <svg width={128} height={128} className="-rotate-90">
          <circle cx={64} cy={64} r={54} fill="none" stroke="#E2E8F0" strokeWidth={10} />
          <circle
            cx={64}
            cy={64}
            r={54}
            fill="none"
            stroke={colorClass}
            strokeWidth={10}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.8s linear, stroke 0.3s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {done ? (
            <span className="text-2xl font-bold text-red-500">Done!</span>
          ) : (
            <>
              <span
                className="text-2xl font-bold tabular-nums"
                style={{ color: colorClass }}
              >
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <span className="text-xs text-slate-400 mt-0.5">
                {timeLeft <= 5 * 60 ? 'Wrap up!' : timeLeft <= 10 * 60 ? '10 min left' : ''}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsRunning((r) => !r)}
          disabled={done}
          className="px-4 py-2 rounded-lg font-medium text-sm transition-colors disabled:opacity-40"
          style={{ backgroundColor: '#0F9E75', color: 'white' }}
        >
          {isRunning ? 'Pause' : done ? 'Done' : 'Start'}
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg font-medium text-sm bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
        >
          Reset
        </button>
      </div>
      <p className="text-xs text-slate-400 text-center">
        Target: complete exam in under 30 minutes
      </p>
    </div>
  );
}
