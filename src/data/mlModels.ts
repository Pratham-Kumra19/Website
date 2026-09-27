import { MLModelDetail } from '../types/flood';

export const ML_MODELS: MLModelDetail[] = [
  {
    id: 'lstm-hydro',
    name: 'Spatial-Temporal Bi-LSTM (Rainfall-Runoff Network)',
    category: 'Recurrent',
    leadTime: '48 to 120 Hours (2 - 5 Days)',
    accuracyMetric: 'Nash-Sutcliffe Efficiency (NSE): 0.88 - 0.94',
    spatialResolution: 'Basin / Gauge Station Scale (1km Gridded Input)',
    computationalLatency: '< 1.5 seconds per basin forward pass',
    coreArchitecture:
      'Multi-layer Bi-directional Long Short-Term Memory network coupled with attention mechanisms to process multi-day antecedent meteorological sequences and gauge telemetry.',
    keyInputs: [
      'IMD 0.25° gridded daily/hourly precipitation & satellite GPM IMERG',
      'Antecedent Soil Moisture Saturation (SMAP / Sentinel-1 backscatter)',
      'Historical gauge stage hydrographs (CWC telemetric gauges)',
      'Potential Evapotranspiration (PET) & Temperature indices'
    ],
    outputs: [
      'Continuous 72h to 120h hydrograph forecast at critical gauge nodes',
      'Exceedance probability for Warning, Danger, and Highest Flood Levels (HFL)',
      'Estimated peak discharge time and flood wave propagation speed'
    ],
    advantages: [
      'Captures long-term memory of catchment soil saturation that dictates runoff coefficients',
      'Overcomes severe lack of detailed river bathymetry data that cripples traditional 1D/2D hydraulic models',
      'Extremely rapid inference allowing high-frequency real-time updates every 30 minutes'
    ],
    limitations: [
      'Pure data-driven models may underestimate extreme out-of-distribution events (e.g., 500-year floods)',
      'Sensitive to missing gauge sensor telemetry during communication outages in storms'
    ],
    neIndiaSuitability:
      'Highly effective across the Brahmaputra and Barak basins where upstream Himalayan rainfall from Arunachal Pradesh and Meghalaya dictates flood peaks 48 to 72 hours later in Assam plains.',
    equationOrConcept:
      'c_t = f_t ⊙ c_{t-1} + i_t ⊙ tanh(W_c [h_{t-1}, x_t] + b_c); \\quad \\hat{Q}_{t+k} = \\sigma(W_o [h_t, x_{t+k}] + b_o)'
  },
  {
    id: 'pinn-shallow',
    name: 'Physics-Informed Neural Network (PINN-Hydro)',
    category: 'Physics-Guided',
    leadTime: '24 to 72 Hours',
    accuracyMetric: 'R²: 0.93 | Mass Conservation Error < 0.8%',
    spatialResolution: '10m - 30m 2D Hydraulic Inundation Mesh',
    computationalLatency: '12 seconds (vs 4 hours for full HEC-RAS 2D)',
    coreArchitecture:
      'Deep residual network whose custom loss function embeds the 1D & 2D Saint-Venant shallow water equations (continuity and momentum conservation), ensuring physically plausible water profiles even under unobserved flood spikes.',
    keyInputs: [
      'High-resolution Digital Elevation Models (CartoDEM / Copernicus 30m)',
      'Roughness coefficients (Manning’s n derived from land cover)',
      'Upstream boundary discharge and lateral tributary inflows',
      'Downstream boundary conditions (e.g., Loktak Lake or Bangladesh river level)'
    ],
    outputs: [
      '2D Water Depth map (h) across the floodplain',
      '2D Flow Velocity vectors (u, v) identifying hazardous rescue zones',
      'Embankment overtopping and dyke breach flow rates'
    ],
    advantages: [
      'Strictly enforces conservation of mass and momentum—cannot hallucinate unrealistic water levels',
      'Predicts flood depths across un-gauged interior villages between official gauge stations',
      'Orders of magnitude faster than numerical solvers (HEC-RAS, MIKE 21, TUFLOW)'
    ],
    limitations: [
      'Requires calibrated bathymetry and high-quality digital elevation data',
      'Training the multi-objective loss with partial differential equation (PDE) residuals is computationally intensive'
    ],
    neIndiaSuitability:
      'Crucial for complex confined basins like the Imphal Valley (Manipur) and the Silchar urban floodplain (Assam) where backwater effects and dyke overtopping dominate.',
    equationOrConcept:
      '\\mathcal{L}_{PINN} = \\mathcal{L}_{data} + \\lambda_1 \\left\\| \\frac{\\partial h}{\\partial t} + \\nabla \\cdot (h \\mathbf{u}) \\right\\|^2 + \\lambda_2 \\left\\| \\frac{\\partial (h \\mathbf{u})}{\\partial t} + \\nabla \\cdot (h \\mathbf{u} \\otimes \\mathbf{u} + \\frac{1}{2} g h^2 \\mathbf{I}) - g h (\\mathbf{S}_0 - \\mathbf{S}_f) \\right\\|^2'
  },
  {
    id: 'gnn-topology',
    name: 'Spatial Graph Neural Network (River-GNN)',
    category: 'Graph-Based',
    leadTime: '36 to 96 Hours',
    accuracyMetric: 'KGE (Kling-Gupta Efficiency): 0.91',
    spatialResolution: 'Interconnected River Reach Network (Node-Edge)',
    computationalLatency: '< 2.0 seconds for the entire 8-state NE basin graph',
    coreArchitecture:
      'Spatio-temporal Graph Convolutional Network (ST-GCN) where river reach junctions and gauge stations are modeled as directed graph nodes, and stream channels are directional edges reflecting water transit times.',
    keyInputs: [
      'Topological river network connectivity graph (HydroSHEDS)',
      'Node-level rainfall and gauge telemetry time series',
      'Edge travel-time matrices calibrated by channel slope and distance',
      'Dam and barrage operational release rates'
    ],
    outputs: [
      'Simultaneous flood risk scores across all 50+ tributaries of Brahmaputra',
      'Confluence surge amplification warnings (e.g., Siang + Dibang + Lohit confluence)',
      'Cascading downstream failure impact predictions'
    ],
    advantages: [
      'Naturally mirrors the physical structure of dendritic river drainage networks',
      'Seamlessly transfers learned hydrological behavior to un-gauged tributary basins',
      'Handles complex transboundary networks crossing state and international borders'
    ],
    limitations: [
      'Graph construction requires accurate geospatial river network mapping',
      'Extreme flash channel shifts during mega-floods can alter topological edge characteristics'
    ],
    neIndiaSuitability:
      'Ideal for North-East India where the Brahmaputra receives inflows from more than 50 major tributaries across 4 states and Tibet, creating complex confluence surge dynamics.',
    equationOrConcept:
      'H^{(l+1)} = \\sigma \\left( \\tilde{D}^{-\\frac{1}{2}} \\tilde{A}_{directed} \\tilde{D}^{-\\frac{1}{2}} H^{(l)} W_G^{(l)} + W_T^{(l)} * H^{(l)} \\right)'
  },
  {
    id: 'sar-unet',
    name: 'Sentinel-1 SAR Cloud-Penetrating U-Net',
    category: 'Computer Vision',
    leadTime: 'Real-time Rapid Damage Mapping (Post-satellite pass: < 30 mins)',
    accuracyMetric: 'Intersection over Union (IoU): 0.92 | F1-Score: 0.94',
    spatialResolution: '10-meter ground pixel resolution',
    computationalLatency: '18 seconds per 250 x 250 km Sentinel-1 scene',
    coreArchitecture:
      'Deep convolutional U-Net with attention gates and dual-polarization (VV + VH) backscatter normalization trained specifically on monsoon-submerged terrestrial landscapes.',
    keyInputs: [
      'Sentinel-1 C-Band Synthetic Aperture Radar (SAR) backscatter intensity (VV/VH)',
      'Pre-flood dry baseline SAR reference composite',
      'High-resolution Digital Elevation Model (SRTM / ALOS PALSAR 12.5m)',
      'Land use / Land cover masks to eliminate permanent water bodies'
    ],
    outputs: [
      'Binary & Probabilistic Flood Inundation Extent polygon masks (GeoTIFF/Shapefile)',
      'Identification of breached embankment segments',
      'List of marooned villages and submerged highway corridors for NDRF dispatch'
    ],
    advantages: [
      'Radar signals effortlessly penetrate 100% thick monsoon cloud cover and heavy rainfall',
      'Operates day and night independent of solar illumination',
      'Pinpoints exact spatial boundaries of submerged farmland, roads, and human settlements'
    ],
    limitations: [
      'Satellite revisit time (6-12 days for single satellite, 3-5 days for constellation)',
      'Specular reflection over smooth asphalt or sand bars can occasionally mimic calm water (mitigated by DEM filtering)'
    ],
    neIndiaSuitability:
      'Indispensable for Assam and Meghalaya during peak monsoons where optical satellites (Sentinel-2, Landsat) are blinded by dense cloud cover for weeks at a time.',
    equationOrConcept:
      '\\mathcal{L}_{Seg} = \\alpha \\mathcal{L}_{BCE}(y, \\hat{y}) + (1-\\alpha) \\left( 1 - \\frac{2 |y \\cap \\hat{y}|}{|y| + |\\hat{y}|} \\right) + \\beta \\| \\nabla y - \\nabla \\hat{y} \\|_{edge}'
  },
  {
    id: 'xgboost-flash',
    name: 'Orographic Flash-Flood Susceptibility Ensemble',
    category: 'Ensemble',
    leadTime: '2 to 12 Hours (Ultra-Rapid Nowcast)',
    accuracyMetric: 'Area Under ROC Curve (AUC-ROC): 0.952',
    spatialResolution: '100m grid across hill terrains',
    computationalLatency: '< 0.2 seconds per hill catchment',
    coreArchitecture:
      'Extreme Gradient Boosted Trees (XGBoost) combined with LightGBM and CatBoost in a stacked voting ensemble trained on historical cloudburst and ravine overflow events.',
    keyInputs: [
      'Radar Reflectivity (dBZ) from IMD Doppler Radars (Cherrapunji, Agartala, Mohanbari)',
      'Topographic Wetness Index (TWI) & Catchment Stream Power Index (SPI)',
      'Slope angle, curvature, and lithological permeability',
      '15-minute Doppler radar precipitation accumulation rate (mm/hr)'
    ],
    outputs: [
      'High-resolution Flash Flood Hazard index (0 - 100) per micro-watershed',
      'Trigger probability for mountain road washouts and culvert blowouts',
      'Automated SMS warning generation for foothill populations'
    ],
    advantages: [
      'Ultra-fast inference enabling instantaneous updates on incoming cloudburst radar echoes',
      'Superior handling of non-linear interactions between steep topography and intense rain',
      'Provides feature importance rankings showing whether rainfall intensity or slope saturation is the dominant driver'
    ],
    limitations: [
      'Does not provide water depth hydrographs—classifies flash-flood susceptibility',
      'Requires Doppler radar coverage; radar shadow can occur behind towering Himalayan peaks'
    ],
    neIndiaSuitability:
      'Critical for steep mountain regions of Arunachal Pradesh, Sikkim, and Meghalaya where cloudbursts trigger deadly torrents in narrow gorges with under 3 hours of warning.',
    equationOrConcept:
      '\\mathcal{L}^{(t)} = \\sum_{i=1}^n \\left[ g_i f_t(\\mathbf{x}_i) + \\frac{1}{2} h_i f_t^2(\\mathbf{x}_i) \\right] + \\gamma T + \\frac{1}{2} \\lambda \\sum_{j=1}^T w_j^2'
  }
];
