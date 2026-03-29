export type TaskType =
  | 'read'
  | 'script'
  | 'blueprint-cn'
  | 'first-run'
  | 'timed'
  | 'weak-systems'
  | 'full-run'
  | 'dress-rehearsal'
  | 'rest';

export interface DrillDay {
  day: number;
  taskType: TaskType;
  label: string;
  description: string;
  phase: 1 | 2 | 3 | 4;
}

export interface Phase {
  number: 1 | 2 | 3 | 4;
  name: string;
  days: string;
  focus: string;
  description: string;
  color: string;
}

export const phases: Phase[] = [
  {
    number: 1,
    name: 'ORIENT',
    days: 'Days 1–3',
    focus: 'Understand the exam',
    description:
      'Read orientation module, understand the exam format, review equipment list, confirm volunteer. Do not skip this — knowing what is expected is half the battle.',
    color: 'bg-blue-100 border-blue-400 text-blue-800',
  },
  {
    number: 2,
    name: 'LEARN',
    days: 'Days 4–10',
    focus: 'Study content daily',
    description:
      'Study the Blueprint and Script daily. Read each system aloud. Focus on cranial nerves — 15 min flashcards daily. Do not move to drills until content feels familiar.',
    color: 'bg-purple-100 border-purple-400 text-purple-800',
  },
  {
    number: 3,
    name: 'DRILL',
    days: 'Days 11–25',
    focus: 'Full timed rehearsals',
    description:
      'Full timed run-throughs with volunteer. Target under 30 minutes. Self-score after each run using the rubric. Audio on repeat during commute. Identify and target weak systems.',
    color: 'bg-amber-100 border-amber-400 text-amber-800',
  },
  {
    number: 4,
    name: 'REHEARSE',
    days: 'Days 26–30',
    focus: 'Dress rehearsals only',
    description:
      'Dress rehearsals only. No new content. Review weak systems identified in Phase 3 only. Focus on fluency, flow, and confidence — not new learning.',
    color: 'bg-green-100 border-green-400 text-green-800',
  },
];

