import { Outlet, useLocation } from 'react-router-dom';
import { SidebarNav, BottomNav } from './NavBar';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/orientation': 'Orientation',
  '/blueprint': 'Blueprint',
  '/script': 'The Script',
  '/cranial-nerves': 'Cranial Nerves',
  '/drills': 'Drill Protocol',
  '/audio': 'Audio Library',
  '/analytics': 'Analytics',
};

function ExamCountdownBadge() {
  const EXAM_DATE = new Date('2026-04-28T15:30:00-04:00');
  const daysLeft = Math.max(
    0,
    Math.ceil((EXAM_DATE.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  return (
    <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5 text-sm shrink-0">
      <span className="font-bold text-white text-base">{daysLeft}</span>
      <span className="text-slate-400 text-xs leading-tight">
        days<br />left
      </span>
    </div>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? 'NURS 6512';

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar — desktop only */}
      <aside className="hidden md:flex flex-col w-[250px] min-h-screen bg-[#0F172A] shrink-0 fixed left-0 top-0 bottom-0 z-40">
        <div className="px-5 py-5 border-b border-white/10">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
            Walden University
          </div>
          <div className="text-white font-bold text-base leading-tight">
            NURS 6512 Exam Prep
          </div>
          <div className="text-slate-400 text-xs mt-1">for Leanne</div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <SidebarNav />
        </div>

        {/* Countdown in sidebar footer */}
        <div className="px-5 py-4 border-t border-white/10">
          <div className="text-xs text-slate-400 mb-1">April 28, 2026</div>
          <ExamCountdownBadge />
          <div className="text-xs text-slate-500 mt-1.5">
            3:30 PM ET · Aimee Kirkendol
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-[250px] min-h-screen">
        {/* Top bar — mobile shows title + countdown */}
        <header className="md:hidden sticky top-0 z-30 bg-[#0F172A] flex items-center justify-between px-4 py-3 gap-3">
          <div>
            <div className="text-xs text-slate-400">NURS 6512</div>
            <div className="text-white font-semibold text-sm">{title}</div>
          </div>
          <ExamCountdownBadge />
        </header>

        {/* Desktop top bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-[#E2E8F0]">
          <h1 className="text-lg font-bold text-slate-800">{title}</h1>
          <div className="text-sm text-slate-500">
            April 28, 2026 · 3:30 PM ET · Aimee Kirkendol
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto pb-24 md:pb-8">
          <div className="max-w-5xl mx-auto px-4 md:px-8 py-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Bottom nav — mobile only */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
