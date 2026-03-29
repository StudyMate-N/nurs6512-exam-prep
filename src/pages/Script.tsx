import { useState } from 'react';
import { useProgress } from '../hooks/useProgress';
import ScriptBlock from '../components/ScriptBlock';
import { examScript } from '../data/examScript';
import { ChevronDownIcon, ChevronRightIcon, PrintIcon, CheckIcon } from '../components/Icons';

interface SectionProps {
  section: (typeof examScript)[number];
  defaultOpen?: boolean;
}

function ScriptSection({ section, defaultOpen = false }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden print-section">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors gap-3"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xs font-bold text-slate-400 shrink-0">
            {String(section.number).padStart(2, '0')}
          </span>
          <h3 className="font-bold text-slate-800">{section.title}</h3>
          <span className="text-xs text-slate-400 hidden sm:inline">
            {section.blocks.length} blocks
          </span>
        </div>
        {open ? (
          <ChevronDownIcon className="w-5 h-5 text-slate-400 shrink-0" />
        ) : (
          <ChevronRightIcon className="w-5 h-5 text-slate-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-3">
          {section.blocks.map((block, i) => (
            <ScriptBlock key={i} block={block} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Script() {
  const { progress, updateProgress } = useProgress();
  const [allOpen, setAllOpen] = useState(false);

  const handlePrint = () => window.print();

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Your Verbatim Exam Script</h1>
          <p className="text-slate-500 text-sm mt-1">
            Every word. Every step. In order. Practice until automatic.
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="no-print flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors shrink-0"
        >
          <PrintIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Print</span>
        </button>
      </div>

      {/* Legend */}
      <div className="no-print flex flex-wrap gap-3">
        {[
          { color: 'bg-[#E6F7F2] border-l-[#0F9E75]', label: 'SAY — exact words to speak' },
          { color: 'bg-amber-50 border-l-amber-400', label: 'DO — physical action' },
          { color: 'bg-purple-50 border-l-purple-400', label: 'CHECK — observe / assess' },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-l-4 ${item.color}`}
          >
            <span className="text-xs font-medium text-slate-600">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Expand/collapse all */}
      <div className="no-print flex items-center justify-between">
        <button
          onClick={() => setAllOpen((o) => !o)}
          className="text-sm text-[#0D7A5D] font-medium hover:underline"
        >
          {allOpen ? 'Collapse all sections' : 'Expand all sections'}
        </button>
        <span className="text-sm text-slate-400">{examScript.length} sections</span>
      </div>

      {/* Script sections */}
      {allOpen ? (
        <div className="space-y-3">
          {examScript.map((section) => (
            <div key={section.id} className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden print-section">
              <div className="px-5 py-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400">
                    {String(section.number).padStart(2, '0')}
                  </span>
                  <h3 className="font-bold text-slate-800">{section.title}</h3>
                </div>
              </div>
              <div className="px-5 py-4 space-y-3">
                {section.blocks.map((block, i) => (
                  <ScriptBlock key={i} block={block} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {examScript.map((section, i) => (
            <ScriptSection key={section.id} section={section} defaultOpen={i === 0} />
          ))}
        </div>
      )}

      {/* Mark complete */}
      <div className="no-print pt-2">
        <button
          onClick={() => updateProgress({ scriptComplete: true })}
          disabled={progress.scriptComplete}
          className={`w-full py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
            progress.scriptComplete
              ? 'bg-[#E6F7F2] text-[#0D7A5D] border border-[#0F9E75] cursor-default'
              : 'text-white hover:opacity-90'
          }`}
          style={!progress.scriptComplete ? { backgroundColor: '#0F9E75' } : {}}
        >
          {progress.scriptComplete && <CheckIcon className="w-5 h-5" />}
          {progress.scriptComplete ? 'Script Marked Complete' : 'Mark Script Complete'}
        </button>
      </div>
    </div>
  );
}
