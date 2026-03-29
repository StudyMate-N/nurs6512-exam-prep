import { useState } from 'react';
import type { BodySystem } from '../data/bodySystems';
import { ChevronDownIcon, ChevronRightIcon, AlertIcon, CheckIcon } from './Icons';

interface SystemCardProps {
  system: BodySystem;
  reviewed: boolean;
  onToggleReviewed: () => void;
}

export default function SystemCard({ system, reviewed, onToggleReviewed }: SystemCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-200 ${
        reviewed
          ? 'border-l-4 border-l-green-500 border-[#E2E8F0]'
          : 'border-[#E2E8F0]'
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-3 hover:bg-slate-50 rounded-xl transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold relative ${
              reviewed ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {reviewed ? <CheckIcon className="w-4 h-4" /> : system.abbreviation}
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 text-sm leading-tight">{system.name}</h3>
            <span className="text-xs text-slate-400">{system.points}</span>
          </div>
        </div>
        <div className="shrink-0 text-slate-400">
          {open ? <ChevronDownIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />}
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-4 border-t border-slate-100 pt-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Assess
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">{system.inspect}</p>
          </div>

          <div className="border-l-4 border-l-[#0F9E75] bg-[#E6F7F2] rounded-r-lg px-4 py-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D7A5D] mb-1">
              Verbalize
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed italic">{system.verbalize}</p>
          </div>

          {system.specialNote && (
            <div className="flex gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <AlertIcon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 leading-relaxed font-medium">{system.specialNote}</p>
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleReviewed();
              }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                reviewed
                  ? 'bg-green-50 text-green-700 border border-green-300'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {reviewed ? 'Reviewed ✓' : 'Mark as Reviewed'}
            </button>
            {reviewed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleReviewed();
                }}
                className="text-xs text-slate-400 hover:text-slate-600 underline"
              >
                Unmark
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
