import { useState, useEffect } from 'react';
import type { ScriptBlock as ScriptBlockData } from '../data/examScript';
import { speak, stopSpeaking } from '../utils/tts';
import { SpeakerIcon } from './Icons';

interface ScriptBlockProps {
  block: ScriptBlockData;
  speechRate?: number;
}

const blockConfig = {
  say: {
    label: 'SAY',
    borderColor: 'border-l-[#0F9E75]',
    bg: 'bg-[#E6F7F2]',
    labelColor: 'text-[#0D7A5D]',
    icon: '🗣',
  },
  do: {
    label: 'DO',
    borderColor: 'border-l-amber-400',
    bg: 'bg-amber-50',
    labelColor: 'text-amber-700',
    icon: '✋',
  },
  check: {
    label: 'CHECK',
    borderColor: 'border-l-purple-400',
    bg: 'bg-purple-50',
    labelColor: 'text-purple-700',
    icon: '👁',
  },
};

export default function ScriptBlock({ block, speechRate = 1.0 }: ScriptBlockProps) {
  const config = blockConfig[block.type];
  const [speaking, setSpeaking] = useState(false);

  // Clean up if unmounted while speaking
  useEffect(() => {
    return () => {
      if (speaking) stopSpeaking();
    };
  }, [speaking]);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
    } else {
      setSpeaking(true);
      const utter = new SpeechSynthesisUtterance(block.content);
      utter.rate = speechRate;
      utter.pitch = 1.0;
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find((v) => v.name.includes('Google') && v.lang === 'en-US') ||
        voices.find((v) => v.lang === 'en-US') ||
        voices[0];
      if (preferred) utter.voice = preferred;
      utter.onend = () => setSpeaking(false);
      utter.onerror = () => setSpeaking(false);
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
  };

  return (
    <div
      className={`border-l-4 ${config.borderColor} ${config.bg} rounded-r-lg px-4 py-3 flex gap-3`}
    >
      <span className="text-base select-none mt-0.5 shrink-0">{config.icon}</span>
      <div className="flex-1 min-w-0">
        <span className={`text-xs font-bold uppercase tracking-wider ${config.labelColor} mr-2`}>
          {config.label}
        </span>
        <span className="text-sm text-slate-700 leading-relaxed">
          {block.content}
        </span>
      </div>
      {block.type === 'say' && 'speechSynthesis' in window && (
        <button
          onClick={handleSpeak}
          aria-label="Hear this line"
          title="Hear this line"
          className={`shrink-0 p-1.5 rounded-lg transition-colors mt-0.5 ${
            speaking
              ? 'bg-[#0F9E75] text-white'
              : 'text-slate-400 hover:text-[#0F9E75] hover:bg-white/60'
          }`}
        >
          <SpeakerIcon className="w-4 h-4" filled={speaking} />
        </button>
      )}
    </div>
  );
}
