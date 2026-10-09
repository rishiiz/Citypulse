import React, { useState } from 'react';
import { Place, SubScores } from '../types';
import { Shield, Sparkles, IndianRupee, Star, Accessibility, AlertTriangle, ArrowRight, Award } from 'lucide-react';

interface CompareModeProps {
  places: Place[];
  onSelectPlaceForView?: (place: Place) => void;
}

export const CompareMode: React.FC<CompareModeProps> = ({ places, onSelectPlaceForView }) => {
  // Pre-seed 3 interesting candidate spots or neighborhoods to compare
  const defaultSelection = places.slice(0, 3).map((p) => p.id);
  const [selectedPlaceIds, setSelectedPlaceIds] = useState<string[]>(
    defaultSelection.length >= 2 ? defaultSelection : ['pune-1', 'pune-2', 'pune-6']
  );
  const [focusedAxis, setFocusedAxis] = useState<keyof SubScores | null>(null);

  const selectedPlaces = places.filter((p) => selectedPlaceIds.includes(p.id));

  const togglePlace = (id: string) => {
    if (selectedPlaceIds.includes(id)) {
      if (selectedPlaceIds.length > 2) {
        setSelectedPlaceIds(selectedPlaceIds.filter((p) => p !== id));
      }
    } else {
      if (selectedPlaceIds.length < 4) {
        setSelectedPlaceIds([...selectedPlaceIds, id]);
      }
    }
  };

  const axes: { key: keyof SubScores; label: string; icon: any }[] = [
    { key: 'safety', label: 'Safety', icon: Shield },
    { key: 'cleanliness', label: 'Cleanliness', icon: Sparkles },
    { key: 'affordability', label: 'Affordability', icon: IndianRupee },
    { key: 'ratings', label: 'Ratings/Reviews', icon: Star },
    { key: 'accessibility', label: 'Accessibility', icon: Accessibility }
  ];

  const colors = ['#38bdf8', '#10b981', '#f59e0b', '#ec4899'];

  // Radar geometry calculations
  const size = 320;
  const center = size / 2;
  const radius = size * 0.38;
  const numAxes = axes.length;

  const getCoordinates = (value: number, index: number) => {
    const angle = (Math.PI * 2 * index) / numAxes - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return [x, y] as [number, number];
  };

  // Generate AI Verdict with 3 sentences
  const generateVerdict = () => {
    if (selectedPlaces.length < 2) return '';
    const leader = [...selectedPlaces].sort((a, b) => {
      const avgA = Object.values(a.subScores).reduce((acc, v) => acc + v, 0);
      const avgB = Object.values(b.subScores).reduce((acc, v) => acc + v, 0);
      return avgB - avgA;
    })[0];

    const budgetPick = [...selectedPlaces].sort((a, b) => b.subScores.affordability - a.subScores.affordability)[0];
    const safetyPick = [...selectedPlaces].sort((a, b) => b.subScores.safety - a.subScores.safety)[0];

    return `For overall balance, ${leader.name} leads with exceptional marks across ${leader.subScores.safety > 85 ? 'well-patrolled safety' : 'crowd appeal'}. If budget is your priority constraint, ${budgetPick.name} gives maximum value (${budgetPick.subScores.affordability}/100 affordability) though watch for peak crowd queues. For late evening or vulnerable traveler peace-of-mind, ${safetyPick.name} offers the safest verified environment.`;
  };

  // Leaderboards
  const bestFamily = [...places].sort((a, b) => (b.subScores.safety + b.subScores.cleanliness) - (a.subScores.safety + a.subScores.cleanliness))[0];
  const bestBudget = [...places].sort((a, b) => (b.subScores.affordability * 2 + b.subScores.ratings) - (a.subScores.affordability * 2 + a.subScores.ratings))[0];
  const cleanest = [...places].sort((a, b) => b.subScores.cleanliness - a.subScores.cleanliness)[0];
  const needsAttention = [...places].sort((a, b) => (a.subScores.safety + a.subScores.cleanliness) - (b.subScores.safety + b.subScores.cleanliness))[0];

  return (
    <div className="compare-mode-container">
      {/* Header */}
      <div className="compare-header">
        <div>
          <h2 className="section-title">Compare Mode — 5-Axis Radar</h2>
          <p className="section-desc">
            Multi-dimensional comparative analysis. Select 2 to 4 spots to inspect real trade-offs and tap any axis to inspect raw evidence.
          </p>
        </div>

        {/* Quick selector chips */}
        <div className="compare-selector-bar">
          <span className="selector-label">Comparing ({selectedPlaces.length}/4):</span>
          <div className="chips-wrapper">
            {places.slice(0, 10).map((p) => {
              const isSelected = selectedPlaceIds.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => togglePlace(p.id)}
                  className={`chip-btn ${isSelected ? 'active' : ''}`}
                >
                  {isSelected ? '✓ ' : '+ '} {p.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="compare-grid">
        {/* Radar Chart Display */}
        <div className="radar-card glass-panel">
          <div className="radar-svg-container">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="radar-svg">
              {/* Circular grid rings */}
              {[20, 40, 60, 80, 100].map((level) => {
                const r = (level / 100) * radius;
                return (
                  <circle
                    key={level}
                    cx={center}
                    cy={center}
                    r={r}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeDasharray={level === 100 ? 'none' : '3 3'}
                  />
                );
              })}

              {/* Axis rays */}
              {axes.map((axis, i) => {
                const [endX, endY] = getCoordinates(100, i);
                const isHovered = focusedAxis === axis.key;
                return (
                  <g key={axis.key} onClick={() => setFocusedAxis(axis.key)} style={{ cursor: 'pointer' }}>
                    <line
                      x1={center}
                      y1={center}
                      x2={endX}
                      y2={endY}
                      stroke={isHovered ? '#38bdf8' : 'rgba(255, 255, 255, 0.15)'}
                      strokeWidth={isHovered ? 2 : 1}
                    />
                  </g>
                );
              })}

              {/* Radar Polygons */}
              {selectedPlaces.map((place, placeIdx) => {
                const color = colors[placeIdx % colors.length];
                const points = axes
                  .map((axis, i) => {
                    const val = place.subScores[axis.key];
                    const [px, py] = getCoordinates(val, i);
                    return `${px},${py}`;
                  })
                  .join(' ');

                return (
                  <g key={place.id}>
                    <polygon
                      points={points}
                      fill={color}
                      fillOpacity={0.25}
                      stroke={color}
                      strokeWidth={2.5}
                      style={{ transition: 'all 0.3s ease' }}
                    />
                    {axes.map((axis, i) => {
                      const val = place.subScores[axis.key];
                      const [px, py] = getCoordinates(val, i);
                      return (
                        <circle
                          key={axis.key}
                          cx={px}
                          cy={py}
                          r={4}
                          fill={color}
                          stroke="#0f172a"
                          strokeWidth={2}
                        />
                      );
                    })}
                  </g>
                );
              })}

              {/* Axis Labels */}
              {axes.map((axis, i) => {
                const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
                const labelRadius = radius + 24;
                const lx = center + labelRadius * Math.cos(angle);
                const ly = center + labelRadius * Math.sin(angle);
                const isFocused = focusedAxis === axis.key;

                return (
                  <text
                    key={axis.key}
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isFocused ? '#38bdf8' : '#94a3b8'}
                    fontSize={11}
                    fontWeight={isFocused ? 700 : 500}
                    onClick={() => setFocusedAxis(axis.key)}
                    style={{ cursor: 'pointer' }}
                  >
                    {axis.label}
                  </text>
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="radar-legend">
            {selectedPlaces.map((place, idx) => (
              <div key={place.id} className="legend-item">
                <span className="legend-color-dot" style={{ backgroundColor: colors[idx % colors.length] }}></span>
                <span className="legend-title">{place.name}</span>
              </div>
            ))}
          </div>

          <div className="axis-hint-banner">
            💡 <em>Click any axis name or ray to inspect verified evidence & sub-score inputs.</em>
          </div>
        </div>

        {/* AI Verdict & Evidence Card */}
        <div className="verdict-card glass-panel">
          <div className="ai-verdict-header">
            <span className="badge-ai">🤖 AI Explainable Verdict</span>
            <span className="confidence-pill verified">Confidence: High</span>
          </div>

          <p className="ai-verdict-text">{generateVerdict()}</p>

          {/* Weakest Axis / Focused Axis Evidence Inspector */}
          <div className="evidence-inspector">
            <h4 className="inspector-title">
              {focusedAxis ? `Axis Evidence: ${axes.find(a => a.key === focusedAxis)?.label}` : 'Tap an axis above to inspect evidence'}
            </h4>

            {focusedAxis && (
              <div className="evidence-list">
                {selectedPlaces.map((place, idx) => (
                  <div key={place.id} className="place-evidence-row" style={{ borderLeftColor: colors[idx % colors.length] }}>
                    <div className="place-evidence-top">
                      <span className="place-name">{place.name}</span>
                      <span className="score-tag">{place.subScores[focusedAxis]}/100</span>
                    </div>
                    <p className="evidence-note-text">
                      "{place.evidenceNotes[focusedAxis]}"
                    </p>
                    <span className="recency-tag">Freshness: {place.evidenceNotes.lastUpdated}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Leaderboards section per PRD F6 */}
      <div className="leaderboards-section">
        <h3 className="section-subtitle">City Leaderboards & Needs Attention</h3>
        <div className="leaderboard-cards-grid">
          {bestFamily && (
            <div className="leader-card glass-panel">
              <div className="leader-badge-tag family">
                <Award size={14} /> Best for Families
              </div>
              <h4 className="leader-name">{bestFamily.name}</h4>
              <p className="leader-desc">{bestFamily.aiSummary}</p>
              <div className="leader-stats">
                <span>Safety: {bestFamily.subScores.safety}</span>
                <span>Cleanliness: {bestFamily.subScores.cleanliness}</span>
              </div>
            </div>
          )}

          {bestBudget && (
            <div className="leader-card glass-panel">
              <div className="leader-badge-tag budget">
                <IndianRupee size={14} /> Best Budget Food
              </div>
              <h4 className="leader-name">{bestBudget.name}</h4>
              <p className="leader-desc">{bestBudget.aiSummary}</p>
              <div className="leader-stats">
                <span>Affordability: {bestBudget.subScores.affordability}</span>
                <span>Ratings: {bestBudget.subScores.ratings}</span>
              </div>
            </div>
          )}

          {cleanest && (
            <div className="leader-card glass-panel">
              <div className="leader-badge-tag clean">
                <Sparkles size={14} /> Cleanest Environment
              </div>
              <h4 className="leader-name">{cleanest.name}</h4>
              <p className="leader-desc">{cleanest.aiSummary}</p>
              <div className="leader-stats">
                <span>Cleanliness: {cleanest.subScores.cleanliness}</span>
                <span>Accessibility: {cleanest.subScores.accessibility}</span>
              </div>
            </div>
          )}

          {needsAttention && (
            <div className="leader-card glass-panel attention-border">
              <div className="leader-badge-tag attention">
                <AlertTriangle size={14} /> Needs Civic Attention
              </div>
              <h4 className="leader-name">{needsAttention.name}</h4>
              <p className="leader-desc">{needsAttention.aiSummary}</p>
              <div className="attention-footer">
                <span className="attention-note">Lower sanitation/lighting score. Citizen reports active.</span>
                <button
                  className="civic-action-btn"
                  onClick={() => alert(`Civic ticket opened for ${needsAttention.name}! Escalated to PMC Ward Officer.`)}
                >
                  File Civic Escalation →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
