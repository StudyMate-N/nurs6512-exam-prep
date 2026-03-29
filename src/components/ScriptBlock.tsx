import type { ScriptBlock as ScriptBlockData } from '../data/examScript';

interface ScriptBlockProps {
  block: ScriptBlockData;
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

export default function ScriptBlock({ block }: ScriptBlockProps) {
  const config = blockConfig[block.type];

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
    </div>
  );
}
