import React, { useState } from 'react';
import {
  ShieldAlert,
  Radio,
  Copy,
  Check,
  Send,
  LifeBuoy,
  Anchor,
  Compass,
  AlertTriangle,
  Layers,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { NORTH_EAST_STATES } from '../data/northEastStates';

export const MitigationHub: React.FC = () => {
  const [broadcastState, setBroadcastState] = useState<string>('assam');
  const [threatSeverity, setThreatSeverity] = useState<'advisory' | 'danger' | 'extreme'>('danger');
  const [riverName, setRiverName] = useState<string>('Brahmaputra');
  const [activeLanguage, setActiveLanguage] = useState<'english' | 'assamese' | 'bengali' | 'hindi'>('english');
  const [copied, setCopied] = useState(false);

  // Community Assessment interactive state
  const [terrainType, setTerrainType] = useState<'riverine-island' | 'low-floodplain' | 'steep-valley' | 'urban-center'>('low-floodplain');
  const [housingType, setHousingType] = useState<'kutcha-bamboo' | 'semi-pucca' | 'elevated-chang-ghar' | 'concrete-multistory'>('elevated-chang-ghar');
  const [distanceToRiver, setDistanceToRiver] = useState<number>(350);

  // Generate localized alert text
  const alertTexts = {
    english: `EMERGENCY FLOOD ALERT [${threatSeverity.toUpperCase()}]: The ${riverName} river is currently flowing ABOVE DANGER LEVEL in vulnerable districts of ${NORTH_EAST_STATES[broadcastState].name}. High risk of embankment overtopping and flash inundation within the next 12-24 hours. Citizens residing in low-lying riparian areas are advised to immediately move livestock and families to elevated flood shelters. Do not attempt to cross flooded roads or bridges. Emergency Helpline: ${NORTH_EAST_STATES[broadcastState].emergencyHelpline}. Issued by State Disaster Management Authority & CWC.`,

    assamese: `জৰুৰী বান সতৰ্কবাৰ্তা [${threatSeverity.toUpperCase()}]: ${NORTH_EAST_STATES[broadcastState].name}ৰ কেইবাখনো জিলাত ${riverName} নদীৰ জলস্তৰ বিপদসীমাৰ ওপৰেৰে বৈ আছে। অহা ১২-২৪ ঘণ্টাৰ ভিতৰত মথাউৰি ভাঙি পানী সোমোৱাৰ প্ৰবল আশংকা। নদীৰ কাষৰীয়া আৰু নিম্নভূমিৰ ৰাইজক তাৎক্ষণিকভাৱে ওখ বান আশ্ৰয় শিবিৰলৈ যাবলৈ অনুৰোধ জনোৱা হ'ল। বানপানী হোৱা পথ বা দলং পাৰ হ'বলৈ চেষ্টা নকৰিব। জৰুৰীকালীন হেল্পলাইন: ${NORTH_EAST_STATES[broadcastState].emergencyHelpline}।`,

    bengali: `জরুরি বন্যা সতর্কতা [${threatSeverity.toUpperCase()}]: ${NORTH_EAST_STATES[broadcastState].name}-এর ঝুঁকিপূর্ণ জেলাগুলিতে ${riverName} নদীর জলস্তর বিপদসীমার ওপর দিয়ে প্রবাহিত হচ্ছে। আগামী ১২-২৪ ঘণ্টার মধ্যে বাঁধ উপচে প্লাবনের আশঙ্কা রয়েছে। নদী তীরবর্তী ও নিম্নাঞ্চলের বাসিন্দাদের অবিলম্বে পরিবার ও গবাদি পশু নিয়ে নিকটস্থ আশ্রয়কেন্দ্রে যাওয়ার পরামর্শ দেওয়া হচ্ছে। জরুরি হেল্পলাইন: ${NORTH_EAST_STATES[broadcastState].emergencyHelpline}।`,

    hindi: `आपातकालीन बाढ़ चेतावनी [${threatSeverity.toUpperCase()}]: ${NORTH_EAST_STATES[broadcastState].name} के संवेदनशील जिलों में ${riverName} नदी का जलस्तर खतरे के निशान से ऊपर बह रहा है। अगले 12 से 24 घंटों में तटबंध टूटने और बाढ़ का गंभीर खतरा है। निचले इलाकों में रहने वाले नागरिकों से तुरंत ऊंचे बाढ़ आश्रय स्थलों पर जाने का अनुरोध किया जाता है। आपातकालीन हेल्पलाइन: ${NORTH_EAST_STATES[broadcastState].emergencyHelpline}।`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(alertTexts[activeLanguage]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Compute Community Risk Score
  const calculateCommunityRisk = () => {
    let score = 50;
    if (terrainType === 'riverine-island') score += 35;
    if (terrainType === 'low-floodplain') score += 25;
    if (terrainType === 'steep-valley') score += 20;

    if (housingType === 'kutcha-bamboo') score += 20;
    if (housingType === 'semi-pucca') score += 10;
    if (housingType === 'elevated-chang-ghar') score -= 15;
    if (housingType === 'concrete-multistory') score -= 25;

    if (distanceToRiver < 200) score += 25;
    else if (distanceToRiver < 500) score += 15;
    else if (distanceToRiver < 1000) score += 5;
    else score -= 10;

    return Math.min(100, Math.max(10, score));
  };

  const communityRiskScore = calculateCommunityRisk();

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="rounded-2xl border border-rose-900/50 bg-gradient-to-r from-slate-950 via-slate-900 to-rose-950/30 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-950/80 text-rose-300 border border-rose-800/60">
            <Radio className="w-3.5 h-3.5" />
            <span>Disaster Mitigation & Early Action Network</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI-Enhanced Disaster Mitigation Strategies & Community Early Warning
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Machine learning shifts flood mitigation from passive recovery to predictive defense: real-time satellite embankment monitoring, multilingual automated citizen broadcasts, and community risk preparedness.
          </p>
        </div>
      </div>

      {/* 4 Structural vs AI Non-Structural Mitigation Strategies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-3">
          <div className="p-2.5 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/60 w-fit">
            <Layers className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">InSAR Embankment Health AI</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Interferometric Synthetic Aperture Radar (InSAR) monitors millimeter-level ground subsidence along Assam's 4,474 km dykes, predicting structural breaches 48-72 hours before failure.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-3">
          <div className="p-2.5 rounded-xl bg-blue-950 text-blue-400 border border-blue-800/60 w-fit">
            <Anchor className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Bathymetric Dredging AI</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Predicts dynamic sediment deposition sandbars (chars) in the Brahmaputra, prioritizing targeted riverbed dredging to keep navigation channels open and lower flood stage crests.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-3">
          <div className="p-2.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/60 w-fit">
            <LifeBuoy className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Autonomous Drone Search & Rescue</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Thermal and optical drones map marooned river hamlets on Majuli and Silchar, calculating optimal Gemini motorized rescue boat dispatch routes through flooded terrain.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-3">
          <div className="p-2.5 rounded-xl bg-amber-950 text-amber-400 border border-amber-800/60 w-fit">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-white">Elevated Highland Network</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Optimizes spatial placement of elevated earthen mounds and community flood shelters across Kaziranga and rural districts, ensuring safe refuge for wildlife and rural families.
          </p>
        </div>
      </div>

      {/* Multilingual Emergency Citizen Alert Generator */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Radio className="w-5 h-5 text-red-400" />
              Multilingual Emergency Broadcast Generator (CAP Protocol)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Generates official Common Alerting Protocol (CAP) SMS & siren broadcasts in vernacular North-East languages.
            </p>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-red-950 text-red-300 border border-red-800/60">
            Civil Defense & Media Dispatch
          </span>
        </div>

        {/* Generator Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase">Target State:</label>
            <select
              value={broadcastState}
              onChange={(e) => setBroadcastState(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-medium"
            >
              {Object.values(NORTH_EAST_STATES).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase">Threat Severity:</label>
            <select
              value={threatSeverity}
              onChange={(e) => setThreatSeverity(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-medium"
            >
              <option value="advisory">Advisory (Rising River)</option>
              <option value="danger">Danger (Above Danger Level)</option>
              <option value="extreme">Extreme (Embankment Rupture)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase">Threat River:</label>
            <input
              type="text"
              value={riverName}
              onChange={(e) => setRiverName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-medium"
              placeholder="e.g. Brahmaputra / Barak"
            />
          </div>
        </div>

        {/* Language Tabs */}
        <div className="flex border-b border-slate-800 gap-2">
          <button
            onClick={() => setActiveLanguage('english')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition ${
              activeLanguage === 'english'
                ? 'bg-slate-800 text-white border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setActiveLanguage('assamese')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition ${
              activeLanguage === 'assamese'
                ? 'bg-slate-800 text-white border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            অসমীয়া (Assamese)
          </button>
          <button
            onClick={() => setActiveLanguage('bengali')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition ${
              activeLanguage === 'bengali'
                ? 'bg-slate-800 text-white border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            বাংলা (Bengali)
          </button>
          <button
            onClick={() => setActiveLanguage('hindi')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition ${
              activeLanguage === 'hindi'
                ? 'bg-slate-800 text-white border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            हिन्दी (Hindi)
          </button>
        </div>

        {/* Broadcast Message Box */}
        <div className="relative rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed">
          <p>{alertTexts[activeLanguage]}</p>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800 text-xs">
            <span className="text-slate-500 font-sans">
              Character Count: {alertTexts[activeLanguage].length} • Formatted for SMS & Cell Broadcast
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-sans font-semibold transition"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Alert!' : 'Copy Broadcast'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Community Preparedness & Vulnerability Assessment */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            Community & Habitation Flood Vulnerability Calculator
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluate localized flood susceptibility based on geomorphology, traditional architecture, and distance to active river channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase">Terrain Topography:</label>
              <select
                value={terrainType}
                onChange={(e) => setTerrainType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="riverine-island">Riverine Sand Island / Char (e.g. Majuli)</option>
                <option value="low-floodplain">Low-lying Alluvial Floodplain (e.g. Dhemaji, Barpeta)</option>
                <option value="steep-valley">Steep Mountain Valley / Gorge (e.g. Siang, Teesta)</option>
                <option value="urban-center">Urban Drainage Basin (e.g. Guwahati, Silchar, Imphal)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase">Structural Housing Type:</label>
              <select
                value={housingType}
                onChange={(e) => setHousingType(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="elevated-chang-ghar">Indigenous Elevated Bamboo Stilt House (Chang Ghar / Mishing Architecture)</option>
                <option value="concrete-multistory">Reinforced Concrete Multi-Story (Pucca)</option>
                <option value="semi-pucca">Semi-Pucca (Brick walls, tin roof, ground level)</option>
                <option value="kutcha-bamboo">Kutcha Bamboo / Mud Structure (Ground level)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Distance to Nearest River Embankment:</span>
                <span className="font-mono text-cyan-400">{distanceToRiver} meters</span>
              </div>
              <input
                type="range"
                min="50"
                max="2500"
                step="50"
                value={distanceToRiver}
                onChange={(e) => setDistanceToRiver(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-950 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>50m (Direct Dykeside)</span>
                <span>1,000m (Intermediate)</span>
                <span>2,500m (Buffer Zone)</span>
              </div>
            </div>
          </div>

          {/* Result Card (5 cols) */}
          <div className="lg:col-span-5 rounded-xl border border-slate-800 bg-slate-950/80 p-5 text-center space-y-3">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Calculated Vulnerability</span>
            <div className="flex items-center justify-center gap-2">
              <span
                className={`text-4xl font-extrabold font-mono ${
                  communityRiskScore > 75
                    ? 'text-red-400'
                    : communityRiskScore > 50
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {communityRiskScore}
              </span>
              <span className="text-xs text-slate-500 font-mono">/ 100</span>
            </div>

            <p
              className={`text-xs font-bold uppercase tracking-wider ${
                communityRiskScore > 75
                  ? 'text-red-400'
                  : communityRiskScore > 50
                  ? 'text-amber-400'
                  : 'text-emerald-400'
              }`}
            >
              {communityRiskScore > 75
                ? 'High Risk - Priority Evacuation Zone'
                : communityRiskScore > 50
                ? 'Moderate Risk - Stage Resources'
                : 'Resilient / Low Risk'}
            </p>

            <div className="text-[11px] text-slate-300 text-left pt-2 border-t border-slate-800 space-y-1">
              <p>• Indigenous elevated stilt houses (Chang Ghar) provide up to 2.5m vertical flood clearance.</p>
              <p>• Keep battery-powered FM radios tuned to State Disaster broadcast frequencies.</p>
              <p>• Pre-mark cattle evacuation corridors toward high-altitude earthen mounds.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
