export type NEStateId =
  | 'assam'
  | 'arunachal'
  | 'meghalaya'
  | 'manipur'
  | 'tripura'
  | 'mizoram'
  | 'nagaland'
  | 'sikkim';

export interface RiverGaugeStation {
  id: string;
  name: string;
  river: string;
  district: string;
  currentLevelM: number;
  warningLevelM: number;
  dangerLevelM: number;
  highestFloodLevelM: number;
  status: 'normal' | 'advisory' | 'warning' | 'danger';
  trend: 'rising' | 'steady' | 'falling';
  dischargeCumecs: number;
}

export interface HistoricalFloodEvent {
  year: number;
  title: string;
  affectedPopulationMillion: number;
  areaInundatedSqKm: number;
  districtsAffected: number;
  fatalities: number;
  summary: string;
  keyFactors: string[];
}

export interface MLDeployment {
  title: string;
  leadAgency: string;
  modelTech: string;
  operationalSince: string;
  leadTimeHours: number;
  impactMetrics: string;
  description: string;
}

export interface StateRainfallData {
  annualAverageMm: number;
  monsoonAverageMm: number;
  highest24hRecordMm: number;
  highest24hLocation: string;
  monsoonOnset: string;
  currentAnomalyPct: number;
  wettestMonths: string[];
  radarCoverage: string;
  monthlyDistributionMm: { month: string; rainfallMm: number }[];
}

export interface NEStateData {
  id: NEStateId;
  name: string;
  capital: string;
  areaSqKm: number;
  population: string;
  floodProneAreaPercentage: number;
  floodProneAreaSqKm: number;
  vulnerabilityScore: number; // 0 - 100
  riskLevel: 'Extreme' | 'High' | 'Moderate';
  keyRivers: string[];
  vulnerableDistricts: { name: string; risk: 'Extreme' | 'High' | 'Moderate'; populationAtRisk: string }[];
  geographicalSummary: string;
  floodingCharacteristics: string[];
  rainfall: StateRainfallData;
  historicalFloods: HistoricalFloodEvent[];
  gaugeStations: RiverGaugeStation[];
  mlDeployments: MLDeployment[];
  recommendedMitigation: string[];
  emergencyHelpline: string;
}

export interface MLModelDetail {
  id: string;
  name: string;
  category: 'Recurrent' | 'Physics-Guided' | 'Graph-Based' | 'Computer Vision' | 'Ensemble';
  leadTime: string;
  accuracyMetric: string;
  spatialResolution: string;
  computationalLatency: string;
  coreArchitecture: string;
  keyInputs: string[];
  outputs: string[];
  advantages: string[];
  limitations: string[];
  neIndiaSuitability: string;
  equationOrConcept: string;
}

export interface GlobalCaseStudy {
  id: string;
  title: string;
  countryRegion: string;
  organization: string;
  yearStarted: number;
  mlApproach: string;
  traditionalLeadTime: string;
  mlLeadTime: string;
  peopleImpacted: string;
  falseAlarmReduction: string;
  keyAchievements: string[];
  lessonsForNEIndia: string;
  featuredQuote: string;
}

export interface SimulationParams {
  basin: string;
  rainfall24hMm: number;
  soilMoisturePct: number;
  damDischargeCumecs: number;
  embankmentIntegrityPct: number;
  modelType: 'lstm' | 'pinn' | 'gnn' | 'xgboost';
}

export interface SimulationResult {
  peakWaterLevelM: number;
  peakHour: number;
  timeToPeakHours: number;
  inundationAreaSqKm: number;
  populationAtRisk: number;
  alertLevel: 'NORMAL' | 'ADVISORY' | 'WARNING' | 'DANGER' | 'EXTREME';
  hydrograph: { hour: number; waterLevel: number; dangerMark: number; rainfall: number }[];
  evacuationWindowHours: number;
  actionItems: string[];
  modelConfidencePct: number;
}

export interface FloodReport {
  id?: string;
  userId: string;
  userName: string;
  userEmail: string;
  stateId: NEStateId;
  district: string;
  locationDescription: string;
  latitude: number;
  longitude: number;
  severity: 'advisory' | 'warning' | 'danger' | 'extreme';
  waterDepthMeters: number;
  submergedInfrastructure: string[];
  urgencyStatus: 'urgent_rescue_needed' | 'water_entering_homes' | 'road_blocked' | 'monitoring';
  subscribeAlerts: boolean;
  alertEmail: string;
  notifyOnWarning: boolean;
  status: 'submitted' | 'verified_by_ndrf' | 'warning_broadcasted' | 'resolved';
  createdAt: string;
}

