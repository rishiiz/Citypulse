import React, { useState } from 'react';
import { Persona, PersonaType } from '../types';
import { PERSONAS } from '../services/scoringEngine';
import { Language, TRANSLATIONS } from '../data/translations';
import { 
  ShieldAlert, Globe, User, PhoneCall, Sparkles, 
  ChevronDown, Type, Contrast, Play 
} from 'lucide-react';

interface NavbarProps {
  currentPersona: Persona;
  onChangePersona: (persona: Persona) => void;
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  chaosScore: number;
  onOpenSOS: () => void;
  isLargeText: boolean;
  onToggleLargeText: () => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
  onTriggerDemoFlowA: () => void;
  onTriggerDemoFlowB: () => void;
  onTriggerDemoFlowC: () => void;
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPersona,
  onChangePersona,
  language,
  onChangeLanguage,
  chaosScore,
  onOpenSOS,
  isLargeText,
  onToggleLargeText,
  isHighContrast,
  onToggleHighContrast,
  onTriggerDemoFlowA,
  onTriggerDemoFlowB,
  onTriggerDemoFlowC,
  activeTab,
  onChangeTab
}) => {
  const [showPersonaMenu, setShowPersonaMenu] = useState<boolean>(false);
  const t = TRANSLATIONS[language];

  return (
    <header className="navbar-container glass-panel">
      {/* Top Bar Brand & Quick Metrics */}
      <div className="navbar-main-row">
        {/* Logo and Tagline */}
        <div className="navbar-brand-col">
          <div className="brand-logo-wrap" onClick={() => onChangeTab('explore')}>
            <span className="pulse-logo-icon">⚡</span>
            <div>
              <h1 className="brand-title">CityPulse</h1>
              <span className="brand-city-badge">Pune Live · Pilot City</span>
            </div>
          </div>
        </div>

        {/* Chaos Index Live Indicator & Quick Navigation Links */}
        <div className="nav-middle-col">
          <button
            className="chaos-mini-badge"
            onClick={() => onChangeTab('pulse')}
            title="Open Live Chaos Index Dashboard"
          >
            <span className="pulsing-amber-dot"></span>
            <span className="chaos-label">Chaos Index:</span>
            <span className="chaos-number">{chaosScore}/100 ↗</span>
          </button>

          <nav className="desktop-nav-links">
            <button
              className={`nav-link-btn ${activeTab === 'explore' ? 'active' : ''}`}
              onClick={() => onChangeTab('explore')}
            >
              {t.explore}
            </button>
            <button
              className={`nav-link-btn ${activeTab === 'ask' ? 'active' : ''}`}
              onClick={() => onChangeTab('ask')}
            >
              {t.askCity}
            </button>
            <button
              className={`nav-link-btn ${activeTab === 'route' ? 'active' : ''}`}
              onClick={() => onChangeTab('route')}
            >
              {t.safeRoute}
            </button>
            <button
              className={`nav-link-btn ${activeTab === 'heatmap' ? 'active' : ''}`}
              onClick={() => onChangeTab('heatmap')}
            >
              Safety Heatmap
            </button>
            <button
              className={`nav-link-btn ${activeTab === 'compare' ? 'active' : ''}`}
              onClick={() => onChangeTab('compare')}
            >
              {t.compare}
            </button>
            <button
              className={`nav-link-btn ${activeTab === 'heritage' ? 'active' : ''}`}
              onClick={() => onChangeTab('heritage')}
            >
              {t.heritage}
            </button>
            <button
              className={`nav-link-btn ${activeTab === 'pulse' ? 'active' : ''}`}
              onClick={() => onChangeTab('pulse')}
            >
              {t.pulse}
            </button>
          </nav>
        </div>

        {/* Right Settings & Persona Controls */}
        <div className="navbar-actions-col">
          {/* Persona Switcher Dropdown */}
          <div className="persona-dropdown-container">
            <button
              className="persona-btn"
              onClick={() => setShowPersonaMenu(!showPersonaMenu)}
            >
              <span className="avatar-emoji">{currentPersona.avatar}</span>
              <div className="persona-text-preview">
                <span className="p-name">{currentPersona.name}</span>
                <span className="p-tagline">{currentPersona.tagline}</span>
              </div>
              <ChevronDown size={14} />
            </button>

            {showPersonaMenu && (
              <div className="persona-menu-panel glass-panel">
                <div className="menu-header">Select Persona (Shifts Safety Weights):</div>
                {Object.values(PERSONAS).map((p) => {
                  const isCur = p.id === currentPersona.id;
                  return (
                    <div
                      key={p.id}
                      className={`persona-option-item ${isCur ? 'active' : ''}`}
                      onClick={() => {
                        onChangePersona(p);
                        setShowPersonaMenu(false);
                      }}
                    >
                      <span className="opt-avatar">{p.avatar}</span>
                      <div className="opt-info">
                        <span className="opt-name">{p.name} · {p.tagline}</span>
                        <span className="opt-desc">{p.description}</span>
                        <div className="opt-weights">
                          Safety: {Math.round(p.weights.safety * 100)}% · Affordability: {Math.round(p.weights.affordability * 100)}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Language Switcher EN / HI / MR */}
          <div className="lang-switcher-wrap">
            <Globe size={14} className="globe-icon" />
            {(['en', 'hi', 'mr'] as const).map((l) => (
              <button
                key={l}
                className={`lang-tab-btn ${language === l ? 'active' : ''}`}
                onClick={() => onChangeLanguage(l)}
              >
                {l === 'en' ? 'EN' : l === 'hi' ? 'हिंदी' : 'मराठी'}
              </button>
            ))}
          </div>

          {/* Accessibility Toggles */}
          <div className="a11y-toggles">
            <button
              className={`a11y-btn ${isLargeText ? 'active' : ''}`}
              onClick={onToggleLargeText}
              title="Toggle Large Text Mode"
            >
              <Type size={15} />
            </button>
            <button
              className={`a11y-btn ${isHighContrast ? 'active' : ''}`}
              onClick={onToggleHighContrast}
              title="Toggle High Contrast Mode"
            >
              <Contrast size={15} />
            </button>
          </div>

          {/* Quick SOS button */}
          <button className="nav-sos-btn" onClick={onOpenSOS}>
            <PhoneCall size={14} /> SOS
          </button>
        </div>
      </div>

      {/* Demo Flow Quick Bar for Hackathon Presentation / Evaluation */}
      <div className="demo-scenarios-strip">
        <span className="strip-title">🚀 3-Minute Demo Scenarios (PRD Section 12):</span>
        <div className="strip-buttons">
          <button className="demo-strip-btn flow-a" onClick={onTriggerDemoFlowA}>
            <Play size={12} /> Flow A: "Plan My Evening" (Concierge + Route)
          </button>
          <button className="demo-strip-btn flow-b" onClick={onTriggerDemoFlowB}>
            <Play size={12} /> Flow B: "Report in 10s" (Multimodal AI + Live Heatmap)
          </button>
          <button className="demo-strip-btn flow-c" onClick={onTriggerDemoFlowC}>
            <Play size={12} /> Flow C: "Compare Areas" (5-Axis Radar + Verdict)
          </button>
        </div>
      </div>
    </header>
  );
};
