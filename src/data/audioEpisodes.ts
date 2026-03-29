export interface AudioEpisode {
  id: number;
  title: string;
  description: string;
  duration: string;
  url: string;
  available: boolean;
}

export const audioEpisodes: AudioEpisode[] = [
  {
    id: 1,
    title: 'Full Exam Walkthrough',
    description:
      'Complete verbatim script narrated from entry to closing. Listen until you can follow along without looking.',
    duration: '~30 min',
    url: '', // PLACEHOLDER — paste your hosted MP3 URL here
    available: false,
  },
  {
    id: 2,
    title: 'Cranial Nerves Deep Dive',
    description:
      'All 12 cranial nerves — name, number, test method, and what abnormal looks like. Perfect for commute listening.',
    duration: '~12 min',
    url: '',
    available: false,
  },
  {
    id: 3,
    title: 'System-by-System Breakdown',
    description:
      'Each body system covered in detail — what to say, what to do, what the examiner is watching for.',
    duration: '~20 min',
    url: '',
    available: false,
  },
  {
    id: 4,
    title: 'Exam Day Strategy',
    description:
      'Mental preparation, logistics checklist, what to do the night before and morning of. Calm and focused.',
    duration: '~10 min',
    url: '',
    available: false,
  },
];
