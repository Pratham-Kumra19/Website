import React, { useState } from 'react';
import { NEStateId } from '../types/flood';
import { NORTH_EAST_STATES } from '../data/northEastStates';
import {
  Waves,
  MapPin,
  CloudRain,
  ShieldAlert,
  Info,
  Layers,
  Sparkles,
  Maximize2
} from 'lucide-react';

interface NorthEastMapProps {
  selectedStateId: NEStateId;
  onSelectState: (stateId: NEStateId) => void;
}

export const NorthEastMap: React.FC<NorthEastMapProps> = ({ selectedStateId, onSelectState }) => {
  const [hoveredState, setHoveredState] = useState<NEStateId | null>(null);
  const [showRivers, setShowRivers] = useState(true);
  const [showStations, setShowStations] = useState(true);
  const [showRainfallHeatmap, setShowRainfallHeatmap] = useState(false);
  const [showDistricts, setShowDistricts] = useState(true);
  const [activeTooltip, setActiveTooltip] = useState<{
    x: number;
    y: number;
    title: string;
    subtitle: string;
    risk: string;
    rainfall: number;
  } | null>(null);

  // Scaled coordinates representing the 8 states in a cohesive layout (ViewBox: 40 60 820 570)
  const statePaths: { id: NEStateId; path: string; labelX: number; labelY: number }[] = [
    {
      // Sikkim (North-West)
      id: 'sikkim',
      path: 'M 70,180 L 105,150 L 135,175 L 140,210 L 115,245 L 80,240 L 60,205 Z',
      labelX: 98,
      labelY: 198
    },
    {
      // Arunachal Pradesh (Expansive Northern and Eastern Himalayan belt)
      id: 'arunachal',
      path: 'M 255,160 L 330,120 L 440,90 L 580,75 L 720,110 L 820,170 L 840,230 L 780,260 L 730,225 L 670,240 L 590,205 L 500,215 L 420,235 L 340,245 L 290,230 L 260,190 Z',
      labelX: 570,
      labelY: 145
    },
    {
      // Assam (Central Brahmaputra Valley + Southern Cachar/Barak arm)
      id: 'assam',
      path: 'M 220,240 L 320,250 L 430,240 L 515,220 L 600,210 L 670,245 L 685,285 L 640,315 L 590,320 L 530,340 L 460,345 L 410,360 L 380,410 L 345,450 L 320,440 L 315,380 L 360,335 L 300,325 L 230,315 L 180,300 L 170,265 L 205,245 Z',
      labelX: 430,
      labelY: 285
    },
    {
      // Meghalaya (South of Brahmaputra valley, elevated plateau)
      id: 'meghalaya',
      path: 'M 180,310 L 300,325 L 350,340 L 345,395 L 300,410 L 220,400 L 175,370 L 170,335 Z',
      labelX: 255,
      labelY: 365
    },
    {
      // Nagaland (Eastern hills bordering Assam and Myanmar)
      id: 'nagaland',
      path: 'M 645,310 L 690,285 L 730,320 L 745,380 L 700,415 L 660,390 L 635,345 Z',
      labelX: 685,
      labelY: 350
    },
    {
      // Manipur (South of Nagaland, central valley)
      id: 'manipur',
      path: 'M 655,395 L 700,415 L 715,480 L 685,530 L 640,510 L 625,445 L 645,410 Z',
      labelX: 670,
      labelY: 465
    },
    {
      // Mizoram (Southern finger hills)
      id: 'mizoram',
      path: 'M 405,470 L 440,465 L 465,530 L 450,610 L 400,620 L 380,560 L 390,500 Z',
      labelX: 420,
      labelY: 545
    },
    {
      // Tripura (Southwest peninsula adjacent to Bangladesh)
      id: 'tripura',
      path: 'M 270,440 L 320,440 L 335,490 L 315,550 L 275,540 L 255,485 L 265,450 Z',
      labelX: 295,
      labelY: 490
    }
  ];

  // Key river network paths
  const riverPaths = [
    {
      name: 'Brahmaputra (Main Stem)',
      path: 'M 780,240 Q 660,230 530,260 T 360,280 T 210,270 T 170,305',
      strokeWidth: 5,
      color: '#06b6d4'
    },
    {
      name: 'Siang River (Upper)',
      path: 'M 660,110 Q 640,170 650,225',
      strokeWidth: 3,
      color: '#38bdf8'
    },
    {
      name: 'Subansiri River',
      path: 'M 480,120 Q 490,180 510,235',
      strokeWidth: 2.5,
      color: '#38bdf8'
    },
    {
      name: 'Lohit & Dibang',
      path: 'M 800,190 Q 740,220 680,245',
      strokeWidth: 2.5,
      color: '#38bdf8'
    },
    {
      name: 'Barak River (Southern Basin)',
      path: 'M 630,440 Q 520,450 380,430 T 310,435',
      strokeWidth: 3.5,
      color: '#0284c7'
    },
    {
      name: 'Teesta River (Sikkim)',
      path: 'M 115,160 Q 110,205 105,245',
      strokeWidth: 3,
      color: '#38bdf8'
    },
    {
      name: 'Gumti River (Tripura)',
      path: 'M 330,470 Q 295,500 270,510',
      strokeWidth: 2.5,
      color: '#38bdf8'
    }
  ];

  // Key district hotspots with coordinates
  const districtHotspots = [
    { name: 'Guwahati', stateId: 'assam', x: 305, y: 285, risk: 'High' },
    { name: 'Dhemaji', stateId: 'assam', x: 575, y: 235, risk: 'Extreme' },
    { name: 'Silchar', stateId: 'assam', x: 345, y: 425, risk: 'Extreme' },
    { name: 'Barpeta', stateId: 'assam', x: 250, y: 275, risk: 'Extreme' },
    { name: 'Majuli', stateId: 'assam', x: 515, y: 255, risk: 'Extreme' },
    { name: 'Pasighat', stateId: 'arunachal', x: 670, y: 220, risk: 'Extreme' },
    { name: 'Cherrapunji', stateId: 'meghalaya', x: 275, y: 375, risk: 'Extreme' },
    { name: 'Tura (Garo)', stateId: 'meghalaya', x: 200, y: 360, risk: 'Extreme' },
    { name: 'Imphal Valley', stateId: 'manipur', x: 670, y: 460, risk: 'Extreme' },
    { name: 'Agartala', stateId: 'tripura', x: 285, y: 470, risk: 'Extreme' },
    { name: 'Dimapur', stateId: 'nagaland', x: 645, y: 360, risk: 'High' },
    { name: 'Aizawl (Tlawng)', stateId: 'mizoram', x: 415, y: 520, risk: 'Moderate' },
    { name: 'Singtam / Teesta', stateId: 'sikkim', x: 105, y: 220, risk: 'Extreme' }
  ];

  // Telemetry gauge points on the map
  const gaugePoints = [
    { id: 'g1', name: 'Guwahati (Brahmaputra)', stateId: 'assam', x: 300, y: 285, status: 'danger', level: '49.82m' },
    { id: 'g2', name: 'Dibrugarh (Brahmaputra)', stateId: 'assam', x: 620, y: 245, status: 'warning', level: '105.4m' },
    { id: 'g3', name: 'Silchar (Barak)', stateId: 'assam', x: 345, y: 430, status: 'danger', level: '19.98m' },
    { id: 'g4', name: 'Pasighat (Siang)', stateId: 'arunachal', x: 670, y: 220, status: 'warning', level: '153.2m' },
    { id: 'g5', name: 'Tikrikilla (Jingjiram)', stateId: 'meghalaya', x: 195, y: 345, status: 'warning', level: '32.4m' },
    { id: 'g6', name: 'Minuthong (Imphal)', stateId: 'manipur', x: 665, y: 460, status: 'danger', level: '782.1m' },
    { id: 'g7', name: 'Dashamighat (Haora)', stateId: 'tripura', x: 285, y: 470, status: 'danger', level: '10.9m' },
    { id: 'g8', name: 'Sairang (Tlawng)', stateId: 'mizoram', x: 415, y: 520, status: 'warning', level: '92.5m' },
    { id: 'g9', name: 'Dimapur (Dhansiri)', stateId: 'nagaland', x: 645, y: 360, status: 'warning', level: '114.6m' },
    { id: 'g10', name: 'Singtam (Teesta)', stateId: 'sikkim', x: 110, y: 225, status: 'warning', level: '348.6m' }
  ];

  const getStateVisual = (id: NEStateId) => {
    const isSelected = selectedStateId === id;
    const isHovered = hoveredState === id;
    const stateData = NORTH_EAST_STATES[id];

    if (showRainfallHeatmap) {
      // Color-code based on annual rainfall volume
      const rain = stateData.rainfall.annualAverageMm;
      if (rain > 8000) return { fill: '#1e3a8a', stroke: '#60a5fa', strokeWidth: isSelected ? 3 : 1.5 }; // Deepest blue (Meghalaya)
      if (rain > 3000) return { fill: '#0369a1', stroke: '#38bdf8', strokeWidth: isSelected ? 3 : 1.5 }; // High rain (Arunachal/Sikkim)
      if (rain > 2500) return { fill: '#0891b2', stroke: '#22d3ee', strokeWidth: isSelected ? 3 : 1.5 }; // Heavy rain (Assam/Mizoram)
      return { fill: '#0d9488', stroke: '#2dd4bf', strokeWidth: isSelected ? 3 : 1.5 }; // Manipur/Tripura/Nagaland
    }

    if (isSelected) {
      return {
        fill: '#0284c7', // vibrant cyan/sky
        stroke: '#38bdf8',
        strokeWidth: 3.5,
        filter: 'drop-shadow(0 0 12px rgba(56, 189, 248, 0.7))'
      };
    }

    if (isHovered) {
      return {
        fill: '#0f766e',
        stroke: '#2dd4bf',
        strokeWidth: 2.5,
        filter: 'drop-shadow(0 0 8px rgba(45, 212, 191, 0.5))'
      };
    }

    // Default based on vulnerability score
    if (stateData.vulnerabilityScore > 85) {
      return { fill: '#1e1b4b', stroke: '#ef4444', strokeWidth: 1.6, filter: 'none' };
    }
    if (stateData.vulnerabilityScore > 75) {
      return { fill: '#0f172a', stroke: '#f59e0b', strokeWidth: 1.6, filter: 'none' };
    }
    return { fill: '#091e3a', stroke: '#0ea5e9', strokeWidth: 1.6, filter: 'none' };
  };

  const activeStateData = NORTH_EAST_STATES[hoveredState || selectedStateId];

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-md overflow-hidden">
      {/* Top Map Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
            <h3 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
              Interactive North-East Flood, Rainfall & Hydro-Risk Map
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any state or station marker to inspect live precipitation, danger levels, and historical inundation.
          </p>
        </div>

        {/* Map Layers Toggles */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setShowRainfallHeatmap(!showRainfallHeatmap)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition ${
              showRainfallHeatmap
                ? 'bg-blue-950 border-blue-500 text-blue-300 shadow-md shadow-blue-500/20'
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5 text-blue-400" />
            <span>Rainfall Heatmap {showRainfallHeatmap ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setShowRivers(!showRivers)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition ${
              showRivers
                ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-800/60 border-slate-700 text-slate-400'
            }`}
          >
            <Waves className="w-3.5 h-3.5 text-cyan-400" />
            <span>Rivers {showRivers ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setShowStations(!showStations)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition ${
              showStations
                ? 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                : 'bg-slate-800/60 border-slate-700 text-slate-400'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Gauges {showStations ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setShowDistricts(!showDistricts)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition ${
              showDistricts
                ? 'bg-red-950/80 border-red-500/40 text-red-300'
                : 'bg-slate-800/60 border-slate-700 text-slate-400'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>Hotspots {showDistricts ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div className="relative w-full aspect-[16/10] max-h-[540px] bg-gradient-to-b from-slate-950 via-[#020b18] to-slate-950 rounded-xl border border-slate-800/80 overflow-hidden flex items-center justify-center">
        {/* Subtle grid backdrop */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(56, 189, 248, 0.4) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />

        <svg
          viewBox="40 60 820 570"
          className="w-full h-full select-none"
          style={{ filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.8))' }}
        >
          {/* Defs for gradients & glowing filters */}
          <defs>
            <linearGradient id="riverGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Render State Polygons */}
          <g className="transition-all duration-300">
            {statePaths.map((item) => {
              const visual = getStateVisual(item.id);
              const stateData = NORTH_EAST_STATES[item.id];
              const isSelected = selectedStateId === item.id;

              return (
                <g key={item.id} className="cursor-pointer">
                  <path
                    d={item.path}
                    fill={visual.fill}
                    stroke={visual.stroke}
                    strokeWidth={visual.strokeWidth}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className="transition-all duration-200"
                    onMouseEnter={() => setHoveredState(item.id)}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() => onSelectState(item.id)}
                  />

                  {/* Pulsing Selection Outline if active */}
                  {isSelected && (
                    <path
                      d={item.path}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="2"
                      opacity="0.8"
                      className="animate-pulse"
                    />
                  )}

                  {/* State Text Label */}
                  <text
                    x={item.labelX}
                    y={item.labelY}
                    textAnchor="middle"
                    pointerEvents="none"
                    className={`font-semibold tracking-wider text-[11px] sm:text-[13px] ${
                      isSelected ? 'fill-white font-extrabold text-[14px]' : 'fill-slate-200'
                    }`}
                    style={{ textShadow: '0 2px 4px rgba(0,0,0,0.95)' }}
                  >
                    {stateData.name.toUpperCase()}
                  </text>

                  {/* Quick Risk Indicator Dot */}
                  <circle
                    cx={item.labelX}
                    cy={item.labelY + 16}
                    r={3.5}
                    fill={
                      stateData.riskLevel === 'Extreme'
                        ? '#ef4444'
                        : stateData.riskLevel === 'High'
                        ? '#f59e0b'
                        : '#10b981'
                    }
                  />

                  {/* Secondary info below state label: Rainfall or Risk score */}
                  <text
                    x={item.labelX}
                    y={item.labelY + 30}
                    textAnchor="middle"
                    pointerEvents="none"
                    className="text-[9px] font-mono fill-cyan-300 opacity-90"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,1)' }}
                  >
                    {showRainfallHeatmap
                      ? `${stateData.rainfall.annualAverageMm} mm/yr`
                      : `Risk: ${stateData.vulnerabilityScore}/100`}
                  </text>
                </g>
              );
            })}
          </g>

          {/* Render Rivers if toggled */}
          {showRivers && (
            <g className="pointer-events-none">
              {riverPaths.map((r, i) => (
                <g key={i}>
                  <path
                    d={r.path}
                    fill="none"
                    stroke={r.color}
                    strokeWidth={r.strokeWidth}
                    strokeLinecap="round"
                    opacity={0.85}
                    filter="url(#glow)"
                  />
                  {/* Subtle animated dash for water flow feel */}
                  <path
                    d={r.path}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={r.strokeWidth * 0.4}
                    strokeDasharray="8, 14"
                    strokeLinecap="round"
                    opacity={0.7}
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="44"
                      to="0"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </path>
                </g>
              ))}
            </g>
          )}

          {/* Render District Hotspots if toggled */}
          {showDistricts && (
            <g>
              {districtHotspots.map((d, i) => {
                const isSelectedState = selectedStateId === d.stateId;
                const isExtreme = d.risk === 'Extreme';

                return (
                  <g
                    key={i}
                    className="cursor-pointer transition hover:scale-125"
                    onClick={() => onSelectState(d.stateId as NEStateId)}
                  >
                    <circle
                      cx={d.x}
                      cy={d.y}
                      r={isSelectedState ? 3.5 : 2.5}
                      fill={isExtreme ? '#f43f5e' : '#fbbf24'}
                      stroke="#0f172a"
                      strokeWidth="1"
                    />
                    {isSelectedState && (
                      <text
                        x={d.x}
                        y={d.y - 6}
                        textAnchor="middle"
                        className="text-[8px] font-medium fill-slate-200 pointer-events-none"
                        style={{ textShadow: '0 1px 2px rgba(0,0,0,1)' }}
                      >
                        {d.name}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* Render River Gauge Stations */}
          {showStations && (
            <g>
              {gaugePoints.map((g) => {
                const isSelectedState = selectedStateId === g.stateId;
                const isDanger = g.status === 'danger';
                const isWarning = g.status === 'warning';
                const markerColor = isDanger ? '#ef4444' : isWarning ? '#f59e0b' : '#10b981';

                return (
                  <g
                    key={g.id}
                    className="cursor-pointer transition hover:scale-125"
                    onClick={() => onSelectState(g.stateId as NEStateId)}
                  >
                    {/* Pulsing ring for warning/danger stations */}
                    {(isDanger || isWarning) && (
                      <circle
                        cx={g.x}
                        cy={g.y}
                        r={isSelectedState ? 11 : 8}
                        fill="none"
                        stroke={markerColor}
                        strokeWidth="1.5"
                        opacity={0.8}
                      >
                        <animate
                          attributeName="r"
                          values="4;16;4"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.9;0;0.9"
                          dur="2s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}

                    <circle
                      cx={g.x}
                      cy={g.y}
                      r={isSelectedState ? 6 : 4.5}
                      fill={markerColor}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />

                    {isSelectedState && (
                      <text
                        x={g.x}
                        y={g.y - 10}
                        textAnchor="middle"
                        className="text-[9px] font-mono font-bold fill-white pointer-events-none"
                        style={{ textShadow: '0 1px 3px rgba(0,0,0,1)' }}
                      >
                        {g.level}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          )}
        </svg>

        {/* Floating Quick Stats Card over Map */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs rounded-xl border border-slate-800 bg-slate-950/95 p-3.5 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2 mb-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  activeStateData.riskLevel === 'Extreme'
                    ? 'bg-red-500'
                    : activeStateData.riskLevel === 'High'
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
              />
              {activeStateData.name}
            </span>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                activeStateData.riskLevel === 'Extreme'
                  ? 'bg-red-950 text-red-400 border border-red-800/60'
                  : activeStateData.riskLevel === 'High'
                  ? 'bg-amber-950 text-amber-400 border border-amber-800/60'
                  : 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
              }`}
            >
              {activeStateData.riskLevel} Risk
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-[10px] text-slate-400 uppercase">Annual Rainfall</p>
              <p className="font-semibold text-cyan-300 font-mono">
                {activeStateData.rainfall.annualAverageMm.toLocaleString()} mm
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase">Flood-Prone Area</p>
              <p className="font-semibold text-amber-300 font-mono">
                {activeStateData.floodProneAreaPercentage}%
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase">24h Peak Record</p>
              <p className="font-semibold text-emerald-300 font-mono">
                {activeStateData.rainfall.highest24hRecordMm} mm
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase">Risk Score</p>
              <p className="font-semibold text-red-300 font-mono">
                {activeStateData.vulnerabilityScore} / 100
              </p>
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-800/60 text-[11px] text-slate-300 line-clamp-2">
            {activeStateData.geographicalSummary}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute top-3 right-3 rounded-lg border border-slate-800/90 bg-slate-950/90 p-2.5 text-[10px] text-slate-300 backdrop-blur-md space-y-1.5 hidden sm:block">
          <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-cyan-400" />
            <span>Map Legend</span>
          </div>

          {showRainfallHeatmap ? (
            <div className="space-y-1">
              <div className="text-[9px] text-slate-400 uppercase">Rainfall Intensity</div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-3 rounded-sm bg-[#1e3a8a]" />
                <span>&gt; 8000 mm (Hyper-Wet)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-3 rounded-sm bg-[#0369a1]" />
                <span>3000 - 8000 mm (High)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-3 rounded-sm bg-[#0891b2]" />
                <span>2000 - 3000 mm (Heavy)</span>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <span>Above Danger Level</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span>Above Warning Level</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Normal River Stage</span>
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                <span>Vulnerable District</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
