import { useState } from 'react';
import { useProgress } from '../hooks/useProgress';
import { ChevronDownIcon, ChevronRightIcon, AlertIcon, CheckIcon } from '../components/Icons';

const EQUIPMENT_ITEMS = [
  'Stethoscope',
  'Otoscope',
  'Ophthalmoscope',
  'Pocket Snellen eye chart',
  'Reflex hammer',
  'Tuning forks (500–1000 Hz)',
  'Tape measure',
  'Volunteer patient (confirmed)',
  'Volunteer release form signed',
];

const DISQUALIFIERS = [
  'No-show without communication (either attempt)',
  'Using notes, aids, or outside assistance during exam',
  'Arriving without required equipment',
  'Arriving without a volunteer patient',
  'Not understanding the purpose of the exam',
  'No-show on second attempt',
  'Scoring below 80% on second attempt',
  'Failing the course',
];

interface AccordionCardProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function AccordionCard({ title, children, defaultOpen = false }: AccordionCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors gap-3"
      >
        <h3 className="font-bold text-slate-800">{title}</h3>
        {open ? (
          <ChevronDownIcon className="w-5 h-5 text-slate-400 shrink-0" />
        ) : (
          <ChevronRightIcon className="w-5 h-5 text-slate-400 shrink-0" />
        )}
      </button>
      {open && <div className="px-5 pb-5 border-t border-slate-100 pt-4">{children}</div>}
    </div>
  );
}

