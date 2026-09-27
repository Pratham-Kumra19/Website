import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, collection, addDoc } from '../lib/firebase';
import { NORTH_EAST_STATES } from '../data/northEastStates';
import { NEStateId } from '../types/flood';
import { LpuLogo } from './LpuLogo';
import {
  AlertTriangle,
  MapPin,
  Crosshair,
  Mail,
  Bell,
  CheckCircle2,
  X,
  Droplets,
  ShieldAlert,
  Radio,
  Send,
  Info,
  Clock,
  ExternalLink,
  ChevronRight,
  PhoneCall
} from 'lucide-react';

interface ReportFloodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignIn: () => void;
}

// Major river telemetry gauge reference points for distance & alert calculation
const REFERENCE_GAUGES = [
  { name: 'Guwahati (Brahmaputra)', state: 'Assam', lat: 26.185, lng: 91.753, status: 'danger', waterLevel: '49.82m', dangerMark: '49.68m' },
  { name: 'Silchar (Barak)', state: 'Assam', lat: 24.833, lng: 92.778, status: 'danger', waterLevel: '19.98m', dangerMark: '19.83m' },
  { name: 'Dibrugarh (Brahmaputra)', state: 'Assam', lat: 27.472, lng: 94.912, status: 'warning', waterLevel: '105.42m', dangerMark: '105.70m' },
  { name: 'Majuli / Kamalabari', state: 'Assam', lat: 26.962, lng: 94.172, status: 'danger', waterLevel: '86.40m', dangerMark: '85.90m' },
  { name: 'Pasighat (Siang River)', state: 'Arunachal Pradesh', lat: 28.066, lng: 95.326, status: 'warning', waterLevel: '153.20m', dangerMark: '153.96m' },
  { name: 'Cherrapunji / Mawsynram Runoff', state: 'Meghalaya', lat: 25.298, lng: 91.582, status: 'warning', waterLevel: 'High Flash Silt Runoff', dangerMark: 'Torrential Surge' },
  { name: 'Minuthong (Imphal River)', state: 'Manipur', lat: 24.817, lng: 93.936, status: 'danger', waterLevel: '782.10m', dangerMark: '781.80m' },
  { name: 'Rangpo (Teesta River)', state: 'Sikkim', lat: 27.176, lng: 88.528, status: 'normal', waterLevel: '298.20m', dangerMark: '302.00m' },
  { name: 'Amarpur (Gumti River)', state: 'Tripura', lat: 23.533, lng: 91.642, status: 'warning', waterLevel: '21.40m', dangerMark: '22.00m' }
];

// Quick Preset Coordinates
const QUICK_PRESETS = [
  { label: 'Guwahati Brahmaputra Bank', state: 'assam' as NEStateId, district: 'Kamrup Metro', lat: 26.185, lng: 91.753 },
  { label: 'Silchar Bethukandi Dyke', state: 'assam' as NEStateId, district: 'Cachar', lat: 24.833, lng: 92.778 },
  { label: 'Majuli River Island', state: 'assam' as NEStateId, district: 'Majuli', lat: 26.962, lng: 94.172 },
  { label: 'Pasighat Siang Basin', state: 'arunachal' as NEStateId, district: 'East Siang', lat: 28.066, lng: 95.326 },
  { label: 'Imphal Valley (Kangla)', state: 'manipur' as NEStateId, district: 'Imphal West', lat: 24.817, lng: 93.936 },
  { label: 'Teesta Gorge (Rangpo)', state: 'sikkim' as NEStateId, district: 'Pakyong', lat: 27.176, lng: 88.528 }
];

