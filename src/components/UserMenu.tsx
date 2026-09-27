import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { NORTH_EAST_STATES } from '../data/northEastStates';
import { NEStateId } from '../types/flood';
import {
  User,
  LogOut,
  Shield,
  MapPin,
  ChevronDown,
  LogIn,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface UserMenuProps {
  onOpenSignIn: () => void;
  onSelectState?: (stateId: NEStateId) => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onOpenSignIn, onSelectState }) => {
  const { user, userProfile, logout, updateStatePreference, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="h-8 w-20 bg-slate-800 animate-pulse rounded-xl" />
    );
  }

  if (!user) {
    return (
      <button
        onClick={onOpenSignIn}
        className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02]"
      >
        <LogIn className="w-3.5 h-3.5" />
        <span>Sign In</span>
      </button>
    );
  }

  const roleLabels: Record<string, string> = {
    officer: 'Disaster Officer',
    researcher: 'Hydrologist',
    analyst: 'Data Analyst',
    citizen: 'Local Citizen'
  };

  const displayName = userProfile?.displayName || user.displayName || user.email?.split('@')[0] || 'User';
  const role = userProfile?.role ? roleLabels[userProfile.role] || userProfile.role : 'Observer';

  const handleStateChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = e.target.value as NEStateId;
    await updateStatePreference(newState);
    if (onSelectState) {
      onSelectState(newState);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition text-left"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={displayName}
            className="w-7 h-7 rounded-lg object-cover border border-cyan-500/60"
          />
        ) : (
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center text-white text-xs font-bold uppercase shadow-sm">
            {displayName.charAt(0)}
          </div>
        )}

        <div className="hidden sm:block text-left">
          <p className="text-xs font-bold text-white line-clamp-1 leading-tight">{displayName}</p>
          <p className="text-[10px] text-cyan-400 font-mono leading-tight">{role}</p>
        </div>

        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-800 bg-slate-950 p-3 shadow-2xl z-50 animate-fadeIn space-y-3">
          {/* User Details */}
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
            <p className="text-xs font-bold text-white">{displayName}</p>
            <p className="text-[11px] text-slate-400 truncate">{user.email || 'Anonymous Session'}</p>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                {role}
              </span>
              {user.isAnonymous && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-amber-300 bg-amber-950 border border-amber-800/60">
                  Guest
                </span>
              )}
            </div>
          </div>

          {/* Target State Preference Selector */}
          <div className="space-y-1 px-1">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span>Assigned Monitored State:</span>
            </label>
            <select
              value={userProfile?.statePreference || 'assam'}
              onChange={handleStateChange}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-medium"
            >
              {Object.values(NORTH_EAST_STATES).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="border-t border-slate-800/80 pt-2 px-1">
            <button
              onClick={() => {
                setDropdownOpen(false);
                logout();
              }}
              className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold text-red-400 hover:bg-red-950/40 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
