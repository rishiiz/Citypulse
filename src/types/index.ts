export type PersonaType = 'riya' | 'karan' | 'mehta' | 'joshi' | 'civic';

export interface Persona {
  id: PersonaType;
  name: string;
  tagline: string;
  avatar: string;
  description: string;
  weights: {
    safety: number;
    cleanliness: number;
    affordability: number;
    ratings: number;
    accessibility: number;
  };
  safetyPenaltyMultiplier: number;
}

export type CategoryType = 
  | 'all'
  | 'attraction'
  | 'food'
  | 'heritage'
  | 'cafe'
  | 'park'
  | 'market'
  | 'transit';

export type BudgetTier = '₹' | '₹₹' | '₹₹₹';

export interface SubScores {
  safety: number;
  cleanliness: number;
  affordability: number;
  ratings: number;
  accessibility: number;
}

export interface Place {
  id: string;
  name: string;
  marathiName?: string;
  category: CategoryType;
  coordinates: [number, number]; // [lat, lng]
  address: string;
  ward: string;
  priceTier: BudgetTier;
  subScores: SubScores;
  crowdLevel: 'Low' | 'Moderate' | 'High' | 'Packed';
  isOpen: boolean;
  openHours: string;
  aiSummary: string;
  imageUrl: string;
  tags: string[];
  features: {
    wheelchairRamp: boolean;
    elevator: boolean;
    familyFriendly: boolean;
    womenSafeRated: boolean;
    wellLit: boolean;
  };
  evidenceNotes: {
    safety: string;
    cleanliness: string;
    affordability: string;
    ratings: string;
    accessibility: string;
    lastUpdated: string;
  };
  confidence: 'Verified' | 'Likely' | 'Unverified';
  confidenceReason: string;
}

export type IncidentCategory = 
  | 'waterlogging'
  | 'pothole'
  | 'poor_lighting'
  | 'harassment'
  | 'accident'
  | 'garbage'
  | 'broken_signal'
  | 'hazard'
  | 'positive_shoutout'
  | 'traffic';

export interface Incident {
  id: string;
  category: IncidentCategory;
  title: string;
  description: string;
  coordinates: [number, number];
  ward: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reportCount: number;
  firstSeen: string;
  lastSeen: string;
  trustScore: number;
  confidence: 'Verified' | 'Likely' | 'Unverified';
  status: 'Received' | 'Verified' | 'Dispatched' | 'Resolved';
  evidencePhoto?: string;
  hasAudioNote?: boolean;
  audioTranscript?: string;
  sourceMix: string[];
  civicWardAgency: string;
}

export interface RouteOption {
  id: 'fastest' | 'safest' | 'balanced';
  title: string;
  etaMinutes: number;
  distanceKm: number;
  routeSafetyScore: number; // 0 - 100
  color: string;
  coordinates: [number, number][];
  flaggedSegments: {
    description: string;
    severity: 'warning' | 'danger' | 'info';
    lengthMeters: number;
    penaltyReason: string;
  }[];
  costBreakdown: {
    baseTime: number;
    safetyPenalty: number;
    weatherPenalty: number;
    incidentPenalty: number;
    totalCost: number;
  };
  highlights: string[];
}

export interface HeritageStop {
  id: string;
  title: string;
  era: string;
  coordinates: [number, number];
  story: string;
  source: string;
  sourceUrl: string;
  bestTime: string;
  etiquette: string;
  audioNarration: {
    en: string;
    hi: string;
    mr: string;
  };
  historicalPhoto: string;
  currentPhoto: string;
  historicalYear: string;
  curatorNotes: string;
}

export interface HeritageTrail {
  id: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  distanceKm: number;
  stopsCount: number;
  difficulty: 'Easy' | 'Moderate';
  coverPhoto: string;
  theme: string;
  stops: HeritageStop[];
}

export interface TraditionEvent {
  id: string;
  title: string;
  category: 'Festival' | 'Cultural Fair' | 'Heritage Procession' | 'Street Market';
  dateStr: string;
  location: string;
  coordinates: [number, number];
  expectedCrowd: 'High' | 'Very High' | 'Moderate';
  roadClosures: string[];
  transitAdvisory: string;
  culturalTips: string;
}

export interface ChaosIndexData {
  overallScore: number; // 0 - 100
  trend: 'rising' | 'falling' | 'stable';
  briefing: string;
  components: {
    traffic: number;
    weather: number;
    aqi: number;
    activeIncidents: number;
    events: number;
  };
  weather: {
    tempC: number;
    condition: string;
    rainProbability: number;
    alert?: string;
  };
  aqi: {
    value: number;
    status: 'Good' | 'Moderate' | 'Unhealthy' | 'Hazardous';
    advisory: string;
  };
  trafficCongestion: number; // %
  activeHotspotsCount: number;
}

export interface ItineraryStop {
  stopNumber: number;
  timeSlot: string;
  placeName: string;
  category: string;
  estimatedCost: number;
  whyThis: string;
  confidence: 'Verified' | 'Likely';
  coordinates: [number, number];
  photoUrl: string;
  safeRouteTip: string;
}

export interface ItineraryResponse {
  query: string;
  totalCostEstimate: number;
  durationHours: number;
  weatherSuitability: string;
  stops: ItineraryStop[];
  routeSafetySummary: string;
  confidenceBadge: 'Verified' | 'Likely';
  toolsCalled: string[];
}
