import { NEStateData } from '../types/flood';

export const NORTH_EAST_STATES: Record<string, NEStateData> = {
  assam: {
    id: 'assam',
    name: 'Assam',
    capital: 'Dispur / Guwahati',
    areaSqKm: 78438,
    population: '36.5 Million',
    floodProneAreaPercentage: 39.58, // ~31,045 sq km (3.15M hectares out of 7.84M hectares)
    floodProneAreaSqKm: 31045,
    vulnerabilityScore: 96,
    riskLevel: 'Extreme',
    keyRivers: ['Brahmaputra', 'Barak', 'Subansiri', 'Dhansiri', 'Kopili', 'Beki', 'Jia Bharali', 'Puthimari'],
    vulnerableDistricts: [
      { name: 'Dhemaji', risk: 'Extreme', populationAtRisk: '680,000' },
      { name: 'Barpeta', risk: 'Extreme', populationAtRisk: '1,420,000' },
      { name: 'Cachar (Silchar)', risk: 'Extreme', populationAtRisk: '1,350,000' },
      { name: 'Dhubri', risk: 'Extreme', populationAtRisk: '1,560,000' },
      { name: 'Morigaon', risk: 'Extreme', populationAtRisk: '850,000' },
      { name: 'Majuli Island', risk: 'Extreme', populationAtRisk: '170,000' },
      { name: 'Golaghat (Kaziranga)', risk: 'High', populationAtRisk: '620,000' },
      { name: 'Kamrup Metro (Guwahati)', risk: 'High', populationAtRisk: '950,000' }
    ],
    geographicalSummary:
      'Bisected by the colossal Brahmaputra river system with over 50 major tributaries draining the Himalayas and Meghalaya plateau. High tectonic seismicity, loose alluvial silt, and catastrophic riverbed aggradation trigger annual multi-wave floods.',
    floodingCharacteristics: [
      'Multi-wave catastrophic monsoon inundation (May through September) carrying ~735M metric tonnes of silt annually',
      'Severe riverbank erosion swallowing ~8,000 hectares of productive land every year and eroding Majuli island',
      'Sudden dyke breaches across the 4,474 km aging embankment network built primarily in the 1960s-70s',
      'Backwater congestion in southern Barak valley causing prolonged multi-week water stagnation in Silchar'
    ],
    rainfall: {
      annualAverageMm: 2818,
      monsoonAverageMm: 1890,
      highest24hRecordMm: 488.2,
      highest24hLocation: 'North Lakhimpur Station',
      monsoonOnset: 'Late May / Early June',
      currentAnomalyPct: +24.6, // % above normal
      wettestMonths: ['June', 'July', 'August'],
      radarCoverage: 'IMD Doppler Weather Radar (Guwahati & Mohanbari/Dibrugarh)',
      monthlyDistributionMm: [
        { month: 'Jan', rainfallMm: 18 },
        { month: 'Feb', rainfallMm: 34 },
        { month: 'Mar', rainfallMm: 85 },
        { month: 'Apr', rainfallMm: 220 },
        { month: 'May', rainfallMm: 380 },
        { month: 'Jun', rainfallMm: 560 },
        { month: 'Jul', rainfallMm: 610 },
        { month: 'Aug', rainfallMm: 440 },
        { month: 'Sep', rainfallMm: 310 },
        { month: 'Oct', rainfallMm: 125 },
        { month: 'Nov', rainfallMm: 24 },
        { month: 'Dec', rainfallMm: 12 }
      ]
    },
    historicalFloods: [
      {
        year: 2024,
        title: 'Multi-Wave Brahmaputra Inundation Wave',
        affectedPopulationMillion: 2.45,
        areaInundatedSqKm: 14500,
        districtsAffected: 30,
        fatalities: 109,
        summary:
          'Continuous pre-monsoon and monsoon downpours caused the Brahmaputra, Beki, and Kopili to breach danger levels across 30 districts. Kaziranga National Park saw 70% submergence with over 200 animals deceased.',
        keyFactors: ['Consecutive cloudbursts in upstream Arunachal', 'Saturated catchment soil', 'Simultaneous high discharge from Kopili & Ranganadi hydro projects']
      },
      {
        year: 2022,
        title: 'Silchar Bethukandi Embankment Breach Catastrophe',
        affectedPopulationMillion: 8.9,
        areaInundatedSqKm: 18200,
        districtsAffected: 34,
        fatalities: 197,
        summary:
          'One of the worst flood disasters in Assam’s modern history. Silchar town remained under 10-12 feet of water for over 11 days following a dyke rupture at Bethukandi along the Barak River.',
        keyFactors: ['Record 500mm 48-hr precipitation in Meghalaya & Barak basin', 'Human-induced dyke breach', 'Drainage congestion in Barak wetland depressions']
      },
      {
        year: 2020,
        title: 'Brahmaputra Extreme Surge & Kaziranga Submergence',
        affectedPopulationMillion: 5.6,
        areaInundatedSqKm: 16800,
        districtsAffected: 30,
        fatalities: 122,
        summary:
          'Five consecutive waves of flood struck Assam amidst the COVID-19 pandemic. Over 150 wild animals including one-horned rhinos died in Kaziranga National Park.',
        keyFactors: ['Prolonged monsoon trough stalled over Assam-Arunachal border', 'Embankment failures at 147 points']
      },
      {
        year: 1950,
        title: 'Great Assam-Tibet Earthquake & River Morphology Shift',
        affectedPopulationMillion: 4.5,
        areaInundatedSqKm: 25000,
        districtsAffected: 18,
        fatalities: 4800,
        summary:
          'An 8.6 magnitude earthquake altered the entire geomorphology of the Brahmaputra bed, raising it by 2 to 3 meters in Dibrugarh and causing permanent vulnerability to annual flooding.',
        keyFactors: ['Landslide dams bursting in upper Siang/Subansiri', 'Massive aggradation of river channel beds']
      }
    ],
    gaugeStations: [
      {
        id: 'gau-01',
        name: 'Guwahati (DC Court)',
        river: 'Brahmaputra',
        district: 'Kamrup Metro',
        currentLevelM: 49.82,
        warningLevelM: 48.68,
        dangerLevelM: 49.68,
        highestFloodLevelM: 51.46,
        status: 'danger',
        trend: 'rising',
        dischargeCumecs: 48500
      },
      {
        id: 'gau-02',
        name: 'Dibrugarh (Matiaghat)',
        river: 'Brahmaputra',
        district: 'Dibrugarh',
        currentLevelM: 105.42,
        warningLevelM: 104.7,
        dangerLevelM: 105.7,
        highestFloodLevelM: 106.48,
        status: 'warning',
        trend: 'rising',
        dischargeCumecs: 39800
      },
      {
        id: 'gau-03',
        name: 'Silchar (Annapurna Ghat)',
        river: 'Barak',
        district: 'Cachar',
        currentLevelM: 19.98,
        warningLevelM: 18.83,
        dangerLevelM: 19.83,
        highestFloodLevelM: 21.98,
        status: 'danger',
        trend: 'rising',
        dischargeCumecs: 14200
      },
      {
        id: 'gau-04',
        name: 'Nematighat (Jorhat)',
        river: 'Brahmaputra',
        district: 'Jorhat',
        currentLevelM: 85.34,
        warningLevelM: 84.04,
        dangerLevelM: 85.04,
        highestFloodLevelM: 87.37,
        status: 'danger',
        trend: 'steady',
        dischargeCumecs: 44100
      },
      {
        id: 'gau-05',
        name: 'Tezpur (Bhomoraguri)',
        river: 'Brahmaputra',
        district: 'Sonitpur',
        currentLevelM: 64.9,
        warningLevelM: 64.23,
        dangerLevelM: 65.23,
        highestFloodLevelM: 66.42,
        status: 'warning',
        trend: 'falling',
        dischargeCumecs: 46200
      }
    ],
    mlDeployments: [
      {
        title: 'CWC & Google Flood Forecasting AI (Brahmaputra Basin)',
        leadAgency: 'Central Water Commission (CWC) & Google AI',
        modelTech: 'Bi-directional LSTMs + Digital Elevation Model Hydro-dynamic Hybrid',
        operationalSince: '2020',
        leadTimeHours: 72,
        impactMetrics: '48h to 72h lead time gain; over 65% reduction in evacuation delay; covers 28M citizens via push alerts',
        description:
          'Integrates real-time stream gauges, satellite precipitation (IMD/GPM), and hydrologic routing to output inundation maps with 1-meter elevation precision.'
      },
      {
        title: 'NESAC Satellite SAR Flood Inundation Pipeline',
        leadAgency: 'North Eastern Space Applications Centre (ISRO-NESAC)',
        modelTech: 'Deep U-Net for Sentinel-1 C-Band SAR automated water segmentation',
        operationalSince: '2021',
        leadTimeHours: 12,
        impactMetrics: 'Generates district damage polygons within 45 minutes of satellite pass, unaffected by thick monsoon cloud cover',
        description:
          'Overcomes pervasive monsoon cloud cover in Assam using radar backscatter processing to identify breached embankments and marooned villages.'
      }
    ],
    recommendedMitigation: [
      'AI-coupled automated sluice gate management along Brahmaputra-Barak embankments',
      'Satellite InSAR micro-subsidence tracking to predict dyke breaches 72 hours before failure',
      'Community elevated highlands (flood shelters) optimized via geospatial graph clustering',
      'Sediment transport modeling for targeted riverbed desiltation at bottleneck bends'
    ],
    emergencyHelpline: '1070 / 1079 (State Emergency Operations Centre - ASDMA)'
  },

  arunachal: {
    id: 'arunachal',
    name: 'Arunachal Pradesh',
    capital: 'Itanagar',
    areaSqKm: 83743,
    population: '1.6 Million',
    floodProneAreaPercentage: 18.2,
    floodProneAreaSqKm: 15241,
    vulnerabilityScore: 82,
    riskLevel: 'High',
    keyRivers: ['Siang (Tsangpo)', 'Subansiri', 'Dibang', 'Lohit', 'Kameng', 'Noa Dihing', 'Tirap'],
    vulnerableDistricts: [
      { name: 'East Siang (Pasighat)', risk: 'Extreme', populationAtRisk: '85,000' },
      { name: 'Namsai', risk: 'High', populationAtRisk: '95,000' },
      { name: 'Lower Subansiri', risk: 'High', populationAtRisk: '72,000' },
      { name: 'Changlang', risk: 'High', populationAtRisk: '110,000' },
      { name: 'Dibang Valley', risk: 'Moderate', populationAtRisk: '22,000' }
    ],
    geographicalSummary:
      'Himalayan mountainous terrain where massive transboundary rivers descend with tremendous hydraulic energy into the Assam plains. Characterized by high relief, young fragile geology, and torrential cloudbursts.',
    floodingCharacteristics: [
      'Sudden devastating flash floods in river gorges with minimal warning time',
      'Glacial Lake Outburst Floods (GLOF) and transboundary surging from upper Tibetan Tsangpo',
      'Compound disaster cascade: Monsoon downpours trigger landslides that dam rivers, creating temporary lakes that violently burst',
      'Severe toe-erosion washing away vital trans-Arunachal highway bridges'
    ],
    rainfall: {
      annualAverageMm: 3120,
      monsoonAverageMm: 2150,
      highest24hRecordMm: 502.4,
      highest24hLocation: 'Pasighat Aerodrome Station',
      monsoonOnset: 'Late May',
      currentAnomalyPct: +18.2,
      wettestMonths: ['June', 'July', 'August'],
      radarCoverage: 'Covered partly by Dibrugarh Doppler Radar & Satellite Altimetry',
      monthlyDistributionMm: [
        { month: 'Jan', rainfallMm: 35 },
        { month: 'Feb', rainfallMm: 62 },
        { month: 'Mar', rainfallMm: 140 },
        { month: 'Apr', rainfallMm: 290 },
        { month: 'May', rainfallMm: 420 },
        { month: 'Jun', rainfallMm: 680 },
        { month: 'Jul', rainfallMm: 710 },
        { month: 'Aug', rainfallMm: 490 },
        { month: 'Sep', rainfallMm: 340 },
        { month: 'Oct', rainfallMm: 110 },
        { month: 'Nov', rainfallMm: 28 },
        { month: 'Dec', rainfallMm: 15 }
      ]
    },
    historicalFloods: [
      {
        year: 2020,
        title: 'Siang & Dibang River Flash Surge',
        affectedPopulationMillion: 0.18,
        areaInundatedSqKm: 1800,
        districtsAffected: 7,
        fatalities: 19,
        summary:
          'Record precipitation caused Siang and Lohit to surge violently, washing away NH-13 connections and submerging downstream plains of Pasighat and Namsai.',
        keyFactors: ['Upstream cloudbursts in higher Himalayas', 'Simultaneous debris landslides blocking tributaries']
      },
      {
        year: 2018,
        title: 'Upper Siang Landslide Dam Crisis',
        affectedPopulationMillion: 0.12,
        areaInundatedSqKm: 950,
        districtsAffected: 4,
        fatalities: 6,
        summary:
          'A massive landslide in Tibet formed a 600m wide dam on the Yarlung Tsangpo. When it overtopped, an alarming surge rushed down to Pasighat.',
        keyFactors: ['Transboundary glacial destabilization', 'Absence of real-time sensor sharing from upstream']
      }
    ],
    gaugeStations: [
      {
        id: 'aru-01',
        name: 'Pasighat Gauge Station',
        river: 'Siang',
        district: 'East Siang',
        currentLevelM: 153.2,
        warningLevelM: 152.0,
        dangerLevelM: 153.96,
        highestFloodLevelM: 157.54,
        status: 'warning',
        trend: 'rising',
        dischargeCumecs: 24500
      },
      {
        id: 'aru-02',
        name: 'Daporijo Bridge',
        river: 'Subansiri',
        district: 'Upper Subansiri',
        currentLevelM: 279.1,
        warningLevelM: 278.0,
        dangerLevelM: 280.5,
        highestFloodLevelM: 283.4,
        status: 'normal',
        trend: 'steady',
        dischargeCumecs: 16800
      }
    ],
    mlDeployments: [
      {
        title: 'High-Altitude Flash Flood Guidance System (FFGS-ML)',
        leadAgency: 'IMD & NESAC',
        modelTech: 'Temporal Convolutional Networks (TCN) + Doppler Radar Nowcasting',
        operationalSince: '2022',
        leadTimeHours: 6,
        impactMetrics: 'Detects flash flood initiation in steep valleys 4-6 hours in advance; alerts downstream civil defense',
        description: 'Predicts mountain catchment runoff using radar reflectivity, slope stability, and orographic rainfall models.'
      }
    ],
    recommendedMitigation: [
      'Autonomous acoustic & optical sensors on glacial lakes for instant GLOF triggers',
      'AI slope-stability mapping along border highways',
      'Inter-basin early warning relay to downstream Assam border communities'
    ],
    emergencyHelpline: '1070 (State Emergency Operations Centre - APSDMA)'
  },

  meghalaya: {
    id: 'meghalaya',
    name: 'Meghalaya',
    capital: 'Shillong',
    areaSqKm: 22429,
    population: '3.4 Million',
    floodProneAreaPercentage: 22.8,
    floodProneAreaSqKm: 5114,
    vulnerabilityScore: 78,
    riskLevel: 'High',
    keyRivers: ['Simsang', 'Umngot', 'Myntdu', 'Khadarsngiek', 'Ganol', 'Damring'],
    vulnerableDistricts: [
      { name: 'West Garo Hills (Tikrikilla/Phulbari)', risk: 'Extreme', populationAtRisk: '340,000' },
      { name: 'South West Garo Hills', risk: 'High', populationAtRisk: '190,000' },
      { name: 'East Khasi Hills', risk: 'High', populationAtRisk: '220,000' },
      { name: 'South Garo Hills', risk: 'Moderate', populationAtRisk: '120,000' }
    ],
    geographicalSummary:
      'Home to Mawsynram and Cherrapunji, the wettest locations on Earth. Steep southern plateau escarpment dropping directly into the floodplains of Bangladesh and West Garo Hills.',
    floodingCharacteristics: [
      'Hyper-precipitation events exceeding 600-1000 mm in a single 24-hour window',
      'Violent flash torrents cascading down southern Khasi & Jaintia hills within 90 minutes',
      'Severe alluvial plain flooding in West Garo Hills bordering Assam and Bangladesh',
      'Widespread slope failure and road washouts cutting off inter-district logistics'
    ],
    rainfall: {
      annualAverageMm: 12000, // Plateau average, Cherra/Mawsynram exceeds 11,872 mm
      monsoonAverageMm: 9800,
      highest24hRecordMm: 1003.6,
      highest24hLocation: 'Mawsynram AWS (June 17, 2022)',
      monsoonOnset: 'Early June',
      currentAnomalyPct: +31.4,
      wettestMonths: ['June', 'July', 'August'],
      radarCoverage: 'IMD Cherrapunji Doppler Weather Radar (S-Band)',
      monthlyDistributionMm: [
        { month: 'Jan', rainfallMm: 20 },
        { month: 'Feb', rainfallMm: 50 },
        { month: 'Mar', rainfallMm: 240 },
        { month: 'Apr', rainfallMm: 850 },
        { month: 'May', rainfallMm: 1650 },
        { month: 'Jun', rainfallMm: 2950 },
        { month: 'Jul', rainfallMm: 3100 },
        { month: 'Aug', rainfallMm: 1850 },
        { month: 'Sep', rainfallMm: 1100 },
        { month: 'Oct', rainfallMm: 450 },
        { month: 'Nov', rainfallMm: 80 },
        { month: 'Dec', rainfallMm: 15 }
      ]
    },
    historicalFloods: [
      {
        year: 2022,
        title: 'Mawsynram Record Deluge & Garo Hills Submergence',
        affectedPopulationMillion: 0.65,
        areaInundatedSqKm: 2100,
        districtsAffected: 11,
        fatalities: 44,
        summary:
          'Cherrapunji logged 972 mm and Mawsynram logged 1003.6 mm of rain in June 2022. West Garo Hills plains suffered total inundation, with 500+ bridges damaged.',
        keyFactors: ['Record moisture transport from Bay of Bengal', 'Karst sinkhole saturation causing surface overflows']
      }
    ],
    gaugeStations: [
      {
        id: 'meg-01',
        name: 'Tikrikilla Hydrometric Station',
        river: 'Jingjiram',
        district: 'West Garo Hills',
        currentLevelM: 32.4,
        warningLevelM: 31.8,
        dangerLevelM: 32.6,
        highestFloodLevelM: 34.1,
        status: 'warning',
        trend: 'rising',
        dischargeCumecs: 3900
      }
    ],
    mlDeployments: [
      {
        title: 'Micro-Catchment Runoff AI (Meghalaya Plateau)',
        leadAgency: 'State Disaster Management Authority (SDMA) & IIT Guwahati',
        modelTech: 'Extreme Gradient Boosting (XGBoost) + Satellite Cloud Top Temperature',
        operationalSince: '2023',
        leadTimeHours: 18,
        impactMetrics: '91% accuracy in predicting plain-flooding thresholds in Garo plains from Khasi ridge rainfall',
        description: 'Transforms ridge rainfall measurements into downstream flash-flood arrival warnings for vulnerable villages.'
      }
    ],
    recommendedMitigation: [
      'Catchment-level check dams with automated pressure relief valves',
      'Community early-warning sirens linked to Mawsynram-Cherrapunji radar stations',
      'Bio-engineering slope stabilization using indigenous bamboo and vetiver grass'
    ],
    emergencyHelpline: '1070 / 0364-2502098 (Meghalaya SDMA)'
  },

  manipur: {
    id: 'manipur',
    name: 'Manipur',
    capital: 'Imphal',
    areaSqKm: 22327,
    population: '3.1 Million',
    floodProneAreaPercentage: 27.5,
    floodProneAreaSqKm: 6140,
    vulnerabilityScore: 84,
    riskLevel: 'High',
    keyRivers: ['Imphal', 'Iril', 'Thoubal', 'Nambul', 'Barak (Upper)', 'Kongba'],
    vulnerableDistricts: [
      { name: 'Imphal West', risk: 'Extreme', populationAtRisk: '490,000' },
      { name: 'Imphal East', risk: 'Extreme', populationAtRisk: '430,000' },
      { name: 'Thoubal', risk: 'High', populationAtRisk: '380,000' },
      { name: 'Bishnupur', risk: 'High', populationAtRisk: '240,000' },
      { name: 'Kakching', risk: 'Moderate', populationAtRisk: '120,000' }
    ],
    geographicalSummary:
      'A bowl-shaped central valley (Imphal Valley) surrounded by rugged hills. The valley drains into Loktak Lake, creating high vulnerability to backwater flooding when Ithai Barrage cannot discharge fast enough.',
    floodingCharacteristics: [
      'Imphal basin drainage congestion: Multiple hill rivers converge into a confined valley floor',
      'Loktak Lake swelling and submergence of shoreline communities and floating phumdis',
      'Severe urban flash floods in Imphal City caused by silted riverbeds and constricted culverts',
      'Compound hill landslides and valley floods driven by Bay of Bengal cyclonic lows'
    ],
    rainfall: {
      annualAverageMm: 1680,
      monsoonAverageMm: 1120,
      highest24hRecordMm: 234.5,
      highest24hLocation: 'Imphal Tulihal Airport Station',
      monsoonOnset: 'First week of June',
      currentAnomalyPct: +19.8,
      wettestMonths: ['June', 'July', 'August'],
      radarCoverage: 'Covered by IMD Silchar & Agartala Radar peripheries',
      monthlyDistributionMm: [
        { month: 'Jan', rainfallMm: 14 },
        { month: 'Feb', rainfallMm: 28 },
        { month: 'Mar', rainfallMm: 72 },
        { month: 'Apr', rainfallMm: 145 },
        { month: 'May', rainfallMm: 230 },
        { month: 'Jun', rainfallMm: 340 },
        { month: 'Jul', rainfallMm: 370 },
        { month: 'Aug', rainfallMm: 280 },
        { month: 'Sep', rainfallMm: 195 },
        { month: 'Oct', rainfallMm: 115 },
        { month: 'Nov', rainfallMm: 32 },
        { month: 'Dec', rainfallMm: 12 }
      ]
    },
    historicalFloods: [
      {
        year: 2024,
        title: 'Cyclone Remal Imphal Basin Breach',
        affectedPopulationMillion: 0.35,
        areaInundatedSqKm: 1400,
        districtsAffected: 6,
        fatalities: 12,
        summary:
          'Cyclone Remal caused record rains, leading to breaches in the embankments of Imphal and Nambul rivers. Raj Bhavan and central Imphal were submerged under 6 feet of water.',
        keyFactors: ['Rapid runoff from surrounding hill districts', 'Urban riverbank structural fatigue', 'Backwater effect of Loktak Lake']
      }
    ],
    gaugeStations: [
      {
        id: 'man-01',
        name: 'Minuthong Gauge Station',
        river: 'Imphal River',
        district: 'Imphal West',
        currentLevelM: 782.1,
        warningLevelM: 781.2,
        dangerLevelM: 781.9,
        highestFloodLevelM: 783.6,
        status: 'danger',
        trend: 'rising',
        dischargeCumecs: 1250
      },
      {
        id: 'man-02',
        name: 'Irilbung Station',
        river: 'Iril River',
        district: 'Imphal East',
        currentLevelM: 783.4,
        warningLevelM: 782.8,
        dangerLevelM: 783.8,
        highestFloodLevelM: 785.2,
        status: 'warning',
        trend: 'steady',
        dischargeCumecs: 980
      }
    ],
    mlDeployments: [
      {
        title: 'Imphal Valley Hydro-Inundation Digital Twin',
        leadAgency: 'Manipur Remote Sensing Applications Centre (MARSAC)',
        modelTech: 'Physics-Informed Neural Network (PINN) + 2D Hydrodynamic Modeling',
        operationalSince: '2023',
        leadTimeHours: 24,
        impactMetrics: 'Predicts exact street-level inundation in Imphal city 24 hours prior to river overflow',
        description: 'Simulates the complex interactions between upstream hill runoff, urban culvert flows, and Loktak Lake backwater levels.'
      }
    ],
    recommendedMitigation: [
      'Smart dredging of Nambul and Imphal river confluence bottlenecks',
      'Automated dispatch optimization for Ithai Barrage gates',
      'Restoration of traditional valley wetlands (pats) as retention basins'
    ],
    emergencyHelpline: '1070 / 0385-2443441 (Manipur Disaster Control)'
  },

  tripura: {
    id: 'tripura',
    name: 'Tripura',
    capital: 'Agartala',
    areaSqKm: 10491,
    population: '4.0 Million',
    floodProneAreaPercentage: 24.1,
    floodProneAreaSqKm: 2528,
    vulnerabilityScore: 80,
    riskLevel: 'High',
    keyRivers: ['Gumti', 'Haora', 'Khowai', 'Manu', 'Muhuri', 'Dhalai', 'Feni'],
    vulnerableDistricts: [
      { name: 'West Tripura (Agartala)', risk: 'Extreme', populationAtRisk: '510,000' },
      { name: 'Gomati', risk: 'Extreme', populationAtRisk: '360,000' },
      { name: 'South Tripura', risk: 'High', populationAtRisk: '310,000' },
      { name: 'Khowai', risk: 'High', populationAtRisk: '280,000' },
      { name: 'Unakoti (Kailashahar)', risk: 'High', populationAtRisk: '220,000' }
    ],
    geographicalSummary:
      'Bordered on three sides by Bangladesh. Long north-south trending hill ranges interspersed with narrow river valleys that drain westward and southward into the Meghna basin of Bangladesh.',
    floodingCharacteristics: [
      'Transboundary river dynamics with intense localized cloudbursts over low hill ridges',
      'Agartala urban flash flooding due to low elevation and backwater pressure from Bangladesh',
      'Dumboor Dam (Gumti River) inflow spikes requiring sudden spillway gate releases',
      'Riverbank erosion threatening cross-border transport corridors'
    ],
    rainfall: {
      annualAverageMm: 2480,
      monsoonAverageMm: 1650,
      highest24hRecordMm: 375.8,
      highest24hLocation: 'Amarpur Hydrometric Station',
      monsoonOnset: 'Late May',
      currentAnomalyPct: +28.3,
      wettestMonths: ['June', 'July', 'August'],
      radarCoverage: 'IMD Agartala Doppler Weather Radar',
      monthlyDistributionMm: [
        { month: 'Jan', rainfallMm: 12 },
        { month: 'Feb', rainfallMm: 28 },
        { month: 'Mar', rainfallMm: 95 },
        { month: 'Apr', rainfallMm: 210 },
        { month: 'May', rainfallMm: 390 },
        { month: 'Jun', rainfallMm: 480 },
        { month: 'Jul', rainfallMm: 520 },
        { month: 'Aug', rainfallMm: 410 },
        { month: 'Sep', rainfallMm: 260 },
        { month: 'Oct', rainfallMm: 140 },
        { month: 'Nov', rainfallMm: 35 },
        { month: 'Dec', rainfallMm: 8 }
      ]
    },
    historicalFloods: [
      {
        year: 2024,
        title: 'Historic Tripura Cloudburst & Dumboor Dam Surge',
        affectedPopulationMillion: 1.7,
        areaInundatedSqKm: 2300,
        districtsAffected: 8,
        fatalities: 31,
        summary:
          'Continuous 4-day rainfall exceeding 400 mm triggered the worst floods in Tripura in over 30 years. All major rivers including Gumti and Haora flowed above extreme danger levels.',
        keyFactors: ['Low-pressure area over Bangladesh and Tripura', 'Saturated catchment soil moisture', 'Inflow exceeding Dumboor reservoir capacity']
      }
    ],
    gaugeStations: [
      {
        id: 'tri-01',
        name: 'Dashamighat Gauge Station',
        river: 'Haora River',
        district: 'West Tripura',
        currentLevelM: 10.9,
        warningLevelM: 10.3,
        dangerLevelM: 10.8,
        highestFloodLevelM: 11.6,
        status: 'danger',
        trend: 'rising',
        dischargeCumecs: 840
      },
      {
        id: 'tri-02',
        name: 'Amarpur Hydrometric Station',
        river: 'Gumti River',
        district: 'Gomati',
        currentLevelM: 29.8,
        warningLevelM: 28.5,
        dangerLevelM: 29.5,
        highestFloodLevelM: 31.2,
        status: 'danger',
        trend: 'falling',
        dischargeCumecs: 2100
      }
    ],
    mlDeployments: [
      {
        title: 'Transboundary Flash Flood Predictive Gateway',
        leadAgency: 'Tripura SDMA & CWC Silchar Division',
        modelTech: 'Graph Neural Networks (GNN) on Transboundary River Topologies',
        operationalSince: '2024',
        leadTimeHours: 36,
        impactMetrics: 'Improved warning time for Agartala city from 6 hours to 36 hours; averted major civic power outages',
        description: 'Models hydrologic graph edges crossing the Indo-Bangladesh border to project water surge heights.'
      }
    ],
    recommendedMitigation: [
      'Automated telemetry sensors along Indo-Bangladesh border river points',
      'Real-time reservoir dispatch AI for Dumboor Dam spillways',
      'Urban stormwater pumping modernization with smart SCADA controls in Agartala'
    ],
    emergencyHelpline: '1070 / 0381-2416045 (Tripura Emergency Ops)'
  },

  mizoram: {
    id: 'mizoram',
    name: 'Mizoram',
    capital: 'Aizawl',
    areaSqKm: 21081,
    population: '1.3 Million',
    floodProneAreaPercentage: 11.4,
    floodProneAreaSqKm: 2403,
    vulnerabilityScore: 68,
    riskLevel: 'Moderate',
    keyRivers: ['Tlawng', 'Tuirial (Sonai)', 'Chhimtuipui (Kaladan)', 'Khawthlangtuipui (Karnaphuli)', 'Tuivawl'],
    vulnerableDistricts: [
      { name: 'Kolasib (Bairabi)', risk: 'High', populationAtRisk: '65,000' },
      { name: 'Mamit', risk: 'High', populationAtRisk: '70,000' },
      { name: 'Lunglei', risk: 'Moderate', populationAtRisk: '55,000' },
      { name: 'Aizawl (River Valleys)', risk: 'Moderate', populationAtRisk: '85,000' }
    ],
    geographicalSummary:
      'Steep parallel ridges running north-south with deeply incised valleys. While high ridges escape inundation, narrow river valleys and border foothill settlements experience swift and ferocious surges.',
    floodingCharacteristics: [
      'Rapid gorge swelling: River levels in Tlawng and Tuirial can rise 15-20 meters within 12 hours',
      'Submergence of valley agricultural lands and drinking water pumping intakes supplying Aizawl',
      'Severe compounding landslide dams on riverbeds cutting national highways',
      'Foothill boundary inundation in Kolasib district bordering Cachar (Assam)'
    ],
    rainfall: {
      annualAverageMm: 2750,
      monsoonAverageMm: 1850,
      highest24hRecordMm: 312.0,
      highest24hLocation: 'Sairang AWS',
      monsoonOnset: 'First week of June',
      currentAnomalyPct: +14.2,
      wettestMonths: ['June', 'July', 'August'],
      radarCoverage: 'Partially covered by Agartala & Silchar Radar fringes',
      monthlyDistributionMm: [
        { month: 'Jan', rainfallMm: 10 },
        { month: 'Feb', rainfallMm: 25 },
        { month: 'Mar', rainfallMm: 80 },
        { month: 'Apr', rainfallMm: 180 },
        { month: 'May', rainfallMm: 360 },
        { month: 'Jun', rainfallMm: 510 },
        { month: 'Jul', rainfallMm: 560 },
        { month: 'Aug', rainfallMm: 440 },
        { month: 'Sep', rainfallMm: 310 },
        { month: 'Oct', rainfallMm: 160 },
        { month: 'Nov', rainfallMm: 40 },
        { month: 'Dec', rainfallMm: 12 }
      ]
    },
    historicalFloods: [
      {
        year: 2024,
        title: 'Post-Remal Compound Landslide & River Floods',
        affectedPopulationMillion: 0.15,
        areaInundatedSqKm: 650,
        districtsAffected: 6,
        fatalities: 34,
        summary:
          'Remal-induced downpours caused catastrophic quarry collapses in Aizawl and inundated river pumping stations at Greater Aizawl Water Supply Scheme (Phase I & II).',
        keyFactors: ['300 mm extreme rainfall within 24 hours', 'Steep ravine runoff velocity', 'Disruption of river-pumping infrastructure']
      }
    ],
    gaugeStations: [
      {
        id: 'miz-01',
        name: 'Sairang River Gauge',
        river: 'Tlawng River',
        district: 'Aizawl',
        currentLevelM: 92.5,
        warningLevelM: 90.0,
        dangerLevelM: 93.0,
        highestFloodLevelM: 96.8,
        status: 'warning',
        trend: 'rising',
        dischargeCumecs: 1650
      }
    ],
    mlDeployments: [
      {
        title: 'Steep Basin Hydro-Landslide Dual Prediction Network',
        leadAgency: 'Mizoram Science & Technology Council (MISTIC)',
        modelTech: 'Ensemble Random Forest + Soil Infiltration Kinematic Wave Solver',
        operationalSince: '2023',
        leadTimeHours: 14,
        impactMetrics: 'Simultaneous alerts for river overflow and co-occurring slope failures along transport arteries',
        description: 'Combines micro-climatic rain gauge arrays with slope geotechnical models to predict valley flood onset.'
      }
    ],
    recommendedMitigation: [
      'Submersible flood-proof casing for municipal water pumping installations',
      'Early warning acoustic river sensors in high-velocity gorges',
      'Strategic decentralized food and fuel depots in hill ridge hubs'
    ],
    emergencyHelpline: '1070 / 0389-2335837 (Mizoram Disaster Management)'
  },

  nagaland: {
    id: 'nagaland',
    name: 'Nagaland',
    capital: 'Kohima',
    areaSqKm: 16579,
    population: '2.2 Million',
    floodProneAreaPercentage: 14.8,
    floodProneAreaSqKm: 2453,
    vulnerabilityScore: 71,
    riskLevel: 'Moderate',
    keyRivers: ['Dhansiri', 'Doyang', 'Dikhu', 'Tizu', 'Milak', 'Zungki'],
    vulnerableDistricts: [
      { name: 'Dimapur', risk: 'High', populationAtRisk: '220,000' },
      { name: 'Niuland', risk: 'High', populationAtRisk: '85,000' },
      { name: 'Chumoukedima', risk: 'Moderate', populationAtRisk: '95,000' },
      { name: 'Wokha (Doyang downstream)', risk: 'Moderate', populationAtRisk: '45,000' }
    ],
    geographicalSummary:
      'Mountainous state with Naga Hills transitioning rapidly into the Brahmaputra plains at Dimapur. The plains of Dimapur act as the drainage outlet for multiple hill rivers.',
    floodingCharacteristics: [
      'Severe alluvial flooding in Dimapur commercial hub when Dhansiri and Chathe rivers overflow',
      'Spillway discharge emergencies from Doyang Hydroelectric Project reservoir',
      'Flash floods sweeping through bridge foundations and rural foothill settlements',
      'Sediment deposits choking riverbeds at the plain transition zone'
    ],
    rainfall: {
      annualAverageMm: 2200,
      monsoonAverageMm: 1520,
      highest24hRecordMm: 288.4,
      highest24hLocation: 'Dimapur Airport Station',
      monsoonOnset: 'Early June',
      currentAnomalyPct: +11.8,
      wettestMonths: ['June', 'July', 'August'],
      radarCoverage: 'Periphery of Mohanbari and Guwahati Radars',
      monthlyDistributionMm: [
        { month: 'Jan', rainfallMm: 15 },
        { month: 'Feb', rainfallMm: 30 },
        { month: 'Mar', rainfallMm: 80 },
        { month: 'Apr', rainfallMm: 170 },
        { month: 'May', rainfallMm: 290 },
        { month: 'Jun', rainfallMm: 420 },
        { month: 'Jul', rainfallMm: 470 },
        { month: 'Aug', rainfallMm: 380 },
        { month: 'Sep', rainfallMm: 240 },
        { month: 'Oct', rainfallMm: 120 },
        { month: 'Nov', rainfallMm: 30 },
        { month: 'Dec', rainfallMm: 10 }
      ]
    },
    historicalFloods: [
      {
        year: 2023,
        title: 'Dimapur & Niuland Dhansiri Inundation',
        affectedPopulationMillion: 0.11,
        areaInundatedSqKm: 520,
        districtsAffected: 4,
        fatalities: 8,
        summary:
          'Continuous rainfall in the Barail and Naga hills caused the Dhansiri and Chathe rivers to flood over 15 colonies in Dimapur and wash away rural bridges in Niuland.',
        keyFactors: ['Unregulated riverbed encroachment in Dimapur', 'Hill catchment hyper-runoff', 'Inadequate drainage canals']
      }
    ],
    gaugeStations: [
      {
        id: 'nag-01',
        name: 'Dimapur Old Bridge Gauge',
        river: 'Dhansiri River',
        district: 'Dimapur',
        currentLevelM: 114.6,
        warningLevelM: 113.8,
        dangerLevelM: 115.2,
        highestFloodLevelM: 117.1,
        status: 'warning',
        trend: 'rising',
        dischargeCumecs: 1420
      }
    ],
    mlDeployments: [
      {
        title: 'Doyang Reservoir Smart Inflow & Outflow Optimizer',
        leadAgency: 'NEEPCO & Nagaland State Disaster Management Authority',
        modelTech: 'Long Short-Term Memory (LSTM) Reservoir Inflow Forecasting',
        operationalSince: '2022',
        leadTimeHours: 36,
        impactMetrics: 'Prevented sudden emergency spillway discharges; cut downstream agricultural loss by 40%',
        description: 'Predicts reservoir inflow 36 hours ahead, allowing controlled pre-releases rather than emergency flood surges.'
      }
    ],
    recommendedMitigation: [
      'Comprehensive structural embankment renewal along Dhansiri river through Dimapur',
      'Sensor-guided automated floodgates at drainage confluences',
      'Encroachment clearance in river buffer zones'
    ],
    emergencyHelpline: '1070 / 0370-2291122 (NSDMA Control Room)'
  },

  sikkim: {
    id: 'sikkim',
    name: 'Sikkim',
    capital: 'Gangtok',
    areaSqKm: 7096,
    population: '0.7 Million',
    floodProneAreaPercentage: 16.5,
    floodProneAreaSqKm: 1170,
    vulnerabilityScore: 89,
    riskLevel: 'Extreme',
    keyRivers: ['Teesta', 'Rangeet', 'Lachen Chu', 'Lachung Chu', 'Rorathang'],
    vulnerableDistricts: [
      { name: 'Mangan (North Sikkim)', risk: 'Extreme', populationAtRisk: '45,000' },
      { name: 'Pakhyong (Singtam)', risk: 'Extreme', populationAtRisk: '65,000' },
      { name: 'Namchi (Melli/Rangpo)', risk: 'High', populationAtRisk: '55,000' },
      { name: 'Gangtok', risk: 'High', populationAtRisk: '80,000' }
    ],
    geographicalSummary:
      'High-altitude Himalayan state dominated by Mount Kangchenjunga and over 300 glacial lakes. Rivers flow through ultra-steep V-shaped valleys before joining the Teesta and cascading downstream into West Bengal.',
    floodingCharacteristics: [
      'Glacial Lake Outburst Floods (GLOF): Moraine-dammed glacial lakes bursting due to permafrost thaw or avalanches',
      'Catastrophic flash floods with massive boulder loads capable of obliterating major concrete dams',
      'Wiping out of critical hydroelectric infrastructure (e.g. 1,200 MW Teesta-III Chungthang Dam)',
      'Isolation of upper Himalayan border regions due to washed-out bridges and roads'
    ],
    rainfall: {
      annualAverageMm: 3500,
      monsoonAverageMm: 2450,
      highest24hRecordMm: 390.2,
      highest24hLocation: 'Singtam Hydro Station',
      monsoonOnset: 'Late May / Early June',
      currentAnomalyPct: +22.5,
      wettestMonths: ['June', 'July', 'August', 'September'],
      radarCoverage: 'X-Band Doppler Radar at Gangtok & ISRO Glacial Satellite Altimetry',
      monthlyDistributionMm: [
        { month: 'Jan', rainfallMm: 22 },
        { month: 'Feb', rainfallMm: 45 },
        { month: 'Mar', rainfallMm: 130 },
        { month: 'Apr', rainfallMm: 240 },
        { month: 'May', rainfallMm: 460 },
        { month: 'Jun', rainfallMm: 680 },
        { month: 'Jul', rainfallMm: 740 },
        { month: 'Aug', rainfallMm: 590 },
        { month: 'Sep', rainfallMm: 420 },
        { month: 'Oct', rainfallMm: 140 },
        { month: 'Nov', rainfallMm: 30 },
        { month: 'Dec', rainfallMm: 15 }
      ]
    },
    historicalFloods: [
      {
        year: 2023,
        title: 'Catastrophic South Lhonak Glacial Lake Outburst Flood (GLOF)',
        affectedPopulationMillion: 0.088,
        areaInundatedSqKm: 410,
        districtsAffected: 4,
        fatalities: 102,
        summary:
          'On October 4, 2023, a massive ice/rock avalanche triggered a catastrophic breach of South Lhonak Lake (at 5,200m altitude). A wall of water and debris completely destroyed the 1,200 MW Chungthang Hydroelectric Dam and obliterated towns downstream in Singtam, Rangpo, and Melli.',
        keyFactors: ['Moraine failure at 5,200m South Lhonak Lake', 'Overtopping and complete structural destruction of Teesta-III dam', 'Downstream sediment bulking creating 20m high surge wave']
      }
    ],
    gaugeStations: [
      {
        id: 'sik-01',
        name: 'Singtam Teesta Gauge Station',
        river: 'Teesta River',
        district: 'Pakhyong',
        currentLevelM: 348.6,
        warningLevelM: 346.0,
        dangerLevelM: 349.5,
        highestFloodLevelM: 362.4, // Recorded during Oct 2023 GLOF
        status: 'warning',
        trend: 'falling',
        dischargeCumecs: 5200
      },
      {
        id: 'sik-02',
        name: 'Rangpo Bridge Station',
        river: 'Teesta River',
        district: 'Pakhyong',
        currentLevelM: 298.2,
        warningLevelM: 296.5,
        dangerLevelM: 299.8,
        highestFloodLevelM: 312.0,
        status: 'normal',
        trend: 'steady',
        dischargeCumecs: 4800
      }
    ],
    mlDeployments: [
      {
        title: 'Autonomous Himalayan GLOF Early Warning & Satellite Vision',
        leadAgency: 'CWC, Swiss SDC & Sikkim SDMA',
        modelTech: 'Computer Vision Sentinel-2 Multi-spectral Lake Expansion + Deep Learning Acoustic Tripwires',
        operationalSince: '2024 (Upgraded)',
        leadTimeHours: 2.5,
        impactMetrics: 'Direct automatic warning triggers siren networks in Chungthang and Singtam within 3 minutes of lake breach',
        description: 'Combines daily satellite edge-detection of glacial lake area with real-time solar-powered water level sensors.'
      }
    ],
    recommendedMitigation: [
      'Automated siphoning and controlled pumping of water from vulnerable glacial lakes (South Lhonak, Gurudongmar)',
      'Sub-surface seismic and acoustic fiber-optic tripwires along Teesta upper gorge',
      'Strict ban on heavy concrete infrastructure within dynamic river buffer zones'
    ],
    emergencyHelpline: '1070 / 03592-202461 (Sikkim State Disaster Management)'
  }
};
