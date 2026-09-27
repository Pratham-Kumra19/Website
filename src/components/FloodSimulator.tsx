import React, { useState, useMemo } from 'react';
import {
  Activity,
  Sliders,
  AlertTriangle,
  ShieldCheck,
  Cpu,
  Clock,
  Waves,
  Users,
  Maximize2,
  RefreshCw,
  Send,
  Droplets
} from 'lucide-react';

interface BasinPreset {
  id: string;
  name: string;
  river: string;
  dangerMarkM: number;
  normalLevelM: number;
  hflM: number;
  baseCatchmentAreaSqKm: number;
  populationDensity: number;
}

const BASIN_PRESETS: BasinPreset[] = [
  {
    id: 'brahmaputra-guwahati',
    name: 'Middle Brahmaputra (Guwahati Corridor)',
    river: 'Brahmaputra',
    dangerMarkM: 49.68,
    normalLevelM: 46.5,
    hflM: 51.46,
    baseCatchmentAreaSqKm: 580000,
    populationDensity: 2800
  },
  {
    id: 'brahmaputra-dibrugarh',
    name: 'Upper Brahmaputra & Majuli (Dibrugarh Reach)',
    river: 'Brahmaputra / Subansiri',
    dangerMarkM: 105.7,
    normalLevelM: 103.2,
    hflM: 106.48,
    baseCatchmentAreaSqKm: 290000,
    populationDensity: 420
  },
  {
    id: 'barak-silchar',
    name: 'Barak Valley (Silchar Basin & Wetlands)',
    river: 'Barak',
    dangerMarkM: 19.83,
    normalLevelM: 16.4,
    hflM: 21.98,
    baseCatchmentAreaSqKm: 41723,
    populationDensity: 480
  },
  {
    id: 'teesta-sikkim',
    name: 'Teesta Gorge & Chungthang (Sikkim)',
    river: 'Teesta',
    dangerMarkM: 349.5,
    normalLevelM: 342.0,
    hflM: 362.4,
    baseCatchmentAreaSqKm: 12500,
    populationDensity: 90
  },
  {
    id: 'imphal-valley',
    name: 'Imphal Valley & Loktak Catchment (Manipur)',
    river: 'Imphal & Nambul',
    dangerMarkM: 781.9,
    normalLevelM: 779.0,
    hflM: 783.6,
    baseCatchmentAreaSqKm: 6200,
    populationDensity: 1100
  },
  {
    id: 'gumti-tripura',
    name: 'Gumti Basin & Dumboor Spillway (Tripura)',
    river: 'Gumti',
    dangerMarkM: 29.5,
    normalLevelM: 26.8,
    hflM: 31.2,
    baseCatchmentAreaSqKm: 2492,
    populationDensity: 390
  }
];

