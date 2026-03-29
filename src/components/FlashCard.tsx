import { useState } from 'react';
import type { CranialNerve } from '../data/cranialNerves';
import { CheckIcon, XIcon } from './Icons';

interface FlashCardProps {
  nerve: CranialNerve;
  cardIndex: number;
  total: number;
  mastered: boolean;
  onCorrect: () => void;
  onMissed: () => void;
}

export default function FlashCard({
  nerve,
  cardIndex,
  total,
  mastered,
  onCorrect,
  onMissed,
}: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {/* Card counter */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">
          {cardIndex + 1} of {total}
        </span>
        {mastered && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#0D7A5D] bg-[#E6F7F2] px-2 py-0.5 rounded-full">
            <CheckIcon className="w-3 h-3" />
            Mastered
          </span>
        )}
      </div>

      {/* Card face */}
      <div
        className={`rounded-2xl cursor-pointer select-none transition-all duration-300 min-h-[220px] flex flex-col ${
          flipped
            ? 'bg-white border-2 border-[#0F9E75]'
            : 'bg-[#0F172A] border-2 border-[#0F172A]'
        }`}
        onClick={() => setFlipped((f) => !f)}
      >
        {!flipped ? (
          /* Front */
          <div className="flex-1 flex flex-col items-center justify-center p-8 gap-3">
            <div className="text-5xl font-black text-white tracking-tight">
              CN {nerve.number}
            </div>
            <div className="text-slate-400 text-sm font-medium">
              {nerve.type} nerve
            </div>
            <div className="mt-4 text-slate-500 text-xs">
              Tap to reveal
            </div>
          </div>
        ) : (
          /* Back */
          <div className="flex-1 flex flex-col p-6 gap-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-2xl font-bold text-slate-800">
                  CN {nerve.number} — {nerve.name}
                </div>
                <span
                  className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${
                    nerve.type === 'Sensory'
                      ? 'bg-blue-100 text-blue-700'
                      : nerve.type === 'Motor'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {nerve.type}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-slate-500 text-xs uppercase tracking-wider">
                  Function
                </span>
                <p className="text-slate-700 mt-0.5 leading-relaxed">{nerve.function}</p>
              </div>
              <div className="border-l-4 border-l-[#0F9E75] bg-[#E6F7F2] rounded-r-lg px-3 py-2">
                <span className="font-semibold text-[#0D7A5D] text-xs uppercase tracking-wider">
                  How to Test
                </span>
                <p className="text-slate-700 mt-0.5 leading-relaxed">{nerve.testMethod}</p>
              </div>
              <div className="border-l-4 border-l-red-400 bg-red-50 rounded-r-lg px-3 py-2">
                <span className="font-semibold text-red-600 text-xs uppercase tracking-wider">
                  Abnormal Finding
                </span>
                <p className="text-slate-700 mt-0.5 leading-relaxed">{nerve.abnormalFinding}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Score buttons — only show when flipped */}
      {flipped && (
        <div className="flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCorrect();
              setFlipped(false);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
          >
            <CheckIcon className="w-5 h-5" />
            Got it
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMissed();
              setFlipped(false);
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-colors"
          >
            <XIcon className="w-5 h-5" />
            Missed it
          </button>
        </div>
      )}
    </div>
  );
}
