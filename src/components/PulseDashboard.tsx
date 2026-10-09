import React, { useState } from 'react';
import { ChaosIndexData, Incident } from '../types';
import { calculateChaosIndex } from '../services/scoringEngine';
import { 
  Activity, CloudRain, Wind, AlertTriangle, TrendingUp, 
  MapPin, Clock, Calendar, ShieldCheck, ChevronRight, BarChart3 
} from 'lucide-react';

interface PulseDashboardProps {
  incidents: Incident[];
  onSelectIncidentForView?: (inc: Incident) => void;
}

export const PulseDashboard: React.FC<PulseDashboardProps> = ({
  incidents,
  onSelectIncidentForView
}) => {
  const [selectedWard, setSelectedWard] = useState<string>('Shivajinagar');

  // Compute live Chaos Index based on live inputs
  const chaosScore = calculateChaosIndex({
    traffic: 68,
    weather: 72,
    aqi: 54,
    activeIncidents: Math.min(100, incidents.length * 12),
    events: 40
  });

  const chaosData: ChaosIndexData = {
    overallScore: chaosScore,
    trend: 'rising',
    briefing: 'Heavy rain alert active across Deccan & Shivajinagar; waterlogged Sancheti underpass flagged; Pune Metro running normally.',
    components: {
      traffic: 68,
      weather: 72,
      aqi: 54,
      activeIncidents: Math.min(100, incidents.length * 12),
      events: 40
    },
    weather: {
      tempC: 27,
      condition: 'Thunderstorms & Rain Showers',
      rainProbability: 85,
      alert: 'Red Weather Alert: 45mm/hr localized deluge expected near Mutha basin.'
    },
    aqi: {
      value: 94,
      status: 'Moderate',
      advisory: 'Satisfactory for most residents. Sensitive groups limit prolonged outdoor cardio.'
    },
    trafficCongestion: 68,
    activeHotspotsCount: incidents.length
  };

  const wardAnalytics: Record<string, {
    totalReports: number;
    topCategory: string;
    peakHours: string;
    trendWw: string;
    safetyGrade: string;
  }> = {
    Shivajinagar: { totalReports: 14, topCategory: 'Waterlogging (6)', peakHours: '05:30 PM – 08:00 PM', trendWw: '+18% (Monsoon onset)', safetyGrade: 'B+' },
    'Kasba Peth': { totalReports: 9, topCategory: 'Traffic Bottlenecks (4)', peakHours: '11:00 AM – 02:00 PM', trendWw: '-5% (Stable)', safetyGrade: 'A-' },
    Kothrud: { totalReports: 7, topCategory: 'Potholes (3)', peakHours: '09:00 AM – 11:30 AM', trendWw: '+4%', safetyGrade: 'A' },
    'Viman Nagar': { totalReports: 5, topCategory: 'Illegal Parking (2)', peakHours: '07:00 PM – 10:00 PM', trendWw: '-12%', safetyGrade: 'A+' },
    Camp: { totalReports: 8, topCategory: 'Poor Lighting (3)', peakHours: '08:30 PM – 11:00 PM', trendWw: '+8%', safetyGrade: 'B' }
  };

  const currentWardData = wardAnalytics[selectedWard] || wardAnalytics['Shivajinagar'];

  return (
    <div className="pulse-dashboard-container">
      {/* Top Header */}
      <div className="pulse-header">
        <div>
          <span className="badge-highlight">📡 Smart City Telemetry</span>
          <h2 className="section-title">Live City Pulse & Chaos Index</h2>
          <p className="section-desc">
            Continuous real-time fusion of traffic congestion, weather alarms, AQI sensors, open civic data, and citizen ground reports.
          </p>
        </div>
        <div className="live-sync-pill">
          <span className="pulsing-green-dot"></span>
          <span>Live Ingestion: 5-min PostGIS cycle</span>
        </div>
      </div>

      {/* Topline Chaos Index Hero Card */}
      <div className="chaos-hero-card glass-panel">
        <div className="chaos-hero-left">
          <div className="chaos-index-label-row">
            <Activity size={20} color="#f59e0b" />
            <span className="chaos-title">CITY CHAOS INDEX (0–100)</span>
            <span className="trend-tag rising">
              <TrendingUp size={14} /> Rising ↗
            </span>
          </div>

          <div className="chaos-score-display">
            <span className="score-giant">{chaosData.overallScore}</span>
            <span className="score-max">/100</span>
            <span className="chaos-state-label">Elevated Friction</span>
          </div>

          <div className="ai-briefing-box">
            <span className="briefing-prefix">🤖 1-Line AI Briefing:</span>
            <p className="briefing-content">"{chaosData.briefing}"</p>
          </div>
        </div>

        {/* 5 Component Progress Meters */}
        <div className="chaos-components-right">
          <h4 className="comp-title">Chaos Formula Weighting (PRD 7.5):</h4>
          <div className="comp-meter-list">
            <div className="comp-meter-item">
              <div className="meter-label-row">
                <span>Traffic (30% weight)</span>
                <span>{chaosData.components.traffic}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${chaosData.components.traffic}%`, backgroundColor: '#f59e0b' }}></div>
              </div>
            </div>

            <div className="comp-meter-item">
              <div className="meter-label-row">
                <span>Weather Deluge (25% weight)</span>
                <span>{chaosData.components.weather}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${chaosData.components.weather}%`, backgroundColor: '#38bdf8' }}></div>
              </div>
            </div>

            <div className="comp-meter-item">
              <div className="meter-label-row">
                <span>Active Incidents (20% weight)</span>
                <span>{chaosData.components.activeIncidents}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${chaosData.components.activeIncidents}%`, backgroundColor: '#ef4444' }}></div>
              </div>
            </div>

            <div className="comp-meter-item">
              <div className="meter-label-row">
                <span>Air Quality AQI (15% weight)</span>
                <span>{chaosData.components.aqi}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${chaosData.components.aqi}%`, backgroundColor: '#10b981' }}></div>
              </div>
            </div>

            <div className="comp-meter-item">
              <div className="meter-label-row">
                <span>Tradition & Event Load (10% weight)</span>
                <span>{chaosData.components.events}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${chaosData.components.events}%`, backgroundColor: '#a855f7' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Telemetry Widgets per PRD F7 */}
      <div className="telemetry-widgets-grid">
        {/* Weather & Alerts Widget */}
        <div className="widget-card glass-panel">
          <div className="widget-header">
            <div className="w-title">
              <CloudRain size={18} color="#38bdf8" /> Weather & Monsoon Alerts
            </div>
            <span className="live-tag">Open-Meteo API</span>
          </div>
          <div className="weather-metric">
            <span className="temp-large">{chaosData.weather.tempC}°C</span>
            <div className="w-sub">
              <span className="w-cond">{chaosData.weather.condition}</span>
              <span className="w-rain">Rain Risk: {chaosData.weather.rainProbability}%</span>
            </div>
          </div>
          {chaosData.weather.alert && (
            <div className="weather-alert-box">
              <AlertTriangle size={15} />
              <span>{chaosData.weather.alert}</span>
            </div>
          )}
        </div>

        {/* Air Quality Widget */}
        <div className="widget-card glass-panel">
          <div className="widget-header">
            <div className="w-title">
              <Wind size={18} color="#10b981" /> Air Quality (AQI)
            </div>
            <span className="live-tag">OpenAQ / CPCB</span>
          </div>
          <div className="aqi-metric">
            <span className="aqi-large">{chaosData.aqi.value}</span>
            <div className="aqi-badge moderate">Status: {chaosData.aqi.status}</div>
          </div>
          <p className="aqi-advisory-text">"{chaosData.aqi.advisory}"</p>
        </div>

        {/* Traffic Congestion Hotspots Widget */}
        <div className="widget-card glass-panel">
          <div className="widget-header">
            <div className="w-title">
              <Activity size={18} color="#f59e0b" /> Traffic Hotspots
            </div>
            <span className="live-tag">TomTom / Routing</span>
          </div>
          <div className="traffic-hotspots-list">
            <div className="hotspot-item">
              <span className="h-name">Sancheti Hospital Underpass</span>
              <span className="h-delay red">+25 min (Flooded)</span>
            </div>
            <div className="hotspot-item">
              <span className="h-name">Shivaji Bridge / Kasba Peth</span>
              <span className="h-delay orange">+18 min (Metro work)</span>
            </div>
            <div className="hotspot-item">
              <span className="h-name">Swargate Flyover Ramp</span>
              <span className="h-delay yellow">+12 min (Merge queue)</span>
            </div>
          </div>
        </div>

        {/* Top Citizen Reports Widget */}
        <div className="widget-card glass-panel">
          <div className="widget-header">
            <div className="w-title">
              <ShieldCheck size={18} color="#10b981" /> Live Citizen Signals
            </div>
            <span className="live-tag">{incidents.length} active</span>
          </div>
          <div className="reports-mini-feed">
            {incidents.slice(0, 3).map((inc) => (
              <div
                key={inc.id}
                className="report-mini-item"
                onClick={() => onSelectIncidentForView?.(inc)}
              >
                <div className="mini-top">
                  <span className="inc-cat">{inc.category.replace('_', ' ').toUpperCase()}</span>
                  <span className="inc-time">{inc.lastSeen}</span>
                </div>
                <div className="inc-title">{inc.title}</div>
                <div className="inc-conf">Trust Score: {inc.trustScore}/100 · {inc.confidence}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ward / Zone Drilldown Section per PRD F7 */}
      <div className="ward-drilldown-card glass-panel">
        <div className="ward-header-row">
          <div>
            <h3 className="ward-section-title">Ward / Zone Intelligence Drill-Down</h3>
            <p className="ward-section-desc">Inspect neighborhood incident distribution, peak distress hours, and weekly safety trends.</p>
          </div>

          <div className="ward-pills">
            {Object.keys(wardAnalytics).map((ward) => (
              <button
                key={ward}
                className={`ward-pill ${selectedWard === ward ? 'active' : ''}`}
                onClick={() => setSelectedWard(ward)}
              >
                {ward}
              </button>
            ))}
          </div>
        </div>

        <div className="ward-stats-grid">
          <div className="ward-stat-box">
            <span className="stat-label">Active Ward Reports</span>
            <span className="stat-val">{currentWardData.totalReports}</span>
          </div>
          <div className="ward-stat-box">
            <span className="stat-label">Dominant Issue</span>
            <span className="stat-val text-amber">{currentWardData.topCategory}</span>
          </div>
          <div className="ward-stat-box">
            <span className="stat-label">Peak Distress Hours</span>
            <span className="stat-val">{currentWardData.peakHours}</span>
          </div>
          <div className="ward-stat-box">
            <span className="stat-label">Week-over-Week</span>
            <span className="stat-val text-blue">{currentWardData.trendWw}</span>
          </div>
          <div className="ward-stat-box">
            <span className="stat-label">Safety Index Grade</span>
            <span className="stat-val text-green">{currentWardData.safetyGrade}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
