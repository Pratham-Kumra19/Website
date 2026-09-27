import { GlobalCaseStudy } from '../types/flood';

export const GLOBAL_CASE_STUDIES: GlobalCaseStudy[] = [
  {
    id: 'google-flood-hub',
    title: 'Google Flood Hub & AI Hydrological Initiative',
    countryRegion: 'India, Bangladesh & 80+ Global Nations',
    organization: 'Google Research in partnership with Central Water Commission (CWC)',
    yearStarted: 2018,
    mlApproach:
      'Long Short-Term Memory (LSTM) rainfall-runoff networks coupled with threshold-adjusted hydrodynamic inundation models running on high-resolution digital elevation models.',
    traditionalLeadTime: '12 to 24 Hours (limited gauge lookups)',
    mlLeadTime: 'Up to 168 Hours (7 Days advance warning)',
    peopleImpacted: 'Over 460 Million people globally covered; 250M+ alerts delivered in India/Bangladesh',
    falseAlarmReduction: '52% decrease in false alerts compared to legacy threshold methods',
    keyAchievements: [
      'Expanded early flood warnings to un-gauged river basins covering thousands of rural villages that previously had zero alert infrastructure',
      'Deployed direct Android push notifications and Google Search/Maps flood inundation pins in local languages (including Assamese, Bengali, and Hindi)',
      'Achieved river stage forecast accuracy comparable to or exceeding calibrated physical models like HEC-RAS while operating at global scale'
    ],
    lessonsForNEIndia:
      'Proves that ML models trained on global river topologies can generalize to remote, data-sparse tributaries of the Brahmaputra without requiring multi-million dollar sensor grids upfront.',
    featuredQuote:
      'By replacing static threshold warnings with AI-driven temporal sequence forecasting, we extended the window for human evacuation from hours to days across the floodplains of India.'
  },
  {
    id: 'copernicus-glofas',
    title: 'Copernicus GloFAS AI Hydrometric Calibration',
    countryRegion: 'European Union & Global Basins',
    organization: 'European Centre for Medium-Range Weather Forecasts (ECMWF) & JRC',
    yearStarted: 2019,
    mlApproach:
      'Multi-model ensemble combining ECMWF IFS meteorological ensembles with Random Forest and Deep Neural Network post-processing for hydrometric bias correction.',
    traditionalLeadTime: '3 Days advance probability',
    mlLeadTime: '10 to 15 Days probabilistic outlook',
    peopleImpacted: '300+ Million residents across European and transnational river corridors',
    falseAlarmReduction: '38% reduction in false peak streamflow predictions',
    keyAchievements: [
      'Successfully provided 8-day advance warning of catastrophic 2021 European floods across the Rhine and Meuse basins',
      'Standardized emergency coordination across national boundaries through EFAS (European Flood Awareness System)',
      'AI-corrected hydrological discharge outputs feed directly into downstream civil defense mobilization'
    ],
    lessonsForNEIndia:
      'Essential blueprint for transboundary river coordination. The Brahmaputra flows through China (Tibet), India, and Bangladesh; GloFAS demonstrates how AI can synthesize disparate transboundary satellite feeds even when upstream riparian countries limit ground data sharing.',
    featuredQuote:
      'Machine learning post-processing corrects the non-linear systematic biases of numerical weather forecasts, turning noisy precipitation forecasts into reliable river peak warnings.'
  },
  {
    id: 'japan-jma-xrain',
    title: 'Japan JMA AI Urban & Mountain River Nowcasting',
    countryRegion: 'Japan (Nationwide River Networks)',
    organization: 'Japan Meteorological Agency (JMA) & NIED',
    yearStarted: 2020,
    mlApproach:
      'Convolutional LSTM (ConvLSTM) and Graph WaveNet ingesting dual-polarization X-band multi-parameter radar (e-XRAIN) with 250m mesh resolution every 60 seconds.',
    traditionalLeadTime: '30 Minutes nowcast',
    mlLeadTime: '3 to 6 Hours ultra-high-resolution nowcast',
    peopleImpacted: '125 Million residents across Japan’s steep volcanic ravines and urban river basins',
    falseAlarmReduction: '64% reduction in delayed flash flood warnings in mountain valleys',
    keyAchievements: [
      'Pioneered instant flash-flood warnings for steep river gorges during Typhoons Hagibis and Nanmadol',
      'Directly links river overflow predictions to automated highway barriers and smart underground storm cistern dispatch (like the Tokyo G-CANS system)',
      'Provides street-by-street evacuation level (Level 1 to 5) notifications to citizen smartphones'
    ],
    lessonsForNEIndia:
      'Japan’s hyper-steep topography mirrors the rugged hills of Arunachal Pradesh, Sikkim, and Meghalaya. X-band radar ML nowcasting can prevent catastrophic cloudburst fatalities in Himalayan gorges.',
    featuredQuote:
      'In steep catchments, floods do not wait for hydrological computations. Deep neural networks evaluate radar echoes in milliseconds to give citizens life-saving minutes.'
  },
  {
    id: 'netherlands-delta',
    title: 'Netherlands AI Digital Twin & Smart Barrier Network',
    countryRegion: 'Netherlands (North Sea Coast & Rhine Delta)',
    organization: 'Rijkswaterstaat & Deltares',
    yearStarted: 2021,
    mlApproach:
      'Physics-Informed Neural Networks (PINNs) and Reinforcement Learning agents optimizing gate dispatch across the Maeslantkering and Oosterscheldekering storm surge barriers.',
    traditionalLeadTime: '12 Hours mechanical barrier decision window',
    mlLeadTime: '36 Hours predictive storm surge and backwater routing',
    peopleImpacted: '17 Million residents living below sea level',
    falseAlarmReduction: '71% reduction in costly false barrier closures',
    keyAchievements: [
      'Autonomous barrier closure recommendations balancing maritime shipping schedules with zero-tolerance flood defenses',
      'Real-time simulation of dyke stability and sub-surface piping using fiber-optic acoustic sensor ML',
      'Zero breaches recorded in primary sea dykes during extreme North Sea storm surges'
    ],
    lessonsForNEIndia:
      'Shows how Assam’s extensive 4,474 km embankment system along the Brahmaputra can be monitored using sensor-driven AI to predict structural piping and micro-subsidence before dykes rupture.',
    featuredQuote:
      'Flood defense is no longer just concrete and earth; it is an intelligent digital nervous system anticipating water pressure before it arrives.'
  },
  {
    id: 'us-noaa-nwm',
    title: 'US National Water Model (NWM) Deep Learning Framework',
    countryRegion: 'United States (Continental US)',
    organization: 'NOAA National Water Center & USGS',
    yearStarted: 2022,
    mlApproach:
      'Continental-scale LSTM and spatial GNN streamflow modeling across 2.7 million river reaches, trained on 40 years of USGS stream gauge records and HRRR atmospheric forecasts.',
    traditionalLeadTime: '24 Hours on 3,600 gauged points only',
    mlLeadTime: '72 to 120 Hours across all 2.7 million reaches (gauged and un-gauged)',
    peopleImpacted: '330 Million residents across the United States',
    falseAlarmReduction: '45% increase in threat score accuracy',
    keyAchievements: [
      'Expanded real-time flood forecast coverage by 700x, from 3,600 physical gauge points to every stream reach across the entire continent',
      'Provides high-frequency 18-hour rapid nowcasts updated every single hour',
      'Empowered local emergency managers in small rural counties with federal-grade inundation forecasts'
    ],
    lessonsForNEIndia:
      'The Central Water Commission (CWC) monitors ~150 gauge stations in NE India, leaving thousands of rural tributaries un-gauged. The NWM architecture shows how AI can extrapolate streamflow to every remote village creek in Assam and Tripura.',
    featuredQuote:
      'We moved from isolated point forecasts to a continuous, high-resolution hydrological web covering every creek and river reach across the country.'
  },
  {
    id: 'mekong-mrc-ai',
    title: 'Mekong River Commission Transboundary AI Warning System',
    countryRegion: 'Southeast Asia (Laos, Thailand, Cambodia, Vietnam)',
    organization: 'Mekong River Commission (MRC) & Asian Disaster Preparedness Center',
    yearStarted: 2022,
    mlApproach:
      'Spatial-Temporal Graph Convolutional Networks (ST-GCN) processing satellite altimetry, radar precipitation, and dam cascade operational telemetry across 6 countries.',
    traditionalLeadTime: '24 to 48 Hours',
    mlLeadTime: '7 Days transboundary river stage prediction',
    peopleImpacted: '70 Million residents along the lower Mekong River basin and Tonle Sap',
    falseAlarmReduction: '41% reduction in cross-border warning discrepancies',
    keyAchievements: [
      'Overcame diplomatic data bottlenecks by leveraging public satellite altimetry (Sentinel-3, Jason-3) with ML calibration to estimate upstream discharge',
      'Accurately predicted severe inundation across the Mekong Delta and Tonle Sap reversal dynamics',
      'Delivered synchronized multi-nation alerts in Khmer, Lao, Thai, and Vietnamese'
    ],
    lessonsForNEIndia:
      'Direct parallel to the Brahmaputra-Barak basin which drains directly into Bangladesh. Transboundary AI models prevent international blame games and enable shared life-saving evacuation schedules.',
    featuredQuote:
      'Rivers recognize no political boundaries. Machine learning allows us to see the entire hydrological pulse of a multinational basin as one single organism.'
  }
];

