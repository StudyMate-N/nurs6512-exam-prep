import { audioEpisodes } from '../data/audioEpisodes';
import AudioPlayer from '../components/AudioPlayer';

export default function AudioLibrary() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-slate-800">Audio Episodes</h1>
        <p className="text-slate-500 text-sm mt-1">
          Listen on your commute. Play before sleep. Repetition builds automaticity.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
        <strong>How to add audio:</strong> Paste your hosted MP3 URL into{' '}
        <code className="bg-amber-100 px-1 py-0.5 rounded text-xs font-mono">
          src/data/audioEpisodes.ts
        </code>{' '}
        and set <code className="bg-amber-100 px-1 py-0.5 rounded text-xs font-mono">available: true</code> for that episode.
        Use any audio host (Google Drive, Dropbox, Cloudflare R2, etc.).
      </div>

      <div className="space-y-4">
        {audioEpisodes.map((episode) => (
          <div
            key={episode.id}
            className="bg-white rounded-2xl border border-[#E2E8F0] p-5 space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ backgroundColor: '#0F172A' }}
                >
                  {episode.id}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-800 leading-tight">{episode.title}</h3>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                    {episode.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-slate-400 whitespace-nowrap">{episode.duration}</span>
                {!episode.available && (
                  <span className="text-xs font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full whitespace-nowrap">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>

            <AudioPlayer episode={episode} />
          </div>
        ))}
      </div>

      <div className="bg-[#0F172A] rounded-2xl p-5 text-slate-300 text-sm leading-relaxed">
        <p className="font-semibold text-white mb-2">Tips for using audio effectively:</p>
        <ul className="space-y-1.5">
          <li>• Listen to the full walkthrough passively first — don't try to memorize</li>
          <li>• On second listen, follow along in your script page</li>
          <li>• On third listen, pause and verbalize each step before it plays</li>
          <li>• Cranial Nerves episode: say the name and number before it's announced</li>
          <li>• Play at 1.25x speed once content feels familiar</li>
        </ul>
      </div>
    </div>
  );
}
