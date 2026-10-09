import React, { useState } from 'react';
import { Place, Incident, Persona, PersonaType } from './types';
import { SEED_PLACES } from './data/seedPlaces';
import { INITIAL_INCIDENTS } from './data/seedIncidents';
import { PERSONAS, calculateChaosIndex } from './services/scoringEngine';
import { Language } from './data/translations';

// Components
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { DiscoverFeed } from './components/DiscoverFeed';
import { AskCity } from './components/AskCity';
import { SafeRouteEngine } from './components/SafeRouteEngine';
import { SafetyHeatmap } from './components/SafetyHeatmap';
import { CompareMode } from './components/CompareMode';
import { HeritageLayer } from './components/HeritageLayer';
import { PulseDashboard } from './components/PulseDashboard';
import { CitizenReportingModal } from './components/CitizenReportingModal';
import { SOSModal } from './components/SOSModal';

export function App() {
  const [places, setPlaces] = useState<Place[]>(SEED_PLACES);
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [currentPersona, setCurrentPersona] = useState<Persona>(PERSONAS.riya);
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [activeRouteId, setActiveRouteId] = useState<string>('safest');

  // Modals & Accessibility
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isSOSModalOpen, setIsSOSModalOpen] = useState<boolean>(false);
  const [isLargeText, setIsLargeText] = useState<boolean>(false);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [autoTriggerDemoFlowB, setAutoTriggerDemoFlowB] = useState<boolean>(false);

  // Check if waterlogging incident exists in incidents list
  const hasWaterloggingIncident = incidents.some(
    (inc) => inc.category === 'waterlogging' && (inc.severity === 'high' || inc.severity === 'critical')
  );

  // Live Chaos Index
  const liveChaosScore = calculateChaosIndex({
    traffic: 68,
    weather: 72,
    aqi: 54,
    activeIncidents: Math.min(100, incidents.length * 12),
    events: 40
  });

  // Handler for adding a new incident from 10s reporting flow
  const handleNewIncidentAdded = (newIncident: Incident) => {
    setIncidents([newIncident, ...incidents]);
    // Also select it on the heatmap and switch to heatmap view
    setSelectedIncident(newIncident);
  };

  // Demo Flow Triggers per PRD Section 12
  const handleTriggerDemoFlowA = () => {
    // Flow A — "Plan my evening" (shows F2 + F3 + F5 + F7)
    setCurrentPersona(PERSONAS.riya);
    setActiveTab('ask');
  };

  const handleTriggerDemoFlowB = () => {
    // Flow B — "Report in 10 seconds" (shows F8 + F4)
    setAutoTriggerDemoFlowB(true);
    setIsReportModalOpen(true);
  };

  const handleTriggerDemoFlowC = () => {
    // Flow C — "Which area is better?" (shows F6)
    setActiveTab('compare');
  };

  return (
    <div
      className={`app-container ${isLargeText ? 'large-text-mode' : ''} ${
        isHighContrast ? 'high-contrast-mode' : ''
      }`}
    >
      {/* Top Navigation */}
      <Navbar
        currentPersona={currentPersona}
        onChangePersona={(p) => setCurrentPersona(p)}
        language={language}
        onChangeLanguage={(l) => setLanguage(l)}
        chaosScore={liveChaosScore}
        onOpenSOS={() => setIsSOSModalOpen(true)}
        isLargeText={isLargeText}
        onToggleLargeText={() => setIsLargeText(!isLargeText)}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast(!isHighContrast)}
        onTriggerDemoFlowA={handleTriggerDemoFlowA}
        onTriggerDemoFlowB={handleTriggerDemoFlowB}
        onTriggerDemoFlowC={handleTriggerDemoFlowC}
        activeTab={activeTab}
        onChangeTab={(tab) => setActiveTab(tab)}
      />

      {/* Main Content Area */}
      <main className="main-content-viewport">
        {activeTab === 'explore' && (
          <DiscoverFeed
            places={places}
            currentPersona={currentPersona}
            selectedPlace={selectedPlace}
            onSelectPlace={(p) => setSelectedPlace(p)}
            onComparePlace={(placeId) => {
              setActiveTab('compare');
            }}
          />
        )}

        {activeTab === 'ask' && (
          <AskCity
            currentPersona={currentPersona}
            onViewLocationOnMap={(coords) => {
              setActiveTab('explore');
            }}
            onOpenSafeRoute={() => {
              setActiveTab('route');
            }}
          />
        )}

        {activeTab === 'route' && (
          <SafeRouteEngine
            currentPersona={currentPersona}
            activeRouteId={activeRouteId}
            onSelectActiveRoute={(rId) => setActiveRouteId(rId)}
            hasWaterloggingIncident={hasWaterloggingIncident}
            onOpenSOS={() => setIsSOSModalOpen(true)}
          />
        )}

        {activeTab === 'heatmap' && (
          <SafetyHeatmap
            incidents={incidents}
            selectedIncident={selectedIncident}
            onSelectIncident={(inc) => setSelectedIncident(inc)}
            onOpenReportModal={() => {
              setAutoTriggerDemoFlowB(false);
              setIsReportModalOpen(true);
            }}
          />
        )}

        {activeTab === 'compare' && (
          <CompareMode
            places={places}
            onSelectPlaceForView={(p) => {
              setSelectedPlace(p);
              setActiveTab('explore');
            }}
          />
        )}

        {activeTab === 'heritage' && <HeritageLayer />}

        {activeTab === 'pulse' && (
          <PulseDashboard
            incidents={incidents}
            onSelectIncidentForView={(inc) => {
              setSelectedIncident(inc);
              setActiveTab('heatmap');
            }}
          />
        )}
      </main>

      {/* Mobile-First Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={(t) => setActiveTab(t)}
        onOpenReportModal={() => {
          setAutoTriggerDemoFlowB(false);
          setIsReportModalOpen(true);
        }}
        language={language}
      />

      {/* Modals */}
      <CitizenReportingModal
        isOpen={isReportModalOpen}
        onClose={() => {
          setIsReportModalOpen(false);
          setAutoTriggerDemoFlowB(false);
        }}
        onNewIncidentAdded={handleNewIncidentAdded}
        autoTriggerDemoFlowB={autoTriggerDemoFlowB}
      />

      <SOSModal
        isOpen={isSOSModalOpen}
        onClose={() => setIsSOSModalOpen(false)}
      />
    </div>
  );
}

export default App;
