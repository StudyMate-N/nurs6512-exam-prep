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
        reviewed ? 'border-[#0F9E75]' : 'border-[#E2E8F0]'
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-3 hover:bg-slate-50 rounded-xl transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-bold ${
              reviewed ? 'bg-[#0F9E75] text-white' : 'bg-slate-100 text-slate-500'
            }`}
          >
            {reviewed ? <CheckIcon className="w-4 h-4" /> : system.name.charAt(0)}
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

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleReviewed();
            }}
            className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
              reviewed
                ? 'bg-[#E6F7F2] text-[#0D7A5D] border border-[#0F9E75]'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {reviewed ? '✓ Marked as Reviewed' : 'Mark as Reviewed'}
          </button>
        </div>
      )}
    </div>
  );
}
