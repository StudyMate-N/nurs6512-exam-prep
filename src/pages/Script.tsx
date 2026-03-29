import { useState, useRef, useCallback } from 'react';
import { useProgress } from '../hooks/useProgress';
import ScriptBlock from '../components/ScriptBlock';
import { examScript } from '../data/examScript';
import { ChevronDownIcon, ChevronRightIcon, PrintIcon, CheckIcon, MicIcon } from '../components/Icons';
import { speakSequence, stopSpeaking } from '../utils/tts';

const SPEEDS = [0.75, 1, 1.25] as const;
type Speed = typeof SPEEDS[number];

// Speech recognition type shim
interface SpeechRecognitionEvent {
  resultIndex: number;
  results: { [index: number]: { [index: number]: { transcript: string } } };
}

function getCoverage(
  transcript: string,
  keyPhrases: string[]
): { covered: string[]; missed: string[] } {
  const lower = transcript.toLowerCase();
  const covered: string[] = [];
  const missed: string[] = [];
  for (const phrase of keyPhrases) {
    if (lower.includes(phrase.toLowerCase())) {
      covered.push(phrase);
    } else {
      missed.push(phrase);
    }
  }
  return { covered, missed };
}

function getEncouragement(pct: number): string {
  if (pct >= 80) return 'Excellent — this section is sounding strong!';
  if (pct >= 50) return 'Good progress — review the missed items and try once more.';
  return 'Keep practicing — listen to this section and try again.';
}

interface PracticeState {
  active: boolean;
  transcript: string;
  results: { covered: string[]; missed: string[]; percentage: number } | null;
}

interface SectionCardProps {
  section: (typeof examScript)[number];
  speechRate: Speed;
  defaultOpen?: boolean;
}

