import React, { useState } from 'react';
import { NEStateId } from '../types/flood';
import { NORTH_EAST_STATES } from '../data/northEastStates';
import { NorthEastMap } from './NorthEastMap';
import {
  CloudRain,
  ShieldAlert,
  History,
  Activity,
  Cpu,
  Layers,
  PhoneCall,
  Droplets,
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Calendar,
  AlertTriangle,
  Radio,
  CheckCircle2,
  Compass
} from 'lucide-react';

interface StateExplorerProps {
  selectedStateId: NEStateId;
  onSelectState: (stateId: NEStateId) => void;
}

export const StateExplorer: React.FC<StateExplorerProps> = ({ selectedStateId, onSelectState }) => {
  const [activeTab, setActiveTab] = useState<'rainfall' | 'floodrisk' | 'previousfloods' | 'gauges' | 'mldeployments'>('rainfall');

  const currentState = NORTH_EAST_STATES[selectedStateId];
  const statesList = Object.values(NORTH_EAST_STATES);

  // Maximum monthly rainfall for calculating relative histogram heights
  const maxMonthlyRainfall = Math.max(...currentState.rainfall.monthlyDistributionMm.map((m) => m.rainfallMm), 100);

  return (
    <div className="space-y-6">
      {/* State Selection Bar */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            Select North-East State to Explore:
          </span>
          <span className="text-xs text-slate-500 hidden sm:inline-block">
            Clicking a pill or clicking the map updates all panels
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {statesList.map((state) => {
            const isSelected = state.id === selectedStateId;
            const isExtreme = state.riskLevel === 'Extreme';
            const isHigh = state.riskLevel === 'High';

            return (
              <button
                key={state.id}
                onClick={() => onSelectState(state.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-cyan-500/25 shadow-md ring-2 ring-cyan-400 scale-[1.02]'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isExtreme ? 'bg-red-400' : isHigh ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                />
                <span>{state.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {state.vulnerabilityScore}/100
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Map with State/River/Gauge/Heatmap Selection */}
      <NorthEastMap selectedStateId={selectedStateId} onSelectState={onSelectState} />

      {/* Main State Data Inspection Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-7 backdrop-blur-md shadow-2xl space-y-6">
        {/* State Summary Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {currentState.name}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  currentState.riskLevel === 'Extreme'
                    ? 'bg-red-950/80 text-red-400 border-red-800/60'
                    : currentState.riskLevel === 'High'
                    ? 'bg-amber-950/80 text-amber-400 border-amber-800/60'
                    : 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60'
                }`}
              >
                {currentState.riskLevel} Flood Vulnerability
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
              Capital: <span className="text-slate-200 font-medium">{currentState.capital}</span> • Basin Population:{' '}
              <span className="text-slate-200 font-medium">{currentState.population}</span> • Total Area:{' '}
              <span className="text-slate-200 font-medium">{currentState.areaSqKm.toLocaleString()} km²</span>
            </p>
          </div>

          {/* Emergency Helpline Box */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/90 border border-slate-800">
            <span className="p-2 rounded-lg bg-red-950/80 text-red-400 border border-red-800/60">
              <PhoneCall className="w-4 h-4" />
            </span>
            <div>
              <p className="text-[10px] text-slate-400 font-mono uppercase">State Disaster Helpline</p>
              <p className="text-xs font-bold text-white font-mono">{currentState.emergencyHelpline}</p>
            </div>
          </div>
        </div>

        {/* 4 Quantitative Snapshot Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {/* Annual Rainfall */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <CloudRain className="w-3.5 h-3.5 text-cyan-400" /> Annual Rainfall
            </p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-cyan-300">
                {currentState.rainfall.annualAverageMm.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400">mm/yr</span>
            </div>
            <p className="text-[11px] text-emerald-400 font-mono mt-1">
              {currentState.rainfall.currentAnomalyPct > 0 ? `+${currentState.rainfall.currentAnomalyPct}%` : `${currentState.rainfall.currentAnomalyPct}%`}{' '}
              Monsoon Anomaly
            </p>
          </div>

          {/* Flood-Prone Area */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-blue-400" /> Flood-Prone Area
            </p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-blue-300">
                {currentState.floodProneAreaPercentage}%
              </span>
              <span className="text-xs text-slate-400">of land</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mt-1">
              ~{currentState.floodProneAreaSqKm.toLocaleString()} km² at risk
            </p>
          </div>

          {/* Vulnerability Score */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> Flood Risk Index
            </p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-amber-300">
                {currentState.vulnerabilityScore}
              </span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <p className="text-[11px] text-amber-400 font-mono mt-1">
              {currentState.riskLevel} Hazard Category
            </p>
          </div>

          {/* ML Early Warning Lead Time */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
            <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" /> ML Warning Window
            </p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-bold font-mono text-emerald-300">
                +{currentState.mlDeployments[0]?.leadTimeHours || 24}h
              </span>
              <span className="text-xs text-slate-400">Lead Time</span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono mt-1 truncate">
              {currentState.mlDeployments[0]?.leadAgency.split('(')[0] || 'CWC & NESAC'}
            </p>
          </div>
        </div>

        {/* Tab Navigation for State Details */}
        <div className="flex border-b border-slate-800 gap-2 sm:gap-6 overflow-x-auto pt-2">
          <button
            onClick={() => setActiveTab('rainfall')}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'rainfall'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CloudRain className="w-4 h-4" />
            Rainfall Analytics & Seasonality
          </button>

          <button
            onClick={() => setActiveTab('floodrisk')}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'floodrisk'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            Flood Risk & Vulnerable Districts
          </button>

          <button
            onClick={() => setActiveTab('previousfloods')}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'previousfloods'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-4 h-4" />
            Previous & Historical Floods ({currentState.historicalFloods.length})
          </button>

          <button
            onClick={() => setActiveTab('gauges')}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'gauges'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            River Gauges & Telemetry ({currentState.gaugeStations.length})
          </button>

          <button
            onClick={() => setActiveTab('mldeployments')}
            className={`pb-3 text-xs sm:text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'mldeployments'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4" />
            Active ML Models ({currentState.mlDeployments.length})
          </button>
        </div>

        {/* Tab 1: Rainfall Analytics & Seasonality */}
        {activeTab === 'rainfall' && (
          <div className="space-y-6 pt-2">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Rainfall Metrics Overview */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
                  <CloudRain className="w-4 h-4 text-cyan-400" />
                  Precipitation Benchmarks
                </h4>

                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase">Annual Average Rainfall</p>
                    <p className="text-lg font-bold text-white font-mono">
                      {currentState.rainfall.annualAverageMm.toLocaleString()} mm
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Monsoon share (May - Sep): ~{currentState.rainfall.monsoonAverageMm.toLocaleString()} mm ({Math.round((currentState.rainfall.monsoonAverageMm / currentState.rainfall.annualAverageMm) * 100)}%)
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase">Highest 24-Hour Record</p>
                    <p className="text-lg font-bold text-cyan-400 font-mono">
                      {currentState.rainfall.highest24hRecordMm} mm
                    </p>
                    <p className="text-[11px] text-slate-300 mt-0.5 font-medium">
                      Location: {currentState.rainfall.highest24hLocation}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase">Monsoon Onset & Peak</p>
                    <p className="text-sm font-semibold text-slate-200">
                      Onset: {currentState.rainfall.monsoonOnset}
                    </p>
                    <p className="text-[11px] text-amber-400 mt-0.5">
                      Wettest Window: {currentState.rainfall.wettestMonths.join(', ')}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                    <p className="text-[10px] text-slate-400 uppercase">Doppler Radar & Remote Sensing</p>
                    <p className="text-xs text-slate-300 mt-1">
                      {currentState.rainfall.radarCoverage}
                    </p>
                  </div>
                </div>
              </div>

              {/* Monthly Rainfall Distribution Histogram */}
              <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-950/50 p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    Monthly Climatological Rainfall Profile (Jan - Dec)
                  </h4>
                  <span className="text-[11px] text-cyan-300 font-mono">
                    Values in Millimeters (mm)
                  </span>
                </div>

                {/* Bar Chart Container */}
                <div className="pt-6 pb-2">
                  <div className="grid grid-cols-12 gap-1.5 sm:gap-3 items-end h-52 border-b border-slate-800 pb-2">
                    {currentState.rainfall.monthlyDistributionMm.map((item, idx) => {
                      const heightPercent = Math.max(8, Math.round((item.rainfallMm / maxMonthlyRainfall) * 100));
                      const isMonsoonPeak = ['Jun', 'Jul', 'Aug'].includes(item.month);

                      return (
                        <div key={idx} className="flex flex-col items-center gap-1 group relative">
                          {/* Tooltip on hover */}
                          <div className="absolute -top-9 opacity-0 group-hover:opacity-100 transition pointer-events-none z-10 px-2 py-1 rounded bg-slate-800 text-[10px] font-mono text-white whitespace-nowrap shadow-lg">
                            {item.month}: {item.rainfallMm} mm
                          </div>

                          {/* Bar */}
                          <div className="w-full bg-slate-900 rounded-t-md h-full flex items-end overflow-hidden">
                            <div
                              className={`w-full rounded-t transition-all duration-500 ${
                                isMonsoonPeak
                                  ? 'bg-gradient-to-t from-blue-600 to-cyan-400 group-hover:from-blue-500 group-hover:to-cyan-300'
                                  : 'bg-slate-700/80 group-hover:bg-slate-600'
                              }`}
                              style={{ height: `${heightPercent}%` }}
                            />
                          </div>

                          {/* Month Label */}
                          <span
                            className={`text-[10px] font-mono ${
                              isMonsoonPeak ? 'text-cyan-400 font-bold' : 'text-slate-500'
                            }`}
                          >
                            {item.month}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-3 rounded-sm bg-gradient-to-r from-blue-600 to-cyan-400" />
                      <span>Monsoon Surge Window (May - Sept): Drives 75-85% of total annual flood events</span>
                    </div>
                    <span className="font-mono text-slate-400 hidden sm:inline">
                      Data grounded in IMD gridded records
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-cyan-950/30 border border-cyan-800/40 p-3.5 text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-cyan-300">Hydrological Impact:</span> In {currentState.name}, continuous multi-day spells exceeding 100 mm/day rapidly saturate the topsoil layer, lowering infiltration rates to near-zero. Subsequent cloudbursts run directly into hill ravines and river tributaries within 45 to 90 minutes.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Flood Risk & Vulnerable Districts */}
        {activeTab === 'floodrisk' && (
          <div className="space-y-6 pt-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Vulnerable Districts Table */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    High-Risk Administrative Districts ({currentState.vulnerableDistricts.length})
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">Ranked by Inundation Exposure</span>
                </div>

                <div className="space-y-2">
                  {currentState.vulnerableDistricts.map((d, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-between gap-3 hover:border-slate-700 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-xs font-mono font-bold text-slate-300">
                          {i + 1}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-white">{d.name}</p>
                          <p className="text-[11px] text-slate-400">
                            Est. Population in Hazard Zone: <span className="text-cyan-300 font-medium">{d.populationAtRisk}</span>
                          </p>
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase font-mono ${
                          d.risk === 'Extreme'
                            ? 'bg-red-950 text-red-400 border border-red-800'
                            : d.risk === 'High'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}
                      >
                        {d.risk}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flooding Mechanisms & Physical Drivers */}
              <div className="space-y-5">
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-5 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    Dominant Flooding Mechanisms in {currentState.name}
                  </h4>

                  <div className="space-y-3">
                    {currentState.floodingCharacteristics.map((f, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border border-slate-800 bg-slate-900/60 flex items-start gap-3"
                      >
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-cyan-400 font-mono text-xs font-bold">
                          0{idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{f}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Priority Mitigation Actions */}
                <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/10 p-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Targeted Mitigation & Defense Actions
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {currentState.recommendedMitigation.map((m, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold mt-0.5">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Previous & Historical Floods */}
        {activeTab === 'previousfloods' && (
          <div className="space-y-4 pt-2">
            <p className="text-xs text-slate-400">
              Verified historical flood records showing inundated area, affected citizens, and key compound drivers in {currentState.name}.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentState.historicalFloods.map((ev, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 space-y-3 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800/60">
                      Year {ev.year}
                    </span>
                    <div className="text-right">
                      <span className="text-xs text-slate-400">Documented Casualties: </span>
                      <span className="text-xs font-bold text-red-400 font-mono">{ev.fatalities}</span>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-white">{ev.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{ev.summary}</p>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/60 text-center font-mono">
                    <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800">
                      <p className="text-[10px] text-slate-400 font-sans">Affected People</p>
                      <p className="text-xs font-bold text-amber-300">
                        {ev.affectedPopulationMillion > 0 ? `${ev.affectedPopulationMillion} Million` : 'Severe Local'}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800">
                      <p className="text-[10px] text-slate-400 font-sans">Inundated Area</p>
                      <p className="text-xs font-bold text-cyan-300">{ev.areaInundatedSqKm.toLocaleString()} km²</p>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800">
                      <p className="text-[10px] text-slate-400 font-sans">Districts</p>
                      <p className="text-xs font-bold text-indigo-300">{ev.districtsAffected} Districts</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Compound Disaster Triggers:
                    </p>
                    <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                      {ev.keyFactors.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: River Gauges & Telemetry */}
        {activeTab === 'gauges' && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Simulated real-time telemetric stream gauges operated by Central Water Commission (CWC) & State Hydrology cells.
              </p>
              <span className="text-xs text-cyan-400 font-mono">Telemetry sync: Real-time</span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/50">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase font-mono text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Station & River</th>
                    <th className="py-3 px-4">District</th>
                    <th className="py-3 px-4">Current Level</th>
                    <th className="py-3 px-4">Danger Mark</th>
                    <th className="py-3 px-4">Highest Flood (HFL)</th>
                    <th className="py-3 px-4">Discharge (Cumecs)</th>
                    <th className="py-3 px-4">Trend</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 font-mono">
                  {currentState.gaugeStations.map((g) => {
                    const isDanger = g.status === 'danger';
                    const isWarning = g.status === 'warning';
                    const diffToDanger = g.currentLevelM - g.dangerLevelM;

                    return (
                      <tr key={g.id} className="hover:bg-slate-900/50 transition">
                        <td className="py-3 px-4 font-sans">
                          <div className="font-semibold text-white">{g.name}</div>
                          <div className="text-xs text-cyan-400">{g.river}</div>
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">{g.district}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`font-bold text-sm ${
                              isDanger ? 'text-red-400' : isWarning ? 'text-amber-400' : 'text-emerald-400'
                            }`}
                          >
                            {g.currentLevelM.toFixed(2)} m
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400">
                          {g.dangerLevelM.toFixed(2)} m
                          <span className="block text-[10px] text-slate-500">
                            {diffToDanger > 0
                              ? `+${diffToDanger.toFixed(2)}m (Exceeded)`
                              : `${diffToDanger.toFixed(2)}m (Margin)`}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400">{g.highestFloodLevelM.toFixed(2)} m</td>
                        <td className="py-3 px-4 text-cyan-300">
                          {g.dischargeCumecs.toLocaleString()} m³/s
                        </td>
                        <td className="py-3 px-4 font-sans">
                          <span className="inline-flex items-center gap-1 text-xs">
                            {g.trend === 'rising' && (
                              <span className="text-red-400 flex items-center gap-0.5">
                                <TrendingUp className="w-3.5 h-3.5" /> Rising
                              </span>
                            )}
                            {g.trend === 'falling' && (
                              <span className="text-emerald-400 flex items-center gap-0.5">
                                <TrendingDown className="w-3.5 h-3.5" /> Falling
                              </span>
                            )}
                            {g.trend === 'steady' && (
                              <span className="text-slate-400 flex items-center gap-0.5">
                                <Minus className="w-3.5 h-3.5" /> Steady
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-sans">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase ${
                              isDanger
                                ? 'bg-red-950 text-red-400 border border-red-800'
                                : isWarning
                                ? 'bg-amber-950 text-amber-400 border border-amber-800'
                                : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            }`}
                          >
                            {g.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Active ML Models */}
        {activeTab === 'mldeployments' && (
          <div className="space-y-4 pt-2">
            <p className="text-xs text-slate-400">
              Active machine learning pipelines, satellite remote sensing workflows, and hydrodynamic models protecting {currentState.name}.
            </p>

            <div className="space-y-4">
              {currentState.mlDeployments.map((ml, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-cyan-900/50 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/20 p-5 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-white flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-cyan-400" />
                        {ml.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Agency: <span className="text-cyan-300 font-medium">{ml.leadAgency}</span> • Operational Since:{' '}
                        <span className="text-slate-200 font-mono">{ml.operationalSince}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-700/60">
                        +{ml.leadTimeHours}h Advance Warning
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{ml.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                      <p className="text-[10px] text-slate-400 uppercase font-mono">Architecture & Technology</p>
                      <p className="text-xs font-semibold text-slate-200 mt-1">{ml.modelTech}</p>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                      <p className="text-[10px] text-emerald-400 uppercase font-mono">Measured Impact & Accuracy</p>
                      <p className="text-xs font-semibold text-emerald-300 mt-1">{ml.impactMetrics}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