export const drillDays: DrillDay[] = [
  {
    day: 1,
    taskType: 'read',
    label: 'Read modules',
    description: 'Read Orientation page — understand exam format and rules',
    phase: 1,
  },
  {
    day: 2,
    taskType: 'read',
    label: 'Read modules',
    description: 'Review equipment checklist — confirm all items available',
    phase: 1,
  },
  {
    day: 3,
    taskType: 'read',
    label: 'Read modules',
    description: 'Confirm volunteer, review disqualifiers, understand scoring',
    phase: 1,
  },
  {
    day: 4,
    taskType: 'script',
    label: 'Script study',
    description: 'Read through the full exam script — sections 1–6',
    phase: 2,
  },
  {
    day: 5,
    taskType: 'script',
    label: 'Script study',
    description: 'Read through script — sections 7–13. Focus on CN verbalization.',
    phase: 2,
  },
  {
    day: 6,
    taskType: 'script',
    label: 'Script study',
    description: 'Read full script aloud from memory — no looking at notes',
    phase: 2,
  },
  {
    day: 7,
    taskType: 'script',
    label: 'Script study',
    description: 'Read script aloud again. Time yourself — note where you hesitate.',
    phase: 2,
  },
  {
    day: 8,
    taskType: 'blueprint-cn',
    label: 'Blueprint + CN',
    description: 'Study Blueprint page — all 9 systems. Do 15 min CN flashcards.',
    phase: 2,
  },
  {
    day: 9,
    taskType: 'blueprint-cn',
    label: 'Blueprint + CN',
    description: 'Quiz yourself on all 9 systems without notes. CN flashcards.',
    phase: 2,
  },
  {
    day: 10,
    taskType: 'blueprint-cn',
    label: 'Blueprint + CN',
    description: 'Full content review — Script + Blueprint + CN all from memory.',
    phase: 2,
  },
  {
    day: 11,
    taskType: 'first-run',
    label: 'First run-through',
    description: 'First full exam run with volunteer. No timer. Focus on completeness.',
    phase: 3,
  },
  {
    day: 12,
    taskType: 'first-run',
    label: 'First run-through',
    description: 'Second full run. Self-score using rubric. Note which systems need work.',
    phase: 3,
  },
  {
    day: 13,
    taskType: 'first-run',
    label: 'First run-through',
    description: 'Third full run. Introduce 30-min timer. Note where time is lost.',
    phase: 3,
  },
  {
    day: 14,
    taskType: 'timed',
    label: 'Timed run',
    description: 'Timed run — target under 30 minutes. Log score.',
    phase: 3,
  },
  {
    day: 15,
    taskType: 'timed',
    label: 'Timed run',
    description: 'Timed run. Compare score to previous session.',
    phase: 3,
  },
  {
    day: 16,
    taskType: 'timed',
    label: 'Timed run',
    description: 'Timed run. Identify 2-3 weakest systems from score log.',
    phase: 3,
  },
  {
    day: 17,
    taskType: 'timed',
    label: 'Timed run',
    description: 'Timed run — push for consistent 80%+ score.',
    phase: 3,
  },
  {
    day: 18,
    taskType: 'weak-systems',
    label: 'Target weak systems',
    description: 'Drill your identified weak systems repeatedly. Script them aloud 3x.',
    phase: 3,
  },
  {
    day: 19,
    taskType: 'weak-systems',
    label: 'Target weak systems',
    description: 'Full timed run focusing on previous weak areas. Log score.',
    phase: 3,
  },
  {
    day: 20,
    taskType: 'weak-systems',
    label: 'Target weak systems',
    description: 'Targeted drill on remaining weak areas — CN flashcards 20 min.',
    phase: 3,
  },
  {
    day: 21,
    taskType: 'weak-systems',
    label: 'Target weak systems',
    description: 'Full timed run. Score should be improving. Note any remaining gaps.',
    phase: 3,
  },
  {
    day: 22,
    taskType: 'full-run',
    label: 'Full timed run',
    description: 'Full timed run — aim for consistent 80%+. Treat it like the real exam.',
    phase: 3,
  },
  {
    day: 23,
    taskType: 'full-run',
    label: 'Full timed run',
    description: 'Full timed run. Log score. Note fluency and confidence level.',
    phase: 3,
  },
  {
    day: 24,
    taskType: 'full-run',
    label: 'Full timed run',
    description: 'Full timed run with same setup as real exam (video call setup if possible).',
    phase: 3,
  },
  {
    day: 25,
    taskType: 'full-run',
    label: 'Full timed run',
    description: 'Final Phase 3 run. Review your session history. Feel the progress.',
    phase: 3,
  },
  {
    day: 26,
    taskType: 'dress-rehearsal',
    label: 'Dress rehearsal',
    description: 'Dress rehearsal — full exam setup, video call, real clothes, all equipment.',
    phase: 4,
  },
  {
    day: 27,
    taskType: 'dress-rehearsal',
    label: 'Dress rehearsal',
    description: 'Second dress rehearsal. No new content. Polish and flow only.',
    phase: 4,
  },
  {
    day: 28,
    taskType: 'dress-rehearsal',
    label: 'Dress rehearsal',
    description: 'Final dress rehearsal. Focus on calm, confident delivery.',
    phase: 4,
  },
  {
    day: 29,
    taskType: 'dress-rehearsal',
    label: 'Dress rehearsal',
    description: 'Light review only. Equipment check. Early bedtime. You are ready.',
    phase: 4,
  },
  {
    day: 30,
    taskType: 'rest',
    label: 'Rest + equipment check',
    description: 'Exam day. Lay out all equipment tonight. Rest. Trust your preparation.',
    phase: 4,
  },
];
