import React from 'react';
import { Waves, MapPin, Cpu, Sliders, Globe2, Radio, AlertTriangle } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { LpuLogo } from './LpuLogo';
import { NEStateId } from '../types/flood';

interface HeaderProps {
  activeTab: 'states' | 'mlmodels' | 'simulator' | 'global' | 'mitigation';
  setActiveTab: (tab: 'states' | 'mlmodels' | 'simulator' | 'global' | 'mitigation') => void;
  onOpenSignIn: () => void;
  onOpenReportFlood: () => void;
  onSelectState: (stateId: NEStateId) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSignIn,
  onOpenReportFlood,
  onSelectState
}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
      {/* Emergency Live River Alert Marquee */}
      <div className="bg-red-950/70 border-b border-red-900/40 px-4 py-1.5 text-xs text-red-200 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 flex-shrink-0 font-bold uppercase tracking-wider text-[11px] text-red-400">
          <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
          <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
          <span>Live River Telemetry:</span>
        </div>

        <div className="overflow-hidden whitespace-nowrap pl-4 w-full">
          <div className="inline-block animate-marquee font-mono text-[11px] text-slate-300">
            <span className="text-red-400 font-bold">⚠️ Guwahati (Brahmaputra):</span> 49.82m (Above Danger Level by +0.14m, Rising) •{' '}
            <span className="text-red-400 font-bold">⚠️ Silchar (Barak):</span> 19.98m (Above Danger Level by +0.15m, Rising) •{' '}
            <span className="text-amber-400 font-bold">⚡ Dibrugarh (Brahmaputra):</span> 105.42m (Warning Stage, High Silt Load) •{' '}
            <span className="text-amber-400 font-bold">⚡ Pasighat (Siang):</span> 153.20m (Rising, Heavy Himalayan Catchment Rain) •{' '}
            <span className="text-red-400 font-bold">⚠️ Minuthong (Imphal River):</span> 782.10m (Danger Level Exceeded) •{' '}
            <span className="text-emerald-400 font-bold">✓ Rangpo (Teesta):</span> 298.20m (Normal Regulated Discharge)
          </div>
        </div>
      </div>

      {/* Main Top Bar (Site Branding & Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-4 py-2">
          {/* Logo & Platform Name */}
          <div
            onClick={() => setActiveTab('states')}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="group-hover:scale-105 transition-transform duration-300 filter drop-shadow-md">
              <LpuLogo className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-xl font-extrabold text-white tracking-tight">
                  JalDrishti <span className="text-cyan-400 font-mono">NE</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-orange-950/80 text-orange-300 border border-orange-800/80">
                  LPU Hydro-AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Lovely Professional University • North-East Flood Prediction & Early Action Hub
              </p>
            </div>
          </div>

          {/* Action Buttons & User Menu */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={onOpenReportFlood}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-md shadow-red-950 transition hover:scale-[1.02] border border-red-500/50"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-white" />
              <span>Be Flood Ready</span>
            </button>

            <UserMenu onOpenSignIn={onOpenSignIn} onSelectState={onSelectState} />
          </div>
        </div>
      </div>

      {/* Selectable Options Bar on the Next Line */}
      <div className="border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 overflow-x-auto py-2.5">
            <button
              onClick={() => setActiveTab('states')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'states'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/80 shadow-md shadow-cyan-950/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>State Explorer & Map</span>
            </button>

            <button
              onClick={() => setActiveTab('mlmodels')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'mlmodels'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/80 shadow-md shadow-cyan-950/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>ML Models</span>
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'simulator'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/80 shadow-md shadow-cyan-950/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('global')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'global'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/80 shadow-md shadow-cyan-950/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Globe2 className="w-4 h-4 text-cyan-400" />
              <span>Global Impact & Benchmarks</span>
            </button>

            <button
              onClick={() => setActiveTab('mitigation')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeTab === 'mitigation'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/80 shadow-md shadow-cyan-950/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
              }`}
            >
              <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
              <span>Early Warning & Mitigation</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
