import React, { useState } from 'react';
import { ML_MODELS } from '../data/mlModels';
import { MLModelDetail } from '../types/flood';
import {
  Cpu,
  Zap,
  Activity,
  CheckCircle2,
  AlertCircle,
  Database,
  ArrowRight,
  Sparkles,
  BookOpen,
  Scale
} from 'lucide-react';

export const MLModelsShowcase: React.FC = () => {
  const [selectedModelId, setSelectedModelId] = useState<string>(ML_MODELS[0].id);

  const activeModel = ML_MODELS.find((m) => m.id === selectedModelId) || ML_MODELS[0];

  return (
    <div className="space-y-8">
      {/* Top Intro Banner */}
      <div className="rounded-2xl border border-cyan-900/50 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/30 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Advanced Hydro-Informatics & Deep Learning</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Machine Learning Architectures for Flood Prediction & Disaster Mitigation
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            North-East India poses unprecedented hydrological challenges: torrential Himalayan runoff, pervasive monsoon cloud cover blinding optical satellites, braided riverbeds, and transboundary data bottlenecks. Explore the five foundational machine learning paradigms engineered to overcome these hurdles.
          </p>
        </div>
      </div>

      {/* Model Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {ML_MODELS.map((model) => {
          const isSelected = model.id === selectedModelId;
          return (
            <button
              key={model.id}
              onClick={() => setSelectedModelId(model.id)}
              className={`p-4 rounded-xl text-left transition-all border ${
                isSelected
                  ? 'bg-cyan-950/70 border-cyan-500/80 text-white shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-semibold uppercase">
                  {model.category}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold">{model.leadTime.split('(')[0]}</span>
              </div>
              <h3 className="font-bold text-sm line-clamp-1">{model.name}</h3>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{model.coreArchitecture}</p>
            </button>
          );
        })}
      </div>

      {/* Detailed Selected Model Deep Dive */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-6">
        {/* Model Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400">
                <Cpu className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">{activeModel.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Paradigm: <span className="text-cyan-300 font-semibold">{activeModel.category}</span> • Spatial Resolution:{' '}
                  <span className="text-slate-200 font-mono">{activeModel.spatialResolution}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-left">
              <p className="text-[10px] text-slate-400 uppercase font-mono">Lead Time</p>
              <p className="text-xs font-bold text-cyan-400 font-mono">{activeModel.leadTime}</p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-left">
              <p className="text-[10px] text-slate-400 uppercase font-mono">Benchmark Accuracy</p>
              <p className="text-xs font-bold text-emerald-400 font-mono">{activeModel.accuracyMetric}</p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-left">
              <p className="text-[10px] text-slate-400 uppercase font-mono">Inference Latency</p>
              <p className="text-xs font-bold text-amber-400 font-mono">{activeModel.computationalLatency}</p>
            </div>
          </div>
        </div>

        {/* Architecture Pipeline Flow Diagram */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 font-mono">
            <Activity className="w-4 h-4 text-cyan-400" />
            End-to-End Operational Pipeline & Data Transformation Flow
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Stage 1: Ingestion */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-cyan-400" /> Input Ingestion
                </span>
                <span className="text-[10px] font-mono text-cyan-400">Step 01</span>
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5">
                {activeModel.keyInputs.map((input, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-cyan-400 font-bold mt-0.5">•</span>
                    <span>{input}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stage 2: Core ML Engine */}
            <div className="rounded-xl border border-cyan-800/60 bg-cyan-950/30 p-4 space-y-2 relative shadow-lg shadow-cyan-950/50">
              <div className="flex items-center justify-between text-xs font-bold text-cyan-200">
                <span className="flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Core ML Engine
                </span>
                <span className="text-[10px] font-mono text-cyan-300">Step 02</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {activeModel.coreArchitecture}
              </p>
              <div className="mt-2 pt-2 border-t border-cyan-800/40 text-[11px] text-cyan-300 font-mono">
                Forward Pass: {activeModel.computationalLatency}
              </div>
            </div>

            {/* Stage 3: Flood Deliverables */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" /> Actionable Output
                </span>
                <span className="text-[10px] font-mono text-emerald-400">Step 03</span>
              </div>
              <ul className="text-xs text-slate-400 space-y-1.5">
                {activeModel.outputs.map((out, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold mt-0.5">•</span>
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mathematical Loss / Formulation */}
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              Mathematical Formulation & Objective Loss Function
            </span>
            <span className="text-[10px] font-mono text-slate-500">LaTeX / Physics Operator</span>
          </div>
          <div className="bg-slate-900/80 rounded-lg p-3 overflow-x-auto text-xs font-mono text-cyan-300 border border-slate-800">
            <code>{activeModel.equationOrConcept}</code>
          </div>
        </div>

        {/* Pros, Cons, and NE India Suitability */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Advantages */}
          <div className="rounded-xl border border-emerald-900/40 bg-emerald-950/10 p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Key Architectural Strengths
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeModel.advantages.map((adv, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <span>{adv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations */}
          <div className="rounded-xl border border-amber-900/40 bg-amber-950/10 p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400" /> Limitations & Edge Cases
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {activeModel.limitations.map((lim, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold mt-0.5">!</span>
                  <span>{lim}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* NE India Domain Suitability */}
          <div className="rounded-xl border border-cyan-900/40 bg-cyan-950/10 p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-cyan-400" /> NE India Field Relevance
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeModel.neIndiaSuitability}
            </p>
          </div>
        </div>
      </div>

      {/* Comprehensive Cross-Model Comparison Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-md shadow-xl space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Cross-Model Benchmark & Operational Trade-Off Matrix
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare model properties across lead time, accuracy, computational burden, and cloud tolerance.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4">Model Architecture</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Lead Time</th>
                <th className="py-3 px-4">Accuracy Metric</th>
                <th className="py-3 px-4">Resolution</th>
                <th className="py-3 px-4">Latency</th>
                <th className="py-3 px-4">Best Field Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 font-sans">
              {ML_MODELS.map((m) => (
                <tr
                  key={m.id}
                  onClick={() => setSelectedModelId(m.id)}
                  className={`cursor-pointer transition hover:bg-slate-800/40 ${
                    m.id === selectedModelId ? 'bg-cyan-950/40 font-medium' : ''
                  }`}
                >
                  <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                    {m.id === selectedModelId && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />}
                    {m.name.split('(')[0]}
                  </td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{m.category}</td>
                  <td className="py-3 px-4 font-mono text-emerald-400">{m.leadTime.split('(')[0]}</td>
                  <td className="py-3 px-4 font-mono text-amber-300">{m.accuracyMetric.split('|')[0]}</td>
                  <td className="py-3 px-4 text-slate-300">{m.spatialResolution}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{m.computationalLatency}</td>
                  <td className="py-3 px-4 text-slate-300">{m.neIndiaSuitability.split('.')[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
