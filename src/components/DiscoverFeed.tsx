import React, { useState, useMemo } from 'react';
import { Place, CategoryType, BudgetTier, Persona } from '../types';
import { calculatePulseScore, getScoreTheme } from '../services/scoringEngine';
import { fetchGeminiPlaceInsights } from '../services/geminiService';
import { MapComponent } from './MapComponent';
import { 
  Search, Filter, ShieldCheck, Sparkles, IndianRupee, Star, 
  Accessibility, MapPin, Clock, Users, X, ChevronRight, Eye 
} from 'lucide-react';

interface DiscoverFeedProps {
  places: Place[];
  currentPersona: Persona;
  selectedPlace: Place | null;
  onSelectPlace: (place: Place | null) => void;
  onComparePlace?: (placeId: string) => void;
}

export const DiscoverFeed: React.FC<DiscoverFeedProps> = ({
  places,
  currentPersona,
  selectedPlace,
  onSelectPlace,
  onComparePlace
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedBudget, setSelectedBudget] = useState<string>('all');
  const [filterOpenNow, setFilterOpenNow] = useState<boolean>(false);
  const [filterAccessibility, setFilterAccessibility] = useState<boolean>(false);
  const [filterWomenSafe, setFilterWomenSafe] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'split' | 'list' | 'map'>('split');
  const [geminiLoading, setGeminiLoading] = useState<boolean>(false);
  const [geminiInsights, setGeminiInsights] = useState<{
    aiSummary: string;
    safetyAdvisory: string;
    bestTime: string;
    localTip: string;
  } | null>(null);

  const categories: { id: CategoryType; label: string; icon: string }[] = [
    { id: 'all', label: 'All Places', icon: '📍' },
    { id: 'food', label: 'Food & Misal', icon: '🍲' },
    { id: 'cafe', label: 'Cafes & Hangouts', icon: '☕' },
    { id: 'heritage', label: 'Heritage & Forts', icon: '🏛️' },
    { id: 'attraction', label: 'Attractions', icon: '🎡' },
    { id: 'park', label: 'Parks & Tekdis', icon: '🌳' },
    { id: 'market', label: 'Markets & Bazaars', icon: '🛍️' },
    { id: 'transit', label: 'Metro & Transit', icon: '🚆' }
  ];

  // Fast filtering within 500ms
  const filteredPlaces = useMemo(() => {
    return places.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q) || (p.marathiName && p.marathiName.includes(q));
        const matchesWard = p.ward.toLowerCase().includes(q);
        const matchesTag = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesWard && !matchesTag) return false;
      }

      // Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Budget
      if (selectedBudget !== 'all' && p.priceTier !== selectedBudget) {
        return false;
      }

      // Open now
      if (filterOpenNow && !p.isOpen) {
        return false;
      }

      // Accessibility
      if (filterAccessibility && !p.features.wheelchairRamp && !p.features.elevator) {
        return false;
      }

      // Women Safe
      if (filterWomenSafe && !p.features.womenSafeRated) {
        return false;
      }

      return true;
    });
  }, [places, searchQuery, selectedCategory, selectedBudget, filterOpenNow, filterAccessibility, filterWomenSafe]);

  return (
    <div className="discover-container">
      {/* Search and Filters Bar */}
      <div className="discover-controls-card glass-panel">
        <div className="search-row">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search 100+ Pune places, foods, heritage wadas, or wards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                <X size={16} />
              </button>
            )}
          </div>

          <div className="view-mode-toggles">
            <button
              className={`view-btn ${viewMode === 'split' ? 'active' : ''}`}
              onClick={() => setViewMode('split')}
              title="Split Map + List"
            >
              Split View
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List Only"
            >
              List ({filteredPlaces.length})
            </button>
            <button
              className={`view-btn ${viewMode === 'map' ? 'active' : ''}`}
              onClick={() => setViewMode('map')}
              title="Map Only"
            >
              Interactive Map
            </button>
          </div>
        </div>

        {/* Category horizontal scrolling bar */}
        <div className="categories-scroll-row">
          {categories.map((c) => (
            <button
              key={c.id}
              className={`cat-pill-btn ${selectedCategory === c.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(c.id)}
            >
              <span className="cat-icon">{c.icon}</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        {/* Sub-filters row: Budget, Accessibility, Open Now, Women Safe */}
        <div className="sub-filters-row">
          <div className="budget-chips">
            <span className="filter-chip-label">Budget:</span>
            {['all', '₹', '₹₹', '₹₹₹'].map((b) => (
              <button
                key={b}
                className={`budget-chip ${selectedBudget === b ? 'active' : ''}`}
                onClick={() => setSelectedBudget(b)}
              >
                {b === 'all' ? 'All' : b}
              </button>
            ))}
          </div>

          <div className="feature-toggles">
            <button
              className={`toggle-pill ${filterOpenNow ? 'active' : ''}`}
              onClick={() => setFilterOpenNow(!filterOpenNow)}
            >
              <Clock size={13} /> Open Now
            </button>
            <button
              className={`toggle-pill ${filterAccessibility ? 'active' : ''}`}
              onClick={() => setFilterAccessibility(!filterAccessibility)}
            >
              <Accessibility size={13} /> Wheelchair Ramps
            </button>
            <button
              className={`toggle-pill ${filterWomenSafe ? 'active' : ''}`}
              onClick={() => setFilterWomenSafe(!filterWomenSafe)}
            >
              <ShieldCheck size={13} /> Women Safe Rated
            </button>
          </div>
        </div>
      </div>

      {/* Main Discover Layout: Map + List */}
      <div className={`discover-main-viewport ${viewMode}`}>
        {/* Map Panel (when split or map) */}
        {(viewMode === 'split' || viewMode === 'map') && (
          <div className="discover-map-panel glass-panel">
            <MapComponent
              places={filteredPlaces}
              selectedPlace={selectedPlace}
              onSelectPlace={(p) => onSelectPlace(p)}
              height="100%"
            />
          </div>
        )}

        {/* Cards Feed (when split or list) */}
        {(viewMode === 'split' || viewMode === 'list') && (
          <div className="places-feed-column">
            <div className="feed-status-header">
              <span className="count-tag">
                Showing <strong>{filteredPlaces.length}</strong> verified places
              </span>
              <span className="persona-context-tag">
                Scored for: <strong>{currentPersona.name}</strong>
              </span>
            </div>

            <div className="places-cards-grid">
              {filteredPlaces.map((place) => {
                const pulseScore = calculatePulseScore(place.subScores, currentPersona);
                const theme = getScoreTheme(pulseScore);
                const isSelected = selectedPlace?.id === place.id;

                return (
                  <div
                    key={place.id}
                    className={`place-card glass-panel ${isSelected ? 'selected' : ''}`}
                    onClick={() => onSelectPlace(place)}
                  >
                    <div className="place-card-image-wrap">
                      <img src={place.imageUrl} alt={place.name} className="place-thumb-img" />
                      <div className="place-tier-badge">{place.priceTier}</div>
                      <div
                        className="place-pulse-score-badge"
                        style={{ backgroundColor: theme.bgColor, color: theme.color, borderColor: theme.borderColor }}
                      >
                        <span className="score-num">{pulseScore}</span>
                        <span className="score-lbl">Pulse</span>
                      </div>
                    </div>

                    <div className="place-card-body">
                      <div className="place-header-line">
                        <h4 className="place-name">{place.name}</h4>
                        {place.marathiName && <span className="place-mr-name">{place.marathiName}</span>}
                      </div>

                      <div className="place-ward-line">
                        <MapPin size={12} />
                        <span>{place.address}</span>
                        <span className="bullet">·</span>
                        <span className={`crowd-badge ${place.crowdLevel.toLowerCase()}`}>
                          {place.crowdLevel} Crowd
                        </span>
                      </div>

                      {/* 3 Mini Badges: Safety, Cleanliness, Value per PRD F1 */}
                      <div className="mini-badges-row">
                        <span className="mini-badge safety">
                          🛡️ Safety: {place.subScores.safety}
                        </span>
                        <span className="mini-badge clean">
                          ✨ Clean: {place.subScores.cleanliness}
                        </span>
                        <span className="mini-badge value">
                          💰 Value: {place.subScores.affordability}
                        </span>
                      </div>

                      {/* One-line AI Summary */}
                      <p className="place-ai-summary">"{place.aiSummary}"</p>

                      <div className="place-card-footer">
                        <span className="confidence-tag">✓ {place.confidence}</span>
                        <button
                          className="inspect-card-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectPlace(place);
                          }}
                        >
                          Inspect Evidence →
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Place Detail & Evidence Modal */}
      {selectedPlace && (
        <div className="modal-backdrop">
          <div className="modal-content glass-panel-modal place-detail-modal">
            <div className="detail-modal-header">
              <div>
                <span className="confidence-pill verified">
                  Badge: {selectedPlace.confidence}
                </span>
                <h3 className="modal-place-title">{selectedPlace.name}</h3>
                <p className="modal-address"><MapPin size={14} /> {selectedPlace.address} ({selectedPlace.ward})</p>
              </div>
              <button className="modal-close-btn" onClick={() => onSelectPlace(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="detail-modal-body">
              <div className="modal-hero-row">
                <img src={selectedPlace.imageUrl} alt={selectedPlace.name} className="modal-hero-img" />
                <div className="modal-scores-breakdown">
                  <div className="overall-pulse-hero">
                    <span className="hero-score-val">
                      {calculatePulseScore(selectedPlace.subScores, currentPersona)}
                    </span>
                    <span className="hero-score-caption">Persona Pulse Score</span>
                  </div>

                  <div className="sub-scores-bars">
                    <div className="sub-bar-item">
                      <span>Safety: {selectedPlace.subScores.safety}</span>
                      <div className="bar-track"><div className="bar-fill" style={{ width: `${selectedPlace.subScores.safety}%`, background: '#10b981' }}></div></div>
                    </div>
                    <div className="sub-bar-item">
                      <span>Cleanliness: {selectedPlace.subScores.cleanliness}</span>
                      <div className="bar-track"><div className="bar-fill" style={{ width: `${selectedPlace.subScores.cleanliness}%`, background: '#38bdf8' }}></div></div>
                    </div>
                    <div className="sub-bar-item">
                      <span>Affordability: {selectedPlace.subScores.affordability}</span>
                      <div className="bar-track"><div className="bar-fill" style={{ width: `${selectedPlace.subScores.affordability}%`, background: '#f59e0b' }}></div></div>
                    </div>
                    <div className="sub-bar-item">
                      <span>Ratings: {selectedPlace.subScores.ratings}</span>
                      <div className="bar-track"><div className="bar-fill" style={{ width: `${selectedPlace.subScores.ratings}%`, background: '#a855f7' }}></div></div>
                    </div>
                    <div className="sub-bar-item">
                      <span>Accessibility: {selectedPlace.subScores.accessibility}</span>
                      <div className="bar-track"><div className="bar-fill" style={{ width: `${selectedPlace.subScores.accessibility}%`, background: '#ec4899' }}></div></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Explainable Evidence Inputs Section */}
              <div className="evidence-accordion">
                <h4 className="accordion-heading">Explainable Evidence Inputs & Telemetry:</h4>
                <div className="evidence-cards-list">
                  <div className="evidence-card-row">
                    <strong>🛡️ Safety Input:</strong> <span>{selectedPlace.evidenceNotes.safety}</span>
                  </div>
                  <div className="evidence-card-row">
                    <strong>✨ Cleanliness Input:</strong> <span>{selectedPlace.evidenceNotes.cleanliness}</span>
                  </div>
                  <div className="evidence-card-row">
                    <strong>💰 Price & Affordability:</strong> <span>{selectedPlace.evidenceNotes.affordability}</span>
                  </div>
                  <div className="evidence-card-row">
                    <strong>⭐ Public Review Consensus:</strong> <span>{selectedPlace.evidenceNotes.ratings}</span>
                  </div>
                  <div className="evidence-card-row">
                    <strong>♿ Accessibility Details:</strong> <span>{selectedPlace.evidenceNotes.accessibility}</span>
                  </div>
                  <div className="evidence-card-row recency">
                    <strong>🕒 Telemetry Freshness:</strong> <span>{selectedPlace.evidenceNotes.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* Gemini AI Live Location Analysis */}
              <div className="gemini-location-box">
                <div className="gemini-box-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={16} color="#38bdf8" />
                    <strong>Google Gemini Location Intelligence</strong>
                  </div>
                  <button
                    className="fetch-gemini-btn"
                    disabled={geminiLoading}
                    onClick={async () => {
                      setGeminiLoading(true);
                      const res = await fetchGeminiPlaceInsights(selectedPlace.name, selectedPlace.category, 'Pune');
                      setGeminiInsights(res);
                      setGeminiLoading(false);
                    }}
                  >
                    {geminiLoading ? 'Querying Gemini...' : 'Fetch Live Gemini Insights'}
                  </button>
                </div>

                {geminiInsights && (
                  <div className="gemini-insights-results">
                    <div className="g-item">
                      <span className="g-lbl">🤖 AI Summary:</span>
                      <p>{geminiInsights.aiSummary}</p>
                    </div>
                    <div className="g-item">
                      <span className="g-lbl">🛡️ Safety Advisory:</span>
                      <p>{geminiInsights.safetyAdvisory}</p>
                    </div>
                    <div className="g-item">
                      <span className="g-lbl">🕒 Best Visiting Time:</span>
                      <p>{geminiInsights.bestTime}</p>
                    </div>
                    <div className="g-item">
                      <span className="g-lbl">💡 Local Tip:</span>
                      <p>{geminiInsights.localTip}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="detail-modal-footer">
                {onComparePlace && (
                  <button
                    className="modal-compare-btn"
                    onClick={() => {
                      onComparePlace(selectedPlace.id);
                      onSelectPlace(null);
                    }}
                  >
                    Compare on 5-Axis Radar →
                  </button>
                )}
                <button className="modal-close-action-btn" onClick={() => onSelectPlace(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
