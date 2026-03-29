import { useState, useCallback } from 'react';
import { useProgress } from '../hooks/useProgress';
import FlashCard from '../components/FlashCard';
import { cranialNerves } from '../data/cranialNerves';
import { ShuffleIcon, PrintIcon, CheckIcon } from '../components/Icons';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function CranialNerves() {
  const { progress, recordCranialNerve } = useProgress();
  const [order, setOrder] = useState(() => cranialNerves.map((_, i) => i));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [sessionScores, setSessionScores] = useState<Record<number, 'correct' | 'missed'>>({});

  const currentNerve = cranialNerves[order[currentIdx]];

  const handleCorrect = useCallback(() => {
    recordCranialNerve(currentNerve.number, true);
    setSessionScores((s) => ({ ...s, [currentNerve.number]: 'correct' }));
    if (currentIdx < order.length - 1) setCurrentIdx((i) => i + 1);
  }, [currentNerve, currentIdx, order.length, recordCranialNerve]);

  const handleMissed = useCallback(() => {
    recordCranialNerve(currentNerve.number, false);
    setSessionScores((s) => ({ ...s, [currentNerve.number]: 'missed' }));
    if (currentIdx < order.length - 1) setCurrentIdx((i) => i + 1);
  }, [currentNerve, currentIdx, order.length, recordCranialNerve]);

  const handleShuffle = () => {
    setOrder(shuffle(cranialNerves.map((_, i) => i)));
    setCurrentIdx(0);
    setSessionScores({});
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx((i) => i - 1);
  };
  const handleNext = () => {
    if (currentIdx < order.length - 1) setCurrentIdx((i) => i + 1);
  };

  const sessionCorrect = Object.values(sessionScores).filter((v) => v === 'correct').length;
  const sessionTotal = Object.keys(sessionScores).length;
  const masteredCount = Object.values(progress.cranialNervesMastered).filter((c) => c >= 3).length;

  const isMastered = (progress.cranialNervesMastered[currentNerve.number] ?? 0) >= 3;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Cranial Nerves</h1>
        <p className="text-slate-500 text-sm mt-1">
          All 12. Name and number. Both required during the exam.
        </p>
      </div>

      {/* Flashcard section */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 space-y-4">
        {/* Header stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-slate-800">
                {sessionTotal > 0 ? `${sessionCorrect}/${sessionTotal}` : '—'}
              </div>
              <div className="text-xs text-slate-400">This session</div>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center">
              <div className="text-lg font-bold text-[#0F9E75]">
                {masteredCount}/12
              </div>
              <div className="text-xs text-slate-400">Mastered</div>
            </div>
          </div>
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition-colors"
          >
            <ShuffleIcon className="w-4 h-4" />
            Shuffle
          </button>
        </div>

        {/* Flash card */}
        <FlashCard
          nerve={currentNerve}
          cardIndex={currentIdx}
          total={order.length}
          mastered={isMastered}
          onCorrect={handleCorrect}
          onMissed={handleMissed}
        />

        {/* Navigation */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          {/* Dot indicators */}
          <div className="flex gap-1">
            {order.slice(0, 12).map((_, i) => {
              const cn = cranialNerves[order[i]];
              const score = sessionScores[cn.number];
              return (
                <button
                  key={i}
                  onClick={() => setCurrentIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIdx
                      ? 'bg-[#0F9E75] w-4'
                      : score === 'correct'
                      ? 'bg-green-400'
                      : score === 'missed'
                      ? 'bg-red-400'
                      : 'bg-slate-200'
                  }`}
                />
              );
            })}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIdx === order.length - 1}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Reference table */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-800">Full Reference Table</h2>
          <button
            onClick={() => window.print()}
            className="no-print flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-medium transition-colors"
          >
            <PrintIcon className="w-4 h-4" />
            Print
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider whitespace-nowrap">
                    #
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider whitespace-nowrap">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider whitespace-nowrap">
                    Type
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">
                    Function
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">
                    Test Method
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider">
                    Abnormal Finding
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider whitespace-nowrap">
                    Mastered
                  </th>
                </tr>
              </thead>
              <tbody>
                {cranialNerves.map((cn, i) => {
                  const mastered = (progress.cranialNervesMastered[cn.number] ?? 0) >= 3;
                  return (
                    <tr
                      key={cn.number}
                      className={`border-b border-slate-100 last:border-0 ${
                        i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                      }`}
                    >
                      <td className="px-4 py-3 font-bold text-slate-700 whitespace-nowrap">
                        CN {cn.number}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">
                        {cn.name}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                            cn.type === 'Sensory'
                              ? 'bg-blue-100 text-blue-700'
                              : cn.type === 'Motor'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {cn.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600 leading-relaxed">
                        {cn.function}
                      </td>
                      <td className="px-4 py-3 text-slate-600 leading-relaxed">
                        {cn.testMethod}
                      </td>
                      <td className="px-4 py-3 text-slate-600 leading-relaxed">
                        {cn.abnormalFinding}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {mastered ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0F9E75]">
                            <CheckIcon className="w-3.5 h-3.5 text-white" />
                          </span>
                        ) : (
                          <span className="text-slate-300 text-sm">
                            {progress.cranialNervesMastered[cn.number] ?? 0}/3
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Mastered = answered correctly 3 sessions in a row. Progress saved automatically.
        </p>
      </div>
    </div>
  );
}
