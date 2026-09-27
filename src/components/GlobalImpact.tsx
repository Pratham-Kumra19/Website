import React, { useState } from 'react';
import { GLOBAL_CASE_STUDIES, BENCHMARK_COMPARISON } from '../data/globalCaseStudies';
import { GlobalCaseStudy } from '../types/flood';
import {
  Globe2,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Quote,
  Lightbulb,
  Building,
  Award,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export const GlobalImpact: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(GLOBAL_CASE_STUDIES[0].id);
  const [regionFilter, setRegionFilter] = useState<'all' | 'india-asia' | 'europe' | 'americas'>('all');

  const filteredCases = GLOBAL_CASE_STUDIES.filter((c) => {
    if (regionFilter === 'all') return true;
    if (regionFilter === 'india-asia')
      return c.countryRegion.includes('India') || c.countryRegion.includes('Japan') || c.countryRegion.includes('Asia');
    if (regionFilter === 'europe')
      return c.countryRegion.includes('European') || c.countryRegion.includes('Netherlands');
    if (regionFilter === 'americas') return c.countryRegion.includes('United States');
    return true;
  });

  const activeCase = GLOBAL_CASE_STUDIES.find((c) => c.id === selectedCaseId) || GLOBAL_CASE_STUDIES[0];

  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <div className="rounded-2xl border border-emerald-900/50 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/30 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Worldwide Evidence & Real Results</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How AI Is Improving Flood Warnings Around the World
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            From the Ganges and Brahmaputra river plains to Japan’s mountain rivers and Europe’s Rhine delta, field projects show that AI gives communities days of advance warning instead of just hours.
          </p>
        </div>
      </div>

      {/* Global Impact Quantitative Benchmarks Grid */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-md shadow-xl space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Traditional Methods vs. AI Forecasting: What the Data Shows
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Measured improvements documented across global flood monitoring networks.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4">Forecasting Dimension</th>
                <th className="py-3 px-4">Legacy / Traditional Methods</th>
                <th className="py-3 px-4">AI / ML-Powered Paradigm</th>
                <th className="py-3 px-4">Net Operational Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 font-sans">
              {BENCHMARK_COMPARISON.map((b, i) => (
                <tr key={i} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-bold text-white">{b.capability}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{b.traditional}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300 font-semibold">{b.mlEnhanced}</td>
                  <td className="py-3 px-4 font-semibold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{b.gain}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Region Filter Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Filter Region:</span>
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setRegionFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                regionFilter === 'all' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Basins ({GLOBAL_CASE_STUDIES.length})
            </button>
            <button
              onClick={() => setRegionFilter('india-asia')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                regionFilter === 'india-asia' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              India & Asia
            </button>
            <button
              onClick={() => setRegionFilter('europe')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                regionFilter === 'europe' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Europe
            </button>
            <button
              onClick={() => setRegionFilter('americas')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                regionFilter === 'americas' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              North America
            </button>
          </div>
        </div>
      </div>

      {/* Case Study Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCases.map((study) => {
          const isSelected = study.id === selectedCaseId;

          return (
            <div
              key={study.id}
              onClick={() => setSelectedCaseId(study.id)}
              className={`rounded-2xl border p-5 cursor-pointer transition-all shadow-lg space-y-4 ${
                isSelected
                  ? 'bg-cyan-950/40 border-cyan-500 ring-2 ring-cyan-400/40 shadow-cyan-950/40'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-semibold uppercase">
                  {study.countryRegion.split('&')[0]}
                </span>
                <span className="text-[10px] font-mono text-slate-400">Est. {study.yearStarted}</span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition">
                  {study.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-1">{study.organization}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                <div className="p-2 rounded-lg bg-slate-950/60">
                  <p className="text-[9px] text-slate-400 uppercase font-mono">Traditional</p>
                  <p className="text-xs font-bold text-slate-300 font-mono line-clamp-1">
                    {study.traditionalLeadTime.split('(')[0]}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-800/40">
                  <p className="text-[9px] text-emerald-400 uppercase font-mono">ML Lead Time</p>
                  <p className="text-xs font-bold text-emerald-300 font-mono line-clamp-1">
                    {study.mlLeadTime.split('(')[0]}
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-300 line-clamp-2">
                {study.keyAchievements[0]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Featured Case Study Deep Dive */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400">
                <Award className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">{activeCase.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Deployment Region: <span className="text-cyan-300 font-medium">{activeCase.countryRegion}</span> • Managing Agency:{' '}
                  <span className="text-slate-200 font-medium">{activeCase.organization}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-left">
              <p className="text-[10px] text-slate-400 uppercase font-mono">Population Covered</p>
              <p className="text-xs font-bold text-cyan-400 font-mono">{activeCase.peopleImpacted}</p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-left">
              <p className="text-[10px] text-slate-400 uppercase font-mono">False Alarm Cut</p>
              <p className="text-xs font-bold text-emerald-400 font-mono">{activeCase.falseAlarmReduction}</p>
            </div>
          </div>
        </div>

        {/* Machine Learning Methodology */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            Core Machine Learning Methodology & Architecture
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed font-sans">{activeCase.mlApproach}</p>
        </div>

        {/* Key Real-World Achievements */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Empirical Results & Field Achievements
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            {activeCase.keyAchievements.map((ach, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-emerald-400 font-bold mt-1">✓</span>
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Direct Lessons for North-East India */}
        <div className="rounded-xl border border-cyan-900/50 bg-cyan-950/20 p-5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Direct Lessons & Technology Transfer for North-East India (Brahmaputra & Barak)
          </h4>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {activeCase.lessonsForNEIndia}
          </p>
        </div>

        {/* Featured Field Quote */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4 italic text-xs text-slate-400 flex items-start gap-3">
          <Quote className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
          <span>"{activeCase.featuredQuote}"</span>
        </div>
      </div>
    </div>
  );
};
