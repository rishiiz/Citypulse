import { Persona, PersonaType, SubScores, Place } from '../types';

export const PERSONAS: Record<PersonaType, Persona> = {
  riya: {
    id: 'riya',
    name: 'Riya, 24',
    tagline: 'Solo Woman Traveller',
    avatar: '👩‍💼',
    description: 'Prioritizes well-lit, active routes, verified safe zones, and reliable crowd footfall.',
    weights: {
      safety: 0.45,
      cleanliness: 0.20,
      ratings: 0.15,
      accessibility: 0.10,
      affordability: 0.10
    },
    safetyPenaltyMultiplier: 3.5
  },
  karan: {
    id: 'karan',
    name: 'Karan, 20',
    tagline: 'College Student',
    avatar: '🎒',
    description: 'Looks for cheap eats, buzzing hangout spots, and quick bypasses around gridlocks.',
    weights: {
      safety: 0.20,
      cleanliness: 0.10,
      affordability: 0.35,
      ratings: 0.25,
      accessibility: 0.10
    },
    safetyPenaltyMultiplier: 1.2
  },
  mehta: {
    id: 'mehta',
    name: 'Mehta Family',
    tagline: 'Family with Kids',
    avatar: '👨‍👩‍👧‍👦',
    description: 'Requires hygienic spaces, kid-friendly seating, ramps, and cultural heritage trails.',
    weights: {
      safety: 0.30,
      cleanliness: 0.30,
      accessibility: 0.20,
      ratings: 0.10,
      affordability: 0.10
    },
    safetyPenaltyMultiplier: 2.2
  },
  joshi: {
    id: 'joshi',
    name: 'Mr. Joshi, 67',
    tagline: 'Senior Citizen Resident',
    avatar: '👴',
    description: 'Needs step-free accessibility, clean air, quiet hours, and weather/rain warnings.',
    weights: {
      safety: 0.30,
      cleanliness: 0.15,
      affordability: 0.05,
      ratings: 0.10,
      accessibility: 0.40
    },
    safetyPenaltyMultiplier: 2.8
  },
  civic: {
    id: 'civic',
    name: 'Ward Officer / Civic Scout',
    tagline: 'Civic Volunteer',
    avatar: '👷‍♂️',
    description: 'Focuses on incident density, civic reports, waterlogging, and infrastructure hot spots.',
    weights: {
      safety: 0.25,
      cleanliness: 0.25,
      affordability: 0.15,
      ratings: 0.15,
      accessibility: 0.20
    },
    safetyPenaltyMultiplier: 1.5
  }
};

/**
 * Calculates the explainable Pulse Score (0 - 100) based on active persona weights
 */
export function calculatePulseScore(subScores: SubScores, persona: Persona): number {
  const { safety, cleanliness, affordability, ratings, accessibility } = subScores;
  const { weights } = persona;

  const rawScore = 
    safety * weights.safety +
    cleanliness * weights.cleanliness +
    affordability * weights.affordability +
    ratings * weights.ratings +
    accessibility * weights.accessibility;

  return Math.round(Math.min(100, Math.max(0, rawScore)));
}

/**
 * Calculates Citizen Report Trust Score (0 - 100) per PRD 7.3
 */
export function calculateTrustScore(factors: {
  photoMatch: number; // 0 - 25
  geoConsistency: number; // 0 - 20
  corroboration: number; // 0 - 20
  reporterKarma: number; // 0 - 15
  sourceReliability: number; // 0 - 10
  textConsistency: number; // 0 - 10
}): { trustScore: number; badge: 'Verified' | 'Likely' | 'Unverified'; breakdown: typeof factors } {
  const sum = 
    factors.photoMatch +
    factors.geoConsistency +
    factors.corroboration +
    factors.reporterKarma +
    factors.sourceReliability +
    factors.textConsistency;

  const trustScore = Math.min(100, Math.max(0, sum));
  let badge: 'Verified' | 'Likely' | 'Unverified' = 'Unverified';
  if (trustScore >= 75) badge = 'Verified';
  else if (trustScore >= 45) badge = 'Likely';

  return { trustScore, badge, breakdown: factors };
}

/**
 * Computes City Chaos Index (0 - 100) per PRD 7.5
 * 0.30 Traffic + 0.25 Weather + 0.15 AQI + 0.20 ActiveIncidents + 0.10 Events
 */
export function calculateChaosIndex(inputs: {
  traffic: number; // 0 - 100
  weather: number; // 0 - 100 (severity: heavy rain, storm)
  aqi: number; // normalized 0 - 100
  activeIncidents: number; // normalized 0 - 100
  events: number; // normalized 0 - 100
}): number {
  const chaos = 
    0.30 * inputs.traffic +
    0.25 * inputs.weather +
    0.15 * inputs.aqi +
    0.20 * inputs.activeIncidents +
    0.10 * inputs.events;

  return Math.round(Math.min(100, Math.max(0, chaos)));
}

/**
 * Formats Pulse badge color & label
 */
export function getScoreTheme(score: number): {
  color: string;
  bgColor: string;
  borderColor: string;
  status: string;
} {
  if (score >= 80) {
    return {
      color: '#10b981', // green
      bgColor: 'rgba(16, 185, 129, 0.12)',
      borderColor: '#10b981',
      status: 'High Trust'
    };
  } else if (score >= 60) {
    return {
      color: '#f59e0b', // amber
      bgColor: 'rgba(245, 158, 11, 0.12)',
      borderColor: '#f59e0b',
      status: 'Moderate Trust'
    };
  } else {
    return {
      color: '#ef4444', // red
      bgColor: 'rgba(239, 68, 68, 0.12)',
      borderColor: '#ef4444',
      status: 'Needs Caution'
    };
  }
}
