import React, { useState } from 'react';
import { HERITAGE_TRAILS, LOCAL_TRADITIONS } from '../data/seedTrails';
import { HeritageTrail, HeritageStop } from '../types';
import { 
  Compass, Volume2, VolumeX, Clock, Calendar, ExternalLink, 
  MapPin, Sliders, ChevronRight, Award, Info, Sparkles 
} from 'lucide-react';

export const HeritageLayer: React.FC = () => {
  const [selectedTrail, setSelectedTrail] = useState<HeritageTrail>(HERITAGE_TRAILS[0]);
  const [activeStop, setActiveStop] = useState<HeritageStop>(HERITAGE_TRAILS[0].stops[0]);
  const [ttsLang, setTtsLang] = useState<'en' | 'hi' | 'mr'>('en');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [thenNowSliderVal, setThenNowSliderVal] = useState<number>(50); // 0 to 100%
  const [activeTab, setActiveTab] = useState<'trails' | 'traditions'>('trails');

  const speakAudio = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Browser text-to-speech is not supported on this device.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (ttsLang === 'hi') utterance.lang = 'hi-IN';
    else if (ttsLang === 'mr') utterance.lang = 'mr-IN';
    else utterance.lang = 'en-IN';

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  return (
    <div className="heritage-container">
      {/* Top Header */}
      <div className="heritage-header">
        <div>
          <span className="badge-highlight">🏛️ History, Heritage & Living Traditions</span>
          <h2 className="section-title">Culture & Heritage Trails</h2>
          <p className="section-desc">
            Explore Pune's centuries-old Peshwa legacy and culinary traditions. Audio narration in English, Hindi, and Marathi with interactive Then vs Now historic photography.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="view-toggle-pills">
          <button
            className={`view-pill ${activeTab === 'trails' ? 'active' : ''}`}
            onClick={() => setActiveTab('trails')}
          >
            <Compass size={15} /> Curated Trails ({HERITAGE_TRAILS.length})
          </button>
          <button
            className={`view-pill ${activeTab === 'traditions' ? 'active' : ''}`}
            onClick={() => setActiveTab('traditions')}
          >
            <Calendar size={15} /> Traditions Calendar ({LOCAL_TRADITIONS.length})
          </button>
        </div>
      </div>

      {activeTab === 'trails' ? (
        <div className="trails-layout-grid">
          {/* Left Trail selector and stops timeline */}
          <div className="trails-selector-column">
            {/* Trail Cards */}
            <div className="trail-cards-row">
              {HERITAGE_TRAILS.map((trail) => {
                const isCurrent = trail.id === selectedTrail.id;
                return (
                  <div
                    key={trail.id}
                    className={`trail-card-item glass-panel ${isCurrent ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedTrail(trail);
                      setActiveStop(trail.stops[0]);
                      if (isPlayingAudio) {
                        window.speechSynthesis.cancel();
                        setIsPlayingAudio(false);
                      }
                    }}
                  >
                    <img src={trail.coverPhoto} alt={trail.title} className="trail-cover-thumb" />
                    <div className="trail-info">
                      <span className="trail-theme-tag">{trail.theme}</span>
                      <h4 className="trail-card-title">{trail.title}</h4>
                      <div className="trail-meta-row">
                        <span><Clock size={12} /> {trail.durationMinutes} min</span>
                        <span>{trail.distanceKm} km</span>
                        <span>{trail.stopsCount} stops</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Stops list for current trail */}
            <div className="stops-timeline-card glass-panel">
              <h4 className="stops-timeline-heading">Trail Stops Itinerary:</h4>
              <div className="stops-step-list">
                {selectedTrail.stops.map((stop, idx) => {
                  const isActive = stop.id === activeStop.id;
                  return (
                    <div
                      key={stop.id}
                      className={`stop-timeline-item ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        setActiveStop(stop);
                        if (isPlayingAudio) {
                          window.speechSynthesis.cancel();
                          setIsPlayingAudio(false);
                        }
                      }}
                    >
                      <div className="stop-step-num">{idx + 1}</div>
                      <div className="stop-step-info">
                        <span className="stop-step-title">{stop.title}</span>
                        <span className="stop-step-era">{stop.era}</span>
                      </div>
                      <ChevronRight size={16} className="chevron" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Active Landmark Story Player & Then vs Now Slider */}
          <div className="landmark-player-column">
            <div className="landmark-story-card glass-panel">
              <div className="story-card-top">
                <div>
                  <span className="era-badge">{activeStop.era}</span>
                  <h3 className="landmark-main-title">{activeStop.title}</h3>
                </div>

                {/* TTS Audio Controls */}
                <div className="tts-control-block">
                  <div className="lang-mini-selector">
                    {(['en', 'hi', 'mr'] as const).map((l) => (
                      <button
                        key={l}
                        className={`lang-sub-pill ${ttsLang === l ? 'active' : ''}`}
                        onClick={() => {
                          setTtsLang(l);
                          if (isPlayingAudio) {
                            window.speechSynthesis.cancel();
                            setIsPlayingAudio(false);
                          }
                        }}
                      >
                        {l === 'en' ? 'EN' : l === 'hi' ? 'हिंदी' : 'मराठी'}
                      </button>
                    ))}
                  </div>

                  <button
                    className={`tts-play-btn ${isPlayingAudio ? 'playing' : ''}`}
                    onClick={() => speakAudio(activeStop.audioNarration[ttsLang])}
                  >
                    {isPlayingAudio ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    <span>{isPlayingAudio ? 'Stop Voice' : 'Listen Narration'}</span>
                  </button>
                </div>
              </div>

              {/* Story Narrative */}
              <p className="story-narrative-text">{activeStop.story}</p>

              {/* Curator & Etiquette Notes */}
              <div className="notes-grid">
                <div className="note-card etiquette">
                  <span className="note-label">👔 Dress & Etiquette:</span>
                  <p className="note-body">{activeStop.etiquette}</p>
                </div>
                <div className="note-card timing">
                  <span className="note-label">🕒 Best Time to Visit:</span>
                  <p className="note-body">{activeStop.bestTime}</p>
                </div>
              </div>

              {/* Then vs Now Photo Slider per PRD F3 (P2 stretch built in!) */}
              <div className="then-now-container">
                <div className="then-now-header">
                  <div className="title-row">
                    <Sliders size={16} />
                    <span>Then vs Now Historical Comparison</span>
                  </div>
                  <span className="then-year-tag">{activeStop.historicalYear}</span>
                </div>

                <div className="slider-canvas-wrapper">
                  {/* Current Photo Background */}
                  <img
                    src={activeStop.currentPhoto}
                    alt="Current day"
                    className="then-now-img base"
                  />
                  {/* Historical Photo Overlay with clip */}
                  <div
                    className="overlay-clipped"
                    style={{ width: `${thenNowSliderVal}%` }}
                  >
                    <img
                      src={activeStop.historicalPhoto}
                      alt="Historical survey"
                      className="then-now-img overlay"
                    />
                    <div className="then-label">THEN (HISTORIC)</div>
                  </div>
                  <div className="now-label">NOW (PRESENT)</div>

                  {/* Range Slider Controller */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={thenNowSliderVal}
                    onChange={(e) => setThenNowSliderVal(Number(e.target.value))}
                    className="then-now-range-input"
                  />
                </div>
                <div className="slider-instruction">
                  ◀ Slide left/right to reveal historical transformation ▶
                </div>
              </div>

              {/* Source attribution link */}
              <div className="source-attribution">
                <span>Verified Source: {activeStop.source}</span>
                <a
                  href={activeStop.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="source-link"
                >
                  View Records <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Local Traditions Calendar per PRD F3 */
        <div className="traditions-calendar-grid">
          {LOCAL_TRADITIONS.map((trad) => (
            <div key={trad.id} className="tradition-card glass-panel">
              <div className="trad-card-top">
                <span className="trad-cat-badge">{trad.category}</span>
                <span className="crowd-tag high">Crowd: {trad.expectedCrowd}</span>
              </div>

              <h3 className="trad-title">{trad.title}</h3>
              <div className="trad-meta-row">
                <span><Calendar size={13} /> {trad.dateStr}</span>
                <span><MapPin size={13} /> {trad.location}</span>
              </div>

              <div className="trad-section">
                <span className="section-head">🚫 Road Closures & Vehicular Diversions:</span>
                <ul className="closures-list">
                  {trad.roadClosures.map((rc, i) => (
                    <li key={i}>• {rc}</li>
                  ))}
                </ul>
              </div>

              <div className="trad-section advisory">
                <span className="section-head">🚇 Transit Advisory:</span>
                <p>{trad.transitAdvisory}</p>
              </div>

              <div className="trad-section tips">
                <span className="section-head">✨ Cultural Etiquette & Tips:</span>
                <p>{trad.culturalTips}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