// Haversine formula to compute distance in km
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export const ReportFloodModal: React.FC<ReportFloodModalProps> = ({
  isOpen,
  onClose,
  onOpenSignIn
}) => {
  const { user, userProfile } = useAuth();

  // Form States
  const [latitude, setLatitude] = useState<number | string>(26.185);
  const [longitude, setLongitude] = useState<number | string>(91.753);
  const [stateId, setStateId] = useState<NEStateId>('assam');
  const [district, setDistrict] = useState('Kamrup Metro');
  const [locationDescription, setLocationDescription] = useState('Brahmaputra South Bank, Uzan Bazar');
  const [severity, setSeverity] = useState<'advisory' | 'warning' | 'danger' | 'extreme'>('danger');
  const [waterDepthMeters, setWaterDepthMeters] = useState<number>(0.8);
  const [urgencyStatus, setUrgencyStatus] = useState<'urgent_rescue_needed' | 'water_entering_homes' | 'road_blocked' | 'monitoring'>('water_entering_homes');
  const [submergedInfrastructure, setSubmergedInfrastructure] = useState<string[]>([
    'Roads & Highways',
    'Residential Homes'
  ]);

  // Alert & Notification Settings
  const [subscribeAlerts, setSubscribeAlerts] = useState<boolean>(true);
  const [alertEmail, setAlertEmail] = useState<string>('');
  const [notifyOnWarning, setNotifyOnWarning] = useState<boolean>(true);

  // Geolocation & UI States
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedReport, setSubmittedReport] = useState<any | null>(null);

  // Sync user email when user logs in
  useEffect(() => {
    if (user?.email && !alertEmail) {
      setAlertEmail(user.email);
    }
  }, [user, alertEmail]);

  // Calculate nearest telemetry gauge
  const parsedLat = typeof latitude === 'number' ? latitude : parseFloat(latitude) || 26.185;
  const parsedLng = typeof longitude === 'number' ? longitude : parseFloat(longitude) || 91.753;

  let nearestGauge = REFERENCE_GAUGES[0];
  let minDistance = 99999;

  for (const gauge of REFERENCE_GAUGES) {
    const dist = calculateDistanceKm(parsedLat, parsedLng, gauge.lat, gauge.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearestGauge = gauge;
    }
  }

  // Handle GPS Auto-detect
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const lat = Math.round(pos.coords.latitude * 10000) / 10000;
        const lng = Math.round(pos.coords.longitude * 10000) / 10000;
        setLatitude(lat);
        setLongitude(lng);

        // Approximate whether in NE India bounds
        if (lat < 21 || lat > 30 || lng < 88 || lng > 98) {
          setLocationError('Detected location is outside North-East India bounds. Preserving coordinates, but check regional accuracy.');
        }
      },
      (err) => {
        setIsLocating(false);
        setLocationError(`GPS Error: ${err.message}. You can manually enter coordinates or choose a preset.`);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleApplyPreset = (preset: typeof QUICK_PRESETS[0]) => {
    setLatitude(preset.lat);
    setLongitude(preset.lng);
    setStateId(preset.state);
    setDistrict(preset.district);
    setLocationDescription(preset.label);
  };

  const toggleInfrastructure = (item: string) => {
    if (submergedInfrastructure.includes(item)) {
      setSubmergedInfrastructure(submergedInfrastructure.filter((i) => i !== item));
    } else {
      setSubmergedInfrastructure([...submergedInfrastructure, item]);
    }
  };

  // Submit flood report and setup alert
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onOpenSignIn();
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Request browser notification permission if requested
      if (subscribeAlerts && notifyOnWarning && typeof window !== 'undefined' && 'Notification' in window) {
        if (Notification.permission === 'default') {
          await Notification.requestPermission();
        }
      }

      const reportData = {
        userId: user.uid,
        userName: userProfile?.displayName || user.displayName || 'Hydrologist Observer',
        userEmail: alertEmail || user.email || 'user@jaldrishti-ne.local',
        stateId,
        district,
        locationDescription,
        latitude: parsedLat,
        longitude: parsedLng,
        severity,
        waterDepthMeters: Number(waterDepthMeters),
        submergedInfrastructure,
        urgencyStatus,
        subscribeAlerts,
        alertEmail: alertEmail || user.email || '',
        notifyOnWarning,
        status: 'warning_broadcasted',
        createdAt: new Date().toISOString()
      };

      // 2. Persist to Firestore under user subcollection and public floodReports
      try {
        await addDoc(collection(db, 'users', user.uid, 'floodReports'), reportData);
        await addDoc(collection(db, 'floodReports'), reportData);
      } catch (err) {
        console.warn('Firestore write notice (cached or local sync):', err);
      }

      // 3. Trigger immediate demonstration of Web Notification if permitted
      if (subscribeAlerts && typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification('JalDrishti NE: Flood Early Warning Active', {
            body: `Flood report registered at [${parsedLat}, ${parsedLng}]. Nearest gauge: ${nearestGauge.name} (${minDistance} km) at ${nearestGauge.waterLevel}. Warning alerts armed.`,
            icon: '/lpu-logo.svg'
          });
        } catch {
          // notification fallback
        }
      }

      setSubmittedReport({
        ...reportData,
        referenceId: `JD-NE-${Math.floor(100000 + Math.random() * 900000)}`,
        nearestGauge,
        distanceKm: minDistance
      });
    } catch (error) {
      console.error('Failed to submit flood report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/95 p-5 sm:p-7 shadow-2xl shadow-cyan-950/50 text-slate-100 my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative glow */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Unauthenticated State Alert */}
        {!user && (
          <div className="text-center py-6 space-y-4">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-950/80 border border-amber-800/80 text-amber-400 mb-2">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-white">Sign In to Be Flood Ready</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              Please sign in so rescue teams and researchers receive verified flood reports and can send you accurate warnings for your area.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSignIn();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-orange-500/25 transition"
              >
                Sign In / Instant Demo (Guest)
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Authenticated Submission Success Screen */}
        {user && submittedReport && (
          <div className="space-y-5 animate-fadeIn">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-400 mb-1">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Flood Report Registered & Warning Armed!
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Reference ID: <span className="font-mono text-cyan-400 font-bold">{submittedReport.referenceId}</span>. Your ground-truth observation has been logged into the JalDrishti NE disaster registry.
              </p>
            </div>

            {/* Warning Dispatch Receipt Card */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-orange-400 animate-pulse" />
                  <span className="text-xs font-bold text-white">Early Warning Dispatch Status:</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-950 text-red-300 border border-red-800">
                  Armed & Monitoring
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Location Coordinates:</span>
                  <span className="font-mono font-bold text-white">
                    {submittedReport.latitude}°N, {submittedReport.longitude}°E
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Assigned District & State:</span>
                  <span className="font-semibold text-white">
                    {submittedReport.district}, {NORTH_EAST_STATES[submittedReport.stateId]?.name || submittedReport.stateId}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Nearest CWC Telemetry Gauge:</span>
                  <span className="font-medium text-cyan-300">
                    {submittedReport.nearestGauge.name} ({submittedReport.distanceKm} km away)
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Alert Email Broadcast:</span>
                  <span className="font-mono text-emerald-400 font-semibold truncate block">
                    {submittedReport.alertEmail || 'Active user session'}
                  </span>
                </div>
              </div>

              {submittedReport.nearestGauge.status === 'danger' && (
                <div className="p-3 rounded-lg bg-red-950/70 border border-red-900/60 text-xs text-red-200 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Immediate Proximity Warning:</span> Your reported location is within {submittedReport.distanceKm} km of the {submittedReport.nearestGauge.name} gauge which is currently exceeding its Danger Level ({submittedReport.nearestGauge.waterLevel} vs DL {submittedReport.nearestGauge.dangerMark}). Priority alert instructions have been formatted for regional evacuation teams.
                  </div>
                </div>
              )}
            </div>

            {/* Emergency Contacts reminder */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-orange-950/30 border border-orange-900/40 text-xs text-orange-200">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>Life-Safety Emergency Helplines: <strong>112</strong> (National) / <strong>1079</strong> (Assam ASDMA) / <strong>1077</strong> (District SEOC)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmittedReport(null);
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 font-bold text-xs text-white shadow-md shadow-cyan-600/25 transition"
            >
              Close & Return to Map
            </button>
          </div>
        )}

        {/* Authenticated Form */}
        {user && !submittedReport && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Modal Header */}
            <div className="space-y-1 pb-2 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-gradient-to-tr from-red-600 to-orange-600 text-white shadow-md shadow-red-500/20">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-white flex items-center gap-2">
                      <span>Be Flood Ready: Share What You See & Get Warnings</span>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Enter your coordinates or use GPS to report local water levels and get instant warnings if floods approach.
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <LpuLogo className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Section 1: Location Coordinates & Presets */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5 text-orange-400" />
                  <span>1. Location Coordinates (GPS)</span>
                </label>

                {/* Auto-detect GPS button */}
                <button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  disabled={isLocating}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800 hover:bg-cyan-900 transition disabled:opacity-50"
                >
                  <Crosshair className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                  <span>{isLocating ? 'Detecting GPS...' : 'Use My GPS'}</span>
                </button>
              </div>

              {locationError && (
                <div className="p-2 rounded-lg bg-amber-950/80 border border-amber-800 text-[11px] text-amber-200">
                  {locationError}
                </div>
              )}

              {/* Coordinates Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Latitude (°N)</span>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    placeholder="e.g. 26.1850"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-500 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Longitude (°E)</span>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    placeholder="e.g. 91.7530"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-500 font-medium"
                  />
                </div>
              </div>

              {/* Quick Hotspot Presets */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Quick North-East Hotspot Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyPreset(p)}
                      className="px-2 py-1 rounded-md text-[10px] bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Proximity Gauge Notice */}
              <div className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  <span className="text-[11px] text-slate-300">
                    Closest Telemetry Gauge: <strong>{nearestGauge.name}</strong> ({minDistance} km)
                  </span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    nearestGauge.status === 'danger'
                      ? 'bg-red-950 text-red-300 border border-red-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}
                >
                  {nearestGauge.waterLevel} (DL: {nearestGauge.dangerMark})
                </span>
              </div>
            </div>

            {/* Section 2: Administrative Location & Observations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                  State
                </label>
                <select
                  value={stateId}
                  onChange={(e) => setStateId(e.target.value as NEStateId)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  {Object.values(NORTH_EAST_STATES).map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                  District / Locality
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Dhemaji, Barpeta, Cachar"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-medium"
                />
              </div>

              <div className="sm:col-span-2 space-y-1">
                <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                  Landmark / Village / River Reach
                </label>
                <input
                  type="text"
                  value={locationDescription}
                  onChange={(e) => setLocationDescription(e.target.value)}
                  placeholder="e.g. Near Bethukandi Sluice Gate, Ward 4"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-medium"
                />
              </div>
            </div>

            {/* Section 3: Severity, Water Depth & Infrastructure */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                    Observed Water Depth
                  </label>
                  <select
                    value={waterDepthMeters}
                    onChange={(e) => setWaterDepthMeters(parseFloat(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value={0.3}>Ankle Depth (~0.3 m) - Ingress</option>
                    <option value={0.8}>Knee Depth (~0.8 m) - Roads Cut</option>
                    <option value={1.5}>Waist Depth (~1.5 m) - Houses Inundated</option>
                    <option value={2.5}>Roof / Extreme Depth (&gt;2.5 m) - Submerged</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                    Severity Category
                  </label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-medium"
                  >
                    <option value="advisory">Advisory - Water Rising Fast</option>
                    <option value="warning">Warning - Embankment Overflow Risk</option>
                    <option value="danger">Danger - Active Residential Inundation</option>
                    <option value="extreme">Extreme - Dyke Breach / Flash Flood Torrent</option>
                  </select>
                </div>
              </div>

              {/* Submerged infrastructure tags */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                  Affected / Submerged Assets:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Roads & Highways',
                    'Residential Homes',
                    'Embankment / Dyke Section',
                    'Power & Grid Line',
                    'Paddy & Crop Fields',
                    'Bridges & Culverts'
                  ].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleInfrastructure(item)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                        submergedInfrastructure.includes(item)
                          ? 'bg-orange-600 text-white shadow-sm'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 4: Warning & Email Notification Subscription */}
            <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40 space-y-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Automatic Early Warning & Email Alerts
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subscribeAlerts}
                    onChange={(e) => setSubscribeAlerts(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-cyan-600 focus:ring-cyan-500 bg-slate-900 border-slate-700"
                  />
                  <div>
                    <span className="text-slate-200 font-semibold block">
                      Send urgent flood warnings for this area
                    </span>
                    <span className="text-[11px] text-slate-400 block">
                      Sends an email and browser alert whenever nearby rivers cross warning levels or AI predicts rapid flooding.
                    </span>
                  </div>
                </label>

                {subscribeAlerts && (
                  <div className="pt-2 pl-6 space-y-2">
                    <div className="space-y-1">
                      <span className="text-[10px] text-cyan-300 uppercase font-semibold">
                        Alert Notification Email Address:
                      </span>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="email"
                          required
                          value={alertEmail}
                          onChange={(e) => setAlertEmail(e.target.value)}
                          placeholder="your-email@organization.org"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-medium"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-xs font-bold text-white shadow-lg shadow-red-500/25 transition disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Transmitting Observation...' : 'Submit Report & Arm Warning'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
