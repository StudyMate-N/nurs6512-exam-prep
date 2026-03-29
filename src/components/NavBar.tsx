import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  InfoIcon,
  GridIcon,
  DocumentIcon,
  BrainIcon,
  CheckSquareIcon,
  HeadphonesIcon,
  ChartIcon,
} from './Icons';

interface NavItem {
  to: string;
  label: string;
  mobileLabel: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { to: '/', label: 'Dashboard', mobileLabel: 'Home', Icon: HomeIcon },
  { to: '/orientation', label: 'Orientation', mobileLabel: 'Orient', Icon: InfoIcon },
  { to: '/blueprint', label: 'Blueprint', mobileLabel: 'Systems', Icon: GridIcon },
  { to: '/script', label: 'The Script', mobileLabel: 'Script', Icon: DocumentIcon },
  { to: '/cranial-nerves', label: 'Cranial Nerves', mobileLabel: 'CN Nerves', Icon: BrainIcon },
  { to: '/drills', label: 'Drill Protocol', mobileLabel: 'Drills', Icon: CheckSquareIcon },
  { to: '/audio', label: 'Audio Library', mobileLabel: 'Audio', Icon: HeadphonesIcon },
  { to: '/analytics', label: 'Analytics', mobileLabel: 'Stats', Icon: ChartIcon },
];

export function SidebarNav() {
  return (
    <nav className="flex flex-col gap-1 px-3 py-4">
      {navItems.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-[#0F9E75] text-white'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`
          }
        >
          <Icon className="w-5 h-5 shrink-0" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0F172A] border-t border-white/10 z-50">
      <div className="flex overflow-x-auto">
        {navItems.map(({ to, mobileLabel, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 min-w-[52px] flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
                isActive ? 'text-[#0F9E75]' : 'text-slate-500 hover:text-slate-300'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-[9px] font-medium leading-tight text-center whitespace-nowrap">
              {mobileLabel}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