export default function Orientation() {
  const { progress, toggleEquipment, updateProgress } = useProgress();

  const equipmentChecked = EQUIPMENT_ITEMS.filter(
    (item) => progress.equipmentChecklist[item]
  ).length;

  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h1 className="text-xl font-bold text-slate-800">What Is This Exam?</h1>
        <p className="text-slate-500 text-sm mt-1">
          Read every section before your first practice run.
        </p>
      </div>

      {/* The Format */}
      <AccordionCard title="The Format" defaultOpen>
        <div className="bg-[#0F172A] rounded-xl p-5 text-white">
          <p className="leading-relaxed text-slate-200">
            This is a{' '}
            <strong className="text-white">
              live physical examination performed on a volunteer patient
            </strong>{' '}
            in front of your faculty via video call. You are being{' '}
            <strong className="text-[#0F9E75]">watched and scored in real time</strong>.
          </p>
          <p className="mt-3 text-slate-300 leading-relaxed">
            It is{' '}
            <span className="line-through text-slate-500">not written</span>. It is{' '}
            <span className="line-through text-slate-500">not multiple choice</span>. It is a{' '}
            <strong className="text-white">performance</strong>.
          </p>
        </div>
      </AccordionCard>

      {/* What faculty watch for */}
      <AccordionCard title="What Faculty Watch For">
        <ul className="space-y-3">
          {[
            'Did you verbalize every step as you performed it?',
            'Did you name all 12 cranial nerves by name AND number?',
            'Did you use all required equipment correctly?',
            'Did you move head-to-toe without skipping any systems?',
            'Did you hesitate, stumble, or rely on memory gaps?',
            'Was your technique correct and performed smoothly?',
            'Did you treat your volunteer with appropriate communication?',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-[#0F9E75] flex items-center justify-center shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-[#0F9E75]" />
              </div>
              <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </AccordionCard>

      {/* Scoring explained */}
      <AccordionCard title="Scoring Explained">
        <div className="space-y-3">
          <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
            <span className="text-2xl font-black text-green-600 shrink-0">2</span>
            <div>
              <div className="font-bold text-green-700 text-sm">Thoroughly Demonstrated</div>
              <div className="text-sm text-slate-600 mt-0.5">
                Correct technique, complete verbalization, no hesitation.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <span className="text-2xl font-black text-amber-600 shrink-0">1</span>
            <div>
              <div className="font-bold text-amber-700 text-sm">Partially Demonstrated</div>
              <div className="text-sm text-slate-600 mt-0.5">
                Mostly correct technique but incomplete or with minor errors.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
            <span className="text-2xl font-black text-red-600 shrink-0">0</span>
            <div>
              <div className="font-bold text-red-700 text-sm">Not Demonstrated</div>
              <div className="text-sm text-slate-600 mt-0.5">
                Skipped, incorrect technique, or failed to verbalize.
              </div>
            </div>
          </div>
          <div className="bg-[#0F172A] rounded-xl p-4 mt-2">
            <p className="text-sm text-slate-300 leading-relaxed">
              <strong className="text-[#0F9E75]">The 20-point Overall Approach score</strong> is
              lost through hesitation, skipping steps, or loss of fluency. This is where
              prepared students separate from unprepared ones.
            </p>
          </div>
        </div>
      </AccordionCard>

      {/* Equipment checklist */}
      <AccordionCard title={`Required Equipment — ${equipmentChecked}/${EQUIPMENT_ITEMS.length} confirmed`}>
        <div className="space-y-2">
          {EQUIPMENT_ITEMS.map((item) => {
            const checked = progress.equipmentChecklist[item] ?? false;
            return (
              <label
                key={item}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                    checked ? 'bg-[#0F9E75] border-[#0F9E75]' : 'border-slate-300'
                  }`}
                >
                  {checked && <CheckIcon className="w-3 h-3 text-white" />}
                </div>
                <input
                  type="checkbox"
                  className="hidden"
                  checked={checked}
                  onChange={() => toggleEquipment(item)}
                />
                <span
                  className={`text-sm ${checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}
                >
                  {item}
                </span>
              </label>
            );
          })}
        </div>
        {equipmentChecked === EQUIPMENT_ITEMS.length && (
          <div className="mt-3 flex items-center gap-2 text-[#0D7A5D] bg-[#E6F7F2] rounded-lg px-3 py-2 text-sm font-medium">
            <CheckIcon className="w-4 h-4" />
            All equipment confirmed — you're ready to drill!
          </div>
        )}
      </AccordionCard>

      {/* Disqualifiers */}
      <AccordionCard title="Automatic Disqualifiers">
        <div className="space-y-2">
          {DISQUALIFIERS.map((d) => (
            <div
              key={d}
              className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-lg px-4 py-3"
            >
              <AlertIcon className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700">{d}</span>
            </div>
          ))}
        </div>
      </AccordionCard>

      {/* Cancellation policy */}
      <AccordionCard title="Cancellation Policy">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertIcon className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-sm text-slate-700 leading-relaxed">
            <strong className="text-amber-800">48-hour notice required</strong> for cancellations.
            Medical cancellations require documentation sent to the{' '}
            <strong>Walden Medical Documentation office</strong> AND an email to your instructor.
            Failure to provide proper notice may count as a failed attempt.
          </div>
        </div>
      </AccordionCard>

      {/* Video Exam Setup */}
      <AccordionCard title="Video Exam Setup">
        <div className="space-y-3">
          {[
            {
              label: 'Camera',
              content:
                'Position your webcam or laptop camera so your FULL body from head to mid-thigh is visible. Faculty need to see you perform maneuvers.',
            },
            {
              label: 'Lighting',
              content:
                'Face a window or light source. Avoid backlighting — if the light is behind you, faculty cannot see your face or technique.',
            },
            {
              label: 'Background',
              content:
                'Clear, professional background. No visible clutter, personal items, or distractions.',
            },
            {
              label: 'Space',
              content:
                'You need at least 6 feet of clear floor space to walk the patient, step back for general survey, and move around the examination table or chair.',
            },
            {
              label: 'Audio',
              content:
                'Use a headset or confirm your microphone clearly picks up a speaking voice. Faculty must hear you verbalize every step.',
            },
            {
              label: 'Internet',
              content:
                'Minimum 10 Mbps upload recommended. Close all other browser tabs and applications during the exam.',
            },
            {
              label: 'Platform',
              content:
                'Confirm the video platform with faculty (Zoom, Teams, WebEx). Log in 10 minutes early to confirm audio/video.',
            },
            {
              label: 'Test run',
              content:
                'Do at least one full rehearsal with your volunteer on video, recording yourself, before the actual exam.',
            },
          ].map((item) => (
            <div key={item.label} className="flex gap-3 text-sm">
              <span className="font-semibold text-slate-700 shrink-0 w-20">{item.label}:</span>
              <span className="text-slate-600 leading-relaxed">{item.content}</span>
            </div>
          ))}
        </div>
      </AccordionCard>

      {/* Volunteer patient guidance */}
      <AccordionCard title="Your Volunteer Patient">
        <div className="space-y-3">
          {[
            {
              label: 'Age',
              content:
                'Choose an adult (18+) with no significant mobility limitations who can perform standing, walking, and positional changes.',
            },
            {
              label: 'Brief them',
              content:
                'Tell them in advance you will be examining their eyes, ears, nose, throat, neck, chest, abdomen, arms, and legs, and testing their reflexes and coordination.',
            },
            {
              label: 'What to wear',
              content:
                'Comfortable, loose clothing. Women should wear a two-piece outfit for easier chest and abdominal access.',
            },
            {
              label: 'Release form',
              content:
                'Remind them the video release form must be signed before recording begins.',
            },
            {
              label: 'What to tell them',
              content:
                '"I\'m going to narrate everything I do aloud. You don\'t need to perform — just respond to my instructions when I ask you to do something."',
            },
          ].map((item) => (
            <div key={item.label} className="flex gap-3 text-sm">
              <span className="font-semibold text-slate-700 shrink-0 w-24">{item.label}:</span>
              <span className="text-slate-600 leading-relaxed italic">{item.content}</span>
            </div>
          ))}
        </div>
      </AccordionCard>

      {/* Mark complete */}
      <div className="pt-2">
        <button
          onClick={() => updateProgress({ orientationComplete: true })}
          disabled={progress.orientationComplete}
          className={`w-full py-3 rounded-xl font-semibold transition-colors ${
            progress.orientationComplete
              ? 'bg-[#E6F7F2] text-[#0D7A5D] border border-[#0F9E75] cursor-default'
              : 'text-white hover:opacity-90'
          }`}
          style={!progress.orientationComplete ? { backgroundColor: '#0F9E75' } : {}}
        >
          {progress.orientationComplete
            ? '✓ Orientation Complete'
            : 'Mark Orientation Complete'}
        </button>
      </div>
    </div>
  );
}
