import { useState, useRef, useEffect } from 'react';
import type { AudioEpisode } from '../data/audioEpisodes';
import { PlayIcon, PauseIcon } from './Icons';

interface AudioPlayerProps {
  episode: AudioEpisode;
}

const SPEEDS = [0.75, 1, 1.25, 1.5];

export default function AudioPlayer({ episode }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const t = Number(e.target.value);
    audio.currentTime = t;
    setCurrentTime(t);
  };

  const handleSpeed = (s: number) => {
    setSpeed(s);
    if (audioRef.current) audioRef.current.playbackRate = s;
  };

  const formatTime = (t: number) => {
    if (!isFinite(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  if (!episode.available) {
    return (
      <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
          <PlayIcon className="w-4 h-4 text-slate-400" />
        </div>
        <div className="flex-1">
          <div className="h-2 bg-slate-200 rounded-full" />
        </div>
        <span className="text-xs font-semibold text-slate-400 bg-slate-200 px-2 py-1 rounded-full">
          Coming Soon
        </span>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
      <audio ref={audioRef} src={episode.url} preload="metadata" />
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 transition-colors"
          style={{ backgroundColor: '#0F9E75' }}
        >
          {isPlaying ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
        </button>

        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{ accentColor: '#0F9E75' }}
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex gap-1 shrink-0">
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => handleSpeed(s)}
              className={`text-xs px-1.5 py-0.5 rounded font-medium transition-colors ${
                speed === s
                  ? 'bg-[#0F9E75] text-white'
                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
