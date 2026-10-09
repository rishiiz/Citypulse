import { RouteOption, Persona } from '../types';

export interface RouteRequest {
  originName: string;
  destinationName: string;
  originCoords: [number, number];
  destCoords: [number, number];
  travelMode: 'walk' | 'two_wheeler' | 'car' | 'transit';
  persona: Persona;
  isRaining: boolean;
  isNight: boolean;
  hasWaterlogReport: boolean;
}

export function generateRoutes(req: RouteRequest): RouteOption[] {
  const { originCoords, destCoords, persona, isRaining, isNight, hasWaterlogReport } = req;
  const [lat1, lng1] = originCoords;
  const [lat2, lng2] = destCoords;

  // Midpoint derivations
  const midLat = (lat1 + lat2) / 2;
  const midLng = (lat1 + lng2) / 2;

  // Waypoints for Route 1 (Fastest, direct through low-lying shortcut/underpass)
  const coordsFastest: [number, number][] = [
    originCoords,
    [midLat + 0.002, midLng - 0.003],
    [18.5298, 73.8505], // Sancheti underpass coordinates!
    [midLat - 0.001, midLng + 0.002],
    destCoords
  ];

  // Waypoints for Route 2 (Safest, via well-lit arterial Smart City highway, avoiding underpass)
  const coordsSafest: [number, number][] = [
    originCoords,
    [lat1 + (lat2 - lat1) * 0.2, lng1 + 0.008],
    [midLat + 0.006, midLng + 0.008], // Loops east over well-lit elevated flyover
    [lat2 - (lat2 - lat1) * 0.2, lng2 + 0.005],
    destCoords
  ];

  // Waypoints for Route 3 (Balanced, via main JM Road boulevard)
  const coordsBalanced: [number, number][] = [
    originCoords,
    [midLat - 0.004, midLng - 0.001],
    [18.5245, 73.8471], // JM Road boulevard
    destCoords
  ];

  // Dynamic penalties calculation
  const rainPenalty = isRaining ? 12 : 2;
  const nightPenalty = isNight ? 10 : 0;
  const underpassPenalty = (hasWaterlogReport || isRaining) ? 35 : 10;
  const personaMultiplier = persona.safetyPenaltyMultiplier;

  // Fastest Route
  const fastestBaseTime = 14;
  const fastestSafetyPenalty = Math.round((18 + (isNight ? 15 : 5)) * (personaMultiplier * 0.3));
  const fastestTotalCost = fastestBaseTime + fastestSafetyPenalty + (underpassPenalty * 0.8) + (rainPenalty * 0.5);

  // Safest Route
  const safestBaseTime = 20;
  const safestSafetyPenalty = Math.round(4 * personaMultiplier);
  const safestTotalCost = safestBaseTime + safestSafetyPenalty + (rainPenalty * 0.2);

  // Balanced Route
  const balancedBaseTime = 17;
  const balancedSafetyPenalty = Math.round(10 * personaMultiplier);
  const balancedTotalCost = balancedBaseTime + balancedSafetyPenalty + (rainPenalty * 0.4);

  const fastestFlagged: RouteOption['flaggedSegments'] = [
    {
      description: hasWaterlogReport || isRaining 
        ? 'Sancheti Underpass: 1.5 ft waterlogging reported. Two-wheelers prone to skidding.'
        : 'Sancheti Underpass: Low-lying section prone to waterlogging in rain.',
      severity: (hasWaterlogReport || isRaining) ? 'danger' : 'warning',
      lengthMeters: 380,
      penaltyReason: 'Verified citizen waterlogging reports within 6 hours'
    }
  ];

  if (isNight) {
    fastestFlagged.push({
      description: 'Poorly lit secondary alley stretch (300m) with flickering municipal lamps.',
      severity: 'warning',
      lengthMeters: 300,
      penaltyReason: 'Night time safety penalty applied for ' + persona.name
    });
  }

  const safestFlagged: RouteOption['flaggedSegments'] = [
    {
      description: '100% wide arterial avenue with active Smart City solar LEDs and CCTV coverage.',
      severity: 'info',
      lengthMeters: 4800,
      penaltyReason: 'Zero adverse safety reports in last 72 hours'
    }
  ];

  const balancedFlagged: RouteOption['flaggedSegments'] = [
    {
      description: 'JM Road corridor: Moderate traffic queue near Deccan Gymkhana junction.',
      severity: 'warning',
      lengthMeters: 450,
      penaltyReason: 'Peak hour vehicle density'
    }
  ];

  return [
    {
      id: 'safest',
      title: 'Safest Route (Recommended)',
      etaMinutes: safestBaseTime,
      distanceKm: 5.2,
      routeSafetyScore: 94,
      color: '#10b981', // green
      coordinates: coordsSafest,
      flaggedSegments: safestFlagged,
      costBreakdown: {
        baseTime: safestBaseTime,
        safetyPenalty: safestSafetyPenalty,
        weatherPenalty: Math.round(rainPenalty * 0.2),
        incidentPenalty: 0,
        totalCost: Math.round(safestTotalCost)
      },
      highlights: [
        'Completely avoids flooded Sancheti underpass',
        'Continuous high-lux street lighting & police PCR presence',
        'Smooth pedestrian/vehicular road surface with zero deep potholes'
      ]
    },
    {
      id: 'fastest',
      title: 'Fastest Route (High Hazard)',
      etaMinutes: fastestBaseTime,
      distanceKm: 4.1,
      routeSafetyScore: (hasWaterlogReport || isRaining) ? 52 : 68,
      color: '#ef4444', // red
      coordinates: coordsFastest,
      flaggedSegments: fastestFlagged,
      costBreakdown: {
        baseTime: fastestBaseTime,
        safetyPenalty: fastestSafetyPenalty,
        weatherPenalty: Math.round(rainPenalty * 0.5),
        incidentPenalty: Math.round(underpassPenalty * 0.8),
        totalCost: Math.round(fastestTotalCost)
      },
      highlights: [
        'Shortest travel time (-6 mins faster)',
        'Cuts through flood-prone low lying subway',
        'Higher hazard rating for ' + persona.name
      ]
    },
    {
      id: 'balanced',
      title: 'Balanced Route',
      etaMinutes: balancedBaseTime,
      distanceKm: 4.6,
      routeSafetyScore: 84,
      color: '#3b82f6', // blue
      coordinates: coordsBalanced,
      flaggedSegments: balancedFlagged,
      costBreakdown: {
        baseTime: balancedBaseTime,
        safetyPenalty: balancedSafetyPenalty,
        weatherPenalty: Math.round(rainPenalty * 0.4),
        incidentPenalty: 4,
        totalCost: Math.round(balancedTotalCost)
      },
      highlights: [
        'Moderate travel duration with arterial road comfort',
        'Avoids severe choke points',
        'Passing through active commercial zones'
      ]
    }
  ];
}
