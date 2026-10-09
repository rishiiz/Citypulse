import React, { useState, useRef, useEffect } from 'react';
import { Incident, IncidentCategory } from '../types';
import { calculateTrustScore } from '../services/scoringEngine';
import confetti from 'canvas-confetti';
import { 
  Camera, Mic, MapPin, CheckCircle, ShieldAlert, AlertTriangle, 
  Sparkles, X, ChevronRight, Eye, RefreshCw 
} from 'lucide-react';

interface CitizenReportingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewIncidentAdded: (newIncident: Incident) => void;
  currentLocationName?: string;
  autoTriggerDemoFlowB?: boolean;
}

export const CitizenReportingModal: React.FC<CitizenReportingModalProps> = ({
  isOpen,
  onClose,
  onNewIncidentAdded,
  currentLocationName = 'Alka Talkies Chowk / Sancheti Underpass, Pune',
  autoTriggerDemoFlowB = false
}) => {
  const [category, setCategory] = useState<IncidentCategory>('waterlogging');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isFaceBlurred, setIsFaceBlurred] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioTranscript, setAudioTranscript] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<'hinglish' | 'hindi' | 'marathi' | 'english'>('hinglish');
  const [manualDescription, setManualDescription] = useState<string>('');
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [submittedIncident, setSubmittedIncident] = useState<Incident | null>(null);

  const sampleWaterlogPhoto = 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop&q=80';
  const samplePotholePhoto = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80';
  const sampleLightingPhoto = 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=800&auto=format&fit=crop&q=80';

  useEffect(() => {
    if (autoTriggerDemoFlowB && isOpen) {
      loadDemoScenario();
    }
  }, [autoTriggerDemoFlowB, isOpen]);

  if (!isOpen) return null;

  const loadDemoScenario = () => {
    setCategory('waterlogging');
    setPhotoPreview(sampleWaterlogPhoto);
    setSelectedLanguage('hinglish');
    setAudioTranscript('yahan paani bhar gaya hai, bike nahi nikal sakti, underpass pura block hai.');
    setManualDescription('Waterlogging at Sancheti hospital underpass. Water depth ~1.5 ft.');
  };

  const handleSimulateVoiceRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      if (selectedLanguage === 'hinglish') {
        setAudioTranscript('yahan paani bhar gaya hai, bike nahi nikal sakti, underpass pura block hai.');
      } else if (selectedLanguage === 'marathi') {
        setAudioTranscript('येथे खूप पाणी साचले आहे, दुचाकी वाहने बंद पडत आहेत.');
      } else if (selectedLanguage === 'hindi') {
        setAudioTranscript('यहां बहुत पानी भर गया है, बाइक नहीं निकल पा रही है.');
      } else {
        setAudioTranscript('Severe water accumulation here, two wheelers unable to cross underpass.');
      }
    }, 1800);
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    setPipelineStep(1);

    // Step 1: Speech-to-text & NLP language detect
    await new Promise((r) => setTimeout(r, 650));
    setPipelineStep(2);

    // Step 2: NLP Entity extraction & category confirmation
    await new Promise((r) => setTimeout(r, 650));
    setPipelineStep(3);

    // Step 3: Vision verification & auto-blur faces/plates
    await new Promise((r) => setTimeout(r, 700));
    setPipelineStep(4);

    // Step 4: Spatial Clustering within 100m / 6h
    await new Promise((r) => setTimeout(r, 600));
    setPipelineStep(5);

    // Step 5: Trust score calculation per PRD 7.3
    const { trustScore, badge } = calculateTrustScore({
      photoMatch: 25,
      geoConsistency: 20,
      corroboration: 20, // Merged with 2 previous reports
      reporterKarma: 14,
      sourceReliability: 10,
      textConsistency: 10
    });

    const newInc: Incident = {
      id: `inc-live-${Date.now()}`,
      category: category,
      title: 'Waterlogging at Sancheti Hospital Underpass',
      description: audioTranscript || manualDescription || 'Severe water accumulation flagged by citizen.',
      coordinates: [18.5298, 73.8505], // Underpass location
      ward: 'Shivajinagar',
      severity: 'critical',
      reportCount: 3, // Merged cluster count per PRD
      firstSeen: '1 hour ago',
      lastSeen: 'Just now',
      trustScore: trustScore,
      confidence: badge,
      status: 'Verified',
      evidencePhoto: photoPreview || sampleWaterlogPhoto,
      hasAudioNote: true,
      audioTranscript: audioTranscript || 'yahan paani bhar gaya hai, bike nahi nikal sakti.',
      sourceMix: ['Live Citizen Voice Note (Hinglish)', 'Vision Model Auto-Verification', '2 Corroborating Hotspot Pings'],
      civicWardAgency: 'PMC Ward 7 Disaster Response'
    };

    setSubmittedIncident(newInc);
    onNewIncidentAdded(newInc);
    setIsProcessing(false);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleReset = () => {
    setSubmittedIncident(null);
    setPipelineStep(0);
    setPhotoPreview(null);
    setAudioTranscript('');
    setManualDescription('');
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content glass-panel-modal">
        <div className="modal-header">
          <div>
            <span className="modal-tag">⚡ 10-Second Quick Citizen Reporting</span>
            <h3 className="modal-title">Speak · Snap · Send</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        {!submittedIncident ? (
          <div className="report-form-body">
            {/* Quick Demo scenario banner */}
            <div className="demo-fill-banner">
              <span>🎯 Quick Test PRD Flow B:</span>
              <button className="demo-fill-btn" onClick={loadDemoScenario}>
                Prefill "Waterlogging in Hinglish"
              </button>
            </div>

            {/* Category selection */}
            <div className="form-group">
              <label className="form-label">Issue Category</label>
              <div className="category-chips-row">
                {[
                  { id: 'waterlogging', label: 'Waterlogging', icon: '🌊' },
                  { id: 'pothole', label: 'Pothole', icon: '🕳️' },
                  { id: 'poor_lighting', label: 'Dark / Poor Lighting', icon: '💡' },
                  { id: 'harassment', label: 'Harassment / Unsafe Area', icon: '🛡️' },
                  { id: 'accident', label: 'Accident Prone', icon: '⚠️' },
                  { id: 'garbage', label: 'Garbage Dump', icon: '🗑️' },
                  { id: 'positive_shoutout', label: 'Clean Shout-out', icon: '⭐' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`cat-chip ${category === item.id ? 'active' : ''}`}
                    onClick={() => setCategory(item.id as IncidentCategory)}
                  >
                    <span>{item.icon}</span> {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Snap / Upload with Auto-Privacy Blur */}
            <div className="form-group">
              <label className="form-label">Evidence Photo (Auto-Blurs Faces & Number Plates)</label>
              <div className="photo-picker-row">
                <button
                  type="button"
                  className="photo-btn"
                  onClick={() => setPhotoPreview(sampleWaterlogPhoto)}
                >
                  <Camera size={16} /> Choose Waterlogging Photo
                </button>
                <button
                  type="button"
                  className="photo-btn secondary"
                  onClick={() => setPhotoPreview(samplePotholePhoto)}
                >
                  Choose Pothole Photo
                </button>
                <button
                  type="button"
                  className="photo-btn secondary"
                  onClick={() => setPhotoPreview(sampleLightingPhoto)}
                >
                  Choose Dark Alley Photo
                </button>
              </div>

              {photoPreview && (
                <div className="photo-preview-box">
                  <img src={photoPreview} alt="Evidence" className="preview-img" />
                  <div className="privacy-badge">
                    <ShieldAlert size={14} />
                    <span>Privacy Active: 2 human faces & plate auto-blurred</span>
                  </div>
                </div>
              )}
            </div>

            {/* Voice Note Input in Hindi / Marathi / English / Hinglish */}
            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label">Voice Note (Speak in your preferred language)</label>
                <div className="lang-selector-mini">
                  {(['hinglish', 'hindi', 'marathi', 'english'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      className={`lang-pill ${selectedLanguage === l ? 'active' : ''}`}
                      onClick={() => setSelectedLanguage(l)}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="voice-record-card">
                <button
                  type="button"
                  className={`mic-record-btn ${isRecording ? 'recording' : ''}`}
                  onClick={handleSimulateVoiceRecord}
                >
                  <Mic size={20} />
                  <span>{isRecording ? 'Listening & Transcribing...' : 'Tap & Speak Voice Note'}</span>
                </button>
                {audioTranscript && (
                  <div className="transcript-box">
                    <span className="transcript-tag">Auto-Transcribed ({selectedLanguage}):</span>
                    <p className="transcript-text">"{audioTranscript}"</p>
                  </div>
                )}
              </div>
            </div>

            {/* Location Pill */}
            <div className="form-group">
              <label className="form-label">GPS Geotag Location</label>
              <div className="location-pill">
                <MapPin size={16} className="loc-icon" />
                <span>{currentLocationName}</span>
                <span className="gps-acc">Accurate to 4m</span>
              </div>
            </div>

            {/* Pipeline progress simulation if active */}
            {isProcessing && (
              <div className="pipeline-progress-card">
                <div className="pipeline-title">🤖 Multimodal AI Verification Pipeline Running...</div>
                <div className="pipeline-steps">
                  <div className={`step-item ${pipelineStep >= 1 ? 'done' : ''}`}>
                    <span className="step-num">1</span>
                    <span>Speech-to-Text & Dialect Detection</span>
                  </div>
                  <div className={`step-item ${pipelineStep >= 2 ? 'done' : ''}`}>
                    <span className="step-num">2</span>
                    <span>NLP Entity & Severity Classifier (Critical Waterlogging)</span>
                  </div>
                  <div className={`step-item ${pipelineStep >= 3 ? 'done' : ''}`}>
                    <span className="step-num">3</span>
                    <span>Vision Model Validation & Face Anonymization</span>
                  </div>
                  <div className={`step-item ${pipelineStep >= 4 ? 'done' : ''}`}>
                    <span className="step-num">4</span>
                    <span>Spatial Clustering: Merged with 2 nearby reports (Cluster = 3)</span>
                  </div>
                  <div className={`step-item ${pipelineStep >= 5 ? 'done' : ''}`}>
                    <span className="step-num">5</span>
                    <span>Computing Explainable Trust Score (PRD Formula 7.3)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Action */}
            <div className="modal-footer">
              <button
                type="button"
                className="submit-report-btn"
                disabled={isProcessing}
                onClick={handleSubmit}
              >
                {isProcessing ? 'Verifying with AI...' : 'Submit & Update Live City Pulse →'}
              </button>
            </div>
          </div>
        ) : (
          /* Submission Success Tracker */
          <div className="submission-success-view">
            <div className="success-icon-badge">
              <CheckCircle size={44} color="#10b981" />
            </div>
            <h3 className="success-title">Citizen Incident Verified & Dispatched!</h3>
            <p className="success-desc">
              Your report was processed in <strong>4.2 seconds</strong>. It merged into a verified cluster of <strong>3 corroborating reports</strong>.
            </p>

            {/* Trust badge card */}
            <div className="trust-score-card">
              <div className="trust-score-top">
                <span className="trust-label">Trust Score:</span>
                <span className="trust-number">{submittedIncident.trustScore}/100</span>
                <span className="confidence-pill verified">Badge: {submittedIncident.confidence}</span>
              </div>
              <div className="trust-breakdown-chips">
                <span>Photo Match: 25/25</span>
                <span>Geo: 20/20</span>
                <span>Corroboration: 20/20</span>
                <span>Karma: 14/15</span>
                <span>Consistency: 10/10</span>
              </div>
            </div>

            {/* Civic Status Tracker */}
            <div className="status-tracker-card">
              <h4 className="tracker-heading">Civic Action Tracker: #PMC-PULSE-8492</h4>
              <div className="tracker-timeline">
                <div className="t-step active">
                  <span className="t-dot">✓</span>
                  <span className="t-title">Received</span>
                  <span className="t-time">Just now</span>
                </div>
                <div className="t-step active">
                  <span className="t-dot">✓</span>
                  <span className="t-title">AI Verified</span>
                  <span className="t-time">99% confidence</span>
                </div>
                <div className="t-step current">
                  <span className="t-dot">●</span>
                  <span className="t-title">Dispatched</span>
                  <span className="t-time">PMC Ward 7 Drain Pump Team</span>
                </div>
                <div className="t-step">
                  <span className="t-dot">○</span>
                  <span className="t-title">Resolved</span>
                  <span className="t-time">Est. 45 mins</span>
                </div>
              </div>
            </div>

            <div className="live-effect-callout">
              🔔 <strong>Live Map Impact:</strong> The Safety Heatmap now displays a Verified Waterlogging Hotspot. Safe Route calculations have automatically shifted to route traffic around this underpass!
            </div>

            <button className="done-btn" onClick={handleReset}>
              Close & View Live Map Impact
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
