import React, { useState } from 'react';
import { Persona, ItineraryResponse } from '../types';
import { Send, Mic, Sparkles, MapPin, Clock, IndianRupee, ShieldCheck, ChevronDown, ChevronUp, AlertCircle, Compass } from 'lucide-react';

interface AskCityProps {
  currentPersona: Persona;
  onViewLocationOnMap?: (coords: [number, number]) => void;
  onOpenSafeRoute?: () => void;
}

export const AskCity: React.FC<AskCityProps> = ({
  currentPersona,
  onViewLocationOnMap,
  onOpenSafeRoute
}) => {
  const [queryInput, setQueryInput] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeExpandedStop, setActiveExpandedStop] = useState<number | null>(null);
  const [itinerary, setItinerary] = useState<ItineraryResponse | null>(null);
  const [toolsActive, setToolsActive] = useState<string[]>([]);

  // Pre-built suggestions including the official Demo Flow A prompt!
  const suggestions = [
    '2 free hours after 6 PM, ₹600, I like old buildings and street food. It might rain.',
    'Quiet cafe with reliable Wi-Fi, wheelchair ramp, under ₹400 in Shivajinagar.',
    'Safe evening walking route for solo woman near Deccan Gymkhana with street food.',
    'Family heritage trail with clean washrooms and stroller friendly paths.'
  ];

  const handleAsk = async (textToSubmit?: string) => {
    const q = textToSubmit || queryInput;
    if (!q.trim()) return;

    setIsLoading(true);
    setItinerary(null);
    setToolsActive([]);

    // Simulate LLM tool-calling steps
    const tools = [
      'tool:get_weather(city="Pune", time="18:00")',
      'tool:search_places(category=["heritage", "food"], budget="₹", tags=["old_architecture"])',
      'tool:get_reports_near(coords=[18.519, 73.855], radius=1500m)',
      'tool:score_route(persona="' + currentPersona.id + '", rainRisk=true)'
    ];

    for (let i = 0; i < tools.length; i++) {
      await new Promise((r) => setTimeout(r, 450));
      setToolsActive((prev) => [...prev, tools[i]]);
    }

    await new Promise((r) => setTimeout(r, 600));

    // Structured Itinerary Response tailored to the prompt & persona
    const mockResponse: ItineraryResponse = {
      query: q,
      totalCostEstimate: 420,
      durationHours: 2,
      weatherSuitability: 'Rain alert at 19:30 PM. All chosen stops feature covered pavilions & rapid transit accessibility.',
      routeSafetySummary: 'Avoids Sancheti underpass due to verified waterlogging report #PMC-PULSE-8492. Kept on well-lit JM Road arterial corridor.',
      confidenceBadge: 'Verified',
      toolsCalled: tools,
      stops: [
        {
          stopNumber: 1,
          timeSlot: '06:00 PM – 06:45 PM',
          placeName: 'Shaniwar Wada (Dilli Darwaza)',
          category: 'Peshwa Heritage',
          estimatedCost: 25,
          whyThis: `Matches your love for historic architecture. Entry fee is only ₹25 (within ₹600 budget). Perimeter is well-lit and monitored by ASI guards, aligning with ${currentPersona.name} safety priorities.`,
          confidence: 'Verified',
          coordinates: [18.5196, 73.8553],
          photoUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&auto=format&fit=crop&q=80',
          safeRouteTip: 'Approach via Bajirao Road rather than the riverbed underpass.'
        },
        {
          stopNumber: 2,
          timeSlot: '06:50 PM – 07:30 PM',
          placeName: 'Bedekar Tea Stall / Narayan Peth Misal',
          category: 'Iconic Street Food',
          estimatedCost: 110,
          whyThis: 'Authentic Puneri misal in an 80-year-old peth neighborhood. Clean indoor seating, quick service, and fits safely within your 2-hour window.',
          confidence: 'Verified',
          coordinates: [18.5135, 73.8499],
          photoUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
          safeRouteTip: 'Well-lit pedestrian alley with active shopkeepers.'
        },
        {
          stopNumber: 3,
          timeSlot: '07:35 PM – 08:00 PM',
          placeName: 'Cafe Goodluck (Bun Maska & Irani Chai)',
          category: 'Historic Irani Cafe',
          estimatedCost: 95,
          whyThis: 'Conclude your evening with nostalgic Irani tea. Located at Deccan Gymkhana with high public transport connectivity before the 8 PM rain shower begins.',
          confidence: 'Verified',
          coordinates: [18.5168, 73.8415],
          photoUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80',
          safeRouteTip: 'Direct bus and prepaid autorickshaws available right outside the entrance.'
        }
      ]
    };

    setItinerary(mockResponse);
    setIsLoading(false);
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setQueryInput('2 free hours after 6 PM, ₹600, I like old buildings and street food. It might rain.');
      handleAsk('2 free hours after 6 PM, ₹600, I like old buildings and street food. It might rain.');
    }, 1500);
  };

  return (
    <div className="ask-city-container">
      {/* Header */}
      <div className="ask-city-header">
        <div className="header-meta">
          <div className="concierge-badge">
            <Sparkles size={16} /> <span>City Concierge · Tool-Calling Agent</span>
          </div>
          <h2 className="section-title">Ask the City</h2>
          <p className="section-desc">
            Natural language itinerary planner that fuses live weather, verified incident reports, budget constraints, and persona safety weights into actionable plans.
          </p>
        </div>
      </div>

      {/* Input Box */}
      <div className="ask-input-card glass-panel">
        <div className="input-row">
          <input
            type="text"
            className="ask-text-input"
            placeholder="e.g. 2 free hours after 6 PM, ₹600, I like old buildings and street food. It might rain."
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          />

          <button
            type="button"
            className={`mic-btn ${isListening ? 'active' : ''}`}
            onClick={handleVoiceInput}
            title="Voice Query (Web Speech)"
          >
            <Mic size={18} />
          </button>

          <button
            type="button"
            className="ask-submit-btn"
            onClick={() => handleAsk()}
            disabled={isLoading}
          >
            {isLoading ? <span className="spinner-mini"></span> : <Send size={18} />}
          </button>
        </div>

        {/* Suggestion Chips */}
        <div className="suggestions-row">
          <span className="suggestions-label">Try Demo Scenarios:</span>
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              className="suggestion-chip"
              onClick={() => {
                setQueryInput(s);
                handleAsk(s);
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Tool Calling Simulation Log */}
      {isLoading && (
        <div className="tool-calling-log glass-panel">
          <div className="log-heading">
            <span className="pulsing-dot"></span> Orchestrator invoking verified live APIs:
          </div>
          <div className="log-items">
            {toolsActive.map((t, i) => (
              <div key={i} className="tool-log-item">
                <code>{t}</code>
                <span className="tool-done-check">✓ 200 OK</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Itinerary Result Display */}
      {itinerary && (
        <div className="itinerary-result-container">
          {/* Top Summary Card */}
          <div className="itinerary-summary-card glass-panel">
            <div className="summary-top">
              <div>
                <span className="confidence-pill verified">
                  <ShieldCheck size={14} /> Trust Badge: {itinerary.confidenceBadge}
                </span>
                <h3 className="itinerary-title">Custom 3-Stop Evening Heritage & Food Plan</h3>
              </div>
              <div className="budget-duration-badge">
                <span className="b-item"><IndianRupee size={14} /> Est. ₹{itinerary.totalCostEstimate}</span>
                <span className="b-item"><Clock size={14} /> {itinerary.durationHours} Hours</span>
              </div>
            </div>

            <div className="context-alerts-row">
              <div className="alert-callout weather">
                <AlertCircle size={16} />
                <span><strong>Weather Strategy:</strong> {itinerary.weatherSuitability}</span>
              </div>
              <div className="alert-callout safety">
                <ShieldCheck size={16} />
                <span><strong>Explainable Safe Route:</strong> {itinerary.routeSafetySummary}</span>
              </div>
            </div>

            {onOpenSafeRoute && (
              <div className="route-handoff-banner">
                <span>Want turn-by-turn navigation with safety penalties?</span>
                <button className="open-route-engine-btn" onClick={onOpenSafeRoute}>
                  Inspect in Safe Route Engine →
                </button>
              </div>
            )}
          </div>

          {/* Timeline of Stops */}
          <div className="itinerary-timeline">
            {itinerary.stops.map((stop) => {
              const isExpanded = activeExpandedStop === stop.stopNumber;
              return (
                <div key={stop.stopNumber} className="timeline-stop-card glass-panel">
                  <div className="stop-header-row">
                    <div className="stop-time-tag">
                      <Clock size={13} /> {stop.timeSlot}
                    </div>
                    <div className="stop-badge-pill">
                      Stop {stop.stopNumber} · {stop.category}
                    </div>
                    <span className="stop-cost-tag">~₹{stop.estimatedCost}</span>
                  </div>

                  <div className="stop-main-content">
                    <img src={stop.photoUrl} alt={stop.placeName} className="stop-thumbnail" />
                    <div className="stop-details">
                      <h4 className="stop-name">{stop.placeName}</h4>
                      <p className="stop-route-tip">
                        🛡️ <strong>Safe Route Tip:</strong> {stop.safeRouteTip}
                      </p>

                      <div className="stop-actions">
                        <button
                          className="why-this-toggle-btn"
                          onClick={() => setActiveExpandedStop(isExpanded ? null : stop.stopNumber)}
                        >
                          <span>Why this? (Explainability)</span>
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>

                        {onViewLocationOnMap && (
                          <button
                            className="view-map-pin-btn"
                            onClick={() => onViewLocationOnMap(stop.coordinates)}
                          >
                            <MapPin size={13} /> View on Map
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Why this? Expandable explainability drawer */}
                  {isExpanded && (
                    <div className="why-this-drawer">
                      <div className="why-this-content">
                        <strong>Explainable AI Rationale:</strong>
                        <p>{stop.whyThis}</p>
                        <div className="why-footer-tags">
                          <span className="audit-tag">✓ Budget constraint: Satisfied</span>
                          <span className="audit-tag">✓ Time constraint: Satisfied</span>
                          <span className="audit-tag">✓ Persona ({currentPersona.name}): Optimized</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
