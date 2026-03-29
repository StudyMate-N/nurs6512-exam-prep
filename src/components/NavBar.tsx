import { NavLink } from 'react-router-dom';
import {
  HomeIcon,
  InfoIcon,
  GridIcon,
  DocumentIcon,
  BrainIcon,
  CheckSquareIcon,
  HeadphonesIcon,
} from './Icons';

interface NavItem {
  to: string;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { to: '/', label: 'Dashboard', Icon: HomeIcon },
  { to: '/orientation', label: 'Orientation', Icon: InfoIcon },
  { to: '/blueprint', label: 'Blueprint', Icon: GridIcon },
  { to: '/script', label: 'The Script', Icon: DocumentIcon },
  { to: '/cranial-nerves', label: 'Cranial Nerves', Icon: BrainIcon },
  { to: '/drills', label: 'Drill Protocol', Icon: CheckSquareIcon },
  { to: '/audio', label: 'Audio Library', Icon: HeadphonesIcon },
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
      <div className="flex">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
                isActive ? 'text-[#0F9E75]' : 'text-slate-500 hover:text-slate-300'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span className="text-[9px] font-medium leading-tight text-center">
              {label.split(' ')[0]}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
