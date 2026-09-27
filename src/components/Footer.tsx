import React from 'react';
import { Waves, ExternalLink, ShieldCheck, Database, FileText } from 'lucide-react';
import { LpuLogo } from './LpuLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 mt-16 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mandate */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <LpuLogo className="w-10 h-10" />
              <div>
                <span className="text-base font-extrabold text-white">
                  JalDrishti <span className="text-cyan-400 font-mono">NE</span>
                </span>
                <p className="text-[10px] text-slate-400">Lovely Professional University</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              A comprehensive open hydro-informatics and machine learning intelligence hub dedicated to monitoring, predicting, and mitigating annual flood catastrophes across North-East India (Assam, Arunachal Pradesh, Meghalaya, Manipur, Mizoram, Nagaland, Tripura, and Sikkim).
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <span>LPU Research Initiative • Hydrometeorological & Remote Sensing Intelligence</span>
            </div>
          </div>

          {/* Primary Data Sources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              Institutional Data Sources
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 hover:text-white transition">
                <Database className="w-3 h-3 text-cyan-400" />
                <span>Central Water Commission (CWC)</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition">
                <Database className="w-3 h-3 text-cyan-400" />
                <span>India Meteorological Dept (IMD)</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition">
                <Database className="w-3 h-3 text-cyan-400" />
                <span>ISRO - NESAC (Shillong)</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition">
                <Database className="w-3 h-3 text-cyan-400" />
                <span>Brahmaputra Board & ASDMA</span>
              </li>
            </ul>
          </div>

          {/* Machine Learning Foundations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono">
              AI Frameworks & Benchmarks
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-white transition">Google Flood Hub Hydrologic AI</li>
              <li className="hover:text-white transition">Copernicus GloFAS ML ECMWF</li>
              <li className="hover:text-white transition">Saint-Venant PINN 2D Solvers</li>
              <li className="hover:text-white transition">Sentinel-1 C-Band SAR U-Net</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 JalDrishti NE Research & Disaster Mitigation Platform. For civil defense, education, and early action.</p>
          <div className="flex items-center gap-4">
            <span>National Disaster Helpline: 112 / 1070</span>
            <span>ASDMA Assam: 1079</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