export const BENCHMARK_COMPARISON = [
  {
    capability: 'Forecast Lead Time',
    traditional: '12 - 24 Hours',
    mlEnhanced: '72 - 168 Hours (3 - 7 Days)',
    gain: '+300% to +600% extra evacuation window'
  },
  {
    capability: 'Coverage of Un-gauged Streams',
    traditional: '< 5% (Limited strictly to physical telemetry poles)',
    mlEnhanced: '85% - 95% (Synthetic AI gauge stations on all reaches)',
    gain: 'Extends protection to remote tribal & rural hamlets'
  },
  {
    capability: 'Simulation Computation Time',
    traditional: '2 to 6 Hours per basin (Hydrodynamic PDE solvers)',
    mlEnhanced: '0.8 to 2.5 Seconds (Deep neural network forward pass)',
    gain: 'Enables real-time 15-minute ensemble updates'
  },
  {
    capability: 'Monsoon Cloud Penetration',
    traditional: 'Optical satellites blinded by 85-95% cloud cover',
    mlEnhanced: 'Synthetic Aperture Radar (SAR) U-Net (100% all-weather)',
    gain: 'Zero blackout periods during peak monsoon storms'
  },
  {
    capability: 'False Alarm Ratio (FAR)',
    traditional: '35% - 48% (Threshold-based over-alerting)',
    mlEnhanced: '14% - 22% (Probabilistic machine learning calibration)',
    gain: 'Prevents warning fatigue and preserves public trust'
  },
  {
    capability: 'Damage & Fatality Reduction',
    traditional: 'Reactive deployment after water breaches dykes',
    mlEnhanced: 'Proactive 48h pre-staging of boats, food & medical aid',
    gain: 'Documented 40-60% decrease in flood-related mortality'
  }
];
