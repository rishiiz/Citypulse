import React, { useState } from 'react';
import { Incident } from '../types';
import { MapComponent } from './MapComponent';
import { Shield, AlertTriangle, Droplets, Lightbulb, Car, Clock, ChevronRight, X, CheckCircle, ExternalLink } from 'lucide-react';

interface SafetyHeatmapProps {
  incidents: Incident[];
  selectedIncident: Incident | null;
  onSelectIncident: (inc: Incident | null) => void;
  onOpenReportModal: () => void;
}

export const SafetyHeatmap: React.FC<SafetyHeatmapProps> = ({
  incidents,
  selectedIncident,
  onSelectIncident,
  onOpenReportModal
}) => {
  const [activeLayers, setActiveLayers] = useState<string[]>([
    'waterlogging',
    'poor_lighting',
    'accident',
    'harassment',
    'traffic'
  ]);
  const [timeScenario, setTimeScenario] = useState<'now' | 'tonight' | 'rain'>('now');

  const toggleLayer = (layerKey: string) => {
    if (activeLayers.includes(layerKey)) {
      setActiveLayers(activeLayers.filter((l) => l !== layerKey));
    } else {
      setActiveLayers([...activeLayers, layerKey]);
    }
  };

  const layersList = [
    { key: 'waterlogging', label: 'Flooding / Waterlogging', icon: Droplets, color: '#0ea5e9' },
    { key: 'poor_lighting', label: 'Poor Lighting / Dark Zones', icon: Lightbulb, color: '#8b5cf6' },
    { key: 'accident', label: 'Accident-Prone Spots', icon: AlertTriangle, color: '#f97316' },
    { key: 'harassment', label: 'Crime / Harassment Reports', icon: Shield, color: '#ef4444' },
    { key: 'traffic', label: 'Traffic Bottlenecks', icon: Car, color: '#eab308' }
  ];

  return (
    <div className="safety-heatmap-container">
      {/* Top Header */}
      <div className="heatmap-header">
        <div>
          <span className="badge-highlight">🔥 Live Safety Layer</span>
          <h2 className="section-title">City Safety Heatmap & Hotspots</h2>
          <p className="section-desc">
            Aggregated intelligence from verified citizen voice notes, civic accident databases, and real-time telemetry. Every hotspot is explainable.
          </p>
        </div>

        <button className="report-btn-header" onClick={onOpenReportModal}>
          + File 10s Citizen Report
        </button>
      </div>

      {/* Layer Toggles and Time Slider */}
      <div className="controls-ribbon glass-panel">
        <div className="layer-toggles-row">
          <span className="ribbon-label">Heatmap Layers:</span>
          {layersList.map((item) => {
            const isActive = activeLayers.includes(item.key);
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                className={`layer-pill ${isActive ? 'active' : ''}`}
                onClick={() => toggleLayer(item.key)}
                style={{ borderColor: isActive ? item.color : undefined }}
              >
                <Icon size={14} style={{ color: isActive ? item.color : '#94a3b8' }} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Time Slider */}
        <div className="time-slider-row">
          <span className="ribbon-label"><Clock size={14} /> Time Horizon:</span>
          <div className="time-pills">
            <button
              className={`time-pill ${timeScenario === 'now' ? 'active' : ''}`}
              onClick={() => setTimeScenario('now')}
            >
              Current State (Now)
            </button>
            <button
              className={`time-pill ${timeScenario === 'tonight' ? 'active' : ''}`}
              onClick={() => setTimeScenario('tonight')}
            >
              Tonight (11:00 PM)
            </button>
            <button
              className={`time-pill ${timeScenario === 'rain' ? 'active' : ''}`}
              onClick={() => setTimeScenario('rain')}
            >
              Rain Scenario (Heavy Showers)
            </button>
          </div>
        </div>
      </div>

      {/* Heatmap Map + Reason Panel Split View */}
      <div className="heatmap-viewport-grid">
        <div className="map-panel glass-panel">
          <MapComponent
            height="480px"
            incidents={incidents}
            selectedIncident={selectedIncident}
            onSelectIncident={(inc) => onSelectIncident(inc)}
            activeHeatmapLayers={activeLayers}
          />
        </div>

        {/* Hotspot Reason Panel per PRD F4 */}
        <div className="reason-panel-wrapper">
          {selectedIncident ? (
            <div className="reason-panel glass-panel">
              <div className="reason-panel-header">
                <div>
                  <span className="confidence-pill verified">
                    Badge: {selectedIncident.confidence} ({selectedIncident.trustScore}/100)
                  </span>
                  <h3 className="incident-title">{selectedIncident.title}</h3>
                </div>
                <button className="close-reason-btn" onClick={() => onSelectIncident(null)}>
                  <X size={18} />
                </button>
              </div>

              <div className="incident-meta-chips">
                <span className="meta-chip">Ward: {selectedIncident.ward}</span>
                <span className="meta-chip">Reports: {selectedIncident.reportCount} Corroborated</span>
                <span className="meta-chip">Recency: {selectedIncident.lastSeen}</span>
                <span className={`severity-tag ${selectedIncident.severity}`}>
                  {selectedIncident.severity.toUpperCase()}
                </span>
              </div>

              <p className="incident-description">{selectedIncident.description}</p>

              {/* Audio Note Transcript if available */}
              {selectedIncident.hasAudioNote && selectedIncident.audioTranscript && (
                <div className="voice-transcript-card">
                  <span className="transcript-label">🎙️ Citizen Voice Note (Auto-Transcribed):</span>
                  <p className="transcript-quote">"{selectedIncident.audioTranscript}"</p>
                </div>
              )}

              {/* Evidence Photo */}
              {selectedIncident.evidencePhoto && (
                <div className="evidence-photo-box">
                  <img
                    src={selectedIncident.evidencePhoto}
                    alt={selectedIncident.title}
                    className="evidence-img"
                  />
                  <span className="evidence-caption">Verified Photo Evidence (Faces/Plates anonymized)</span>
                </div>
              )}

              {/* Source Mix */}
              <div className="source-mix-section">
                <span className="source-title">Source Mix:</span>
                <div className="source-tags">
                  {selectedIncident.sourceMix.map((s, i) => (
                    <span key={i} className="source-tag">✓ {s}</span>
                  ))}
                </div>
              </div>

              {/* Civic Agency Status */}
              <div className="civic-status-box">
                <div className="civic-status-top">
                  <span>Assigned: <strong>{selectedIncident.civicWardAgency}</strong></span>
                  <span className="status-badge live">{selectedIncident.status}</span>
                </div>
                <div className="action-row">
                  <button
                    className="corroborate-btn"
                    onClick={() => alert('Thanks! Your corroboration +1 was added to raise the Trust Score.')}
                  >
                    👍 Corroborate (+1)
                  </button>
                  <button
                    className="civic-btn"
                    onClick={() => alert(`Civic escalation ticket sent to ${selectedIncident.civicWardAgency}`)}
                  >
                    Escalate to Ward
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-selection-panel glass-panel">
              <Shield size={40} className="empty-icon" />
              <h4>Select Any Hotspot on the Map</h4>
              <p>
                Click any glowing circle or warning pin to inspect verified reports, evidence photographs, voice transcripts, and assigned civic teams.
              </p>
              <div className="quick-hotspot-list">
                <span className="list-title">Active Hotspots in Pune ({incidents.length}):</span>
                {incidents.slice(0, 4).map((inc) => (
                  <button
                    key={inc.id}
                    className="quick-hotspot-item"
                    onClick={() => onSelectIncident(inc)}
                  >
                    <span className="bullet">●</span>
                    <span className="name">{inc.title}</span>
                    <span className="count">{inc.reportCount} reports</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
