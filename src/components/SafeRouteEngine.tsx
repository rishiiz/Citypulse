import React, { useState } from 'react';
import { RouteOption, Persona } from '../types';
import { generateRoutes } from '../data/seedRoutes';
import { 
  Navigation, Shield, Zap, Scale, AlertTriangle, CloudRain, 
  Moon, Share2, PhoneCall, ChevronRight, CheckCircle2, Info 
} from 'lucide-react';

interface SafeRouteEngineProps {
  currentPersona: Persona;
  onSelectActiveRoute: (routeId: string) => void;
  activeRouteId: string;
  hasWaterloggingIncident: boolean;
  onOpenSOS: () => void;
}

export const SafeRouteEngine: React.FC<SafeRouteEngineProps> = ({
  currentPersona,
  onSelectActiveRoute,
  activeRouteId,
  hasWaterloggingIncident,
  onOpenSOS
}) => {
  const [origin, setOrigin] = useState<string>('Pune Railway Station');
  const [destination, setDestination] = useState<string>('FC Road / Vaishali');
  const [travelMode, setTravelMode] = useState<'walk' | 'two_wheeler' | 'car' | 'transit'>('two_wheeler');
  const [isRaining, setIsRaining] = useState<boolean>(true);
  const [isNight, setIsNight] = useState<boolean>(false);
  const [showFormulaDetails, setShowFormulaDetails] = useState<boolean>(false);

  // Origins and destinations quick pairs
  const presetPairs = [
    { from: 'Pune Railway Station', to: 'FC Road / Vaishali' },
    { from: 'Swargate Bus Terminal', to: 'Shaniwar Wada' },
    { from: 'Kothrud Stand', to: 'Viman Nagar Phoenix Mall' }
  ];

  const routes = generateRoutes({
    originName: origin,
    destinationName: destination,
    originCoords: [18.5284, 73.8744],
    destCoords: [18.5204, 73.8406],
    travelMode,
    persona: currentPersona,
    isRaining,
    isNight,
    hasWaterlogReport: hasWaterloggingIncident
  });

  const activeRoute = routes.find((r) => r.id === activeRouteId) || routes[0];

  return (
    <div className="safe-route-container">
      {/* Header */}
      <div className="route-header-block">
        <div>
          <span className="badge-highlight">🛡️ Explainable Safe Route Engine</span>
          <h2 className="section-title">Safety-Weighted Navigation</h2>
          <p className="section-desc">
            Unlike standard maps that only optimize for speed, CityPulse calculates:
            <code> Cost = Time + ls · SafetyRisk + lw · WeatherRisk + li · IncidentRisk</code>
          </p>
        </div>

        <button className="sos-action-btn" onClick={onOpenSOS}>
          <PhoneCall size={16} /> SOS & Journey Share
        </button>
      </div>

      {/* Control Card */}
      <div className="route-controls-card glass-panel">
        <div className="od-inputs-grid">
          <div className="od-field">
            <span className="od-dot start">A</span>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="od-input"
              placeholder="Origin"
            />
          </div>
          <div className="od-field">
            <span className="od-dot end">B</span>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="od-input"
              placeholder="Destination"
            />
          </div>
        </div>

        {/* Quick Demo preset pairs */}
        <div className="presets-row">
          <span className="presets-label">Demo OD Pairs:</span>
          {presetPairs.map((pair, idx) => (
            <button
              key={idx}
              className={`preset-btn ${origin === pair.from && destination === pair.to ? 'active' : ''}`}
              onClick={() => {
                setOrigin(pair.from);
                setDestination(pair.to);
              }}
            >
              {pair.from.split(' ')[0]} → {pair.to.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Travel Mode and Environmental Toggles */}
        <div className="route-modifiers-row">
          <div className="mode-tabs">
            {(['walk', 'two_wheeler', 'car', 'transit'] as const).map((mode) => (
              <button
                key={mode}
                className={`mode-btn ${travelMode === mode ? 'active' : ''}`}
                onClick={() => setTravelMode(mode)}
              >
                {mode === 'walk' ? '🚶 Walk' : mode === 'two_wheeler' ? '🛵 Two-Wheeler' : mode === 'car' ? '🚗 Car' : '🚌 Transit'}
              </button>
            ))}
          </div>

          <div className="env-toggles">
            <button
              className={`env-toggle-btn ${isRaining ? 'active' : ''}`}
              onClick={() => setIsRaining(!isRaining)}
              title="Toggle rain scenario"
            >
              <CloudRain size={16} /> Rain Mode {isRaining ? 'ON' : 'OFF'}
            </button>
            <button
              className={`env-toggle-btn ${isNight ? 'active' : ''}`}
              onClick={() => setIsNight(!isNight)}
              title="Toggle night scenario"
            >
              <Moon size={16} /> Night (11 PM) {isNight ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* Rain / Waterlogging Live Alert Nudge */}
      {(hasWaterloggingIncident || isRaining) && (
        <div className="nudge-alert-card danger">
          <AlertTriangle size={20} className="alert-icon" />
          <div className="alert-text">
            <strong>Re-route Nudge: Flood Alert at Sancheti Underpass!</strong>
            <span>
              Verified citizen reports show 1.5 ft water depth. Safest Route automatically shifts via JM Road corridor to protect two-wheelers and pedestrians.
            </span>
          </div>
        </div>
      )}

      {/* 3 Routes Selector Cards */}
      <div className="routes-cards-grid">
        {routes.map((r) => {
          const isSelected = r.id === activeRouteId;
          return (
            <div
              key={r.id}
              className={`route-card glass-panel ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectActiveRoute(r.id)}
              style={{ borderColor: isSelected ? r.color : undefined }}
            >
              <div className="route-card-top">
                <div className="route-title-badge" style={{ color: r.color }}>
                  {r.id === 'safest' ? <Shield size={16} /> : r.id === 'fastest' ? <Zap size={16} /> : <Scale size={16} />}
                  <span>{r.title}</span>
                </div>
                <div className="route-safety-badge" style={{ backgroundColor: `${r.color}22`, color: r.color }}>
                  Safety: {r.routeSafetyScore}/100
                </div>
              </div>

              <div className="route-metrics-row">
                <div className="metric-box">
                  <span className="metric-val">{r.etaMinutes} mins</span>
                  <span className="metric-sub">Duration</span>
                </div>
                <div className="metric-box">
                  <span className="metric-val">{r.distanceKm} km</span>
                  <span className="metric-sub">Distance</span>
                </div>
                <div className="metric-box">
                  <span className="metric-val">{r.costBreakdown.totalCost} pts</span>
                  <span className="metric-sub">Total Cost</span>
                </div>
              </div>

              {/* Highlights */}
              <ul className="route-highlights-list">
                {r.highlights.map((h, i) => (
                  <li key={i}>✓ {h}</li>
                ))}
              </ul>

              {/* Flagged segments if any */}
              {r.flaggedSegments.length > 0 && (
                <div className="flagged-segments-container">
                  {r.flaggedSegments.map((f, i) => (
                    <div key={i} className={`flagged-tag ${f.severity}`}>
                      <AlertTriangle size={13} />
                      <span>{f.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Route Cost Formula Explainer */}
      <div className="formula-explainer-card glass-panel">
        <div className="formula-toggle-header" onClick={() => setShowFormulaDetails(!showFormulaDetails)}>
          <div className="title-with-icon">
            <Info size={16} />
            <span>Explainable Cost Formula for: <strong>{activeRoute.title}</strong></span>
          </div>
          <button className="toggle-btn">{showFormulaDetails ? 'Hide' : 'Inspect Math'}</button>
        </div>

        {showFormulaDetails && (
          <div className="formula-details-content">
            <div className="formula-equation">
              <code>Cost = {activeRoute.costBreakdown.baseTime} (Base Time) + {activeRoute.costBreakdown.safetyPenalty} (Safety Penalty x {currentPersona.name}) + {activeRoute.costBreakdown.weatherPenalty} (Weather) + {activeRoute.costBreakdown.incidentPenalty} (Verified Incidents) = {activeRoute.costBreakdown.totalCost}</code>
            </div>
            <p className="formula-note">
              Persona multiplier for <strong>{currentPersona.name}</strong> is <strong>{currentPersona.safetyPenaltyMultiplier}x</strong>. Notice how low-lit unlit stretches and waterlogged shortcuts incur heavy penalty multipliers, automatically elevating the safe arterial corridor as the optimal route.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