export const FloodSimulator: React.FC = () => {
  const [selectedBasinId, setSelectedBasinId] = useState<string>(BASIN_PRESETS[0].id);
  const [modelType, setModelType] = useState<'lstm' | 'pinn' | 'gnn' | 'ensemble'>('lstm');

  // Interactive Sliders
  const [rainfall24hMm, setRainfall24hMm] = useState<number>(185);
  const [soilMoisturePct, setSoilMoisturePct] = useState<number>(82);
  const [damDischargeCumecs, setDamDischargeCumecs] = useState<number>(4500);
  const [embankmentIntegrityPct, setEmbankmentIntegrityPct] = useState<number>(75);

  const basin = BASIN_PRESETS.find((b) => b.id === selectedBasinId) || BASIN_PRESETS[0];

  // Simulated ML Hydrograph calculation based on physical & ML parameters
  const simulation = useMemo(() => {
    // Runoff coefficient increases exponentially with soil moisture
    const runoffCoefficient = 0.25 + (soilMoisturePct / 100) * 0.65;
    const effectivePrecipitation = rainfall24hMm * runoffCoefficient;

    // Model specific variance and smoothing
    const modelMultiplier =
      modelType === 'pinn' ? 0.95 : modelType === 'gnn' ? 1.02 : modelType === 'ensemble' ? 0.98 : 1.0;

    // Peak stage increase in meters above normal
    const stageIncrease =
      (effectivePrecipitation * 0.022 + (damDischargeCumecs / 3000) * 0.65) *
      modelMultiplier *
      (1 + (100 - embankmentIntegrityPct) * 0.005);

    const peakWaterLevel = Number((basin.normalLevelM + stageIncrease).toFixed(2));
    const dangerDiff = peakWaterLevel - basin.dangerMarkM;

    let alertLevel: 'NORMAL' | 'ADVISORY' | 'WARNING' | 'DANGER' | 'EXTREME' = 'NORMAL';
    if (dangerDiff > 1.2 || peakWaterLevel >= basin.hflM) {
      alertLevel = 'EXTREME';
    } else if (dangerDiff > 0) {
      alertLevel = 'DANGER';
    } else if (dangerDiff > -0.8) {
      alertLevel = 'WARNING';
    } else if (dangerDiff > -1.8) {
      alertLevel = 'ADVISORY';
    }

    // Inundation area estimate in sq km
    const inundationAreaSqKm = Math.round(
      Math.max(0, stageIncrease * 180 * (soilMoisturePct / 100) * (2 - embankmentIntegrityPct / 100))
    );

    // Population at risk estimate
    const populationAtRisk = Math.round(inundationAreaSqKm * (basin.populationDensity * 0.45));

    // Time to peak (hours)
    const timeToPeakHours = Math.max(12, Math.round(36 - (rainfall24hMm / 350) * 16));

    // Evacuation window lead time
    const evacuationWindowHours = Math.max(4, timeToPeakHours - 6);

    // 72-Hour Hydrograph Curve Points
    const hydrograph: { hour: number; waterLevel: number; dangerMark: number; rainfallMm: number }[] = [];
    for (let h = 0; h <= 72; h += 3) {
      // Gamma / Pearson type peak curve
      const t = h / timeToPeakHours;
      const surgeShape = t > 0 ? Math.pow(t, 2.2) * Math.exp(-2.2 * (t - 1)) : 0;
      const currentLevel = basin.normalLevelM + stageIncrease * surgeShape;

      // Simulated rainfall distribution over 72h
      const rainSpike = h <= 24 ? Math.max(0, rainfall24hMm * 0.12 * Math.sin((h / 24) * Math.PI)) : 0;

      hydrograph.push({
        hour: h,
        waterLevel: Number(currentLevel.toFixed(2)),
        dangerMark: basin.dangerMarkM,
        rainfallMm: Number(rainSpike.toFixed(1))
      });
    }

    // Model confidence
    const modelConfidencePct =
      modelType === 'pinn' ? 94 : modelType === 'gnn' ? 92 : modelType === 'ensemble' ? 95 : 91;

    // AI recommended actions based on alertLevel
    const actionItems: string[] = [];
    if (alertLevel === 'EXTREME') {
      actionItems.push(
        'Immediate evacuation of low-lying floodplains within ' + evacuationWindowHours + ' hours.'
      );
      actionItems.push(
        'Dispatch NDRF water rescue battalions and inflatable Gemini boats to breached embankments.'
      );
      actionItems.push(
        'Initiate upstream dam spillway emergency gate throttling to arrest downstream peak surge.'
      );
      actionItems.push('Broadcast Level-5 emergency siren and cell-broadcast alerts in local languages.');
    } else if (alertLevel === 'DANGER') {
      actionItems.push('Issue Mandatory Evacuation Advisory for flood-prone river islands and dyke buffers.');
      actionItems.push('Pre-position medical supplies, water purification units, and dry rations at elevated flood shelters.');
      actionItems.push('Close vulnerable sluice gates and reinforce active seepage points with geo-bags.');
    } else if (alertLevel === 'WARNING') {
      actionItems.push('Alert district disaster management authorities (DDMA) to stage rescue personnel.');
      actionItems.push('Restrict river ferry operations and night navigation on the Brahmaputra/Barak.');
      actionItems.push('24/7 automated drone surveillance along critical embankment reaches.');
    } else {
      actionItems.push('Normal hydrometric monitoring; routine sensor health checks.');
      actionItems.push('Inspect drainage culverts and ensure silt clearing at urban bottlenecks.');
    }

    return {
      peakWaterLevel,
      dangerDiff,
      alertLevel,
      inundationAreaSqKm,
      populationAtRisk,
      timeToPeakHours,
      evacuationWindowHours,
      hydrograph,
      modelConfidencePct,
      actionItems
    };
  }, [selectedBasinId, modelType, rainfall24hMm, soilMoisturePct, damDischargeCumecs, embankmentIntegrityPct, basin]);

  // Scaled coordinates for SVG Hydrograph chart
  const minStage = Math.min(...simulation.hydrograph.map((p) => p.waterLevel), basin.normalLevelM) - 0.5;
  const maxStage = Math.max(...simulation.hydrograph.map((p) => p.waterLevel), basin.dangerMarkM) + 0.8;
  const stageRange = Math.max(1, maxStage - minStage);

  const chartWidth = 720;
  const chartHeight = 220;

  const pointsString = simulation.hydrograph
    .map((p) => {
      const x = (p.hour / 72) * chartWidth;
      const y = chartHeight - ((p.waterLevel - minStage) / stageRange) * (chartHeight - 30) - 15;
      return `${x},${y}`;
    })
    .join(' ');

  const dangerY =
    chartHeight - ((basin.dangerMarkM - minStage) / stageRange) * (chartHeight - 30) - 15;

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-2xl border border-blue-900/50 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950/30 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/60">
            <Sliders className="w-3.5 h-3.5" />
            <span>Real-Time Hydro-Informatics Sandbox</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Interactive ML Flood Prediction & Inundation Simulator
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Test how varying monsoon cloudburst intensities, soil saturation levels, upstream dam releases, and embankment aging affect river stage hydrographs across key North-East basins. Compare simulated predictions from multiple machine learning paradigms.
          </p>
        </div>
      </div>

      {/* Simulator Workspace: Left Controls, Right Output Hydrograph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Control Panel (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-md shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Catchment & Meteorological Controls
            </h3>
            <button
              onClick={() => {
                setRainfall24hMm(185);
                setSoilMoisturePct(82);
                setDamDischargeCumecs(4500);
                setEmbankmentIntegrityPct(75);
              }}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Basin Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Target River Basin / Reach:
            </label>
            <select
              value={selectedBasinId}
              onChange={(e) => setSelectedBasinId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-medium"
            >
              {BASIN_PRESETS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name} ({b.river})
                </option>
              ))}
            </select>
          </div>

          {/* ML Model Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>ML Forecasting Paradigm:</span>
              <span className="text-[10px] text-cyan-400 font-mono">
                {simulation.modelConfidencePct}% Confidence
              </span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setModelType('lstm')}
                className={`p-2.5 rounded-lg text-left text-xs font-semibold border transition ${
                  modelType === 'lstm'
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">Bi-LSTM Network</div>
                <div className="text-[10px] text-slate-400">Google / CWC Hydro</div>
              </button>

              <button
                onClick={() => setModelType('pinn')}
                className={`p-2.5 rounded-lg text-left text-xs font-semibold border transition ${
                  modelType === 'pinn'
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">Physics PINN</div>
                <div className="text-[10px] text-slate-400">Saint-Venant 2D</div>
              </button>

              <button
                onClick={() => setModelType('gnn')}
                className={`p-2.5 rounded-lg text-left text-xs font-semibold border transition ${
                  modelType === 'gnn'
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">River Graph GNN</div>
                <div className="text-[10px] text-slate-400">Reach Topology</div>
              </button>

              <button
                onClick={() => setModelType('ensemble')}
                className={`p-2.5 rounded-lg text-left text-xs font-semibold border transition ${
                  modelType === 'ensemble'
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-200'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="font-bold">SAR + XGBoost</div>
                <div className="text-[10px] text-slate-400">Radar Ensemble</div>
              </button>
            </div>
          </div>

          {/* Slider 1: 24-hr Rainfall */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-300">24-Hour Precipitation Anomaly:</span>
              <span className="font-mono font-bold text-cyan-400">{rainfall24hMm} mm/day</span>
            </div>
            <input
              type="range"
              min="0"
              max="350"
              step="5"
              value={rainfall24hMm}
              onChange={(e) => setRainfall24hMm(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-950 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0 mm (Dry)</span>
              <span>150 mm (Heavy)</span>
              <span>350 mm (Extreme Cloudburst)</span>
            </div>
          </div>

          {/* Slider 2: Soil Moisture Saturation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-300">Antecedent Soil Moisture:</span>
              <span className="font-mono font-bold text-blue-400">{soilMoisturePct}% Saturation</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              step="1"
              value={soilMoisturePct}
              onChange={(e) => setSoilMoisturePct(Number(e.target.value))}
              className="w-full accent-blue-400 cursor-pointer h-2 bg-slate-950 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>30% (High Infiltration)</span>
              <span>70% (Standard Monsoon)</span>
              <span>100% (Zero Infiltration)</span>
            </div>
          </div>

          {/* Slider 3: Upstream Dam / Cascade Spillway Discharge */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-300">Upstream Dam Spillway Release:</span>
              <span className="font-mono font-bold text-amber-400">{damDischargeCumecs.toLocaleString()} m³/s</span>
            </div>
            <input
              type="range"
              min="0"
              max="12000"
              step="250"
              value={damDischargeCumecs}
              onChange={(e) => setDamDischargeCumecs(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-950 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0 m³/s (Closed)</span>
              <span>5,000 m³/s (Standard)</span>
              <span>12,000 m³/s (Emergency Release)</span>
            </div>
          </div>

          {/* Slider 4: Embankment Structural Integrity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="text-slate-300">Embankment & Dyke Health Index:</span>
              <span
                className={`font-mono font-bold ${
                  embankmentIntegrityPct < 60 ? 'text-red-400' : 'text-emerald-400'
                }`}
              >
                {embankmentIntegrityPct}% Integrity
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              step="5"
              value={embankmentIntegrityPct}
              onChange={(e) => setEmbankmentIntegrityPct(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer h-2 bg-slate-950 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>30% (High Rupture Risk)</span>
              <span>75% (Aging Earthen Dyke)</span>
              <span>100% (Reinforced Geo-textile)</span>
            </div>
          </div>
        </div>

        {/* Right Output Panel: 72h Hydrograph & Inundation Prediction (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Output Scorecard Header */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-md shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">Simulated Forecast For</span>
                <h4 className="text-lg font-bold text-white">{basin.name}</h4>
              </div>

              {/* Alert Level Pill */}
              <div
                className={`px-4 py-2 rounded-xl text-xs font-mono font-extrabold uppercase tracking-wider border flex items-center gap-2 ${
                  simulation.alertLevel === 'EXTREME'
                    ? 'bg-red-950 text-red-400 border-red-800 shadow-lg shadow-red-950/60 animate-pulse'
                    : simulation.alertLevel === 'DANGER'
                    ? 'bg-rose-950 text-rose-400 border-rose-800'
                    : simulation.alertLevel === 'WARNING'
                    ? 'bg-amber-950 text-amber-400 border-amber-800'
                    : simulation.alertLevel === 'ADVISORY'
                    ? 'bg-cyan-950 text-cyan-400 border-cyan-800'
                    : 'bg-emerald-950 text-emerald-400 border-emerald-800'
                }`}
              >
                <AlertTriangle className="w-4 h-4" />
                <span>{simulation.alertLevel} STATUS</span>
              </div>
            </div>

            {/* 4 Quantitative Output Metric Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
                <p className="text-[10px] text-slate-400 uppercase font-mono">Predicted Peak Stage</p>
                <p
                  className={`text-xl font-bold font-mono mt-1 ${
                    simulation.peakWaterLevel >= basin.dangerMarkM ? 'text-red-400' : 'text-cyan-300'
                  }`}
                >
                  {simulation.peakWaterLevel} m
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Danger: {basin.dangerMarkM} m ({simulation.dangerDiff > 0 ? `+${simulation.dangerDiff.toFixed(2)}m` : `${simulation.dangerDiff.toFixed(2)}m`})
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
                <p className="text-[10px] text-slate-400 uppercase font-mono">Time to Peak Wave</p>
                <p className="text-xl font-bold font-mono text-amber-300 mt-1">
                  {simulation.timeToPeakHours} Hours
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Evacuation Window: {simulation.evacuationWindowHours}h
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
                <p className="text-[10px] text-slate-400 uppercase font-mono">Peak Inundated Area</p>
                <p className="text-xl font-bold font-mono text-cyan-300 mt-1">
                  {simulation.inundationAreaSqKm.toLocaleString()} km²
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">Submerged floodplain</p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
                <p className="text-[10px] text-slate-400 uppercase font-mono">Citizens in Hazard Zone</p>
                <p className="text-xl font-bold font-mono text-red-300 mt-1">
                  {simulation.populationAtRisk.toLocaleString()}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">Estimated population</p>
              </div>
            </div>

            {/* SVG 72-Hour Hydrograph Chart */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  72-Hour Forward Hydrograph Curve (River Stage vs Danger Threshold)
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Model: {modelType.toUpperCase()}
                </span>
              </div>

              <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-hidden">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-44 overflow-visible">
                  {/* Danger Line (Red dashed) */}
                  <line
                    x1="0"
                    y1={dangerY}
                    x2={chartWidth}
                    y2={dangerY}
                    stroke="#ef4444"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={chartWidth - 5}
                    y={dangerY - 5}
                    textAnchor="end"
                    className="text-[10px] font-mono font-bold fill-red-400"
                  >
                    Danger Level: {basin.dangerMarkM} m
                  </text>

                  {/* Normal Line (Slate dotted) */}
                  <line
                    x1="0"
                    y1={chartHeight - 15}
                    x2={chartWidth}
                    y2={chartHeight - 15}
                    stroke="#334155"
                    strokeWidth="1"
                    strokeDasharray="2 4"
                  />
                  <text
                    x={chartWidth - 5}
                    y={chartHeight - 20}
                    textAnchor="end"
                    className="text-[9px] font-mono fill-slate-500"
                  >
                    Normal Stage: {basin.normalLevelM} m
                  </text>

                  {/* Gradient area under hydrograph */}
                  <defs>
                    <linearGradient id="hydroGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <polygon
                    points={`0,${chartHeight - 15} ${pointsString} ${chartWidth},${chartHeight - 15}`}
                    fill="url(#hydroGrad)"
                  />

                  {/* Hydrograph Curve */}
                  <polyline
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={pointsString}
                  />

                  {/* Peak Marker Dot */}
                  {simulation.hydrograph.map((p, i) => {
                    if (p.waterLevel === simulation.peakWaterLevel) {
                      const x = (p.hour / 72) * chartWidth;
                      const y =
                        chartHeight -
                        ((p.waterLevel - minStage) / stageRange) * (chartHeight - 30) -
                        15;
                      return (
                        <g key={i}>
                          <circle cx={x} cy={y} r="5" fill="#f43f5e" stroke="#fff" strokeWidth="2" />
                          <text
                            x={x}
                            y={y - 10}
                            textAnchor="middle"
                            className="text-[10px] font-mono font-bold fill-white"
                          >
                            Peak: {p.waterLevel}m @ +{p.hour}h
                          </text>
                        </g>
                      );
                    }
                    return null;
                  })}
                </svg>

                {/* X-Axis Labels */}
                <div className="flex justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800 pt-1 mt-1">
                  <span>Now (0h)</span>
                  <span>+12 Hours</span>
                  <span>+24 Hours</span>
                  <span>+36 Hours</span>
                  <span>+48 Hours</span>
                  <span>+60 Hours</span>
                  <span>+72 Hours</span>
                </div>
              </div>
            </div>

            {/* AI Actionable Mitigation Directives */}
            <div className="rounded-xl border border-cyan-900/40 bg-cyan-950/20 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  AI Automated Emergency Mitigation Protocol
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Execution Window: Next {simulation.evacuationWindowHours}h
                </span>
              </div>

              <div className="space-y-2">
                {simulation.actionItems.map((action, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <span className="text-cyan-400 font-bold mt-0.5">•</span>
                    <span>{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