function SectionCard({ section, speechRate, defaultOpen = false }: SectionCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [reading, setReading] = useState(false);
  const [practice, setPractice] = useState<PracticeState>({
    active: false,
    transcript: '',
    results: null,
  });
  const recognitionRef = useRef<any>(null);

  const sayTexts = section.blocks.filter((b) => b.type === 'say').map((b) => b.content);

  const handleReadSection = () => {
    if (reading) {
      stopSpeaking();
      setReading(false);
      return;
    }
    if (sayTexts.length === 0) return;
    setReading(true);
    speakSequence(sayTexts, speechRate, 500);
    // Estimate total duration to reset state
    const totalChars = sayTexts.reduce((a, t) => a + t.length, 0);
    const estimatedMs = (totalChars / 15 / speechRate) * 1000 + sayTexts.length * 600;
    setTimeout(() => setReading(false), estimatedMs);
  };

  const handleStartPractice = useCallback(() => {
    const SR =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert('Speech recognition is not supported in this browser. Try Chrome on desktop.');
      return;
    }
    stopSpeaking();
    setReading(false);
    setPractice({ active: true, transcript: '', results: null });

    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let t = '';
      for (let i = event.resultIndex; i < (event.results as any).length; i++) {
        t += (event.results as any)[i][0].transcript;
      }
      setPractice((prev) => ({ ...prev, transcript: prev.transcript + ' ' + t }));
    };

    recognition.onerror = () => {
      recognitionRef.current = null;
    };

    recognition.onend = () => {
      recognitionRef.current = null;
    };

    recognition.start();
    recognitionRef.current = recognition;
  }, []);

  const handleStopPractice = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setPractice((prev) => {
      const phrases = section.keyPhrases ?? [];
      if (phrases.length === 0) {
        return { ...prev, active: false, results: null };
      }
      const { covered, missed } = getCoverage(prev.transcript, phrases);
      const percentage = Math.round((covered.length / phrases.length) * 100);
      return {
        ...prev,
        active: false,
        results: { covered, missed, percentage },
      };
    });
  }, [section.keyPhrases]);

  const hasTTS = 'speechSynthesis' in window;
  const hasSR =
    typeof window !== 'undefined' &&
    ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

  return (
    <div
      className={`bg-white rounded-xl border overflow-hidden print-section transition-colors ${
        practice.active ? 'border-amber-400' : 'border-[#E2E8F0]'
      }`}
    >
      {/* Section header */}
      <div
        className={`flex items-center justify-between px-5 py-4 gap-3 ${
          practice.active ? 'bg-amber-50' : 'hover:bg-slate-50'
        }`}
      >
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-3 min-w-0 flex-1 text-left"
        >
          <span className="text-xs font-bold text-slate-400 shrink-0">
            {String(section.number).padStart(2, '0')}
          </span>
          <h3 className="font-bold text-slate-800">{section.title}</h3>
          <span className="text-xs text-slate-400 hidden sm:inline">
            {section.blocks.length} blocks
          </span>
          {open ? (
            <ChevronDownIcon className="w-4 h-4 text-slate-400 ml-auto shrink-0" />
          ) : (
            <ChevronRightIcon className="w-4 h-4 text-slate-400 ml-auto shrink-0" />
          )}
        </button>

        {/* Action buttons */}
        <div className="no-print flex items-center gap-2 shrink-0">
          {hasTTS && sayTexts.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleReadSection();
              }}
              className={`text-xs px-2 py-1 rounded-lg font-medium transition-colors ${
                reading
                  ? 'bg-[#0F9E75] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {reading ? 'Stop' : '▶ Read'}
            </button>
          )}
          {hasSR && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (practice.active) {
                  handleStopPractice();
                } else {
                  setOpen(true);
                  handleStartPractice();
                }
              }}
              className={`text-xs px-2 py-1 rounded-lg font-medium transition-colors flex items-center gap-1 ${
                practice.active
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <MicIcon className="w-3.5 h-3.5" />
              {practice.active ? 'Stop' : 'Practice'}
            </button>
          )}
        </div>
      </div>

      {/* Practice mode UI */}
      {practice.active && (
        <div className="px-5 pb-4 bg-amber-50 border-t border-amber-200">
          <div className="flex items-center gap-2 py-3">
            <MicIcon className="w-5 h-5 text-amber-600 animate-pulse" />
            <span className="text-sm font-semibold text-amber-800">
              Listening… speak this section from memory
            </span>
          </div>
          {practice.transcript.trim() && (
            <div className="bg-white rounded-lg border border-amber-200 px-4 py-3 text-sm text-slate-700 leading-relaxed max-h-32 overflow-y-auto">
              {practice.transcript.trim()}
            </div>
          )}
          <p className="text-xs text-amber-600 mt-2">Press Stop when you're done speaking.</p>
        </div>
      )}

      {/* Practice results */}
      {practice.results && !practice.active && (
        <div className="px-5 pb-4 border-t border-slate-100 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-slate-800 text-sm">Practice Results</h4>
            <span
              className={`text-lg font-black ${
                practice.results.percentage >= 80
                  ? 'text-green-600'
                  : practice.results.percentage >= 50
                  ? 'text-amber-600'
                  : 'text-red-600'
              }`}
            >
              {practice.results.percentage}%
            </span>
          </div>
          <p className="text-sm text-slate-600">
            You covered {practice.results.covered.length} of{' '}
            {practice.results.covered.length + practice.results.missed.length} key elements.
          </p>

          {practice.results.covered.length > 0 && (
            <div className="space-y-1">
              {practice.results.covered.map((phrase) => (
                <div key={phrase} className="flex items-center gap-2 text-sm text-green-700">
                  <span className="text-green-500">✓</span>
                  <span className="capitalize">{phrase}</span>
                </div>
              ))}
            </div>
          )}
          {practice.results.missed.length > 0 && (
            <div className="space-y-1">
              {practice.results.missed.map((phrase) => (
                <div key={phrase} className="flex items-center gap-2 text-sm text-red-700">
                  <span className="text-red-500">✗</span>
                  <span className="capitalize">{phrase}</span>
                </div>
              ))}
            </div>
          )}

          <div
            className={`text-xs px-3 py-2 rounded-lg font-medium ${
              practice.results.percentage >= 80
                ? 'bg-green-50 text-green-700'
                : practice.results.percentage >= 50
                ? 'bg-amber-50 text-amber-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {getEncouragement(practice.results.percentage)}
          </div>

          <button
            onClick={() => setPractice({ active: false, transcript: '', results: null })}
            className="text-xs text-slate-400 hover:text-slate-600 underline"
          >
            Clear results
          </button>
        </div>
      )}

      {/* Blocks */}
      {open && (
        <div className="px-5 pb-5 border-t border-slate-100 pt-4 space-y-3">
          {section.blocks.map((block, i) => (
            <ScriptBlock key={i} block={block} speechRate={speechRate} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Script() {
  const { progress, updateProgress } = useProgress();
  const [allOpen, setAllOpen] = useState(false);
  const [speechRate, setSpeechRate] = useState<Speed>(1);

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

      {/* Legend + controls */}
      <div className="no-print flex flex-wrap items-center gap-3">
        {[
          { color: 'bg-[#E6F7F2] border-l-[#0F9E75]', label: 'SAY' },
          { color: 'bg-amber-50 border-l-amber-400', label: 'DO' },
          { color: 'bg-purple-50 border-l-purple-400', label: 'CHECK' },
        ].map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-l-4 ${item.color}`}
          >
            <span className="text-xs font-medium text-slate-600">{item.label}</span>
          </div>
        ))}

        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-xs text-slate-500">Speed:</span>
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => setSpeechRate(s)}
              className={`text-xs px-2 py-1 rounded font-medium transition-colors ${
                speechRate === s
                  ? 'bg-[#0F9E75] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
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
      <div className="space-y-3">
        {examScript.map((section, i) => (
          <SectionCard
            key={section.id}
            section={section}
            speechRate={speechRate}
            defaultOpen={!allOpen && i === 0}
          />
        ))}
      </div>

      {/* When allOpen, re-render all open — handled by defaultOpen above when allOpen changes */}

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
